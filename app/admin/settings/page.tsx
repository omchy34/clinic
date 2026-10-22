"use client";

// app/admin/settings/page.tsx

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle2, IndianRupee, Loader2 } from "lucide-react";

const ENDPOINT = "/api/admin/settings/token-price";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";

const errorMessage = (err: unknown, fallback: string) =>
  (axios.isAxiosError(err) && err.response?.data?.message) || fallback;

export default function AdminSettingsPage() {
  const { getToken } = useAuth();

  const [current, setCurrent] = useState<number | null>(null); // rupees
  const [value, setValue] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const authHeader = useCallback(
    async () => ({ headers: { Authorization: `Bearer ${await getToken()}` } }),
    [getToken]
  );

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const { data } = await axios.get<{ rupees: number }>(ENDPOINT, await authHeader());
      setCurrent(data.rupees);
      setValue(String(data.rupees));
    } catch (err) {
      setLoadError(errorMessage(err, "Could not load the price. Please try again."));
    }
  }, [authHeader]);

  useEffect(() => {
    void load();
  }, [load]);

  const rupees = Number(value);
  const valid = value.trim() !== "" && Number.isFinite(rupees) && rupees >= 0 && rupees <= 10000;
  const changed = valid && rupees !== current;

  async function save() {
    if (!changed || saving) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const { data } = await axios.put<{ rupees: number }>(ENDPOINT, { rupees }, await authHeader());
      setCurrent(data.rupees);
      setValue(String(data.rupees));
      setSaved(true);
    } catch (err) {
      setError(errorMessage(err, "Could not save the price. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">Platform-wide settings for every clinic.</p>
      </div>

      <div className={`${glass} max-w-xl p-6`}>
        <h2 className="text-lg font-semibold text-slate-800">Token price</h2>
        <p className="mt-1 text-sm text-slate-500">
          One price per token, same for all clinics. A change applies only to new bookings. Tokens already booked keep
          the price the patient paid.
        </p>

        {loadError ? (
          <div role="alert" className="mt-4">
            <p className="text-sm text-rose-600">{loadError}</p>
            <button
              type="button"
              onClick={load}
              className={`mt-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
            >
              Try again
            </button>
          </div>
        ) : current === null ? (
          <div className="mt-4 space-y-3 motion-safe:animate-pulse" aria-busy="true">
            <div className="h-4 w-40 rounded-full bg-slate-200/80" />
            <div className="h-11 rounded-xl bg-slate-200/80" />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-600">
              Current price: <span className="text-xl font-bold text-indigo-600">₹{current}</span> per token
              {current === 0 && <span className="ml-2 text-xs text-amber-600">(free, payment is skipped)</span>}
            </p>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">New price (in rupees)</span>
              <div className="relative mt-1.5">
                <IndianRupee
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={10000}
                  step="1"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setSaved(false);
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-white/80 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-400"
                />
              </div>
              <span className="mt-1.5 block text-xs text-slate-500">
                Minimum ₹1. Enter 0 to make tokens free. Razorpay deducts its own commission from each payment.
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
                {error}
              </p>
            )}
            {saved && (
              <p
                role="status"
                className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-700"
              >
                <CheckCircle2 size={16} aria-hidden="true" /> Price updated. New bookings will use ₹{current}.
              </p>
            )}

            <button
              type="button"
              onClick={save}
              disabled={!changed || saving}
              aria-busy={saving}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50 ${gradient} ${ring}`}
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                "Save price"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}