"use client";

// app/admin/payments/page.tsx
// Admin: saare clinics ke tokens, payments, cancellations aur refunds.

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, todayIn } from "@/lib/booking";

const ENDPOINT = "/api/admin/payments";
const TZ = "Asia/Kolkata";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const field =
  "rounded-xl border border-white/80 bg-white/70 px-3 py-2 text-sm text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

type Summary = {
  tokens: number;
  cancelled: number;
  paidTokens: number;
  collected: number;
  refunded: number;
  fees: number;
  net: number;
};
type ClinicStat = Summary & { id: string; name: string };
type Row = {
  id: string;
  createdAt: string;
  tokenNumber: number;
  status: "CONFIRMED" | "SERVING" | "COMPLETED" | "CANCELLED";
  cancelledBy: "USER" | "CLINIC" | "SYSTEM" | null;
  patient: string;
  email: string;
  clinic: string;
  doctor: string;
  sessionDate: string;
  paidRupees: number;
  feeRupees: number;
  method: string | null;
  paymentId: string | null;
  refund: null | { rupees: number; feeRupees: number; status: "INITIATED" | "PENDING" | "PROCESSED" | "FAILED" };
};
type Data = {
  page: number;
  pages: number;
  total: number;
  clinics: { id: string; name: string }[];
  summary: Summary;
  byClinic: ClinicStat[];
  rows: Row[];
};

