// src/lib/patient-booking.ts
// Types and helpers for the patient screens. No database code, so client components can import it.

import type { BookingStatus, QueueStatus, TokenStatus } from "@/lib/booking";

export const DAYS_AHEAD = 7; // patients can look at today + the next 6 days
export const MAX_ACTIVE_TOKENS = 3; // per patient account, per session (family members, not spam)
export const DEFAULT_TOKEN_MINUTES = 10; // used until the doctor has completed some tokens
export const TOKEN_POLL_MS = 5000; // the token page checks the status this often (no sockets)

/* -------------------------------- formatting -------------------------------- */

// "2026-10-20" -> "Tue, 20 Oct"
export function dateText(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00Z`));
}

/* ------------------------------ patient details ------------------------------ */

// "+91 98765-43210" -> "9876543210"
export function cleanPhone(raw: string): string {
  let d = raw.replace(/[\s\-()]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0") && d.length === 11) d = d.slice(1);
  return d;
}

export const isValidIndianPhone = (raw: string) => /^[6-9]\d{9}$/.test(cleanPhone(raw));

// "13:00" -> "1:00 PM"
export function formatHHmm(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

// 75 -> "1 hr 15 min"
export function waitText(minutes: number): string {
  if (minutes < 60) return `${Math.max(minutes, 1)} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/* ---------------------------- availability (booking) ---------------------------- */

export type PatientSession = {
  id: string;
  startTime: string; // "10:00" (display only, patients do not pick a time)
  endTime: string;
  status: BookingStatus;
  label: string; // "Booking Open", "Booking Extended Until 8:00 PM", ...
  canBook: boolean;
  notOpenYet: boolean; // booking opens at 12:00 AM on the session date
  closesAtTime: string; // "HH:mm" in the clinic time zone
  queueStatus: QueueStatus;
  waiting: number; // tokens waiting in the queue
  nowServing: number | null; // token number being served
  mine: { id: string; tokenNumber: number }[]; // this patient's active tokens
};

export type Availability = {
  today: string;
  timezone: string;
  days: { date: string; sessions: PatientSession[] }[];
};

export type BookedToken = { id: string; tokenNumber: number; ahead: number };

/* -------------------------------- my tokens -------------------------------- */

export type MyToken = {
  id: string;
  tokenNumber: number;
  status: TokenStatus;
  skipCount: number;
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  doctor: { name: string; image: string | null; specialtySlug: string };
  clinic: { name: string; address: string; city: string };
  queueStatus: QueueStatus;
  nowServing: number | null;
  ahead: number; // waiting tokens in front of this one
  estimate: { minutes: number; at: string } | null; // at = ISO moment
  paidRupees: number; // 0 = free token
  cancelledBy: "USER" | "CLINIC" | "SYSTEM" | null;
  refund: null | {
    rupees: number; // user ko wapas jaane wala
    feeRupees: number; // kata hua gateway fee
    status: "INITIATED" | "PENDING" | "PROCESSED" | "FAILED";
  };
};

export function tokenStatusText(t: Pick<MyToken, "status" | "skipCount" | "queueStatus">): string {
  switch (t.status) {
    case "SERVING":
      return "It's your turn";
    case "COMPLETED":
      return "Completed";
    case "SKIPPED":
      return "Skipped. Please speak to the clinic desk";
    case "CANCELLED":
      return "Cancelled";
    default:
      if (t.queueStatus === "ENDED") return "Session ended";
      if (t.skipCount > 0) return "Skipped, back in the queue";
      if (t.queueStatus === "NOT_STARTED") return "Waiting for the doctor to start";
      return "Waiting in the queue";
  }
}


