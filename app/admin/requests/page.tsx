"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Check, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// Same field names as the Prisma Clinic model. `user` is the included User relation.
type ClinicRequest = {
  id: string;
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  logo: string | null;
  clinicImage: string[];
  isApproved: boolean;
  userId: string;
  createdAt: string;
  user?: { name: string | null; email: string } | null;
};

type Filter = "pending" | "approved" | "all";

// GET lists pending clinics and POST approves one. A second route lists approved clinics.
const PENDING_API = "/api/admin/approve-clinic";
const APPROVED_API = "/api/admin/approved-clinic";
const glass = "border border-white/60 bg-white/40 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";

function StatusBadge({ approved }: { approved: boolean }) {
  const Icon = approved ? CheckCircle2 : Clock;
  const style = approved ? "bg-emerald-100/80 text-emerald-800" : "bg-amber-100/80 text-amber-800";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      <Icon size={14} />
      {approved ? "Approved" : "Pending"}
    </span>
  );
}

type CardProps = { clinic: ClinicRequest; approving: boolean; onApprove: () => void };

function ClinicCard({ clinic, approving, onApprove }: CardProps) {
  const date = new Date(clinic.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className={`flex flex-col gap-4 rounded-2xl p-5 ${glass}`}>
      <div className="flex items-start gap-3">
        {clinic.logo ? (
          <img src={clinic.logo} alt="" className="h-12 w-12 rounded-xl object-cover" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
            {clinic.name[0]}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-gray-800">{clinic.name}</h2>
          <p className="text-sm text-gray-600">
            {clinic.user?.name ? `${clinic.user.name} • ` : ""}
            {date}
          </p>
        </div>
        <StatusBadge approved={clinic.isApproved} />
      </div>

      {clinic.clinicImage.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {clinic.clinicImage.map((src, i) => (
            <img key={`${i}-${src}`} src={src} alt="" className="h-24 w-32 shrink-0 rounded-lg object-cover" />
          ))}
        </div>
      )}

      <ul className="space-y-1.5 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0 text-indigo-600" />
          {clinic.address}, {clinic.city}
        </li>
        <li className="flex items-center gap-2">
          <Phone size={16} className="shrink-0 text-indigo-600" />
          {clinic.phone}
        </li>
        <li className="flex items-center gap-2">
          <Mail size={16} className="shrink-0 text-indigo-600" />
          {clinic.email}
        </li>
      </ul>

      {!clinic.isApproved && (
        <button
          onClick={onApprove}
          disabled={approving}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
        >
          <Check size={16} />
          {approving ? "Approving..." : "Approve clinic"}
        </button>
      )}
    </article>
  );
}

export default function Page() {
  const { getToken } = useAuth();
  const [requests, setRequests] = useState<ClinicRequest[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const token = await getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [pending, approved] = await Promise.all([
          axios.get(PENDING_API, config),
          axios.get(APPROVED_API, config),
        ]);
        setRequests([...(pending.data.ClinicRequests ?? []), ...(approved.data.ClinicRequests ?? [])]);
      } catch (err) {
        console.error(err);
        setError("Could not load clinic requests. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [getToken]);

  async function approve(id: string) {
    setApprovingId(id);
    setError("");
    try {
      const token = await getToken();
      await axios.post(
        PENDING_API,
        { clinicId: id, isApproved: true },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r)));
    } catch (err) {
      console.error(err);
      setError("Could not approve this clinic. Please try again.");
    } finally {
      setApprovingId(null);
    }
  }

  const pending = requests.filter((r) => !r.isApproved).length;
  const counts = { pending, approved: requests.length - pending, all: requests.length };
  const visible = requests.filter((r) => filter === "all" || (filter === "approved") === r.isApproved);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Clinic requests</h1>
        <p className="mt-1 text-sm text-gray-600">Review new clinics and approve them to go live.</p>
      </div>

      <div className={`inline-flex rounded-xl p-1 ${glass}`}>
        {(["pending", "approved", "all"] as Filter[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize ${
              filter === key
                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
                : "text-gray-700 hover:bg-white/60"
            }`}
          >
            {key} ({counts[key]})
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && <p className="text-gray-600">Loading...</p>}

      {!loading && visible.length === 0 && (
        <p className={`rounded-2xl p-10 text-center text-gray-600 ${glass}`}>No clinics here yet.</p>
      )}

      {visible.length > 0 && (
        <div className="grid gap-4 xl:grid-cols-2">
          {visible.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              approving={approvingId === clinic.id}
              onApprove={() => approve(clinic.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}