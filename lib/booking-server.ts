// src/lib/booking-server.ts
// Server-only: database access and every queue state change.

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { Prisma } from "../src/generated/prisma";
import { prisma } from "@/lib/prisma";
import authClinic from "@/middlewere/authClinic";
import {
  TIME_RE,
  bookingLabel,
  bookingStatus,
  timeIn,
  todayIn,
  weekdayOf,
  zonedToUtc,
  type Appointments,
  type DoctorView,
  type SessionView,
  type TokenStatus,
  type TokenView,
} from "@/lib/booking";

/* --------------------------------- errors ---------------------------------- */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export function toResponse(err: unknown, fallback: string, tag: string) {
  if (err instanceof ApiError) {
    return NextResponse.json({ message: err.message }, { status: err.status });
  }
  console.error(tag, err);
  return NextResponse.json({ message: fallback }, { status: 500 });
}

/* ---------------------------------- auth ----------------------------------- */

// Clerk login -> approved clinic -> clinic id and time zone
export async function requireClinic(): Promise<
  { clinicId: string; timezone: string } | { error: NextResponse }
> {
  const { userId } = await auth();
  if (!userId) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  // authClinic returns the clinic id or an error response. Check it with instanceof.
  const clinicId = await authClinic(userId);
  if (clinicId instanceof NextResponse) return { error: clinicId };

  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    select: { timezone: true },
  });
  return { clinicId, timezone: clinic?.timezone ?? "Asia/Kolkata" };
}

/* -------------------------------- sessions --------------------------------- */

// Creates the day's sessions from the doctors' weekly schedules. Safe to call many times.
// Only for today and future dates. The patient booking API must call this too.
export async function ensureSessions(clinicId: string, date: string, timezone: string, doctorId?: string) {
  const schedules = await prisma.doctorSchedule.findMany({
    where: { day: weekdayOf(date), doctor: { clinicId, isActive: true, ...(doctorId ? { id: doctorId } : {}) } },
    select: {
      doctorId: true,
      startTime: true,
      endTime: true,
      bookingCloseTime: true,
    },
  });
  if (schedules.length === 0) return;

  const opensAt = zonedToUtc(date, "00:00", timezone); // booking opens at midnight
  await prisma.doctorSession.createMany({
    data: schedules.map((s) => ({
      doctorId: s.doctorId,
      date: new Date(date),
      startTime: s.startTime,
      endTime: s.endTime,
      bookingOpensAt: opensAt,
      bookingClosesAt: zonedToUtc(date, s.bookingCloseTime ?? s.endTime, timezone),
    })),
    skipDuplicates: true, // unique on doctor + date + start time
  });
}

const RANK: Record<TokenStatus, number> = { SERVING: 0, CONFIRMED: 1, COMPLETED: 2, CANCELLED: 3 };

function compareTokens(a: TokenView, b: TokenView) {
  if (RANK[a.status] !== RANK[b.status]) return RANK[a.status] - RANK[b.status];
  if (a.status === "CONFIRMED" && a.queuePosition !== b.queuePosition) {
    return a.queuePosition - b.queuePosition;
  }
  return a.tokenNumber - b.tokenNumber;
}

