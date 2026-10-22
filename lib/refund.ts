// src/lib/refund.ts
// Server-only: refund ka sara hisaab aur Razorpay ko refund bhejna.
// Amounts sab paise me.

import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export type RefundReasonT =
  | "USER_CANCELLED"
  | "CLINIC_CANCELLED"
  | "SESSION_CANCELLED"
  | "BOOKING_UNAVAILABLE";
export type ActorT = "USER" | "CLINIC" | "SYSTEM";

type PaymentRow = {
  id: string;
  amount: number;
  gatewayFee: number;
  gatewayTax: number;
  refundedAmount: number;
  razorpayPaymentId: string | null;
  method: string | null;
};

type Result =
  | { ok: true; refundId?: string; refundAmount?: number }
  | { ok: false; error: string };

/* ---------------------------------------------------------------- */
/* 1. Refund kitna hoga                                             */
/* ---------------------------------------------------------------- */

// User cancel kare: (amount - Razorpay fee - GST) ka userCancelRefundPercent %.
// Clinic / session / system ki wajah se: poora amount.
export function calcRefund(
  p: Pick<PaymentRow, "amount" | "gatewayFee" | "gatewayTax" | "refundedAmount">,
  reason: RefundReasonT,
  userCancelRefundPercent: number
) {
  const remaining = p.amount - p.refundedAmount;
  let refund = p.amount;

  if (reason === "USER_CANCELLED") {
    const pct = Math.min(100, Math.max(0, userCancelRefundPercent));
    const net = p.amount - p.gatewayFee - p.gatewayTax;
    refund = Math.floor((net * pct) / 100);
  }

  refund = Math.max(0, Math.min(refund, remaining));
  return { refund, deductedFee: p.amount - refund };
}

/* ---------------------------------------------------------------- */
/* 2. Helpers                                                       */
/* ---------------------------------------------------------------- */

// Fee DB me nahi hai to Razorpay se lao, warna user cancel par poora amount refund ho jayega
export async function ensureFee(p: PaymentRow): Promise<PaymentRow> {
  if (p.gatewayFee > 0 || p.gatewayTax > 0 || !p.razorpayPaymentId) return p;
  try {
    const rp: any = await razorpay.payments.fetch(p.razorpayPaymentId);
    return await prisma.payment.update({
      where: { id: p.id },
      data: {
        gatewayFee: rp.fee ?? 0,
        gatewayTax: rp.tax ?? 0,
        method: rp.method ?? p.method,
      },
    });
  } catch (e) {
    console.error("ensureFee: could not fetch payment from Razorpay", e);
    return p;
  }
}

async function syncPaymentStatus(tx: any, paymentId: string) {
  const p = await tx.payment.findUnique({ where: { id: paymentId } });
  if (!p) return;
  const status =
    p.refundedAmount <= 0 ? "PAID" : p.refundedAmount >= p.amount ? "REFUNDED" : "PARTIALLY_REFUNDED";
  if (status !== p.status) await tx.payment.update({ where: { id: paymentId }, data: { status } });
}

/* ---------------------------------------------------------------- */
/* 3. Razorpay ko refund bhejna                                     */
/* ---------------------------------------------------------------- */

async function sendToRazorpay(refundId: string): Promise<Result> {
  const r = await prisma.refund.findUnique({ where: { id: refundId }, include: { payment: true } });
  if (!r || r.status !== "INITIATED") return { ok: false, error: "REFUND_NOT_PENDING_SEND" };
  if (!r.payment.razorpayPaymentId) return { ok: false, error: "NO_PAYMENT_ID" };

  try {
    const res: any = await razorpay.payments.refund(r.payment.razorpayPaymentId, {
      amount: r.amount,
      speed: "normal",
      receipt: r.id, // webhook me isi se refund match hoga
      notes: { refundId: r.id, bookingId: r.payment.bookingId },
    });

    // webhook pehle aa gaya ho to status PROCESSED ho chuka hoga, usse overwrite nahi karenge
    await prisma.refund.updateMany({
      where: { id: r.id, status: "INITIATED" },
      data: { status: "PENDING", razorpayRefundId: res.id },
    });
    return { ok: true, refundId: r.id, refundAmount: r.amount };
  } catch (e: any) {
    const msg = e?.error?.description ?? e?.message ?? "Razorpay refund failed";
    console.error("sendToRazorpay failed", e);
    await failRefund(r.id, msg);
    return { ok: false, error: msg };
  }
}

