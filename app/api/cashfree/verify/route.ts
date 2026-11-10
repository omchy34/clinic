// POST { orderId }: popup band hone ke baad browser yahi call karta hai.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchPayments } from "@/lib/cashfree";
import { applySuccessfulPayment } from "@/lib/payment-confirm";
import { ApiError, toResponse } from "@/lib/booking-server";
import { requireUser } from "@/lib/patient-booking-server";

const LIVE = ["CONFIRMED", "SERVING"];

export async function POST(request: Request) {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx.error;

  const body = await request.json().catch(() => null);
  const orderId = body?.orderId;
  if (typeof orderId !== "string" || !orderId) {
    return NextResponse.json({ message: "Invalid payment details." }, { status: 400 });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { cashfreeOrderId: orderId },
      include: { booking: { select: { id: true, userId: true, status: true } } },
    });
    if (!payment || payment.booking.userId !== ctx.userId) {
      throw new ApiError(404, "Payment not found.");
    }

    // Webhook pehle hi confirm kar chuka ho
    if (payment.status === "PAID" && LIVE.includes(payment.booking.status)) {
      return NextResponse.json({ ok: true, bookingId: payment.booking.id });
    }

    // Asli status Cashfree se lo (browser ki baat pe bharosa nahi)
    const attempts = await fetchPayments(orderId);
    const success = attempts.find((a) => a.payment_status === "SUCCESS");
    if (!success) {
      const failed = attempts.some((a) => a.payment_status === "FAILED");
      return NextResponse.json({ ok: false, status: failed ? "FAILED" : "PENDING" });
    }

    const result = await applySuccessfulPayment(orderId, {
      cfPaymentId: String(success.cf_payment_id),
      amountRupees: success.payment_amount,
      method: success.payment_group,
    });

    if (result === "MISMATCH") throw new ApiError(400, "Payment amount mismatch.");
    if (result === "CONFIRMED" || result === "ALREADY_DONE") {
      const b = await prisma.booking.findUnique({
        where: { id: payment.booking.id },
        select: { status: true },
      });
      if (b && LIVE.includes(b.status)) {
        return NextResponse.json({ ok: true, bookingId: payment.booking.id });
      }
    }
    throw new ApiError(
      409,
      "Your token expired before the payment completed. Any amount charged will be refunded."
    );
  } catch (err) {
    return toResponse(err, "Could not verify the payment. Please try again.", "POST /api/cashfree/verify");
  }
}