// Everything the clinic's appointments screen needs for one date
export async function loadAppointments(
  clinicId: string,
  date: string,
  timezone: string
): Promise<Appointments> {
  const today = todayIn(timezone);
  if (date >= today) await ensureSessions(clinicId, date, timezone);

  const rows = await prisma.doctorSession.findMany({
    where: { date: new Date(date), doctor: { clinicId } },
    orderBy: { startTime: "asc" },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      queueStatus: true,
      queueVersion: true,
      servingBookingId: true,
      bookingOpensAt: true,
      bookingClosesAt: true,
      bookingExtended: true,
      bookingManuallyClosed: true,
      doctor: { select: { id: true, name: true, image: true, specialtySlug: true, isActive: true } },
      bookings: {
        where: { status: { in: ["CONFIRMED", "SERVING", "COMPLETED", "CANCELLED"] } },
        select: {
          id: true,
          tokenNumber: true,
          queuePosition: true,
          status: true,
          patientName: true,
          skipCount: true,
          user: { select: { name: true } },
        },
      },
    },
  });

  const now = new Date();
  const doctors = new Map<string, DoctorView>();

  for (const row of rows) {
    const tokens: TokenView[] = row.bookings
      .map((b) => ({
        id: b.id,
        tokenNumber: b.tokenNumber,
        queuePosition: b.queuePosition,
        status: b.status as TokenStatus,
        patientName: b.patientName ?? b.user.name,
        bookedBy: b.user.name,
        skipCount: b.skipCount,
      }))
      .sort(compareTokens);

    // An inactive doctor only shows up if that day already has tokens
    if (!row.doctor.isActive && tokens.length === 0) continue;

    const status = bookingStatus(row, now);
    const session: SessionView = {
      id: row.id,
      startTime: row.startTime,
      endTime: row.endTime,
      queueStatus: row.queueStatus,
      queueVersion: row.queueVersion,
      servingTokenId: row.servingBookingId,
      booking: {
        status,
        label: bookingLabel(status, row.bookingClosesAt, timezone),
        closesAt: row.bookingClosesAt.toISOString(),
        closesAtTime: timeIn(row.bookingClosesAt, timezone),
        extended: row.bookingExtended,
        manuallyClosed: row.bookingManuallyClosed,
      },
      counts: {
        waiting: tokens.filter((t) => t.status === "CONFIRMED").length,
        completed: tokens.filter((t) => t.status === "COMPLETED").length,
        cancelled: tokens.filter((t) => t.status === "CANCELLED").length,
        total: tokens.length,
      },
      tokens,
    };

    const { isActive, ...doctor } = row.doctor;
    void isActive;
    const entry = doctors.get(doctor.id) ?? { ...doctor, sessions: [] };
    entry.sessions.push(session);
    doctors.set(doctor.id, entry);
  }

  return {
    date,
    today,
    timezone,
    doctors: [...doctors.values()].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/* ----------------------------- queue state changes ------------------------------ */

// Makes the next waiting token SERVING (or nobody if the line is empty). Returns its id.
async function serveNext(
  tx: Prisma.TransactionClient,
  sessionId: string,
  now: Date,
  excludeId?: string
): Promise<string | null> {
  const next = await tx.booking.findFirst({
    where: { sessionId, status: "CONFIRMED", ...(excludeId ? { id: { not: excludeId } } : {}) },
    orderBy: [{ queuePosition: "asc" }, { tokenNumber: "asc" }],
    select: { id: true },
  });

  if (next) {
    await tx.booking.update({
      where: { id: next.id },
      data: { status: "SERVING", calledAt: now },
    });
  }
  await tx.doctorSession.update({
    where: { id: sessionId },
    data: { servingBookingId: next?.id ?? null, queueVersion: { increment: 1 } },
  });
  return next?.id ?? null;
}

export const TOKEN_ACTIONS = ["complete", "skip", "cancel"] as const;
export type TokenAction = (typeof TOKEN_ACTIONS)[number];

// Complete / Skip / Cancel buttons on a token
export async function runTokenAction(bookingId: string, clinicId: string, action: TokenAction) {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, clinicId },
    select: { id: true, status: true, sessionId: true, session: { select: { queueStatus: true } } },
  });
  if (!booking) throw new ApiError(404, "Token not found.");
  if (booking.session.queueStatus === "ENDED") throw new ApiError(409, "This session has ended.");
  if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
    throw new ApiError(409, "This token is already completed or cancelled.");
  }

  const now = new Date();
  const sessionId = booking.sessionId;

  await prisma.$transaction(async (tx) => {
    // A waiting token can be cancelled without touching the line
    if (action === "cancel" && booking.status === "CONFIRMED") {
      const r = await tx.booking.updateMany({
        where: { id: booking.id, status: "CONFIRMED" },
        data: { status: "CANCELLED", cancelledAt: now },
      });
      if (r.count === 0) throw new ApiError(409, "This token was just updated. Refresh and try again.");
      await tx.doctorSession.update({
        where: { id: sessionId },
        data: { queueVersion: { increment: 1 } },
      });
      return;
    }

    // Everything else works on the token that is being served right now
    const claim = await tx.doctorSession.updateMany({
      where: { id: sessionId, queueStatus: "ACTIVE", servingBookingId: booking.id },
      data: { servingBookingId: null },
    });
    if (claim.count === 0) throw new ApiError(409, "This token is not being served right now.");

    if (action === "complete") {
      await tx.booking.update({
        where: { id: booking.id },
        data: { status: "COMPLETED", completedAt: now },
      });
    } else if (action === "cancel") {
      await tx.booking.update({
        where: { id: booking.id },
        data: { status: "CANCELLED", cancelledAt: now },
      });
    } else {
      // skip: back to waiting, at the end of the line. There is no skip limit.
      const last = await tx.booking.aggregate({
        where: { sessionId },
        _max: { queuePosition: true },
      });
      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: "CONFIRMED",
          skipCount: { increment: 1 },
          lastSkippedAt: now,
          calledAt: null,
          queuePosition: (last._max.queuePosition ?? 0) + 1,
        },
      });
    }

    await serveNext(tx, sessionId, now, action === "skip" ? booking.id : undefined);
  });
}