// Refund fail: reserve kiya hua amount wapas free karo, status FAILED (retryRefund se dobara ho sakta hai)
async function failRefund(refundId: string, reason: string) {
  await prisma.$transaction(async (tx) => {
    const upd = await tx.refund.updateMany({
      where: { id: refundId, status: { in: ["INITIATED", "PENDING"] } },
      data: { status: "FAILED", failureReason: reason },
    });
    if (upd.count !== 1) return;
    const r = await tx.refund.findUniqueOrThrow({ where: { id: refundId } });
    await tx.payment.update({
      where: { id: r.paymentId },
      data: { refundedAmount: { decrement: r.amount } },
    });
    await syncPaymentStatus(tx, r.paymentId);
  });
}

/* ---------------------------------------------------------------- */
/* 4. Booking cancel (user / clinic)                                */
/* ---------------------------------------------------------------- */

const CANCELLABLE = ["PENDING_PAYMENT", "CONFIRMED"] as const;

export async function cancelBooking(opts: {
  bookingId: string;
  actor: ActorT;
  userId?: string; // actor USER ho to zaroori (ownership check)
  reason?: RefundReasonT;
  note?: string;
}): Promise<Result> {
  const { bookingId, actor, userId, note } = opts;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true, clinic: { select: { userCancelRefundPercent: true } } },
  });
  if (!booking) return { ok: false, error: "NOT_FOUND" };
  if (actor === "USER" && booking.userId !== userId) return { ok: false, error: "FORBIDDEN" };
  if (!(CANCELLABLE as readonly string[]).includes(booking.status)) {
    return { ok: false, error: "NOT_CANCELLABLE" };
  }

  const reason: RefundReasonT =
    opts.reason ??
    (actor === "USER" ? "USER_CANCELLED" : actor === "CLINIC" ? "CLINIC_CANCELLED" : "SESSION_CANCELLED");

  const cancelData = {
    status: "CANCELLED" as const,
    cancelledAt: new Date(),
    cancelledBy: actor,
    cancelReason: note ?? null,
  };

  // Paid nahi hai (free token ya unpaid): bas cancel karo
  if (!booking.payment || booking.payment.status !== "PAID") {
    const upd = await prisma.booking.updateMany({
      where: { id: bookingId, status: { in: [...CANCELLABLE] } },
      data: cancelData,
    });
    if (upd.count === 0) return { ok: false, error: "ALREADY_CANCELLED" };
    await prisma.doctorSession.update({
      where: { id: booking.sessionId },
      data: { queueVersion: { increment: 1 } },
    });
    return { ok: true };
  }

  // Paid hai: fee pata karo, refund nikalo
  const payment = await ensureFee(booking.payment);
  const { refund, deductedFee } = calcRefund(payment, reason, booking.clinic.userCancelRefundPercent);

  // Booking cancel + refund row + amount reserve: ek hi transaction (double refund nahi hoga)
  const refundId = await prisma.$transaction(async (tx) => {
    const upd = await tx.booking.updateMany({
      where: { id: bookingId, status: { in: [...CANCELLABLE] } },
      data: cancelData,
    });
    if (upd.count === 0) return null; // kisi aur request ne pehle cancel kar diya

    await tx.doctorSession.update({
      where: { id: booking.sessionId },
      data: { queueVersion: { increment: 1 } },
    });

    if (refund <= 0) return "";

    const r = await tx.refund.create({
      data: { paymentId: payment.id, amount: refund, deductedFee, reason },
    });
    await tx.payment.update({
      where: { id: payment.id },
      data: { refundedAmount: { increment: refund } },
    });
    await syncPaymentStatus(tx, payment.id);
    return r.id;
  });

  if (refundId === null) return { ok: false, error: "ALREADY_CANCELLED" };
  if (refundId === "") return { ok: true, refundAmount: 0 };

  const sent = await sendToRazorpay(refundId);
  // Token cancel ho chuka hai. Razorpay call fail hua to Refund row FAILED rahegi, retryRefund se dobara chalegi.
  return sent.ok ? sent : { ok: true, refundId, refundAmount: refund };
}

