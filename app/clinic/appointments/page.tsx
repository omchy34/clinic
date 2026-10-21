"use client";

// app/clinic/appointments/page.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { SPECIALTY_BY_SLUG, errorMessage, initials } from "@/app/clinic/doctors/shared";
import { useAuthHeaders } from "@/app/clinic/doctors/useAuthHeaders";
import { addDays, formatDate, type Appointments } from "@/lib/booking";
import Reveal from "@/components/Reveal";
import SessionPanel, { type SessionActionName, type TokenActionName } from "./SessionPanel";

const ENDPOINT = "/api/clinic/appointments";
const SESSION_ENDPOINT = "/api/clinic/sessions";
const STORAGE_KEY = "clinic-appointments-doctor"; // which doctor is selected on this device
const REFRESH_MS = 15_000; // new bookings show up without a manual refresh

// Glassmorphism tokens (same family as DashboardShell)
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/50 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";
const gradient = "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const outlineBtn = `rounded-xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white ${ring}`;
const iconBtn = `rounded-xl border border-white/70 bg-white/60 p-2 text-slate-700 backdrop-blur-md transition hover:bg-white/90 disabled:opacity-50 ${ring}`;
const alertBox =
  "rounded-2xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm text-rose-700 backdrop-blur-md";
const bar = "rounded-full bg-slate-200/80";

/* ------------------------------ loading skeleton ------------------------------ */

