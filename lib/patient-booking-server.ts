// src/lib/patient-booking-server.ts
// Server-only: what patients can see and do. Booking is enforced here, not in the UI.

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ApiError, ensureSessions } from "@/lib/booking-server";
import {
  addDays,
  bookingLabel,
  bookingStatus,
  timeIn,
  todayIn,
  zonedToUtc,
  type BookingStatus,
} from "@/lib/booking";
import {
  DAYS_AHEAD,
  DEFAULT_TOKEN_MINUTES,
  MAX_ACTIVE_TOKENS,
  type Availability,
  type BookedToken,
  type MyToken,
  type PatientSession,
} from "@/lib/patient-booking";

/* ---------------------------------- auth ---------------------------------- */

export async function requireUser(): Promise<{ userId: string } | { error: NextResponse }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }
  return { userId };
}

/* ------------------------------- availability ------------------------------ */

// Sessions of one doctor for today and the next days, with the booking status of each
export async function loadAvailability(doctorId: string, userId: string): Promise<Availability> {
  const doctor = await prisma.doctor.findFirst({
    where: { id: doctorId, isActive: true, clinic: { isApproved: true } },
    select: { clinic: { select: { id: true, timezone: true } } },
  });
  if (!doctor) throw new ApiError(404, "Doctor not found.");
  const { id: clinicId, timezone } = doctor.clinic;

  const today = todayIn(timezone);
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(today, i));
  await Promise.all(dates.map((d) => ensureSessions(clinicId, d, timezone, doctorId)));

  const rows = await prisma.doctorSession.findMany({
    where: { doctorId, date: { in: dates.map((d) => new Date(d)) } },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      queueStatus: true,
      bookingOpensAt: true,
      bookingClosesAt: true,
      bookingExtended: true,
      bookingManuallyClosed: true,
      servingBooking: { select: { tokenNumber: true } },
      _count: { select: { bookings: { where: { status: "CONFIRMED" } } } },
      bookings: {
        where: { userId, status: { in: ["CONFIRMED", "SERVING"] } },
        orderBy: { tokenNumber: "asc" },
        select: { id: true, tokenNumber: true },
      },
    },
  });

  const now = new Date();
  const byDate = new Map<string, PatientSession[]>();

  for (const row of rows) {
    const status = bookingStatus(row, now);
    const session: PatientSession = {
      id: row.id,
      startTime: row.startTime,
      endTime: row.endTime,
      status,
      label: bookingLabel(status, row.bookingClosesAt, timezone),
      canBook: status === "OPEN" || status === "EXTENDED",
      notOpenYet: status === "CLOSED" && now < row.bookingOpensAt && row.queueStatus !== "ENDED",
      closesAtTime: timeIn(row.bookingClosesAt, timezone),
      queueStatus: row.queueStatus,
      waiting: row._count.bookings,
      nowServing: row.servingBooking?.tokenNumber ?? null,
      mine: row.bookings,
    };
    const key = row.date.toISOString().slice(0, 10);
    byDate.set(key, [...(byDate.get(key) ?? []), session]);
  }

  return {
    today,
    timezone,
    days: dates.filter((d) => byDate.has(d)).map((d) => ({ date: d, sessions: byDate.get(d)! })),
  };
}

/* ---------------------------------- booking --------------------------------- */

function closedMessage(status: BookingStatus, opensAt: Date, now: Date): string {
  if (status === "OVER") return "Booking is over for this session.";
  if (now < opensAt) return "Booking has not opened yet for this session.";
  return "Booking is closed for this session.";
}

// Gives the patient the next token number of a session. Rejects when the window is closed.
export async function bookToken(
  userId: string,
  sessionId: string,
  patientName?: string
): Promise<BookedToken> {
  const session = await prisma.doctorSession.findUnique({
    where: { id: sessionId },
    select: {
      queueStatus: true,
      bookingOpensAt: true,
      bookingClosesAt: true,
      bookingExtended: true,
      bookingManuallyClosed: true,
      doctor: { select: { isActive: true, clinicId: true, clinic: { select: { isApproved: true } } } },
    },
  });
  if (!session || !session.doctor.isActive || !session.doctor.clinic.isApproved) {
    throw new ApiError(404, "This session is not available.");
  }

  const now = new Date();
  const status = bookingStatus(session, now); // same rule the patient screen uses
  if (status !== "OPEN" && status !== "EXTENDED") {
    throw new ApiError(409, closedMessage(status, session.bookingOpensAt, now));
  }

  return prisma.$transaction(async (tx) => {
    // The window is checked again inside the update, so a clinic that closes booking
    // a moment earlier always wins. Updating the row also locks it, which makes
    // token numbers and queue positions come out one at a time.
    const claim = await tx.doctorSession.updateMany({
      where: {
        id: sessionId,
        bookingManuallyClosed: false,
        queueStatus: { not: "ENDED" },
        bookingOpensAt: { lte: now },
        bookingClosesAt: { gt: now },
      },
      data: { lastTokenNumber: { increment: 1 }, queueVersion: { increment: 1 } },
    });
    if (claim.count === 0) throw new ApiError(409, "Booking has just closed for this session.");

    const active = await tx.booking.count({
      where: { sessionId, userId, status: { in: ["CONFIRMED", "SERVING"] } },
    });
    if (active >= MAX_ACTIVE_TOKENS) {
      throw new ApiError(409, `You already have ${MAX_ACTIVE_TOKENS} active tokens for this session.`);
    }

    const { lastTokenNumber } = await tx.doctorSession.findUniqueOrThrow({
      where: { id: sessionId },
      select: { lastTokenNumber: true },
    });
    // New tokens go behind everyone, including tokens that were skipped to the end
    const last = await tx.booking.aggregate({ where: { sessionId }, _max: { queuePosition: true } });
    const ahead = await tx.booking.count({ where: { sessionId, status: "CONFIRMED" } });

    const booking = await tx.booking.create({
      data: {
        tokenNumber: lastTokenNumber,
        queuePosition: (last._max.queuePosition ?? 0) + 1,
        patientName: patientName?.trim() || null,
        userId,
        clinicId: session.doctor.clinicId,
        sessionId,
      },
      select: { id: true },
    });

    return { id: booking.id, tokenNumber: lastTokenNumber, ahead };
  });
}