/* ---------------------------------------------------------------- */
/* 5. Poora session cancel (clinic): sab ko full refund             */
/* ---------------------------------------------------------------- */

export async function cancelSession(sessionId: string, note = "Session cancelled by clinic") {
  await prisma.doctorSession.update({
    where: { id: sessionId },
    data: { cancelledAt: new Date(), bookingManuallyClosed: true, queueVersion: { increment: 1 } },
  });

  const bookings = await prisma.booking.findMany({
    where: { sessionId, status: { in: [...CANCELLABLE] } },
    select: { id: true },
  });

  let cancelled = 0;
  for (const b of bookings) {
    const r = await cancelBooking({
      bookingId: b.id,
      actor: "CLINIC",
      reason: "SESSION_CANCELLED",
      note,
    });
    if (r.ok) cancelled++;
  }
  return { total: bookings.length, cancelled };
}

/* ---------------------------------------------------------------- */
/* 6. Late payment: paisa kata par booking expire/cancel ho chuki   */
/*    Webhook (payment.captured) se call hoga. Poora refund.        */
/* ---------------------------------------------------------------- */

export async function refundLatePayment(args: {
  orderId: string;
  paymentId: string;
  fee?: number;
  tax?: number;
  method?: string;
}): Promise<Result> {
  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: args.orderId } });
  if (!payment) return { ok: false, error: "PAYMENT_NOT_FOUND" };

  const refundId = await prisma.$transaction(async (tx) => {
    const upd = await tx.payment.updateMany({
      where: { id: payment.id, status: { in: ["CREATED", "FAILED"] } },
      data: {
        status: "PAID",
        razorpayPaymentId: args.paymentId,
        gatewayFee: args.fee ?? 0,
        gatewayTax: args.tax ?? 0,
        method: args.method,
        paidAt: new Date(),
      },
    });
    if (upd.count !== 1) return null; // webhook duplicate

    const r = await tx.refund.create({
      data: { paymentId: payment.id, amount: payment.amount, reason: "BOOKING_UNAVAILABLE" },
    });
    await tx.payment.update({
      where: { id: payment.id },
      data: { refundedAmount: { increment: payment.amount } },
    });
    await syncPaymentStatus(tx, payment.id);
    return r.id;
  });

  if (!refundId) return { ok: true };
  return sendToRazorpay(refundId);
}

/* ---------------------------------------------------------------- */
/* 7. Failed refund dobara try (admin button / cron)                */
/* ---------------------------------------------------------------- */

export async function retryRefund(refundId: string): Promise<Result> {
  const ok = await prisma.$transaction(async (tx) => {
    const r = await tx.refund.findUnique({ where: { id: refundId }, include: { payment: true } });
    if (!r || r.status !== "FAILED") return false;
    if (r.payment.amount - r.payment.refundedAmount < r.amount) return false; // beech me kuch aur refund ho gaya

    const upd = await tx.refund.updateMany({
      where: { id: refundId, status: "FAILED" },
      data: { status: "INITIATED", failureReason: null, razorpayRefundId: null },
    });
    if (upd.count !== 1) return false;

    await tx.payment.update({
      where: { id: r.paymentId },
      data: { refundedAmount: { increment: r.amount } },
    });
    await syncPaymentStatus(tx, r.paymentId);
    return true;
  });

  if (!ok) return { ok: false, error: "CANNOT_RETRY" };
  return sendToRazorpay(refundId);
}

/* ---------------------------------------------------------------- */
/* 8. Webhook: refund.processed / refund.failed                     */
/* ---------------------------------------------------------------- */

export async function handleRefundWebhook(
  event: "refund.processed" | "refund.failed",
  entity: { id: string; receipt?: string | null }
) {
  const refund = await prisma.refund.findFirst({
    where: {
      OR: [{ razorpayRefundId: entity.id }, ...(entity.receipt ? [{ id: entity.receipt }] : [])],
    },
  });
  if (!refund) return;

  if (event === "refund.processed") {
    await prisma.refund.updateMany({
      where: { id: refund.id, status: { in: ["INITIATED", "PENDING"] } },
      data: { status: "PROCESSED", processedAt: new Date(), razorpayRefundId: entity.id },
    });
  } else {
    await failRefund(refund.id, "Razorpay reported refund failed");
  }
}