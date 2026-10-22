// GET   -> cancel se pehle refund preview (kitna wapas milega)
// PATCH -> patient ka token cancel + refund (Razorpay fee kaat ke)

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { calcRefund, cancelBooking, ensureFee } from "@/lib/refund";

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

type Ctx = { params: Promise<{ bookingId: string }> };

// Cancel kyun nahi ho sakta? null = ho sakta hai
function blockReason(b: { status: string; session: { queueStatus: string } }): string | null {
  if (b.status === "SERVING") {
    return "The doctor is already seeing you, so this token can no longer be cancelled";
  }
  if (b.status === "COMPLETED") return "This token is already completed";
  if (b.status === "CANCELLED") return "This token is already cancelled";
  if (b.session.queueStatus === "ENDED") return "This session has ended";
  if (b.status !== "CONFIRMED") return "This token can no longer be cancelled";
  return null;
}

export async function GET(_req: Request, { params }: Ctx) {
  const { bookingId } = await params;
  if (!bookingId) return json("Token id is missing", 400);

  const { userId } = await auth();
  if (!userId) return json("unauthorized", 401);

  try {
    const b = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: {
        payment: true,
        clinic: { select: { userCancelRefundPercent: true } },
        session: { select: { queueStatus: true } },
      },
    });
    if (!b) return json("Token not found", 404);

    const blocked = blockReason(b);
    const paid = b.payment?.status === "PAID";

    let refund = 0;
    if (!blocked && b.payment && paid) {
      const p = await ensureFee(b.payment);
      refund = calcRefund(p, "USER_CANCELLED", b.clinic.userCancelRefundPercent).refund;
    }

    return NextResponse.json(
      {
        canCancel: !blocked,
        paid,
        paidRupees: paid ? b.amount / 100 : 0,
        refundRupees: refund / 100,
        feeRupees: paid ? (b.amount - refund) / 100 : 0,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("GET /api/clinic/appointments/[bookingId]/cancel", err);
    return json("Could not check the refund. Please try again.", 500);
  }
}

export async function PATCH(_req: Request, { params }: Ctx) {
  const { bookingId } = await params;
  // Never let an undefined id reach Prisma: it would drop the id filter from the query
  if (!bookingId) return json("Token id is missing", 400);

  const { userId } = await auth();
  if (!userId) return json("unauthorized", 401);

  try {
    const b = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      select: { status: true, session: { select: { queueStatus: true } } },
    });
    if (!b) return json("Token not found", 404);

    const blocked = blockReason(b);
    if (blocked) return json(blocked, 409);

    const r = await cancelBooking({ bookingId, actor: "USER", userId });
    if (!r.ok) {
      if (r.error === "NOT_FOUND") return json("Token not found", 404);
      if (r.error === "FORBIDDEN") return json("This token does not belong to you", 403);
      return json("This token just changed. Please refresh and try again.", 409);
    }

    return NextResponse.json({
      id: bookingId,
      status: "CANCELLED",
      refundRupees: (r.refundAmount ?? 0) / 100,
    });
  } catch (err) {
    console.error("PATCH /api/clinic/appointments/[bookingId]/cancel", err);
    return json("Could not cancel the token. Please try again.", 500);
  }
}