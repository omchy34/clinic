// Razorpay yahan khud POST karta hai (browser nahi). Isliye Clerk login nahi chalta,
// signature se pehchan hoti hai.

import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleRefundWebhook, refundLatePayment } from "@/lib/refund";


const ok = () => NextResponse.json({ ok: true });

function validSignature(body: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return (
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
}

// payment.captured: token confirm karo. Token pehle hi expire/cancel ho chuka ho to poora refund.
async function onCaptured(p: any) {
  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: p.order_id },
    include: { booking: { select: { id: true, sessionId: true } } },
  });
  if (!payment) return; // humara order nahi hai

  if (p.amount !== payment.amount) {
    console.error("webhook: amount mismatch", { order: p.order_id, got: p.amount, expected: payment.amount });
    return;
  }

  // Verify route pehle hi confirm kar chuka hai (ya refund ho chuka hai): kuch nahi karna
  if (payment.status !== "CREATED" && payment.status !== "FAILED") return;

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
        razorpayPaymentId: p.id,
        gatewayFee: p.fee ?? 0,
        gatewayTax: p.tax ?? 0,
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

  // Token confirm nahi ho paya (expire/cancel). Agar verify route ne usi waqt confirm kiya ho
  // to payment PAID hota hai aur refundLatePayment kuch nahi karta, isliye double refund nahi hoga.
  if (!confirmed) {
    await refundLatePayment({
      orderId: p.order_id,
      paymentId: p.id,
      fee: p.fee ?? 0,
      tax: p.tax ?? 0,
      method: p.method ?? undefined,
    });
  }
}

// payment.failed: user wahi order pe dobara try kar sakta hai, isliye booking ko nahi chhedte
async function onFailed(p: any) {
  await prisma.payment.updateMany({
    where: { razorpayOrderId: p.order_id, status: "CREATED" },
    data: { status: "FAILED", failureReason: p.error_description ?? "Payment failed" },
  });
}

export async function POST(req: Request) {
  const body = await req.text(); // raw body chahiye, req.json() mat use karna
  if (!validSignature(body, req.headers.get("x-razorpay-signature") ?? "")) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Bad payload" }, { status: 400 });
  }

  // Razorpay ek event do baar bhej sakta hai: duplicate ko skip karo
  const eventId = req.headers.get("x-razorpay-event-id");
  if (eventId) {
    try {
      await prisma.webhookEvent.create({ data: { id: eventId, event: String(event.event) } });
    } catch (e: any) {
      if (e?.code === "P2002") return ok(); // pehle process ho chuka
      console.error("webhook: could not record event", e);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }

  try {
    switch (event.event) {
      case "payment.captured":
        await onCaptured(event.payload.payment.entity);
        break;
      case "payment.failed":
        await onFailed(event.payload.payment.entity);
        break;
      case "refund.processed":
      case "refund.failed":
        await handleRefundWebhook(event.event, event.payload.refund.entity);
        break;
      default:
        break; // baaki events ignore
    }
    return ok();
  } catch (err) {
    console.error("POST /api/razorpay/webhook", event?.event, err);
    // Record hata do taaki Razorpay ka retry dobara process kar sake
    if (eventId) await prisma.webhookEvent.delete({ where: { id: eventId } }).catch(() => {});
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}