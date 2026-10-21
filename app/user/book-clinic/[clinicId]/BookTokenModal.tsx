"use client";

// src/app/user/book-clinic/[clinicId]/BookTokenModal.tsx
// The patient picks a date and a session. The server hands out the next token number.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle2, Clock, Loader2, X } from "lucide-react";
import type { BookingStatus } from "@/lib/booking";
import {
  dateText,
  formatHHmm,
  type Availability,
  type BookedToken,
  type PatientSession,
} from "@/lib/patient-booking";
import Reveal from "@/components/Reveal";

// Glassmorphism tokens
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const bar = "rounded-full bg-slate-200/80";

const CHIP: Record<BookingStatus, string> = {
  OPEN: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  EXTENDED: "bg-amber-50 text-amber-700 ring-amber-200",
  CLOSED: "bg-slate-100 text-slate-500 ring-slate-200",
  OVER: "bg-rose-50 text-rose-600 ring-rose-200",
};

type Confirmed = BookedToken & { date: string; startTime: string; endTime: string };

const errorMessage = (err: unknown, fallback: string) =>
  (axios.isAxiosError(err) && err.response?.data?.message) || fallback;

function SessionNote({ s, date }: { s: PatientSession; date: string }) {
  let text: string;
  if (s.notOpenYet) text = `Booking opens at 12:00 AM on ${dateText(date)}.`;
  else if (s.canBook) text = `Booking closes at ${formatHHmm(s.closesAtTime)}.`;
  else if (s.status === "OVER") text = "The clinic has stopped taking tokens for this session.";
  else text = "Booking is closed for this session.";

  return <p className="mt-2 text-xs text-slate-500">{text}</p>;
}

