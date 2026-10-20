// app/api/clinic/appointments/route.ts
// GET /api/clinic/appointments?date=2026-10-20  (no date = today in the clinic's time zone)
// Doctors who sit that day, each with their session(s): booking window, queue state and tokens.

import { NextResponse } from "next/server";
import { isValidDate, todayIn } from "@/lib/booking";
import { loadAppointments, requireClinic, toResponse } from "@/lib/booking-server";

export async function GET(request: Request) {
  const ctx = await requireClinic();
  if ("error" in ctx) return ctx.error;

  const date = new URL(request.url).searchParams.get("date") || todayIn(ctx.timezone);
  if (!isValidDate(date)) {
    return NextResponse.json({ message: "Invalid date" }, { status: 400 });
  }

  try {
    return NextResponse.json(await loadAppointments(ctx.clinicId, date, ctx.timezone));
  } catch (err) {
    return toResponse(err, "Could not load appointments. Please try again.", "GET /api/clinic/appointments");
  }
}