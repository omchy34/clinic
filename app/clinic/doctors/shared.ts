// app/clinic/doctors/shared.ts
// Types and helpers used by both the doctors page and the Add doctor popup.

// File must be at src/data/specialties.json (lowercase name, so it also works on Vercel)
import specialtyList from "@/data/specialties.json";

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

export type Specialty = {
  category: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
};

export const SPECIALTIES = specialtyList as Specialty[];
export const SPECIALTY_BY_SLUG = new Map(SPECIALTIES.map((s) => [s.slug, s]));

// What GET /api/clinic/doctors returns for each doctor
export type ScheduleRow = {
  day: Weekday;
  startTime: string; // "10:00"
  endTime: string; // "13:00"
  tokenMinutes: number;
};

export type DoctorRow = {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  isActive: boolean;
  specialtySlug: string;
  schedules: ScheduleRow[];
};

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// "13:00" becomes "1:00 PM"
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}