"use client";

// app/clinic/dashboard/page.tsx

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck, CalendarClock, Stethoscope, Users, type LucideIcon } from "lucide-react";
import { formatDate, type BookingStatus, type QueueStatus } from "@/lib/booking";
import Reveal from "@/components/Reveal";
import { errorMessage, formatTime, initials } from "./doctors/shared";
import { useAuthHeaders } from "./doctors/useAuthHeaders";

const ENDPOINT = "/api/clinic/dashboard";
const REFRESH_MS = 30_000; // no sockets, so the dashboard refreshes itself

// Glassmorphism tokens (same family as DashboardShell)
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/50 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";
const bar = "rounded-full bg-slate-200/80";

/* --------------------------------- types --------------------------------- */

type SessionRow = {
  id: string;
  doctor: { id: string; name: string; image: string | null };
  startTime: string;
  endTime: string;
  queueStatus: QueueStatus;
  nowServing: number | null;
  tokensBooked: number;
  booking: { status: BookingStatus; label: string };
};

type Dashboard = {
  timezone: string;
  date: string;
  totalDoctors: number;
  activeDoctors: number;
  doctorsSittingToday: number;
  todayTokens: number;
  tokens: { waiting: number; serving: number; completed: number; cancelled: number };
  totalPatients: number;
  todaySessions: SessionRow[];
};

/* -------------------------------- badges --------------------------------- */