// Same shape as the real content (date chips and session cards), shown while sessions load
function ModalSkeleton() {
  return (
    <div className="space-y-5 px-6 py-5 motion-safe:animate-pulse" aria-busy="true">
      <p role="status" className="sr-only">
        Loading sessions
      </p>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${bar} h-9 w-20 shrink-0`} />
        ))}
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="rounded-2xl border border-white/80 bg-white/60 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className={`${bar} h-4 w-1/2`} />
            <div className={`${bar} h-5 w-16`} />
          </div>
          <div className={`${bar} mt-3 h-3 w-2/3`} />
          <div className={`${bar} mt-3 h-3 w-1/3`} />
          <div className="mt-3 h-9 rounded-xl bg-slate-200/80" />
        </div>
      ))}
    </div>
  );
}

export default function BookTokenModal({
  doctor,
  onClose,
}: {
  doctor: { id: string; name: string };
  onClose: () => void;
}) {
  const { getToken } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const authHeader = useCallback(
    async () => ({ headers: { Authorization: `Bearer ${await getToken()}` } }),
    [getToken]
  );

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const { data } = await axios.get<Availability>(
        `/api/user/doctors/${doctor.id}/availability`,
        await authHeader()
      );
      setAvailability(data);
      setDate((current) =>
        current && data.days.some((d) => d.date === current) ? current : data.days[0]?.date ?? null
      );
      // forget a selection that can no longer be booked
      setSessionId((id) =>
        data.days.some((d) => d.sessions.some((s) => s.id === id && s.canBook)) ? id : null
      );
    } catch (err) {
      setLoadError(errorMessage(err, "Could not load the sessions. Please try again."));
    }
  }, [doctor.id, authHeader]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    void load();
  }, [load]);

  const close = () => !submitting && dialogRef.current?.close(); // fires onClose

  const day = availability?.days.find((d) => d.date === date);
  const picked = day?.sessions.find((s) => s.id === sessionId);

  async function book() {
    if (!picked || !date || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { data } = await axios.post<BookedToken>(
        "/api/user/bookings",
        { sessionId: picked.id, patientName },
        await authHeader()
      );
      setConfirmed({ ...data, date, startTime: picked.startTime, endTime: picked.endTime });
    } catch (err) {
      setSubmitError(errorMessage(err, "Could not book the token. Please try again."));
      void load(); // the window may have changed, show the latest status
    } finally {
      setSubmitting(false);
    }
  }

  let body;
  if (confirmed) {
    body = (
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <Reveal pop>
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
            <CheckCircle2 size={40} aria-hidden="true" />
          </span>
        </Reveal>
        <Reveal index={1}>
          <h3 className="mt-5 text-xl font-bold text-slate-800">Token booked</h3>
        </Reveal>
        <Reveal index={2} className="w-full max-w-xs">
          <div className="mt-4 w-full rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold text-slate-800">{doctor.name}</p>
            <p className="mt-1 text-3xl font-bold text-indigo-600">Token #{confirmed.tokenNumber}</p>
            <p className="mt-1 text-sm text-slate-500">
              {dateText(confirmed.date)}, doctor sits {formatHHmm(confirmed.startTime)} to{" "}
              {formatHHmm(confirmed.endTime)}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {confirmed.ahead === 0
                ? "You are first in line."
                : `${confirmed.ahead} ${confirmed.ahead === 1 ? "patient is" : "patients are"} ahead of you.`}
            </p>
          </div>
        </Reveal>
        <Link
          href="/user/my-tokens"
          className={`mt-6 rounded-xl px-8 py-2.5 text-sm font-semibold transition hover:opacity-90 ${gradient} ${ring}`}
        >
          Track my token
        </Link>
        <button
          type="button"
          onClick={close}
          className={`mt-3 rounded-xl px-6 py-2 text-sm font-medium text-slate-600 hover:bg-white/70 ${ring}`}
        >
          Done
        </button>
      </div>
    );
  } else if (loadError) {
    body = (
      <div role="alert" className="px-6 py-8">
        <p className="text-sm text-rose-600">{loadError}</p>
        <button
          type="button"
          onClick={load}
          className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
        >
          Try again
        </button>
      </div>
    );
  } else if (!availability) {
    body = <ModalSkeleton />;
  } else if (availability.days.length === 0) {
    body = (
      <p className="px-6 py-12 text-center text-sm text-slate-500">
        This doctor has no sessions in the coming week.
      </p>
    );
  } else {
    body = (
      <>
        <div className="space-y-5 px-6 py-5">
          {/* Date */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Date">
            {availability.days.map((d) => (
              <button
                key={d.date}
                type="button"
                aria-pressed={d.date === date}
                onClick={() => {
                  setDate(d.date);
                  setSessionId(null);
                  setSubmitError(null);
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${ring} ${
                  d.date === date
                    ? `border-transparent ${gradient}`
                    : "border-white/70 bg-white/60 text-slate-700 hover:bg-white/90"
                }`}
              >
                {d.date === availability.today ? "Today" : dateText(d.date)}
              </button>
            ))}
          </div>

          {/* Sessions: patients choose a session, never a time slot.
              The key includes the date, so the cards animate in again when the date changes. */}
          {day?.sessions.map((s, i) => {
            const selected = s.id === sessionId;
            return (
              <Reveal key={`${day.date}-${s.id}`} index={i}>
                <div
                  className={`rounded-2xl border p-4 transition ${
                    selected
                      ? "border-indigo-400 bg-white ring-2 ring-indigo-300"
                      : "border-white/80 bg-white/60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Clock size={15} className="text-indigo-400" aria-hidden="true" />
                      Doctor sits {formatHHmm(s.startTime)} to {formatHHmm(s.endTime)}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${CHIP[s.status]}`}
                    >
                      {s.notOpenYet ? "Not open yet" : s.label}
                    </span>
                  </div>

                  <SessionNote s={s} date={day.date} />

                  <p className="mt-2 text-sm text-slate-600">
                    {s.waiting} waiting
                    {s.queueStatus === "ACTIVE" && s.nowServing !== null && <> · Now serving #{s.nowServing}</>}
                  </p>

                  {s.mine.length > 0 && (
                    <p className="mt-2 rounded-lg bg-indigo-50/80 px-3 py-1.5 text-sm font-medium text-indigo-700">
                      Your {s.mine.length === 1 ? "token" : "tokens"}:{" "}
                      {s.mine.map((m) => `#${m.tokenNumber}`).join(", ")}
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={!s.canBook}
                    aria-pressed={selected}
                    onClick={() => {
                      setSessionId(s.id);
                      setSubmitError(null);
                    }}
                    className={`mt-3 w-full rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${ring} ${
                      selected
                        ? "border-transparent bg-indigo-600 text-white"
                        : "border-white/80 bg-white/70 text-slate-800 hover:bg-white"
                    }`}
                  >
                    {selected ? "Selected" : s.canBook ? "Select this session" : "Booking unavailable"}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Confirm */}
        <div className="sticky bottom-0 space-y-3 border-t border-white/60 bg-white/70 px-6 py-4 backdrop-blur-xl">
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            maxLength={100}
            placeholder="Patient name (optional)"
            aria-label="Patient name"
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-400"
          />
          {submitError && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
              {submitError}
            </p>
          )}
          <button
            type="button"
            onClick={book}
            disabled={!picked || submitting}
            aria-busy={submitting}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50 ${gradient} ${ring}`}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Booking...
              </>
            ) : picked ? (
              "Book my token"
            ) : (
              "Select a session"
            )}
          </button>
          <p className="text-center text-xs text-slate-500">
            You get the next token number in the queue. There is no fixed time, so we show an estimate after booking.
          </p>
        </div>
      </>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => submitting && e.preventDefault()}
      aria-labelledby="book-token-title"
      className="m-auto w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-0 shadow-2xl shadow-indigo-900/20 backdrop-blur-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/60 bg-white/70 px-6 py-4 backdrop-blur-xl">
          <div>
            <h2 id="book-token-title" className="text-lg font-bold text-slate-800">
              Book a token
            </h2>
            <p className="text-sm text-slate-500">{doctor.name}</p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={submitting}
            aria-label="Close"
            className={`rounded-full p-2 text-slate-500 transition hover:bg-white/80 disabled:opacity-50 ${ring}`}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {body}
      </div>
    </dialog>
  );
}