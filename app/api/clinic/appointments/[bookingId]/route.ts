// app/api/clinic/appointments/[bookingId]/route.ts
// PATCH { "action": "complete" | "skip" | "cancel" }
// complete and skip work on the token being served. cancel also works on a waiting token.
// The next waiting token becomes SERVING automatically.

import { NextResponse } from "next/server";
import {
  TOKEN_ACTIONS,
  requireClinic,
  runTokenAction,
  toResponse,
  type TokenAction,
} from "@/lib/booking-server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const ctx = await requireClinic();
  if ("error" in ctx) return ctx.error;

  const { bookingId } = await params;
  const body = await request.json().catch(() => null);
  const action = body?.action;
  if (!(TOKEN_ACTIONS as readonly string[]).includes(action)) {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  try {
    await runTokenAction(bookingId, ctx.clinicId, action as TokenAction);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return toResponse(
      err,
      "Could not update the token. Please try again.",
      "PATCH /api/clinic/appointments/[bookingId]"
    );
  }
}