// Same shape as the real content (doctor tabs and a session panel), so nothing jumps
function ContentSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <p role="status" className="sr-only">
        Loading appointments
      </p>

      <div className="flex gap-2 motion-safe:animate-pulse">
        {[0, 1].map((i) => (
          <div key={i} className="h-14 w-48 shrink-0 rounded-xl border border-white/70 bg-white/60" />
        ))}
      </div>

      <div className={`${glass} p-5 motion-safe:animate-pulse`}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className={`${bar} h-5 w-44`} />
            <div className={`${bar} h-3 w-64`} />
          </div>
          <div className={`${bar} h-6 w-24`} />
        </div>
        <div className="mt-4 h-20 rounded-xl bg-slate-200/70" />
        <div className="mt-5 h-32 rounded-2xl bg-slate-200/70" />
        <div className="mt-5 space-y-2">
          <div className={`${bar} h-4 w-28`} />
          <div className="h-11 rounded-xl bg-slate-200/70" />
          <div className="h-11 rounded-xl bg-slate-200/70" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function AppointmentsPage() {
  const authHeaders = useAuthHeaders();

  const [date, setDate] = useState<string | undefined>(undefined); // undefined = today (the server knows the clinic time zone)
  const [data, setData] = useState<Appointments | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const latest = useRef(0); // ignores a slow response that arrives after a newer one

  // Which button is waiting for the server, as "<id>:<action>" (null = none).
  // The ref blocks a second click in the same moment, before React re-renders.
  const [pending, setPending] = useState<string | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    try {
      setDoctorId(localStorage.getItem(STORAGE_KEY));
    } catch {}
  }, []);

  const load = useCallback(async () => {
    const id = ++latest.current;
    try {
      const res = await axios.get<Appointments>(ENDPOINT, {
        params: date ? { date } : undefined,
        headers: await authHeaders(),
      });
      if (id !== latest.current) return;
      setData(res.data);
      setLoadError(null);
    } catch (err) {
      if (id !== latest.current) return;
      setLoadError(errorMessage(err, "Could not load appointments. Please try again."));
    }
  }, [date, authHeaders]);

  useEffect(() => {
    void load();
  }, [load]);

  // Refresh every few seconds while the tab is open, and when coming back to it
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") void load();
    };
    const timer = setInterval(tick, REFRESH_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [load]);

  function goTo(day: string) {
    setData(null);
    setLoadError(null);
    setActionError(null);
    setDate(day);
  }

  function pickDoctor(id: string) {
    setDoctorId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }

  // Every button goes through here. The spinner stays until the server has answered
  // AND the screen has reloaded, so the buttons never flash back to normal too early.
  // Returns true when the action worked.
  const run = useCallback(
    async (key: string, url: string, body: Record<string, unknown>): Promise<boolean> => {
      if (inFlight.current) return false; // one action at a time
      inFlight.current = true;
      setPending(key);
      setActionError(null);

      let ok = true;
      try {
        await axios.patch(url, body, { headers: await authHeaders() });
      } catch (err) {
        ok = false;
        setActionError(errorMessage(err, "Could not update. Please try again."));
      } finally {
        await load();
        inFlight.current = false;
        setPending(null);
      }
      return ok;
    },
    [authHeaders, load]
  );

  const doctors = data?.doctors ?? [];
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0];
  const readOnly = !!data && data.date < data.today;

  let content;
  if (!data && loadError) {
    content = (
      <div role="alert" className={`${glass} p-6`}>
        <p className="text-sm text-rose-600">{loadError}</p>
        <button type="button" onClick={() => void load()} className={`mt-3 ${outlineBtn}`}>
          Try again
        </button>
      </div>
    );
  } else if (!data) {
    content = <ContentSkeleton />;
  } else if (!doctor) {
    content = (
      <Reveal>
        <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-10 text-center backdrop-blur-md">
          <p className="font-semibold text-slate-800">No doctor sits on this day</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
            Sessions are created from each doctor&apos;s weekly schedule. Add or change a schedule on the
            Doctors page.
          </p>
          <Link href="/clinic/doctors" className={`mt-5 inline-block ${outlineBtn}`}>
            Go to Doctors
          </Link>
        </div>
      </Reveal>
    );
  } else {
    content = (
      <>
        <Reveal>
          <div role="tablist" aria-label="Doctors" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {doctors.map((d) => {
              const on = d.id === doctor.id;
              const waiting = d.sessions.reduce((n, s) => n + s.counts.waiting, 0);
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pickDoctor(d.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${ring} ${
                    on
                      ? `border-transparent ${gradient}`
                      : "border-white/70 bg-white/60 text-slate-700 backdrop-blur-md hover:bg-white/90"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold ring-2 ${
                      on
                        ? "bg-white/20 ring-white/30"
                        : "bg-linear-to-br from-blue-100 to-indigo-100 text-indigo-700 ring-white/80"
                    }`}
                  >
                    {d.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={d.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      initials(d.name)
                    )}
                  </span>
                  <span className="block">
                    <span className="block text-sm font-semibold">{d.name}</span>
                    <span className={`block text-xs ${on ? "text-blue-100" : "text-slate-500"}`}>
                      {SPECIALTY_BY_SLUG.get(d.specialtySlug)?.name ?? "Doctor"}
                      {waiting > 0 && `, ${waiting} waiting`}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-4 space-y-4">
          {doctor.sessions.map((s, i) => (
            <Reveal key={s.id} index={i + 1}>
              <SessionPanel
                session={s}
                readOnly={readOnly}
                pending={pending}
                onSession={(action: SessionActionName, closesAt?: string) =>
                  run(`${s.id}:${action}`, `${SESSION_ENDPOINT}/${s.id}`, { action, closesAt })
                }
                onToken={(tokenId: string, action: TokenActionName) =>
                  run(`${tokenId}:${action}`, `${ENDPOINT}/${tokenId}`, { action })
                }
              />
            </Reveal>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Appointments
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {data ? formatDate(data.date) : "Loading..."}
              {readOnly && ". Past date, view only."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-label="Previous day"
              disabled={!data}
              onClick={() => data && goTo(addDays(data.date, -1))}
              className={iconBtn}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <input
              type="date"
              aria-label="Date"
              value={date ?? data?.date ?? ""}
              onChange={(e) => e.target.value && goTo(e.target.value)}
              className={`rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-sm text-slate-800 backdrop-blur-md ${ring}`}
            />
            <button
              type="button"
              aria-label="Next day"
              disabled={!data}
              onClick={() => data && goTo(addDays(data.date, 1))}
              className={iconBtn}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            {data && data.date !== data.today && (
              <button type="button" onClick={() => goTo(data.today)} className={outlineBtn}>
                Today
              </button>
            )}
            <button type="button" aria-label="Refresh" onClick={() => void load()} className={iconBtn}>
              <RefreshCw size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      {data && loadError && (
        <p role="alert" className={`mt-4 ${alertBox}`}>
          {loadError} Showing the last loaded data.
        </p>
      )}
      {actionError && (
        <p role="alert" className={`mt-4 ${alertBox}`}>
          {actionError}
        </p>
      )}

      <div className="mt-6">{content}</div>
    </div>
  );
}