/* ------------------------------- my tokens -------------------------------- */

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// Average Start -> Complete time of the doctor's last 20 completed tokens. Nobody enters it.
async function averageMinutes(doctorId: string): Promise<number> {
  const done = await prisma.booking.findMany({
    where: {
      status: "COMPLETED",
      calledAt: { not: null },
      completedAt: { not: null },
      session: { doctorId },
    },
    orderBy: { completedAt: "desc" },
    take: 20,
    select: { calledAt: true, completedAt: true },
  });
  // A token left open by mistake must not ruin the average, so each one is kept between 1 and 45 min
  const minutes = done.map((b) =>
    clamp((b.completedAt!.getTime() - b.calledAt!.getTime()) / 60000, 1, 45)
  );
  return minutes.length ? minutes.reduce((a, b) => a + b, 0) / minutes.length : DEFAULT_TOKEN_MINUTES;
}

// The patient's tokens for today and later, with live queue info and the estimated wait
export async function loadMyTokens(userId: string): Promise<MyToken[]> {
  const rows = await prisma.booking.findMany({
    where: { userId, session: { date: { gte: new Date(addDays(todayIn("UTC"), -1)) } } },
    orderBy: [{ session: { date: "asc" } }, { tokenNumber: "asc" }],
    select: {
      id: true,
      tokenNumber: true,
      queuePosition: true,
      status: true,
      patientName: true,
      skipCount: true,
      clinic: { select: { name: true, address: true, city: true, timezone: true } },
      session: {
        select: {
          id: true,
          date: true,
          startTime: true,
          endTime: true,
          queueStatus: true,
          doctorId: true,
          servingBooking: { select: { tokenNumber: true, calledAt: true } },
          doctor: { select: { name: true, image: true, specialtySlug: true } },
        },
      },
    },
  });

  const current = rows.filter(
    (b) => b.session.date.toISOString().slice(0, 10) >= todayIn(b.clinic.timezone)
  );

  const averages = new Map(
    await Promise.all(
      [...new Set(current.map((b) => b.session.doctorId))].map(
        async (id) => [id, await averageMinutes(id)] as const
      )
    )
  );

  const now = new Date();

  return Promise.all(
    current.map(async (b): Promise<MyToken> => {
      const s = b.session;
      const date = s.date.toISOString().slice(0, 10);
      const timezone = b.clinic.timezone;
      const waiting = b.status === "CONFIRMED";

      const ahead = waiting
        ? await prisma.booking.count({
            where: { sessionId: s.id, status: "CONFIRMED", queuePosition: { lt: b.queuePosition } },
          })
        : 0;

      let estimate: MyToken["estimate"] = null;
      if (waiting && s.queueStatus !== "ENDED") {
        const avg = averages.get(s.doctorId) ?? DEFAULT_TOKEN_MINUTES;

        // Time left for the patient being seen right now
        let remaining = 0;
        if (s.servingBooking) {
          const elapsed = s.servingBooking.calledAt
            ? (now.getTime() - s.servingBooking.calledAt.getTime()) / 60000
            : 0;
          remaining = Math.max(avg - elapsed, 1);
        }

        // Before the doctor starts, the wait counts from the session start time
        const base =
          s.queueStatus === "ACTIVE"
            ? now
            : new Date(Math.max(now.getTime(), zonedToUtc(date, s.startTime, timezone).getTime()));
        const at = new Date(base.getTime() + (remaining + ahead * avg) * 60000);
        estimate = {
          minutes: Math.max(0, Math.round((at.getTime() - now.getTime()) / 60000)),
          at: at.toISOString(),
        };
      }

      return {
        id: b.id,
        tokenNumber: b.tokenNumber,
        status: b.status,
        skipCount: b.skipCount,
        patientName: b.patientName ?? "",
        date,
        startTime: s.startTime,
        endTime: s.endTime,
        timezone,
        doctor: s.doctor,
        clinic: { name: b.clinic.name, address: b.clinic.address, city: b.clinic.city },
        queueStatus: s.queueStatus,
        nowServing: s.servingBooking?.tokenNumber ?? null,
        ahead,
        estimate,
      };
    })
  );
}