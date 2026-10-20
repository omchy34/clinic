// src/app/api/user/bookings/route.ts
// POST { "sessionId": "...", "patientName": "optional" } -> books the next token of that session.
//   The server checks the booking window, so a direct request is rejected when booking is closed.
// GET -> the patient's tokens for today and later, with queue status and estimated wait.
//   The token page calls this every few seconds.

import { NextResponse } from "next/server";
import { toResponse } from "@/lib/booking-server";
import { bookToken, loadMyTokens, requireUser } from "@/lib/patient-booking-server";

export async function POST(request: Request) {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx.error;

  const body = await request.json().catch(() => null);
  const sessionId = body?.sessionId;
  const patientName = body?.patientName;

  if (typeof sessionId !== "string" || !sessionId) {
    return NextResponse.json({ message: "Choose a session to book." }, { status: 400 });
  }
  if (patientName !== undefined && patientName !== null && typeof patientName !== "string") {
    return NextResponse.json({ message: "Invalid patient name." }, { status: 400 });
  }
  if (typeof patientName === "string" && patientName.length > 100) {
    return NextResponse.json({ message: "Patient name is too long." }, { status: 400 });
  }

  try {
    const token = await bookToken(ctx.userId, sessionId, patientName ?? undefined);
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