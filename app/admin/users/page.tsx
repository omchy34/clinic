"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Building2, CalendarCheck, CheckCircle2, Clock, Eye, Mail, Search, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type Clinic = {
  id: string;
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  logo: string | null;
  clinicImage: string[];
  isApproved: boolean;
  createdAt: string;
};


type Booking = { id?: string; [key: string]: unknown };

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
  clinic: Clinic | null;
  bookings: Booking[];
};


const USERS_API = "/api/admin/users";
const glass = "border border-white/60 bg-white/40 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";

function formatDate(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-IN");
}

function toText(value: unknown) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function Avatar({ user, size }: { user: UserItem; size: string }) {
  if (user.image) {
    return <img src={user.image} alt="" className={`${size} shrink-0 rounded-full object-cover`} />;
  }
  const letter = (user.name || user.email || "?")[0].toUpperCase();
  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 font-bold text-white`}
    >
      {letter}
    </div>
  );
}

function RoleBadge({ clinic }: { clinic: Clinic | null }) {
  if (!clinic) {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-gray-100/80 px-2.5 py-1 text-xs font-medium text-gray-700">
        User
      </span>
    );
  }
  const Icon = clinic.isApproved ? CheckCircle2 : Clock;
  const style = clinic.isApproved ? "bg-emerald-100/80 text-emerald-800" : "bg-amber-100/80 text-amber-800";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      <Icon size={14} />
      {clinic.isApproved ? "Clinic" : "Clinic pending"}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-gray-500">{label}</dt>
      <dd className="wrap-break-words text-sm text-gray-800">{value}</dd>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: typeof Building2; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 border-t border-gray-200 pt-4 text-sm font-semibold text-gray-800">
      <Icon size={16} className="text-indigo-600" />
      {children}
    </h3>
  );
}

function UserCard({ user, onView }: { user: UserItem; onView: () => void }) {
  const joined = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className={`flex flex-col gap-4 rounded-2xl p-5 ${glass}`}>
      <div className="flex items-start gap-3">
        <Avatar user={user} size="h-12 w-12 text-lg" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-gray-800">{user.name || "No name"}</h2>
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <Mail size={14} className="shrink-0 text-indigo-600" />
            <span className="truncate">{user.email}</span>
          </p>
        </div>
        <RoleBadge clinic={user.clinic} />
      </div>

      <p className="text-sm text-gray-600">
        Joined {joined} • {user.bookings.length} {user.bookings.length === 1 ? "booking" : "bookings"}
      </p>

      <button
        onClick={onView}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-white/90"
      >
        <Eye size={16} />
        View details
      </button>
    </article>
  );
}

function UserModal({ user, onClose }: { user: UserItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const { clinic, bookings } = user;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl border border-white/60 bg-white/95 p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <Avatar user={user} size="h-14 w-14 text-xl" />
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name || "No name"}</h2>
            <RoleBadge clinic={clinic} />
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Row label="Email" value={user.email} />
          <Row label="Joined on" value={formatDate(user.createdAt)} />
          <Row label="User ID" value={user.id} />
          <Row label="Total bookings" value={String(bookings.length)} />
        </dl>

        <SectionTitle icon={Building2}>Clinic</SectionTitle>
        {clinic ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {clinic.logo && <img src={clinic.logo} alt="" className="h-12 w-12 rounded-xl object-cover" />}
              <p className="font-semibold text-gray-800">{clinic.name}</p>
            </div>

            {clinic.clinicImage.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {clinic.clinicImage.map((src, i) => (
                  <img key={`${i}-${src}`} src={src} alt="" className="h-28 w-40 shrink-0 rounded-lg object-cover" />
                ))}
              </div>
            )}

            <dl className="grid gap-4 sm:grid-cols-2">
              <Row label="Address" value={clinic.address} />
              <Row label="City" value={clinic.city} />
              <Row label="Clinic email" value={clinic.email} />
              <Row label="Clinic phone" value={clinic.phone} />
              <Row label="Status" value={clinic.isApproved ? "Approved" : "Pending approval"} />
              <Row label="Registered on" value={formatDate(clinic.createdAt)} />
              <Row label="Clinic ID" value={clinic.id} />
            </dl>
          </div>
        ) : (
          <p className="text-sm text-gray-600">This user has not registered a clinic.</p>
        )}

        <SectionTitle icon={CalendarCheck}>Bookings ({bookings.length})</SectionTitle>
        {bookings.length === 0 ? (
          <p className="text-sm text-gray-600">No bookings yet.</p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking, i) => (
              <li key={booking.id ?? i} className="rounded-xl border border-gray-200 p-3">
                <dl className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(booking).map(([key, value]) => (
                    <Row key={key} label={key} value={toText(value)} />
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = await getToken();
        const { data } = await axios.get(USERS_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data.allUsers ?? []);
      } catch (err) {
        console.error(err);
        setError("Could not load users. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [getToken]);

  const selected = users.find((u) => u.id === selectedId) ?? null;

  const q = query.trim().toLowerCase();
  const visible = users.filter(
    (u) => !q || (u.name ?? "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="mt-1 text-sm text-gray-600">
          {loading ? "Loading users..." : `${users.length} registered users`}
        </p>
      </div>

      <div className={`flex max-w-md items-center gap-2 rounded-xl px-3 py-2 ${glass}`}>
        <Search size={16} className="shrink-0 text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className={`rounded-2xl p-10 text-center text-gray-600 ${glass}`}>No users found.</p>
      )}

      {visible.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((user) => (
            <UserCard key={user.id} user={user} onView={() => setSelectedId(user.id)} />
          ))}
        </div>
      )}

      {selected && <UserModal user={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}