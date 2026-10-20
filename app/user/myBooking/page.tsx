"use client";

// app/user/myBooking/page.tsx

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { SPECIALTY_BY_SLUG, formatTime, initials } from "@/app/clinic/doctors/shared";
import { dateText, type BookingItem } from "@/lib/booking";

const ENDPOINT = "/api/user/bookings";

type Bookings = { upcoming: BookingItem[]; past: BookingItem[] };
type Tab = keyof Bookings;

const STATUS: Record<BookingItem["status"], { label: string; className: string }> = {
  PENDING: { label: "Booked", className: "bg-blue-50 text-blue-700" },
  COMPLETED: { label: "Completed", className: "bg-green-50 text-green-700" },
  CANCELLED: { label: "Cancelled", className: "bg-red-50 text-red-700" },
  SKIPPED: { label: "Skipped", className: "bg-amber-50 text-amber-700" },
};

function BookingCard({ booking: b }: { booking: BookingItem }) {
  const status = STATUS[b.status];

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 font-semibold text-blue-600">
          {b.doctor.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.doctor.image} alt={b.doctor.name} className="h-full w-full object-cover" />
          ) : (
            initials(b.doctor.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-gray-900">{b.doctor.name}</h2>
          <p className="text-sm text-gray-500">{SPECIALTY_BY_SLUG.get(b.doctor.specialtySlug)?.name}</p>
        </div>

        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0 text-gray-400" /> {b.clinic.name}, {b.clinic.city}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={14} className="shrink-0 text-gray-400" /> {dateText(b.date)}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} className="shrink-0 text-gray-400" /> {formatTime(b.time)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
        <span className="text-gray-500">{b.patientName ? `Patient: ${b.patientName}` : "Patient: self"}</span>
        <span className="rounded-lg bg-gray-100 px-3 py-1 font-semibold text-gray-900">Token #{b.tokenNumber}</span>
      </div>
    </div>
  );
}

export default function MyBookingPage() {
  const { getToken } = useAuth();
  const bookClinicHref = `${usePathname().replace(/\/[^/]+$/, "")}/book-clinic`;

  const [bookings, setBookings] = useState<Bookings | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("upcoming");

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const token = await getToken();
      const { data } = await axios.get<Bookings>(ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(data);
    } catch (err) {
      setLoadError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          "Could not load your bookings. Please try again."
      );
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  const list = bookings?.[tab] ?? [];

  let body;
  if (loadError) {
    body = (
      <div role="alert" className="rounded-xl border bg-white p-6">
        <p className="text-sm text-red-600">{loadError}</p>
        <button type="button" onClick={load} className="mt-3 rounded-lg border px-4 py-2 text-sm font-medium text-blue-600">
          Try again
        </button>
      </div>
    );
  } else if (!bookings) {
    body = (
      <div className="grid gap-4 md:grid-cols-2" aria-busy="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-44 animate-pulse rounded-xl border bg-white" />
        ))}
      </div>
    );
  } else if (list.length === 0) {
    body = (
      <div className="rounded-xl border border-dashed bg-white p-10 text-center">
        <p className="font-medium text-gray-800">
          {tab === "upcoming" ? "No upcoming bookings" : "No past bookings yet"}
        </p>
        {tab === "upcoming" && (
          <Link
            href={bookClinicHref}
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            Book a clinic
          </Link>
        )}
      </div>
    );
  } else {
    body = (
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-sm text-gray-500">All your tokens show up here.</p>
      </div>

      <div className="flex gap-2" role="group" aria-label="Bookings">
        {(["upcoming", "past"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${
              tab === t ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past"}
            {bookings && <span className="ml-1.5 opacity-70">{bookings[t].length}</span>}
          </button>
        ))}
      </div>

      {body}
    </div>
  );
}