const QUEUE_BADGE: Record<QueueStatus, { label: string; cls: string }> = {
  NOT_STARTED: { label: "Not started", cls: "bg-slate-100 text-slate-600 ring-slate-200" },
  ACTIVE: { label: "Live", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  ENDED: { label: "Ended", cls: "bg-slate-100 text-slate-500 ring-slate-200" },
};

const BOOKING_BADGE: Record<BookingStatus, string> = {
  OPEN: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  EXTENDED: "bg-amber-50 text-amber-700 ring-amber-200",
  CLOSED: "bg-slate-100 text-slate-500 ring-slate-200",
  OVER: "bg-rose-50 text-rose-600 ring-rose-200",
};

const badge = "inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1";

/* ------------------------------- stat card -------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div
      className={`${glass} flex h-full items-start gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(79,70,229,0.14)]`}
    >
      <div className="rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 p-3 text-white shadow-md shadow-indigo-500/30">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold tabular-nums text-slate-800">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
        {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
      </div>
    </div>
  );
}

/* ------------------------------ loading skeleton ------------------------------ */

// Same shape as the real page, so the layout does not jump when the data arrives
function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6" aria-busy="true">
      <p role="status" className="sr-only">
        Loading the dashboard
      </p>

      <div className="space-y-2 motion-safe:animate-pulse">
        <div className={`${bar} h-7 w-56`} />
        <div className={`${bar} h-4 w-40`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${glass} flex items-start gap-4 p-5 motion-safe:animate-pulse`}>
            <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200/80" />
            <div className="flex-1 space-y-2">
              <div className={`${bar} h-6 w-12`} />
              <div className={`${bar} h-3 w-24`} />
              <div className={`${bar} h-3 w-32`} />
            </div>
          </div>
        ))}
      </div>

      <div className={`${glass} motion-safe:animate-pulse`}>
        <div className="border-b border-white/60 p-4">
          <div className={`${bar} h-5 w-36`} />
        </div>
        <div className="space-y-3 p-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-9 w-9 shrink-0 rounded-full bg-slate-200/80" />
              <div className={`${bar} h-4 flex-1`} />
              <div className={`${bar} hidden h-6 w-20 sm:block`} />
              <div className={`${bar} hidden h-6 w-24 sm:block`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function DashboardPage() {
  const authHeaders = useAuthHeaders();
  const [data, setData] = useState<Dashboard | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await axios.get<Dashboard>(ENDPOINT, { headers: await authHeaders() });
      setData(res.data);
      setLoadError(null);
    } catch (err) {
      setLoadError(errorMessage(err, "Could not load the dashboard. Please try again."));
    }
  }, [authHeaders]);

  useEffect(() => {
    void load();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  /* ---- loading / error states ---- */
  if (loadError && !data) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div role="alert" className={`${glass} p-6`}>
          <p className="text-sm text-rose-600">{loadError}</p>
          <button
            type="button"
            onClick={load}
            className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return <DashboardSkeleton />;

  /* ---- derived ---- */
  const { tokens, todaySessions } = data;
  const doctorsWithSession = new Set(todaySessions.map((s) => s.doctor.id)).size;
  const missingSessions = Math.max(0, data.doctorsSittingToday - doctorsWithSession);

  const tokenNote = data.todayTokens
    ? `${tokens.waiting} waiting, ${tokens.serving} serving, ${tokens.completed} done` +
      (tokens.cancelled ? `, ${tokens.cancelled} cancelled` : "")
    : tokens.cancelled
      ? `${tokens.cancelled} cancelled`
      : "No tokens booked yet";

  const stats = [
    { icon: CalendarCheck, label: "Today's tokens", value: data.todayTokens, note: tokenNote },
    {
      icon: Stethoscope,
      label: "Doctors",
      value: data.totalDoctors,
      note: `${data.activeDoctors} accepting bookings`,
    },
    { icon: Users, label: "Total patients", value: data.totalPatients, note: undefined },
    {
      icon: CalendarClock,
      label: "Sitting today",
      value: data.doctorsSittingToday,
      note: "Active doctors with a schedule today",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <Reveal>
        <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Clinic Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">{formatDate(data.date)}</p>
      </Reveal>

      {loadError && (
        <p role="status" className="text-xs text-amber-700">
          {loadError}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} index={i + 1} className="h-full">
            <StatCard icon={s.icon} label={s.label} value={s.value} note={s.note} />
          </Reveal>
        ))}
      </div>

      {missingSessions > 0 && (
        <Reveal index={5}>
          <p
            role="status"
            className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-800 backdrop-blur-md"
          >
            {missingSessions} {missingSessions === 1 ? "doctor sits" : "doctors sit"} today but{" "}
            {missingSessions === 1 ? "has" : "have"} no session yet.
          </p>
        </Reveal>
      )}

      <Reveal index={6}>
        <div className={glass}>
          <h2 className="border-b border-white/60 p-4 font-semibold text-slate-800">
            Today&apos;s sessions
          </h2>

          {todaySessions.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No sessions today.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/40 text-slate-500">
                  <tr>
                    <th className="p-3 font-medium">Doctor</th>
                    <th className="p-3 font-medium">Time</th>
                    <th className="p-3 font-medium">Tokens</th>
                    <th className="p-3 font-medium">Now serving</th>
                    <th className="p-3 font-medium">Queue</th>
                    <th className="p-3 font-medium">Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {todaySessions.map((s) => {
                    const queue = QUEUE_BADGE[s.queueStatus];
                    return (
                      <tr key={s.id} className="border-t border-white/60 transition hover:bg-white/50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-100 to-indigo-100 text-xs font-semibold text-indigo-700 ring-2 ring-white/80">
                              {s.doctor.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={s.doctor.image} alt="" className="h-full w-full object-cover" />
                              ) : (
                                initials(s.doctor.name)
                              )}
                            </div>
                            <span className="font-medium text-slate-800">{s.doctor.name}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap p-3 tabular-nums text-slate-600">
                          {formatTime(s.startTime)} to {formatTime(s.endTime)}
                        </td>
                        <td className="p-3 tabular-nums text-slate-700">{s.tokensBooked}</td>
                        <td className="p-3 tabular-nums text-slate-700">
                          {s.nowServing !== null ? `#${s.nowServing}` : "-"}
                        </td>
                        <td className="p-3">
                          <span className={`${badge} ${queue.cls}`}>{queue.label}</span>
                        </td>
                        <td className="p-3">
                          <span className={`${badge} ${BOOKING_BADGE[s.booking.status]}`}>
                            {s.booking.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}