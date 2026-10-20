"use client";

// app/clinic/appointments/page.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { SPECIALTY_BY_SLUG, errorMessage, initials } from "@/app/clinic/doctors/shared";
import { ui } from "@/app/clinic/doctors/ui";
import { useAuthHeaders } from "@/app/clinic/doctors/useAuthHeaders";
import { addDays, formatDate, type Appointments } from "@/lib/booking";
import SessionPanel, { type SessionActionName, type TokenActionName } from "./SessionPanel";

const ENDPOINT = "/api/clinic/appointments";
const SESSION_ENDPOINT = "/api/clinic/sessions";
const STORAGE_KEY = "clinic-appointments-doctor"; // which doctor is selected on this device
const REFRESH_MS = 15_000; // new bookings show up without a manual refresh

const iconBtn = `rounded-md border border-[#C9D6D2] bg-white p-2 text-[#14302B] hover:bg-[#F3F6F5] disabled:opacity-50 ${ui.ring}`;

export default function AppointmentsPage() {
  const authHeaders = useAuthHeaders();

  const [date, setDate] = useState<string | undefined>(undefined); // undefined = today (the server knows the clinic time zone)
  const [data, setData] = useState<Appointments | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const latest = useRef(0); // ignores a slow response that arrives after a newer one

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

  // Every button goes through here, then the screen reloads from the server
  const run = useCallback(
    async (url: string, body: Record<string, unknown>) => {
      setBusy(true);
      setActionError(null);
      try {
        await axios.patch(url, body, { headers: await authHeaders() });
      } catch (err) {
        setActionError(errorMessage(err, "Could not update. Please try again."));
      } finally {
        setBusy(false);
        await load();
      }
    },
    [authHeaders, load]
  );

  const doctors = data?.doctors ?? [];
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0];
  const readOnly = !!data && data.date < data.today;

  let content;
  if (!data && loadError) {
    content = (
      <div role="alert" className={`${ui.card} p-6`}>
        <p className="text-sm text-[#B42318]">{loadError}</p>
        <button type="button" onClick={() => void load()} className={`mt-3 ${ui.outlineBtn}`}>
          Try again
        </button>
      </div>
    );
  } else if (!data) {
    content = <div aria-busy="true" aria-label="Loading appointments" className={`h-64 ${ui.card} motion-safe:animate-pulse`} />;
  } else if (!doctor) {
    content = (
      <div className="rounded-xl border-2 border-dashed border-[#C9D6D2] p-10 text-center">
        <p className="font-medium text-[#14302B]">No doctor sits on this day</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-[#5B726C]">
          Sessions are created from each doctor&apos;s weekly schedule. Add or change a schedule on the
          Doctors page.
        </p>
        <Link href="/clinic/doctors" className={`mt-5 inline-block ${ui.outlineBtn}`}>
          Go to Doctors
        </Link>
      </div>
    );
  } else {
    content = (
      <>
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
                className={`flex shrink-0 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left ${ui.ring} ${
                  on
                    ? "border-[#14302B] bg-[#14302B] text-white"
                    : "border-[#C9D6D2] bg-white text-[#14302B] hover:bg-[#F3F6F5]"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold ${
                    on ? "bg-white/15" : "bg-[#E8EFED]"
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
                  <span className={`block text-xs ${on ? "text-white/75" : "text-[#5B726C]"}`}>
                    {SPECIALTY_BY_SLUG.get(d.specialtySlug)?.name ?? "Doctor"}
                    {waiting > 0 && `, ${waiting} waiting`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-4">
          {doctor.sessions.map((s) => (
            <SessionPanel
              key={s.id}
              session={s}
              readOnly={readOnly}
              busy={busy}
              onSession={(action: SessionActionName, closesAt?: string) =>
                run(`${SESSION_ENDPOINT}/${s.id}`, { action, closesAt })
              }
              onToken={(tokenId: string, action: TokenActionName) =>
                run(`${ENDPOINT}/${tokenId}`, { action })
              }
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">Appointments</h1>
          <p className="mt-1 text-sm text-[#5B726C]">
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
            className={`rounded-md border border-[#C9D6D2] bg-white px-3 py-2 text-sm text-[#14302B] ${ui.ring}`}
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
            <button type="button" onClick={() => goTo(data.today)} className={ui.outlineBtn}>
              Today
            </button>
          )}
          <button type="button" aria-label="Refresh" onClick={() => void load()} className={iconBtn}>
            <RefreshCw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {data && loadError && (
        <p role="alert" className="mt-4 rounded-md bg-[#FEF3F2] px-3.5 py-2.5 text-sm text-[#B42318]">
          {loadError} Showing the last loaded data.
        </p>
      )}
      {actionError && (
        <p role="alert" className="mt-4 rounded-md bg-[#FEF3F2] px-3.5 py-2.5 text-sm text-[#B42318]">
          {actionError}
        </p>
      )}

      <div className="mt-6">{content}</div>
    </div>
  );
}