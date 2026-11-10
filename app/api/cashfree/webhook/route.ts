// Cashfree yahan khud POST karta hai (browser nahi). Clerk login nahi chalta,
// signature se pehchan hoti hai.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@/lib/cashfree";
import { applySuccessfulPayment } from "@/lib/payment-confirm";
import { handleRefundWebhook } from "@/lib/refund";

const ok = () => NextResponse.json({ ok: true });

export async function POST(req: Request) {
  const body = await req.text(); // raw body chahiye, req.json() mat use karna
  const valid = verifyWebhook(
    body,
    req.headers.get("x-webhook-signature") ?? "",
    req.headers.get("x-webhook-timestamp") ?? ""
  );
  if (!valid) return NextResponse.json({ message: "Invalid signature" }, { status: 400 });

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Bad payload" }, { status: 400 });
  }

  const d = event.data ?? {};

  // Cashfree event-id header nahi deta, isliye khud banate hain (duplicate se bachne ke liye)
  const key = d.payment?.cf_payment_id ?? d.refund?.cf_refund_id;
  const status = d.payment?.payment_status ?? d.refund?.refund_status ?? "";
  const eventId = key ? `cf:${event.type}:${key}:${status}` : null;

  if (eventId) {
    try {
      await prisma.webhookEvent.create({ data: { id: eventId, event: String(event.type) } });
    } catch (e: any) {
      if (e?.code === "P2002") return ok(); // pehle process ho chuka
      console.error("cashfree webhook: could not record event", e);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }

  try {
    switch (event.type) {
      case "PAYMENT_SUCCESS_WEBHOOK":
        await applySuccessfulPayment(d.order.order_id, {
          cfPaymentId: String(d.payment.cf_payment_id),
          amountRupees: d.payment.payment_amount,
          method: d.payment.payment_group,
        });
        break;
      case "PAYMENT_FAILED_WEBHOOK":
        await prisma.payment.updateMany({
          where: { cashfreeOrderId: d.order.order_id, status: "CREATED" },
          data: { status: "FAILED", failureReason: d.payment?.payment_message ?? "Payment failed" },
        });
        break;
      case "REFUND_STATUS_WEBHOOK":
        if (d.refund) await handleRefundWebhook(d.refund);
        break;
      default:
        break;
    }
    return ok();
  } catch (err) {
    console.error("POST /api/cashfree/webhook", event?.type, err);
    if (eventId) await prisma.webhookEvent.delete({ where: { id: eventId } }).catch(() => {});
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}