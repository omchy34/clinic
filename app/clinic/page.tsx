"use client";

// app/clinic/dashboard/page.tsx  (apne dashboard page ki jagah rakho)

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck, CalendarClock, Stethoscope, Users } from "lucide-react";
import type { ComponentType } from "react";
import { formatDate, type BookingStatus, type QueueStatus } from "@/lib/booking";
import { errorMessage, formatTime, initials } from "./doctors/shared";
import { useAuthHeaders } from "./doctors/useAuthHeaders";

const ENDPOINT = "/api/clinic/dashboard";
const REFRESH_MS = 30_000; // no sockets, so the dashboard refreshes itself

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
  NOT_STARTED: { label: "Not started", cls: "bg-[#F3F6F5] text-[#5B726C]" },
  ACTIVE: { label: "Live", cls: "bg-[#E3F4EA] text-[#0F6B3A]" },
  ENDED: { label: "Ended", cls: "bg-[#EEF0F0] text-[#5B726C]" },
};

const BOOKING_BADGE: Record<BookingStatus, string> = {
  OPEN: "bg-[#E3F4EA] text-[#0F6B3A]",
  EXTENDED: "bg-[#FFF6DD] text-[#8A5B00]",
  CLOSED: "bg-[#EEF0F0] text-[#5B726C]",
  OVER: "bg-[#FEF3F2] text-[#B42318]",
};

const badge = "inline-block rounded-full px-2.5 py-1 text-xs font-medium";

/* ------------------------------- stat card -------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-[#DCE6E3]">
      <div className="rounded-lg bg-[#FFF6DD] p-3 text-[#14302B]">
        <Icon size={22} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold tabular-nums text-[#14302B]">{value}</p>
        <p className="text-sm text-[#5B726C]">{label}</p>
        {note && <p className="mt-1 text-xs text-[#5B726C]">{note}</p>}
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
      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
        <div role="alert" className="rounded-xl bg-white p-6 ring-1 ring-[#DCE6E3]">
          <p className="text-sm text-[#B42318]">{loadError}</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6" aria-busy="true">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-white ring-1 ring-[#DCE6E3] motion-safe:animate-pulse" />
          ))}
        </div>
        <div className="h-56 rounded-xl bg-white ring-1 ring-[#DCE6E3] motion-safe:animate-pulse" />
      </div>
    );
  }

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

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">Clinic Dashboard</h1>
        <p className="mt-1 text-sm text-[#5B726C]">{formatDate(data.date)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarCheck}
          label="Today's tokens"
          value={data.todayTokens}
          note={tokenNote}
        />
        <StatCard
          icon={Stethoscope}
          label="Doctors"
          value={data.totalDoctors}
          note={`${data.activeDoctors} accepting bookings`}
        />
        <StatCard icon={Users} label="Total patients" value={data.totalPatients} />
        <StatCard
          icon={CalendarClock}
          label="Sitting today"
          value={data.doctorsSittingToday}
          note="Active doctors with a schedule today"
        />
      </div>

      {missingSessions > 0 && (
        <p className="rounded-lg bg-[#FFF6DD] px-3.5 py-2.5 text-sm text-[#8A5B00]">
          {missingSessions} {missingSessions === 1 ? "doctor sits" : "doctors sit"} today but{" "}
          {missingSessions === 1 ? "has" : "have"} no session yet.
        </p>
      )}

      <div className="rounded-xl bg-white ring-1 ring-[#DCE6E3]">
        <h2 className="border-b border-[#DCE6E3] p-4 font-semibold text-[#14302B]">
          Today&apos;s sessions
        </h2>

        {todaySessions.length === 0 ? (
          <p className="p-6 text-center text-sm text-[#5B726C]">No sessions today.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F7FAF9] text-[#5B726C]">
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
                    <tr key={s.id} className="border-t border-[#DCE6E3]">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8EFED] text-xs font-semibold text-[#14302B]">
                            {s.doctor.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={s.doctor.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              initials(s.doctor.name)
                            )}
                          </div>
                          <span className="font-medium text-[#14302B]">{s.doctor.name}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap p-3 tabular-nums">
                        {formatTime(s.startTime)} to {formatTime(s.endTime)}
                      </td>
                      <td className="p-3 tabular-nums">{s.tokensBooked}</td>
                      <td className="p-3 tabular-nums">
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
    </div>
  );
}