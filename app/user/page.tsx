"use client";

// Patient dashboard: the next token with its live status, plus the next few bookings.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { Stethoscope, Ticket } from "lucide-react";
import { TOKEN_POLL_MS, dateText, formatHHmm } from "@/lib/patient-booking";

const ENDPOINT = "/api/user/dashboard";

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
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        serving ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {serving ? "Called" : "Waiting"}
    </span>
  );
}

function NextTokenCard({ t }: { t: DashToken }) {
  const serving = t.status === "SERVING";

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Ticket size={20} className="text-blue-600" />
          Your Next Token
        </h2>
        <StatusBadge status={t.status} />
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white">
          <span className="text-xs text-blue-100">Token</span>
          <span className="text-3xl font-bold">#{t.tokenNumber}</span>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-lg font-semibold text-gray-900">{t.clinicName}</p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <Stethoscope size={14} /> {t.doctorName}
            </p>
            <p className="text-sm text-gray-500">
              {when(t)}, {formatHHmm(t.startTime)} to {formatHHmm(t.endTime)}
            </p>
          </div>

          {serving ? (
            <p className="rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-700">
              It&apos;s your turn. The doctor is seeing you now.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xl font-bold text-gray-900">
                  {t.nowServing !== null ? `#${t.nowServing}` : "-"}
                </p>
                <p className="text-xs text-gray-500">Now serving</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xl font-bold text-gray-900">{t.ahead ?? "-"}</p>
                <p className="text-xs text-gray-500">People ahead of you</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Link
        href={`/user/my-tokens`}
        className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
      >
        View Token
      </Link>
    </div>
  );
}

function NoToken() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-dashed bg-white p-6 sm:flex-row sm:items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">No active token</h2>
        <p className="text-sm text-gray-500">Choose a clinic, pick a date and get your token.</p>
      </div>
      <Link
        href="/user/book-clinic"
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
      >
        Book Clinic
      </Link>
    </div>
  );
}

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
      <div role="alert" className="rounded-xl border bg-white p-6">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={load}
          className="mt-3 rounded-lg border px-4 py-1.5 text-sm font-medium text-blue-600"
        >
          Try again
        </button>
      </div>
    ) : (
      <div className="space-y-6" aria-busy="true" aria-label="Loading your dashboard">
        <div className="h-52 rounded-xl border bg-white motion-safe:animate-pulse" />
        <div className="h-32 rounded-xl border bg-white motion-safe:animate-pulse" />
      </div>
    );
  }

  const [next, ...rest] = tokens;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋
      </h1>

      {error && (
        <p role="status" className="text-xs text-amber-700">
          {error}
        </p>
      )}

      {next ? <NextTokenCard t={next} /> : <NoToken />}

      {rest.length > 0 && (
        <div className="rounded-xl border bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming</h2>
            <Link href="/user/my-tokens" className="text-sm font-medium text-blue-600">
              View all
            </Link>
          </div>
          <ul className="divide-y">
            {rest.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                    #{t.tokenNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">{t.clinicName}</p>
                    <p className="truncate text-sm text-gray-500">
                      {t.doctorName} · {when(t)}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/user/my-tokens`}
                  className="shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium text-blue-600"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Run a clinic?</h2>
          <p className="text-sm text-blue-100">Register your clinic and reach thousands of patients.</p>
        </div>
        <Link
          href="/create-your-clinic"
          className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-blue-600"
        >
          Create Your Clinic
        </Link>
      </div>
    </div>
  );
}