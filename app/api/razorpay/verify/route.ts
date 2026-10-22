// src/app/api/razorpay/verify/route.ts
// POST { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Called by the browser right after the Razorpay popup succeeds.

import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { ApiError, toResponse } from "@/lib/booking-server";
import { requireUser } from "@/lib/patient-booking-server";

export async function POST(request: Request) {
    const ctx = await requireUser();
    if ("error" in ctx) return ctx.error;

    const body = await request.json().catch(() => null);
    const orderId = body?.razorpay_order_id;
    const paymentId = body?.razorpay_payment_id;
    const signature = body?.razorpay_signature;

    if (
        typeof orderId !== "string" ||
        typeof paymentId !== "string" ||
        typeof signature !== "string"
    ) {
        return NextResponse.json({ message: "Invalid payment details." }, { status: 400 });
    }

    try {
        const payment = await prisma.payment.findUnique({
            where: { razorpayOrderId: orderId },
            include: { booking: { select: { id: true, userId: true, sessionId: true, status: true } } },
        });
        if (!payment || payment.booking.userId !== ctx.userId) {
            throw new ApiError(404, "Payment not found.");
        }

        // 1. Signature check (Key Secret se)
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");
        const valid =
            expected.length === signature.length &&
            crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
        if (!valid) throw new ApiError(400, "Payment could not be verified.");

        // 2. Webhook pehle hi confirm kar chuka ho to seedha OK
        if (payment.status === "PAID" && payment.booking.status === "CONFIRMED") {
            return NextResponse.json({ ok: true, bookingId: payment.booking.id });
        }

        // 3. Razorpay se payment ki asli details lo (amount match + commission)
        let fee = 0;
        let tax = 0;
        let method: string | undefined;
        try {
            const rp: any = await razorpay.payments.fetch(paymentId);
            if (rp.order_id !== orderId || rp.amount !== payment.amount) {
                throw new ApiError(400, "Payment amount mismatch.");
            }
            fee = rp.fee ?? 0;
            tax = rp.tax ?? 0;
            method = rp.method;
        } catch (e) {
            if (e instanceof ApiError) throw e;
            // fetch fail hua to bhi aage badho, signature valid hai; fee baad me refund ke time dobara fetch hogi
        }

        // 4. PENDING_PAYMENT token ko CONFIRMED karo (double confirm nahi hoga)
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
                    razorpayPaymentId: paymentId,
                    gatewayFee: fee,
                    gatewayTax: tax,
                    method,
                    paidAt: new Date(),
                },
            });
            await tx.doctorSession.update({
                where: { id: payment.booking.sessionId },
                data: { queueVersion: { increment: 1 } },
            });
            return true;
        });

        if (!confirmed) {
            // Token expire/cancel ho chuka tha. Paisa kata hai to webhook se auto refund hoga (refund step me).
            throw new ApiError(409, "Your token expired before the payment completed. Any amount charged will be refunded.");
        }

        return NextResponse.json({ ok: true, bookingId: payment.booking.id });
    } catch (err) {
        return toResponse(err, "Could not verify the payment. Please try again.", "POST /api/razorpay/verify");
    }
}