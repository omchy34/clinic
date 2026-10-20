// src/lib/clinicHours.tsx
// The clinic's open hours for today. Not stored separately: derived from the doctors' sessions today.

import { formatTime, toMinutes } from "@/app/clinic/doctors/shared";
import { hhmm } from "@/lib/booking";

export type OpenStatus = "open" | "later" | "ended" | "closed";

export type TodayHours = {
  windows: { start: string; end: string }[]; // [{ start: "10:00", end: "13:00" }, ...]
  status: OpenStatus;
  nextStart: string | null; // when it opens next today
};

// All doctors' sessions today -> the clinic's open windows (overlapping sessions are merged)
export function todayHours(sessions: { startTime: string; endTime: string }[], nowMinutes: number): TodayHours {
  const spans = sessions
    .map((s) => [toMinutes(s.startTime), toMinutes(s.endTime)] as const)
    .sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const [start, end] of spans) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }

  const isOpen = merged.some(([start, end]) => start <= nowMinutes && nowMinutes < end);
  const next = merged.find(([start]) => start > nowMinutes);

  return {
    windows: merged.map(([start, end]) => ({ start: hhmm(start), end: hhmm(end) })),
    status: merged.length === 0 ? "closed" : isOpen ? "open" : next ? "later" : "ended",
    nextStart: next ? hhmm(next[0]) : null,
  };
}

// "Today: 10:00 AM to 1:00 PM, 5:00 PM to 8:00 PM"
export const hoursText = (h: TodayHours) =>
  h.windows.length === 0
    ? "No doctors sitting today"
    : `Today: ${h.windows.map((w) => `${formatTime(w.start)} to ${formatTime(w.end)}`).join(", ")}`;

export function HoursBadge({ hours }: { hours: TodayHours }) {
  const { label, color } = {
    open: { label: "Open now", color: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
    later: {
      label: `Opens ${hours.nextStart ? formatTime(hours.nextStart) : ""}`,
      color: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    },
    ended: { label: "Today's hours are over", color: "bg-slate-100 text-slate-600 ring-1 ring-slate-200" },
    closed: { label: "Closed today", color: "bg-slate-100 text-slate-600 ring-1 ring-slate-200" },
  }[hours.status];

  return <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${color}`}>{label}</span>;
}