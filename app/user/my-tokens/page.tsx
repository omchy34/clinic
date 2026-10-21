"use client";

// src/app/user/my-tokens/page.tsx
// The patient's tokens: active ones first, finished ones in a separate tab.
// Checks the status every few seconds (no sockets).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Clock, Loader2, MapPin, Navigation, Plus, RefreshCw, Stethoscope, TicketX } from "lucide-react";
import { addDays, formatClock, todayIn } from "@/lib/booking";
import {
  TOKEN_POLL_MS,
  dateText,
  formatHHmm,
  tokenStatusText,
  waitText,
  type MyToken,
} from "@/lib/patient-booking";
import Reveal from "@/components/Reveal";

const ENDPOINT = "/api/user/bookings";
const cancelEndpoint = (id: string) => `/api/clinic/appointments/${id}/cancel`;

// Glassmorphism tokens
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const bar = "rounded-full bg-slate-200/80";

/* -------------------------------- helpers -------------------------------- */

// Still in play: being served, or waiting in a session that has not ended
const isActive = (t: MyToken) =>
  t.status === "SERVING" || (t.status === "CONFIRMED" && t.queueStatus !== "ENDED");

// Only a waiting token can be cancelled. Once it is being served, it cannot.
const canCancel = (t: MyToken) => t.status === "CONFIRMED" && t.queueStatus !== "ENDED";

function dayLabel(t: MyToken): string {
  const today = todayIn(t.timezone);
  if (t.date === today) return "Today";
  if (t.date === addDays(today, 1)) return "Tomorrow";
  return dateText(t.date);
}

const mapsUrl = (t: MyToken) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${t.clinic.name}, ${t.clinic.address}`
  )}`;

function badgeClass(t: MyToken): string {
  if (t.status === "SERVING") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (t.status === "COMPLETED") return "bg-slate-100 text-slate-600 ring-slate-200";
  if (t.status === "CANCELLED") return "bg-rose-50 text-rose-600 ring-rose-200";
  if (t.queueStatus === "ENDED") return "bg-slate-100 text-slate-600 ring-slate-200";
  if (t.skipCount > 0) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-indigo-50 text-indigo-700 ring-indigo-200";
}

// What to show under "Estimated wait". Honest when the doctor has not started yet.
function estimateText(t: MyToken): { value: string; note?: string } {
  if (!t.estimate) return { value: "Not available" };
  const minutes = t.estimate.minutes;
  const around = `around ${formatClock(new Date(t.estimate.at), t.timezone)}`;

  if (t.queueStatus === "NOT_STARTED") {
    return minutes < 1
      ? { value: "Doctor has not started", note: "This updates once the queue starts" }
      : { value: `About ${waitText(minutes)}`, note: `${around}, if the doctor starts on time` };
  }
  if (minutes < 1) return { value: t.ahead === 0 ? "You are next" : "Any moment now" };
  return { value: `About ${waitText(minutes)}`, note: around };
}

/* ------------------------------- components ------------------------------- */

function Avatar({ t, size }: { t: MyToken; size: "md" | "sm" }) {
  const box = size === "md" ? "h-12 w-12 rounded-2xl" : "h-9 w-9 rounded-xl";
  return (
    <div
      className={`flex ${box} shrink-0 items-center justify-center overflow-hidden bg-linear-to-br from-blue-100 to-indigo-100 text-indigo-600 ring-2 ring-white/80`}
    >
      {t.doctor.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.doctor.image} alt={t.doctor.name} className="h-full w-full object-cover" />
      ) : (
        <Stethoscope size={size === "md" ? 22 : 18} aria-hidden="true" />
      )}
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold leading-snug text-slate-800">{value}</p>
      {note && <p className="mt-0.5 text-xs leading-snug text-slate-500">{note}</p>}
    </div>
  );
}

