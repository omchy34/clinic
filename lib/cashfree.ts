// Server-only. Cashfree PG REST API (seedha fetch, koi SDK nahi).
import crypto from "crypto";

export const cashfreeMode: "sandbox" | "production" =
  process.env.CASHFREE_ENV === "production" ? "production" : "sandbox";

const BASE =
  cashfreeMode === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";

export class CashfreeError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function cf<T>(path: string, method: "GET" | "POST" = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "x-client-id": process.env.CASHFREE_APP_ID ?? "",
      "x-client-secret": process.env.CASHFREE_SECRET_KEY ?? "",
      "x-api-version": "2023-08-01",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new CashfreeError(res.status, (data as { message?: string })?.message ?? "Cashfree request failed");
  }
  return data as T;
}

// Cashfree rupees me kaam karta hai, hamara DB paise me
export const toRupees = (paise: number) => Number((paise / 100).toFixed(2));
export const toPaise = (rupees: number | string) => Math.round(Number(rupees) * 100);

export type CfPayment = {
  cf_payment_id: number | string;
  payment_status: string; // SUCCESS | FAILED | PENDING | NOT_ATTEMPTED | USER_DROPPED ...
  payment_amount: number;
  payment_group?: string;
};

export function createOrder(a: {
  orderId: string;
  amountPaise: number;
  customerId: string;
  customerPhone: string;
  customerName: string;
  note?: string;
}) {
  return cf<{ order_id: string; payment_session_id: string }>("/orders", "POST", {
    order_id: a.orderId,
    order_amount: toRupees(a.amountPaise),
    order_currency: "INR",
    order_note: a.note,
    customer_details: {
      customer_id: a.customerId,
      customer_phone: a.customerPhone,
      customer_name: a.customerName,
    },
    // booking hold 10 min ka hai, par order 30 min khula rakhte hain.
    // Der se paisa aaye to refundLatePayment sambhal leta hai.
    order_expiry_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  });
}

export const fetchPayments = (orderId: string) =>
  cf<CfPayment[]>(`/orders/${encodeURIComponent(orderId)}/payments`);

export function createRefund(orderId: string, a: { refundId: string; amountPaise: number; note?: string }) {
  return cf<{ cf_refund_id: string; refund_status: string }>(
    `/orders/${encodeURIComponent(orderId)}/refunds`,
    "POST",
    {
      refund_amount: toRupees(a.amountPaise),
      refund_id: a.refundId,
      refund_note: a.note,
      refund_speed: "STANDARD",
    }
  );
}

// Signature = base64( HMAC_SHA256( timestamp + rawBody, secretKey ) )
export function verifyWebhook(rawBody: string, signature: string, timestamp: string): boolean {
  if (!signature || !timestamp) return false;
  const expected = crypto
    .createHmac("sha256", process.env.CASHFREE_SECRET_KEY ?? "")
    .update(timestamp + rawBody)
    .digest("base64");
  return (
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
}

// Cashfree payment ke saath fee nahi bhejta, isliye estimate: fee % + 18% GST
export function estimateFee(amountPaise: number) {
  const pct = Number(process.env.CASHFREE_FEE_PERCENT ?? 2);
  const fee = Math.round((amountPaise * pct) / 100);
  return { fee, tax: Math.round(fee * 0.18) };
}