"use client";

// Patient dashboard: the next token with its live status, plus the next few bookings.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { Stethoscope, Ticket } from "lucide-react";
import { TOKEN_POLL_MS, dateText, formatHHmm } from "@/lib/patient-booking";
import Reveal from "@/components/Reveal";

const ENDPOINT = "/api/user/dashboard";

// Glassmorphism tokens (same family as the other user pages)
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const bar = "rounded-full bg-slate-200/80";

type DashToken = {
  id: string;
  tokenNumber: number;
  status: "CONFIRMED" | "SERVING";
  clinicName: string;
  doctorName: string;
  date: string;
  isToday: boolean;
  startTime: string;
  endTime: string;
  nowServing: number | null;
  ahead: number | null; // only set for the first token
};

const when = (t: DashToken) => (t.isToday ? "Today" : dateText(t.date));

function StatusBadge({ status }: { status: DashToken["status"] }) {
  const serving = status === "SERVING";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
        serving
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-amber-50 text-amber-700 ring-amber-200"
      }`}
    >
      {serving ? "Called" : "Waiting"}
    </span>
  );
}

/* ------------------------------ loading skeleton ------------------------------ */

// Same shape as the real page, so the layout does not jump when the data arrives
function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-5" aria-busy="true">
      <p role="status" className="sr-only">
        Loading your dashboard
      </p>

      <div className={`${bar} h-6 w-48 motion-safe:animate-pulse`} />

      <div className={`${glass} p-5 motion-safe:animate-pulse`}>
        <div className="mb-4 flex items-center justify-between">
          <div className={`${bar} h-5 w-36`} />
          <div className={`${bar} h-5 w-16`} />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-slate-200/80" />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className={`${bar} h-4 w-1/2`} />
              <div className={`${bar} h-3 w-1/3`} />
              <div className={`${bar} h-3 w-2/5`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 rounded-xl bg-slate-200/80" />
              <div className="h-14 rounded-xl bg-slate-200/80" />
            </div>
          </div>
        </div>
        <div className="mt-5 h-9 w-28 rounded-xl bg-slate-200/80" />
      </div>

      <div className={`${glass} p-5 motion-safe:animate-pulse`}>
        <div className={`${bar} mb-4 h-5 w-24`} />
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-200/80" />
            <div className="flex-1 space-y-2">
              <div className={`${bar} h-3.5 w-1/2`} />
              <div className={`${bar} h-3 w-1/3`} />
            </div>
            <div className="h-7 w-14 shrink-0 rounded-lg bg-slate-200/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- cards ---------------------------------- */

function NextTokenCard({ t }: { t: DashToken }) {
  const serving = t.status === "SERVING";

  return (
    <div className={`${glass} p-5 ${serving ? "ring-2 ring-emerald-400" : ""}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <Ticket size={18} className="text-indigo-500" aria-hidden="true" />
          Your Next Token
        </h2>
        <StatusBadge status={t.status} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-white shadow-md ${
            serving
              ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
              : "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-indigo-500/30"
          }`}
        >
          <span className="text-[11px] opacity-80">Token</span>
          <span className="text-2xl font-bold leading-tight">#{t.tokenNumber}</span>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">{t.clinicName}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Stethoscope size={13} aria-hidden="true" /> {t.doctorName}
            </p>
            <p className="text-xs text-slate-500">
              {when(t)}, {formatHHmm(t.startTime)} to {formatHHmm(t.endTime)}
            </p>
          </div>

          {serving ? (
            <p className="rounded-xl bg-emerald-50 px-3 py-2.5 text-center text-xs font-medium text-emerald-700">
              It&apos;s your turn. The doctor is seeing you now.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2">
                <p className="text-base font-bold text-slate-800">
                  {t.nowServing !== null ? `#${t.nowServing}` : "-"}
                </p>
                <p className="text-[11px] text-slate-500">Now serving</p>
              </div>
              <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2">
                <p className="text-base font-bold text-slate-800">{t.ahead ?? "-"}</p>
                <p className="text-[11px] text-slate-500">People ahead of you</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Link
        href="/user/my-tokens"
        className={`mt-4 inline-block rounded-xl px-4 py-2 text-xs font-semibold transition hover:opacity-90 ${gradient} ${ring}`}
      >
        View Token
      </Link>
    </div>
  );
}

function NoToken() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-5 backdrop-blur-md sm:flex-row sm:items-center">
      <div>
        <h2 className="text-base font-semibold text-slate-800">No active token</h2>
        <p className="mt-0.5 text-xs text-slate-500">Choose a clinic, pick a date and get your token.</p>
      </div>
      <Link
        href="/user/book-clinic"
        className={`rounded-xl px-4 py-2 text-xs font-semibold transition hover:opacity-90 ${gradient} ${ring}`}
      >
        Book Clinic
      </Link>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Page() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [tokens, setTokens] = useState<DashToken[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get<{ tokens: DashToken[] }>(ENDPOINT, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setTokens(data.tokens);
      setError(null);
    } catch (err) {
      setError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          "Could not load your dashboard. Please try again."
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

  if (!tokens) {
    return error ? (
      <div className="mx-auto w-full max-w-4xl">
        <div role="alert" className={`${glass} p-5`}>
          <p className="text-sm text-rose-600">{error}</p>
          <button
            type="button"
            onClick={load}
            className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-white ${ring}`}
          >
            Try again
          </button>
        </div>
      </div>
    ) : (
      <DashboardSkeleton />
    );
  }

  const [next, ...rest] = tokens;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5">
      <Reveal>
        <h1 className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋
        </h1>
      </Reveal>

      {error && (
        <p role="status" className="text-xs text-amber-700">
          {error}
        </p>
      )}

      <Reveal index={1}>{next ? <NextTokenCard t={next} /> : <NoToken />}</Reveal>

      {rest.length > 0 && (
        <Reveal index={2}>
          <div className={`${glass} p-5`}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Upcoming</h2>
              <Link href="/user/my-tokens" className={`rounded text-xs font-medium text-indigo-600 hover:underline ${ring}`}>
                View all
              </Link>
            </div>
            <ul className="divide-y divide-white/70">
              {rest.map((t, i) => (
                <li key={t.id}>
                  <Reveal index={i + 3}>
                    <div className="flex items-center justify-between gap-3 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                          #{t.tokenNumber}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">{t.clinicName}</p>
                          <p className="truncate text-xs text-slate-500">
                            {t.doctorName} · {when(t)}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/user/my-tokens"
                        className={`shrink-0 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-white ${ring}`}
                      >
                        View
                      </Link>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <Reveal index={rest.length + 3}>
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-md shadow-indigo-500/30 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold">Run a clinic?</h2>
            <p className="mt-0.5 text-xs text-blue-100">
              Register your clinic and reach thousands of patients.
            </p>
          </div>
          <Link
            href="/create-your-clinic"
            className={`rounded-xl bg-white px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 ${ring}`}
          >
            Create Your Clinic
          </Link>
        </div>
      </Reveal>
    </div>
  );
}