const STATUS_TABS = [
  { key: "ALL", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
];

const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

function statusBadge(r: Row) {
  if (r.status === "COMPLETED") return { text: "Completed", cls: "bg-slate-100 text-slate-600 ring-slate-200" };
  if (r.status === "CANCELLED") {
    const by = r.cancelledBy === "CLINIC" ? "clinic" : r.cancelledBy === "SYSTEM" ? "system" : "user";
    return { text: `Cancelled (${by})`, cls: "bg-rose-50 text-rose-600 ring-rose-200" };
  }
  if (r.status === "SERVING") return { text: "Serving", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  return { text: "Waiting", cls: "bg-indigo-50 text-indigo-700 ring-indigo-200" };
}

function refundCell(r: Row) {
  if (!r.refund) return <span className="text-slate-400">-</span>;
  const label =
    r.refund.status === "PROCESSED"
      ? "Processed"
      : r.refund.status === "FAILED"
        ? "Failed, retry needed"
        : "In progress";
  return (
    <div>
      <p className="font-medium text-slate-800">{inr(r.refund.rupees)}</p>
      <p className={`text-xs ${r.refund.status === "FAILED" ? "text-rose-600" : "text-slate-500"}`}>{label}</p>
    </div>
  );
}

function Card({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className={`${glass} p-4`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
      {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
    </div>
  );
}

export default function AdminPaymentsPage() {
  const { getToken } = useAuth();

  const [from, setFrom] = useState(() => addDays(todayIn(TZ), -29));
  const [to, setTo] = useState(() => todayIn(TZ));
  const [clinicId, setClinicId] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Data>(ENDPOINT, {
        headers: { Authorization: `Bearer ${await getToken()}` },
        params: {
          from,
          to,
          clinicId: clinicId || undefined,
          status: status === "ALL" ? undefined : status,
          page,
        },
      });
      setData(data);
      setError(null);
    } catch (err) {
      setError(
        (axios.isAxiosError(err) && err.response?.data?.message) || "Could not load the payments. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [getToken, from, to, clinicId, status, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const pickClinic = (id: string) => {
    setClinicId(id);
    setPage(1);
  };

  const s = data?.summary;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Payments
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Tokens booked, money received, cancellations and refunds across all clinics. Dates are by booking day (IST).
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs text-slate-500">
          From
          <input
            type="date"
            value={from}
            max={to}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(1);
            }}
            className={`${field} mt-1 block`}
          />
        </label>
        <label className="text-xs text-slate-500">
          To
          <input
            type="date"
            value={to}
            min={from}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(1);
            }}
            className={`${field} mt-1 block`}
          />
        </label>
        <label className="text-xs text-slate-500">
          Clinic
          <select value={clinicId} onChange={(e) => pickClinic(e.target.value)} className={`${field} mt-1 block`}>
            <option value="">All clinics</option>
            {data?.clinics.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div
          role="tablist"
          aria-label="Token status"
          className="inline-flex rounded-full border border-white/70 bg-white/60 p-1 backdrop-blur-md"
        >
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={status === t.key}
              onClick={() => {
                setStatus(t.key);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${ring} ${
                status === t.key ? gradient : "text-slate-600 hover:bg-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div role="alert" className={`${glass} p-4`}>
          <p className="text-sm text-rose-600">{error}</p>
          <button
            type="button"
            onClick={load}
            className={`mt-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-white ${ring}`}
          >
            Try again
          </button>
        </div>
      )}

      {!data && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 motion-safe:animate-pulse" aria-busy="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-200/80" />
          ))}
        </div>
      )}

      {data && s && (
        <div className={loading ? "space-y-6 opacity-60 transition" : "space-y-6 transition"}>
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card label="Tokens booked" value={String(s.tokens)} note={`${s.paidTokens} paid, ${s.cancelled} cancelled`} />
            <Card label="Money received" value={inr(s.collected)} />
            <Card label="Refunded" value={inr(s.refunded)} />
            <Card label="Razorpay fees" value={inr(s.fees)} note="Fee + GST" />
            <Card label="Net earning" value={inr(s.net)} note="Received - refunded - fees" />
          </div>

          {/* Clinic wise */}
          <div className={`${glass} overflow-hidden`}>
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-800">Clinic wise</h2>
              {clinicId && (
                <button
                  type="button"
                  onClick={() => pickClinic("")}
                  className={`rounded-full px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-50 ${ring}`}
                >
                  Show all clinics
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-left text-sm">
                <thead className="bg-white/50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-2.5 font-medium">Clinic</th>
                    <th className="px-3 py-2.5 font-medium">Tokens</th>
                    <th className="px-3 py-2.5 font-medium">Cancelled</th>
                    <th className="px-3 py-2.5 font-medium">Received</th>
                    <th className="px-3 py-2.5 font-medium">Refunded</th>
                    <th className="px-3 py-2.5 font-medium">Fees</th>
                    <th className="px-5 py-2.5 font-medium">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/70">
                  {data.byClinic.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                        No tokens in this date range.
                      </td>
                    </tr>
                  ) : (
                    data.byClinic.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => pickClinic(c.id)}
                        className={`cursor-pointer hover:bg-white/60 ${c.id === clinicId ? "bg-indigo-50/60" : ""}`}
                      >
                        <td className="px-5 py-3 font-medium text-slate-800">{c.name}</td>
                        <td className="px-3 py-3 text-slate-600">{c.tokens}</td>
                        <td className="px-3 py-3 text-slate-600">{c.cancelled}</td>
                        <td className="px-3 py-3 text-slate-600">{inr(c.collected)}</td>
                        <td className="px-3 py-3 text-slate-600">{inr(c.refunded)}</td>
                        <td className="px-3 py-3 text-slate-600">{inr(c.fees)}</td>
                        <td className="px-5 py-3 font-semibold text-slate-800">{inr(c.net)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transactions */}
          <div className={`${glass} overflow-hidden`}>
            <div className="px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-800">Tokens</h2>
              <p className="text-xs text-slate-500">{data.total} found</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-240 text-left text-sm">
                <thead className="bg-white/50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-2.5 font-medium">Booked</th>
                    <th className="px-3 py-2.5 font-medium">Token</th>
                    <th className="px-3 py-2.5 font-medium">Patient</th>
                    <th className="px-3 py-2.5 font-medium">Clinic / Doctor</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="px-3 py-2.5 font-medium">Paid</th>
                    <th className="px-3 py-2.5 font-medium">Fee</th>
                    <th className="px-5 py-2.5 font-medium">Refund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/70">
                  {data.rows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                        Nothing found for these filters.
                      </td>
                    </tr>
                  ) : (
                    data.rows.map((r) => {
                      const b = statusBadge(r);
                      return (
                        <tr key={r.id} className="align-top hover:bg-white/60">
                          <td className="px-5 py-3 text-slate-600">{when(r.createdAt)}</td>
                          <td className="px-3 py-3 font-semibold text-slate-800">#{r.tokenNumber}</td>
                          <td className="px-3 py-3">
                            <p className="font-medium text-slate-800">{r.patient}</p>
                            <p className="text-xs text-slate-500">{r.email}</p>
                          </td>
                          <td className="px-3 py-3">
                            <p className="font-medium text-slate-800">{r.clinic}</p>
                            <p className="text-xs text-slate-500">
                              {r.doctor} · {r.sessionDate}
                            </p>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${b.cls}`}>
                              {b.text}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            {r.paidRupees > 0 ? (
                              <div>
                                <p className="font-medium text-slate-800">{inr(r.paidRupees)}</p>
                                <p className="text-xs text-slate-500" title={r.paymentId ?? undefined}>
                                  {r.method ?? "online"}
                                </p>
                              </div>
                            ) : (
                              <span className="text-slate-400">Free</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-slate-600">{r.feeRupees > 0 ? inr(r.feeRupees) : "-"}</td>
                          <td className="px-5 py-3">{refundCell(r)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {data.pages > 1 && (
              <div className="flex items-center justify-between border-t border-white/70 px-5 py-3 text-sm text-slate-600">
                <span>
                  Page {data.page} of {data.pages}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={data.page <= 1 || loading}
                    onClick={() => setPage((p) => p - 1)}
                    aria-label="Previous page"
                    className={`rounded-full border border-white/70 bg-white/70 p-2 hover:bg-white disabled:opacity-40 ${ring}`}
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={data.page >= data.pages || loading}
                    onClick={() => setPage((p) => p + 1)}
                    aria-label="Next page"
                    className={`rounded-full border border-white/70 bg-white/70 p-2 hover:bg-white disabled:opacity-40 ${ring}`}
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}