"use client";

// src/app/user/my-tokens/page.tsx
// The patient's booked tokens. Checks the status every few seconds (no sockets).

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Clock, MapPin, Stethoscope } from "lucide-react";
import { formatClock, todayIn } from "@/lib/booking";
import {
  TOKEN_POLL_MS,
  dateText,
  formatHHmm,
  tokenStatusText,
  waitText,
  type MyToken,
} from "@/lib/patient-booking";

const ENDPOINT = "/api/user/bookings";

// Glassmorphism tokens
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";

function badgeClass(t: MyToken): string {
  if (t.status === "SERVING") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (t.status === "COMPLETED") return "bg-slate-100 text-slate-600 ring-slate-200";
  if (t.status === "CANCELLED") return "bg-rose-50 text-rose-600 ring-rose-200";
  if (t.queueStatus === "ENDED") return "bg-slate-100 text-slate-600 ring-slate-200";
  if (t.skipCount > 0) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-indigo-50 text-indigo-700 ring-indigo-200";
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2.5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-slate-800">{value}</p>
      {note && <p className="text-xs text-slate-500">{note}</p>}
    </div>
  );
}

function TokenCard({ t }: { t: MyToken }) {
  const waiting = t.status === "CONFIRMED" && t.queueStatus !== "ENDED";
  const day = t.date === todayIn(t.timezone) ? "Today" : dateText(t.date);

  let estimate = "Not available";
  let estimateNote: string | undefined;
  if (t.estimate) {
    estimate = t.estimate.minutes < 1 ? "Any moment now" : `About ${waitText(t.estimate.minutes)}`;
    estimateNote = `around ${formatClock(new Date(t.estimate.at), t.timezone)}`;
  }

  return (
    <li className={`${glass} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-600 ring-2 ring-white/80">
            {t.doctor.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.doctor.image} alt={t.doctor.name} className="h-full w-full object-cover" />
            ) : (
              <Stethoscope size={22} aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-800">{t.doctor.name}</h2>
            <p className="truncate text-sm text-slate-500">{t.clinic.name}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${badgeClass(t)}`}>
          {tokenStatusText(t)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">Your token{t.patientName ? ` for ${t.patientName}` : ""}</p>
          <p className="text-4xl font-bold text-indigo-600">#{t.tokenNumber}</p>
        </div>
        <div className="space-y-1 text-right text-sm text-slate-600">
          <p className="flex items-center justify-end gap-1.5">
            <Clock size={14} className="text-indigo-400" aria-hidden="true" />
            {day}, doctor sits {formatHHmm(t.startTime)} to {formatHHmm(t.endTime)}
          </p>
          <p className="flex items-center justify-end gap-1.5">
            <MapPin size={14} className="text-indigo-400" aria-hidden="true" />
            {t.clinic.address}, {t.clinic.city}
          </p>
        </div>
      </div>

      {t.status === "SERVING" && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          The doctor is ready for you. Please go in now.
        </p>
      )}

      {waiting && (
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <Stat
            label="Now serving"
            value={t.nowServing !== null ? `#${t.nowServing}` : "Not started"}
          />
          <Stat label="Patients ahead of you" value={String(t.ahead)} />
          <Stat label="Estimated wait" value={estimate} note={estimateNote} />
        </div>
      )}

      {t.status === "CONFIRMED" && t.queueStatus === "ENDED" && (
        <p className="mt-4 text-sm text-slate-500">
          This session has ended. Book a new token for the next session.
        </p>
      )}
    </li>
  );
}

export default function MyTokensPage() {
  const { getToken } = useAuth();
  const [tokens, setTokens] = useState<MyToken[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get<{ tokens: MyToken[] }>(ENDPOINT, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setTokens(data.tokens);
      setError(null);
    } catch (err) {
      // keep showing the last good data when a poll fails
      setError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          "Could not refresh your tokens. Retrying..."
      );
    }
  }, [getToken]);

  useEffect(() => {
    void load();
    const id = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, TOKEN_POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  let body;
  if (!tokens) {
    body = error ? (
      <div role="alert" className={`${glass} p-6`}>
        <p className="text-sm text-rose-600">{error}</p>
        <button
          type="button"
          onClick={load}
          className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
        >
          Try again
        </button>
      </div>
    ) : (
      <ul className="space-y-4" aria-busy="true">
        {[0, 1].map((i) => (
          <li key={i} className={`${glass} h-48 motion-safe:animate-pulse`} />
        ))}
      </ul>
    );
  } else if (tokens.length === 0) {
    body = (
      <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-10 text-center backdrop-blur-md">
        <p className="font-semibold text-slate-800">No tokens yet</p>
        <p className="mt-1 text-sm text-slate-500">Book a token with a doctor to follow your turn here.</p>
        <Link
          href="/user/book-clinic"
          className={`mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 ${gradient} ${ring}`}
        >
          Book a token
        </Link>
      </div>
    );
  } else {
    body = (
      <ul className="space-y-4">
        {tokens.map((t) => (
          <TokenCard key={t.id} t={t} />
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          My tokens
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          This page refreshes by itself. The wait time is an estimate based on how long the doctor
          took with recent patients.
        </p>
      </div>
      {tokens && error && (
        <p role="status" className="text-xs text-amber-700">
          {error}
        </p>
      )}
      {body}
    </div>
  );
}