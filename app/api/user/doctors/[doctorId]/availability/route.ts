// src/app/api/user/doctors/[doctorId]/availability/route.ts
// GET: the doctor's sessions for the next days, each with its booking status
// (Booking Open / Closed / Extended Until ... / Over), queue size and the patient's own tokens.

import { NextResponse } from "next/server";
import { toResponse } from "@/lib/booking-server";
import { loadAvailability, requireUser } from "@/lib/patient-booking-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx.error;

  const { doctorId } = await params;

  try {
    return NextResponse.json(await loadAvailability(doctorId, ctx.userId));
  } catch (err) {
    return toResponse(
      err,
      "Could not load the sessions. Please try again.",
      "GET /api/user/doctors/[doctorId]/availability"
    );
  }
}