// app/api/clinic/sessions/[sessionId]/route.ts
// PATCH { "action": "start" | "callNext" | "end" | "closeBooking" | "reopenBooking" | "extend",
//         "closesAt": "20:00" }   <- closesAt only for "extend", clinic local time

import { NextResponse } from "next/server";
import {
  SESSION_ACTIONS,
  requireClinic,
  runSessionAction,
  toResponse,
  type SessionAction,
} from "@/lib/booking-server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const ctx = await requireClinic();
  if ("error" in ctx) return ctx.error;

  const { sessionId } = await params;
  const body = await request.json().catch(() => null);
  const action = body?.action;
  if (!(SESSION_ACTIONS as readonly string[]).includes(action)) {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  try {
    await runSessionAction(
      sessionId,
      ctx.clinicId,
      ctx.timezone,
      action as SessionAction,
      typeof body?.closesAt === "string" ? body.closesAt : undefined
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return toResponse(
      err,
      "Could not update the session. Please try again.",
      "PATCH /api/clinic/sessions/[sessionId]"
    );
  }
}