// Same shape as an active card, so the layout does not jump when the data arrives
function SkeletonCard() {
  return (
    <li className={`${glass} p-5 motion-safe:animate-pulse`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-200/80" />
          <div className="flex-1 space-y-2">
            <div className={`${bar} h-4 w-1/2`} />
            <div className={`${bar} h-3 w-1/3`} />
          </div>
        </div>
        <div className={`${bar} h-6 w-20 shrink-0`} />
      </div>

      <div className="mt-4 flex items-stretch gap-3">
        <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-200/80" />
        <div className="grid flex-1 gap-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-200/80" />
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-white/70 pt-3">
        <div className={`${bar} h-3 w-2/3`} />
        <div className={`${bar} h-3 w-5/6`} />
      </div>
    </li>
  );
}

function ActiveCard({
  t,
  index,
  onCancel,
}: {
  t: MyToken;
  index: number;
  onCancel: (t: MyToken) => void;
}) {
  const serving = t.status === "SERVING";
  const est = estimateText(t);

  return (
    <li>
      <Reveal index={index} className="h-full">
        <div className={`${glass} h-full p-5 ${serving ? "ring-2 ring-emerald-400" : ""}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar t={t} size="md" />
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-800">{t.doctor.name}</h3>
                <p className="truncate text-sm text-slate-500">{t.clinic.name}</p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${badgeClass(t)}`}>
              {tokenStatusText(t)}
            </span>
          </div>

          <div className="mt-4 flex items-stretch gap-3">
            <div
              className={`flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl px-2 py-3 text-white shadow-md ${
                serving
                  ? "bg-linear-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
                  : "bg-linear-to-br from-blue-600 to-indigo-600 shadow-indigo-500/30"
              }`}
            >
              <span className="text-xs opacity-80">Token</span>
              <span className="text-3xl font-bold leading-tight">#{t.tokenNumber}</span>
            </div>

            {serving ? (
              <p className="flex flex-1 items-center rounded-xl bg-emerald-50 px-4 text-sm font-medium text-emerald-700">
                The doctor is ready for you. Please go in now.
              </p>
            ) : (
              <div className="grid flex-1 gap-2 sm:grid-cols-3">
                <Stat label="Now serving" value={t.nowServing !== null ? `#${t.nowServing}` : "Not started"} />
                <Stat label="Ahead of you" value={String(t.ahead)} />
                <Stat label="Estimated wait" value={est.value} note={est.note} />
              </div>
            )}
          </div>

          {t.patientName && (
            <p className="mt-3 text-xs text-slate-500">
              Booked for <span className="font-medium text-slate-700">{t.patientName}</span>
            </p>
          )}

          <div className="mt-4 space-y-1.5 border-t border-white/70 pt-3 text-sm text-slate-600">
            <p className="flex items-center gap-1.5">
              <Clock size={14} className="shrink-0 text-indigo-400" aria-hidden="true" />
              {dayLabel(t)}, doctor sits {formatHHmm(t.startTime)} to {formatHHmm(t.endTime)}
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-1.5">
                <MapPin size={14} className="shrink-0 text-indigo-400" aria-hidden="true" />
                <span className="truncate" title={`${t.clinic.address}, ${t.clinic.city}`}>
                  {t.clinic.address}
                </span>
              </p>
              <a
                href={mapsUrl(t)}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-50 ${ring}`}
              >
                <Navigation size={12} aria-hidden="true" /> Directions
              </a>
            </div>

            {canCancel(t) && (
              <div className="flex justify-end pt-1.5">
                <button
                  type="button"
                  onClick={() => onCancel(t)}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 ${ring}`}
                >
                  <TicketX size={14} aria-hidden="true" /> Cancel token
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </li>
  );
}

