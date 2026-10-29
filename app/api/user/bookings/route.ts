// src/app/api/user/bookings/route.ts
// POST { "sessionId": "...", "patientName": "optional" } -> books the next token of that session.
//   The server checks the booking window, so a direct request is rejected when booking is closed.
// GET -> the patient's tokens for today and later, with queue status and estimated wait.
//   The token page calls this every few seconds.

import { NextResponse } from "next/server";
import { toResponse } from "@/lib/booking-server";
import { bookToken, loadMyTokens, requireUser } from "@/lib/patient-booking-server";
import { cleanPhone, isValidIndianPhone } from "@/lib/patient-booking";

export async function POST(request: Request) {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx.error;

  const body = await request.json().catch(() => null);
  const sessionId = body?.sessionId;
  const patientName = typeof body?.patientName === "string" ? body.patientName.trim() : "";
  const patientPhone = typeof body?.patientPhone === "string" ? body.patientPhone : "";

  if (typeof sessionId !== "string" || !sessionId) {
    return NextResponse.json({ message: "Choose a session to book." }, { status: 400 });
  }
  if (!patientName) {
    return NextResponse.json({ message: "Patient name is required." }, { status: 400 });
  }
  if (patientName.length > 100) {
    return NextResponse.json({ message: "Patient name is too long." }, { status: 400 });
  }
  if (!isValidIndianPhone(patientPhone)) {
    return NextResponse.json(
      { message: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 }
    );
  }

  try {
    const token = await bookToken(ctx.userId, sessionId, patientName, cleanPhone(patientPhone));
    return NextResponse.json(token, { status: 201 });
  } catch (err) {
    return toResponse(err, "Could not book the token. Please try again.", "POST /api/user/bookings");
  }
}
export async function GET() {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx.error;

  try {
    return NextResponse.json(
      { tokens: await loadMyTokens(ctx.userId) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return toResponse(err, "Could not load your tokens. Please try again.", "GET /api/user/bookings");
  }
}