export const SESSION_ACTIONS = [
  "start",
  "callNext",
  "end",
  "closeBooking",
  "reopenBooking",
  "extend",
] as const;
export type SessionAction = (typeof SESSION_ACTIONS)[number];

// Start / Call next / End the session, and the booking window buttons
export async function runSessionAction(
  sessionId: string,
  clinicId: string,
  timezone: string,
  action: SessionAction,
  closesAt?: string
) {
  const session = await prisma.doctorSession.findFirst({
    where: { id: sessionId, doctor: { clinicId } },
    select: { id: true, date: true, queueStatus: true, bookingClosesAt: true },
  });
  if (!session) throw new ApiError(404, "Session not found.");

  const now = new Date();
  const bump = { queueVersion: { increment: 1 } };

  switch (action) {
    case "start":
      await prisma.$transaction(async (tx) => {
        const r = await tx.doctorSession.updateMany({
          where: { id: sessionId, queueStatus: "NOT_STARTED" },
          data: { queueStatus: "ACTIVE", queueStartedAt: now },
        });
        if (r.count === 0) throw new ApiError(409, "The queue is already started or ended.");
        await serveNext(tx, sessionId, now);
      });
      return;

    case "callNext":
      await prisma.$transaction(async (tx) => {
        const r = await tx.doctorSession.updateMany({
          where: { id: sessionId, queueStatus: "ACTIVE", servingBookingId: null },
          data: bump,
        });
        if (r.count === 0) {
          throw new ApiError(409, "Start the queue first, or finish the current token.");
        }
        if (!(await serveNext(tx, sessionId, now))) {
          throw new ApiError(409, "No patient is waiting.");
        }
      });
      return;

    case "end": {
      const r = await prisma.doctorSession.updateMany({
        where: { id: sessionId, queueStatus: { not: "ENDED" }, servingBookingId: null },
        data: { queueStatus: "ENDED", queueEndedAt: now, ...bump },
      });
      if (r.count === 0) {
        throw new ApiError(
          409,
          session.queueStatus === "ENDED"
            ? "This session has already ended."
            : "Complete, skip or cancel the current token first."
        );
      }
      return;
    }

    case "closeBooking":
    case "reopenBooking":
      await prisma.doctorSession.update({
        where: { id: sessionId },
        data: { bookingManuallyClosed: action === "closeBooking", ...bump },
      });
      return;

    case "extend": {
      if (session.queueStatus === "ENDED") throw new ApiError(409, "This session has ended.");
      if (!closesAt || !TIME_RE.test(closesAt)) {
        throw new ApiError(400, "Send the new closing time as HH:mm.");
      }
      const newClose = zonedToUtc(session.date.toISOString().slice(0, 10), closesAt, timezone);
      if (newClose <= now || newClose <= session.bookingClosesAt) {
        throw new ApiError(400, "The new closing time must be later than now and than the current closing time.");
      }
      // Only the closing time changes. Existing tokens and their numbers are untouched.
      // Extending also reopens booking if the clinic had closed it by hand.
      await prisma.doctorSession.update({
        where: { id: sessionId },
        data: {
          bookingClosesAt: newClose,
          bookingExtended: true,
          bookingManuallyClosed: false,
          ...bump,
        },
      });
      return;
    }
  }
}