import { prisma } from "@/lib/prisma";
import { estimateFee, toPaise } from "@/lib/cashfree";
import { refundLatePayment } from "@/lib/refund";

export type ApplyResult = "CONFIRMED" | "ALREADY_DONE" | "REFUNDING" | "MISMATCH" | "NOT_FOUND";

export async function applySuccessfulPayment(
  orderId: string,
  p: { cfPaymentId: string; amountRupees: number; method?: string | null }
): Promise<ApplyResult> {
  const payment = await prisma.payment.findUnique({
    where: { cashfreeOrderId: orderId },
    include: { booking: { select: { id: true, sessionId: true } } },
  });
  if (!payment) return "NOT_FOUND";

  if (toPaise(p.amountRupees) !== payment.amount) {
    console.error("cashfree: amount mismatch", { orderId, got: p.amountRupees, expected: payment.amount });
    return "MISMATCH";
  }

  // Verify route ya webhook pehle hi confirm kar chuka hai
  if (payment.status !== "CREATED" && payment.status !== "FAILED") return "ALREADY_DONE";

  const { fee, tax } = estimateFee(payment.amount);

  const confirmed = await prisma.$transaction(async (tx) => {
    const upd = await tx.booking.updateMany({
      where: { id: payment.booking.id, status: "PENDING_PAYMENT" },
      data: { status: "CONFIRMED", expiresAt: null },
    });
    if (upd.count !== 1) return false;

    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "PAID",
        cashfreePaymentId: p.cfPaymentId,
        gatewayFee: fee,
        gatewayTax: tax,
        method: p.method ?? null,
        failureReason: null,
        paidAt: new Date(),
      },
    });
    await tx.doctorSession.update({
      where: { id: payment.booking.sessionId },
      data: { queueVersion: { increment: 1 } },
    });
    return true;
  });
  if (confirmed) return "CONFIRMED";

  // Token expire/cancel ho chuka tha: poora refund
  await refundLatePayment({ orderId, paymentId: p.cfPaymentId, fee, tax, method: p.method ?? undefined });
  return "REFUNDING";
}