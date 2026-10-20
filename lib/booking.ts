// src/lib/booking.ts
// Pure helpers and shared types. No database code here, so client components can import it too.

export type QueueStatus = "NOT_STARTED" | "ACTIVE" | "ENDED";
export type TokenStatus = "CONFIRMED" | "SERVING" | "COMPLETED" | "CANCELLED";
export type BookingStatus = "OPEN" | "EXTENDED" | "CLOSED" | "OVER";
export type Weekday = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/; // "HH:mm"

/* --------------------------- clinic time zone helpers --------------------------- */

// "2026-10-20" + 1 -> "2026-10-21" (pure calendar math, no time zone involved)
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// "2026-10-20" -> "Tuesday, 20 October 2026"
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") % 24,
    minute: get("minute"),
    second: get("second"),
  };
}

// How far ahead of UTC the time zone is at this moment
function offsetMs(date: Date, timeZone: string): number {
  const p = zonedParts(date, timeZone);
  const wall = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return wall - Math.floor(date.getTime() / 1000) * 1000;
}

// "2026-10-20" + "09:30" in Asia/Kolkata becomes the exact UTC moment
export function zonedToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  let utc = wall - offsetMs(new Date(wall), timeZone);
  utc = wall - offsetMs(new Date(utc), timeZone); // second pass, safe around DST changes
  return new Date(utc);
}

// Today's date in the clinic's time zone: "2026-10-20"
export function todayIn(timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

// "HH:mm" of a moment, in the clinic's time zone
export function timeIn(date: Date, timeZone: string): string {
  const p = zonedParts(date, timeZone);
  return `${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`;
}

// "8:00 PM"
export function formatClock(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(/\u202f/g, " ");
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

const WEEKDAYS: Weekday[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function weekdayOf(date: string): Weekday {
  return WEEKDAYS[new Date(`${date}T00:00:00Z`).getUTCDay()];
}

// Current date and minutes since midnight in the given time zone
export function nowIn(timeZone: string): { date: string; minutes: number } {
  const [h, m] = timeIn(new Date(), timeZone).split(":").map(Number);
  return { date: todayIn(timeZone), minutes: h * 60 + m };
}

// 600 -> "10:00" (minutes since midnight), used by clinicHours.tsx
export function hhmm(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
/* ------------------------------- booking window -------------------------------- */

type WindowFields = {
  bookingOpensAt: Date;
  bookingClosesAt: Date;
  bookingExtended: boolean;
  bookingManuallyClosed: boolean;
  queueStatus: QueueStatus;
};

// The one place that decides if patients can book. The booking API must call this too.
export function bookingStatus(s: WindowFields, now = new Date()): BookingStatus {
  if (s.bookingManuallyClosed) return "OVER";
  if (s.queueStatus === "ENDED") return "CLOSED";
  if (now < s.bookingOpensAt || now >= s.bookingClosesAt) return "CLOSED";
  return s.bookingExtended ? "EXTENDED" : "OPEN";
}

export function bookingLabel(status: BookingStatus, closesAt: Date, timeZone: string): string {
  switch (status) {
    case "OPEN":
      return "Booking Open";
    case "EXTENDED":
      return `Booking Extended Until ${formatClock(closesAt, timeZone)}`;
    case "OVER":
      return "Booking Over";
    default:
      return "Booking Closed";
  }
}

/* ------------------------- shapes returned to the clinic UI -------------------------- */

export type TokenView = {
  id: string;
  tokenNumber: number; // never changes
  queuePosition: number; // changes when the token is skipped
  status: TokenStatus;
  patientName: string;
  bookedBy: string;
  skipCount: number; // show a "Skipped" badge when above 0
};

export type SessionView = {
  id: string;
  startTime: string; // "10:00"
  endTime: string; // "13:00"
  queueStatus: QueueStatus;
  queueVersion: number;
  servingTokenId: string | null;
  booking: {
    status: BookingStatus;
    label: string; // "Booking Open", "Booking Extended Until 8:00 PM", ...
    closesAt: string; // ISO moment
    closesAtTime: string; // "HH:mm" in the clinic time zone
    extended: boolean;
    manuallyClosed: boolean;
  };
  counts: { waiting: number; completed: number; cancelled: number; total: number };
  tokens: TokenView[];
};

export type DoctorView = {
  id: string;
  name: string;
  image: string | null;
  specialtySlug: string;
  sessions: SessionView[];
};

export type Appointments = {
  date: string; // the date asked for
  today: string; // today in the clinic time zone
  timezone: string;
  doctors: DoctorView[];
};