// Finished tokens: one compact row each
function PastRow({ t, index }: { t: MyToken; index: number }) {
  return (
    <li>
      <Reveal index={index}>
        <div className={`${glass} flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3`}>
          <span className="w-12 shrink-0 text-lg font-bold text-slate-400">#{t.tokenNumber}</span>
          <Avatar t={t} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {t.doctor.name} <span className="font-normal text-slate-500">· {t.clinic.name}</span>
            </p>
            <p className="text-xs text-slate-500">
              {dayLabel(t)}, {formatHHmm(t.startTime)} to {formatHHmm(t.endTime)}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${badgeClass(t)}`}>
            {tokenStatusText(t)}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

function EmptyState({ title, text, showBook }: { title: string; text: string; showBook?: boolean }) {
  return (
    <Reveal>
      <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-10 text-center backdrop-blur-md">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
        {showBook && (
          <Link
            href="/user/book-clinic"
            className={`mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 ${gradient} ${ring}`}
          >
            Book a token
          </Link>
        )}
      </div>
    </Reveal>
  );
}

// "Are you sure?" popup. Native <dialog>: Escape closes it, focus stays inside.
function CancelDialog({
  token,
  busy,
  error,
  onConfirm,
  onClose,
}: {
  token: MyToken;
  busy: boolean;
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => {
    if (!busy) ref.current?.close(); // fires onClose
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => busy && e.preventDefault()} // no Escape while cancelling
      onClick={(e) => e.target === e.currentTarget && close()} // click on the dark area
      aria-labelledby="cancel-token-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-white/60 bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <TicketX size={22} aria-hidden="true" />
        </div>

        <h2 id="cancel-token-title" className="mt-4 text-lg font-semibold">
          Cancel token #{token.tokenNumber}?
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          {token.doctor.name} at {token.clinic.name}, {dayLabel(token)}. You will lose your place in the
          queue, and this cannot be undone. To visit again you will need to book a new token.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-rose-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={close}
            disabled={busy}
            className={`rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 ${ring}`}
          >
            Keep token
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            aria-busy={busy}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/30 hover:bg-rose-700 disabled:opacity-60 ${ring}`}
          >
            {busy ? (
              <>
                <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Cancelling...
              </>
            ) : (
              "Yes, cancel token"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

/* ---------------------------------- page ---------------------------------- */

type Tab = "active" | "past";

export default function MyTokensPage() {
  const { getToken } = useAuth();
  const [tokens, setTokens] = useState<MyToken[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<Tab | null>(null); // null = pick automatically

  // cancel popup
  const [cancelTarget, setCancelTarget] = useState<MyToken | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get<{ tokens: MyToken[] }>(ENDPOINT, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setTokens(data.tokens);
      setUpdatedAt(new Date());
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

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  function openCancel(t: MyToken) {
    setCancelError(null);
    setCancelTarget(t);
  }

  async function confirmCancel() {
    if (!cancelTarget || cancelling) return;
    setCancelling(true);
    setCancelError(null);

    try {
      await axios.patch(cancelEndpoint(cancelTarget.id), null, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setCancelTarget(null); // closes the popup
      await load(); // the token moves to the Past tab
    } catch (err) {
      setCancelError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          "Could not cancel the token. Please try again."
      );
      void load(); // the token may have changed (for example it was just called)
    } finally {
      setCancelling(false);
    }
  }

  const { active, past } = useMemo(() => {
    const list = tokens ?? [];
    const active = list
      .filter(isActive)
      .sort(
        (a, b) =>
          Number(b.status === "SERVING") - Number(a.status === "SERVING") ||
          a.date.localeCompare(b.date) ||
          a.startTime.localeCompare(b.startTime) ||
          a.tokenNumber - b.tokenNumber
      );
    const past = list
      .filter((t) => !isActive(t))
      .sort((a, b) => b.date.localeCompare(a.date) || b.tokenNumber - a.tokenNumber);
    return { active, past };
  }, [tokens]);

  const groups = useMemo(() => {
    const map = new Map<string, MyToken[]>();
    for (const t of active) {
      const key = dayLabel(t);
      map.set(key, [...(map.get(key) ?? []), t]);
    }
    return [...map.entries()];
  }, [active]);

  // Show the tab the patient most likely wants, until they choose one
  const view: Tab = tab ?? (active.length > 0 || past.length === 0 ? "active" : "past");

  // Make the browser tab say it when it is the patient's turn
  const servingNumber = tokens?.find((t) => t.status === "SERVING")?.tokenNumber;
  useEffect(() => {
    if (servingNumber === undefined) return;
    const original = document.title;
    document.title = `Your turn! Token #${servingNumber}`;
    return () => {
      document.title = original;
    };
  }, [servingNumber]);

  let body;
  if (!tokens) {
    body = error ? (
      <div role="alert" className={`${glass} p-6`}>
        <p className="text-sm text-rose-600">{error}</p>
        <button
          type="button"
          onClick={refresh}
          className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
        >
          Try again
        </button>
      </div>
    ) : (
      <div aria-busy="true">
        <p role="status" className="sr-only">
          Loading your tokens
        </p>
        <div className={`${bar} mb-3 h-4 w-20 motion-safe:animate-pulse`} />
        <ul className="grid gap-4 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      </div>
    );
  } else if (view === "active") {
    body =
      active.length === 0 ? (
        <EmptyState
          title="No active tokens"
          text="Book a token with a doctor to follow your turn here."
          showBook
        />
      ) : (
        <div className="space-y-6">
          {groups.map(([label, list]) => (
            <section key={label} aria-label={label}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</h2>
              <ul className="grid gap-4 lg:grid-cols-2">
                {list.map((t, i) => (
                  <ActiveCard key={t.id} t={t} index={i} onCancel={openCancel} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
  } else {
    body =
      past.length === 0 ? (
        <EmptyState title="Nothing here yet" text="Completed and cancelled tokens show up here." />
      ) : (
        <ul className="space-y-2.5">
          {past.map((t, i) => (
            <PastRow key={t.id} t={t} index={i} />
          ))}
        </ul>
      );
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "active", label: "Active", count: active.length },
    { key: "past", label: "Past", count: past.length },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            My Bookings
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Follow your turn live. The wait time is an estimate from how long the doctor took with recent
            patients.
          </p>
        </div>
        <Link
          href="/user/book-clinic"
          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 ${gradient} ${ring}`}
        >
          <Plus size={16} aria-hidden="true" /> Book a token
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Show tokens"
          className="inline-flex rounded-full border border-white/70 bg-white/60 p-1 backdrop-blur-md"
        >
          {tabs.map((t) => {
            const on = view === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${ring} ${
                  on ? gradient : "text-slate-600 hover:bg-white/80"
                }`}
              >
                {t.label}
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                    on ? "bg-white/25" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          {updatedAt && !error && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden="true" />
              Live, updated{" "}
              {updatedAt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            aria-label="Refresh now"
            className={`rounded-full p-1.5 text-slate-500 hover:bg-white/80 disabled:opacity-50 ${ring}`}
          >
            <RefreshCw size={15} className={refreshing ? "motion-safe:animate-spin" : ""} aria-hidden="true" />
          </button>
        </div>
      </div>

      {tokens && error && (
        <p role="status" className="text-xs text-amber-700">
          {error}
        </p>
      )}

      {body}

      {cancelTarget && (
        <CancelDialog
          key={cancelTarget.id}
          token={cancelTarget}
          busy={cancelling}
          error={cancelError}
          onConfirm={confirmCancel}
          onClose={() => setCancelTarget(null)}
        />
      )}
    </div>
  );
}