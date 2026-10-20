// app/clinic/doctors/shared.ts
// Types and helpers shared by the doctors page, the cards and the Add doctor popup.

import axios from "axios";
// File must be at src/data/specialties.json (lowercase, so it also works on Vercel)
import specialtyList from "@/data/specialties.json";

/* ------------------------------- weekdays -------------------------------- */

export type Weekday = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

// Values match the Weekday enum in schema.prisma
export const DAYS: { value: Weekday; short: string; long: string }[] = [
  { value: "MON", short: "Mon", long: "Monday" },
  { value: "TUE", short: "Tue", long: "Tuesday" },
  { value: "WED", short: "Wed", long: "Wednesday" },
  { value: "THU", short: "Thu", long: "Thursday" },
  { value: "FRI", short: "Fri", long: "Friday" },
  { value: "SAT", short: "Sat", long: "Saturday" },
  { value: "SUN", short: "Sun", long: "Sunday" },
];

export const DAY_ORDER = DAYS.map((d) => d.value);

/* ------------------------------ specialties ------------------------------ */

export type Specialty = {
  category: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
};

export const SPECIALTIES = specialtyList as Specialty[];
export const SPECIALTY_BY_SLUG = new Map(SPECIALTIES.map((s) => [s.slug, s]));

/* --------------------------------- types --------------------------------- */

// One schedule as the API expects it (POST) ...
export type SchedulePayload = {
  day: Weekday;
  startTime: string; // "10:00"
  endTime: string; // "13:00"
  bookingCloseTime: string | null; // "09:30", null = closes when the session ends
};

// ... and as GET /api/clinic/add-doctors returns it
export type ScheduleRow = SchedulePayload & { id: string };

export type DoctorRow = {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  isActive: boolean;
  specialtySlug: string;
  schedules: ScheduleRow[];
};

/* --------------------------------- helpers -------------------------------- */

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// "13:00" becomes "1:00 PM"
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export function initials(name: string): string {
  return name
    .replace(/^dr\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// [MON, WED, FRI] becomes "Mon, Wed, Fri". Three or more days in a row become "Mon to Fri"
export function formatDays(days: Weekday[]): string {
  const idx = days.map((d) => DAY_ORDER.indexOf(d)).sort((a, b) => a - b);
  const parts: string[] = [];

  for (let i = 0; i < idx.length; ) {
    let j = i;
    while (idx[j + 1] === idx[j] + 1) j++;

    if (j - i >= 2) parts.push(`${DAYS[idx[i]].short} to ${DAYS[idx[j]].short}`);
    else for (let k = i; k <= j; k++) parts.push(DAYS[idx[k]].short);
    i = j + 1;
  }
  return parts.join(", ");
}

// Schedule rows with the same hours are shown together as one line
export function summarizeSchedule(schedules: ScheduleRow[]) {
  type Group = Omit<SchedulePayload, "day"> & { days: Weekday[] };
  const groups = new Map<string, Group>();

  for (const { day, ...rest } of schedules) {
    const key = `${rest.startTime}|${rest.endTime}|${rest.bookingCloseTime}`;
    const group = groups.get(key) ?? { ...rest, days: [] };
    group.days.push(day);
    groups.set(key, group);
  }

  return [...groups.values()]
    .map((g) => ({
      ...g,
      daysLabel: formatDays(g.days),
      firstDay: Math.min(...g.days.map((d) => DAY_ORDER.indexOf(d))),
    }))
    .sort((a, b) => a.firstDay - b.firstDay || toMinutes(a.startTime) - toMinutes(b.startTime));
}

// Message from the API ({ message }) or a friendly fallback
export function errorMessage(err: unknown, fallback: string): string {
  if (!axios.isAxiosError(err)) return fallback;
  if (!err.response) return "Network error. Check your connection and try again.";
  return err.response.data?.message ?? fallback;
}