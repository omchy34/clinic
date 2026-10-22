// GET ?from=YYYY-MM-DD&to=YYYY-MM-DD&clinicId=...&status=ALL|ACTIVE|COMPLETED|CANCELLED&page=1
// Sirf admin. Saare clinics ke tokens, payments aur refunds.

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import authAdmin from "@/middlewere/authAdmin";
import { addDays, isValidDate, todayIn, zonedToUtc } from "@/lib/booking";

const TZ = "Asia/Kolkata";
const PAGE_SIZE = 20;

const REAL = ["CONFIRMED", "SERVING", "COMPLETED", "CANCELLED"] as const; // unpaid/expired nahi
type Real = (typeof REAL)[number];
const PAID = ["PAID", "PARTIALLY_REFUNDED", "REFUNDED"] as const;

const FILTERS: Record<string, Real[]> = {
  ACTIVE: ["CONFIRMED", "SERVING"],
  COMPLETED: ["COMPLETED"],
  CANCELLED: ["CANCELLED"],
};

const json = (message: string, status: number) => NextResponse.json({ message }, { status });
const rupees = (paise: number) => Math.round(paise) / 100;

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return json("Unauthorized", 401);
  if (!(await authAdmin(userId))) return json("Not authorized", 403);

  const sp = new URL(request.url).searchParams;
  const to = sp.get("to") ?? todayIn(TZ);
  const from = sp.get("from") ?? addDays(to, -29);
  if (!isValidDate(from) || !isValidDate(to) || from > to) {
    return json("Choose a valid date range.", 400);
  }

  const clinicId = sp.get("clinicId") || undefined;
  const statusIn = FILTERS[sp.get("status") ?? ""] ?? [...REAL];
  const page = Math.max(1, Number.parseInt(sp.get("page") ?? "1", 10) || 1);

  // Booking kis din hui: IST ke hisaab se din shuru se din khatam
  const createdAt = {
    gte: zonedToUtc(from, "00:00", TZ),
    lt: zonedToUtc(addDays(to, 1), "00:00", TZ),
  };
  const base = { createdAt, ...(clinicId ? { clinicId } : {}) };

  try {
    const [payments, groups, total, rows, clinics] = await Promise.all([
      // Jin tokens ka paisa aaya
      prisma.payment.findMany({
        where: { status: { in: [...PAID] }, booking: base },
        select: {
          amount: true,
          gatewayFee: true,
          gatewayTax: true,
          refundedAmount: true,
          booking: { select: { clinicId: true } },
        },
      }),
      // Clinic ke hisaab se token counts
      prisma.booking.groupBy({
        by: ["clinicId", "status"],
        where: { ...base, status: { in: [...REAL] } },
        _count: { _all: true },
      }),
      prisma.booking.count({ where: { ...base, status: { in: statusIn } } }),
      // Transactions list (ek page)
      prisma.booking.findMany({
        where: { ...base, status: { in: statusIn } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          createdAt: true,
          tokenNumber: true,
          status: true,
          cancelledBy: true,
          patientName: true,
          amount: true,
          user: { select: { name: true, email: true } },
          clinic: { select: { name: true } },
          session: { select: { date: true, doctor: { select: { name: true } } } },
          payment: {
            select: {
              status: true,
              method: true,
              gatewayFee: true,
              gatewayTax: true,
              razorpayPaymentId: true,
              refunds: {
                orderBy: { createdAt: "desc" },
                take: 1,
                select: { amount: true, deductedFee: true, status: true },
              },
            },
          },
        },
      }),
      prisma.clinic.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    ]);

    // Clinic-wise hisaab (paise me jodo, aakhir me rupees)
    type Acc = {
      tokens: number;
      cancelled: number;
      paidTokens: number;
      collected: number;
      refunded: number;
      fees: number;
    };
    const blank = (): Acc => ({ tokens: 0, cancelled: 0, paidTokens: 0, collected: 0, refunded: 0, fees: 0 });
    const perClinic = new Map<string, Acc>();
    const total_ = blank();
    const acc = (id: string) => perClinic.get(id) ?? perClinic.set(id, blank()).get(id)!;

    for (const g of groups) {
      for (const a of [acc(g.clinicId), total_]) {
        a.tokens += g._count._all;
        if (g.status === "CANCELLED") a.cancelled += g._count._all;
      }
    }
    for (const p of payments) {
      for (const a of [acc(p.booking.clinicId), total_]) {
        a.paidTokens += 1;
        a.collected += p.amount;
        a.refunded += p.refundedAmount;
        a.fees += p.gatewayFee + p.gatewayTax;
      }
    }

    const shape = (a: Acc) => ({
      tokens: a.tokens,
      cancelled: a.cancelled,
      paidTokens: a.paidTokens,
      collected: rupees(a.collected),
      refunded: rupees(a.refunded),
      fees: rupees(a.fees),
      net: rupees(a.collected - a.refunded - a.fees),
    });

    const names = new Map(clinics.map((c) => [c.id, c.name]));
    const byClinic = [...perClinic.entries()]
      .map(([id, a]) => ({ id, name: names.get(id) ?? "Unknown clinic", ...shape(a) }))
      .sort((a, b) => b.collected - a.collected || b.tokens - a.tokens);

    return NextResponse.json(
      {
        from,
        to,
        page,
        pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        total,
        clinics,
        summary: shape(total_),
        byClinic,
        rows: rows.map((b) => {
          const p = b.payment;
          const paid = !!p && (PAID as readonly string[]).includes(p.status);
          const r = p?.refunds[0];
          return {
            id: b.id,
            createdAt: b.createdAt.toISOString(),
            tokenNumber: b.tokenNumber,
            status: b.status,
            cancelledBy: b.cancelledBy,
            patient: b.patientName ?? b.user.name,
            email: b.user.email,
            clinic: b.clinic.name,
            doctor: b.session.doctor.name,
            sessionDate: b.session.date.toISOString().slice(0, 10),
            paidRupees: paid ? rupees(b.amount) : 0,
            feeRupees: paid && p ? rupees(p.gatewayFee + p.gatewayTax) : 0,
            method: p?.method ?? null,
            paymentId: p?.razorpayPaymentId ?? null,
            refund: r ? { rupees: rupees(r.amount), feeRupees: rupees(r.deductedFee), status: r.status } : null,
          };
        }),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("GET /api/admin/payments", err);
    return json("Could not load the payments. Please try again.", 500);
  }
}