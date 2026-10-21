"use client";

// app/user/book-clinic/[clinicId]/page.tsx

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft, Clock, Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import {
  SPECIALTY_BY_SLUG,
  formatTime,
  initials,
  summarizeSchedule,
  type ScheduleRow,
} from "@/app/clinic/doctors/shared";
import { HoursBadge, hoursText, type TodayHours } from "@/lib/clinicHours";
import Reveal from "@/components/Reveal";
import BookTokenModal from "./BookTokenModal";

// Glassmorphism tokens
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const pill = `rounded-full border border-white/70 bg-white/60 text-sm font-medium text-slate-700 backdrop-blur-md transition hover:bg-white/90 ${ring}`;
const bar = "rounded-full bg-slate-200/80";

type Doctor = {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  specialtySlug: string;
  schedules: ScheduleRow[];
};

type ClinicDetail = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  logo: string | null;
  clinicImage: string[];
  doctors: Doctor[];
  hours: TodayHours;
};

function InfoItem({ icon: Icon, children, wide }: { icon: typeof MapPin; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`flex items-start gap-3 text-sm text-slate-600 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="pt-1.5">{children}</span>
    </div>
  );
}

/* ------------------------------ loading skeleton ------------------------------ */

// Same shape as the real clinic header, so the layout does not jump when the data arrives
function HeaderSkeleton() {
  return (
    <div className={`${glass} p-6 motion-safe:animate-pulse`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="h-20 w-20 shrink-0 rounded-2xl bg-slate-200/80" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className={`${bar} h-7 w-56`} />
            <div className={`${bar} h-6 w-20`} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className={`${bar} h-8 w-full sm:col-span-2`} />
            <div className={`${bar} h-8 w-3/4`} />
            <div className={`${bar} h-8 w-3/4`} />
            <div className={`${bar} h-8 w-full sm:col-span-2`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorSkeleton() {
  return (
    <div className={`${glass} p-5 motion-safe:animate-pulse`}>
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200/80" />
        <div className="flex-1 space-y-2">
          <div className={`${bar} h-4 w-1/2`} />
          <div className={`${bar} h-5 w-24`} />
        </div>
        <div className="h-9 w-24 shrink-0 rounded-xl bg-slate-200/80" />
      </div>
      <div className={`${bar} mt-4 h-3 w-5/6`} />
      <div className="mt-4 space-y-2">
        <div className="h-12 rounded-xl bg-slate-200/80" />
        <div className="h-12 rounded-xl bg-slate-200/80" />
      </div>
    </div>
  );
}

/* ---------------------------------- doctor card --------------------------------- */

function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: () => void }) {
  const specialty = SPECIALTY_BY_SLUG.get(doctor.specialtySlug);

  return (
    <div className={`${glass} p-5 transition duration-200 hover:shadow-[0_16px_40px_rgba(79,70,229,0.14)]`}>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-100 to-indigo-100 text-lg font-semibold text-indigo-700 shadow-sm ring-2 ring-white/80">
          {doctor.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
          ) : (
            initials(doctor.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
          {specialty && (
            <span className="mt-1 inline-block rounded-full bg-indigo-50/80 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
              {specialty.name}
            </span>
          )}
        </div>

        {/* The booking popup opens instantly and shows its own loading state */}
        <button
          type="button"
          onClick={onBook}
          className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90 ${gradient} ${ring}`}
        >
          Book Now
        </button>
      </div>

      {specialty && (
        <p className="mt-3 text-xs text-slate-500">
          {specialty.category}. {specialty.description}
        </p>
      )}
      {doctor.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{doctor.description}</p>}

      <div className="mt-4 space-y-2">
        {summarizeSchedule(doctor.schedules).map((l) => (
          <div
            key={`${l.daysLabel}-${l.startTime}-${l.endTime}`}
            className="flex items-start gap-2.5 rounded-xl bg-white/50 px-3 py-2 ring-1 ring-white/70"
          >
            <Clock size={15} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
            <div className="text-sm">
              <p className="font-medium text-slate-800">
                {l.daysLabel}
                <span className="font-normal text-slate-500">
                  {" "}
                  {formatTime(l.startTime)} to {formatTime(l.endTime)}
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {l.bookingCloseTime
                  ? `Booking closes at ${formatTime(l.bookingCloseTime)}`
                  : "Booking closes when the doctor finishes"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------ page ------------------------------------ */

export default function ClinicPage() {
  const { getToken } = useAuth();
  const { clinicId } = useParams<{ clinicId: string }>();
  const backHref = usePathname().replace(/\/[^/]+$/, ""); // /.../book-clinic

  const [clinic, setClinic] = useState<ClinicDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const token = await getToken();
      const { data } = await axios.get<{ clinic: ClinicDetail }>(`/api/user/all-clinic/${clinicId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClinic(data.clinic);
    } catch (err) {
      setLoadError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Could not load the clinic. Please try again."
      );
    }
  }, [getToken, clinicId]);

  useEffect(() => {
    load();
  }, [load]);

  const backLink = (
    <Link href={backHref} className={`${pill} inline-flex items-center gap-1.5 px-4 py-2 shadow-sm`}>
      <ArrowLeft size={16} aria-hidden="true" /> All clinics
    </Link>
  );

  if (loadError) {
    return (
      <div className="space-y-6">
        {backLink}
        <div role="alert" className={`${glass} p-6`}>
          <p className="text-sm text-rose-600">{loadError}</p>
          <button type="button" onClick={load} className={`${pill} mt-3 px-4 py-2`}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="space-y-6" aria-busy="true">
        {backLink}
        <p role="status" className="sr-only">
          Loading clinic
        </p>
        <HeaderSkeleton />
        <div className="flex items-center gap-3 motion-safe:animate-pulse">
          <div className={`${bar} h-6 w-24`} />
          <div className={`${bar} h-5 w-8`} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <DoctorSkeleton />
          <DoctorSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {backLink}

      {/* Clinic info */}
      <Reveal>
        <div className={`${glass} p-6`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 text-indigo-600 shadow-sm ring-2 ring-white/80">
              {clinic.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={clinic.logo} alt={clinic.name} className="h-full w-full object-cover" />
              ) : (
                <Stethoscope size={32} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">{clinic.name}</h1>
                <HoursBadge hours={clinic.hours} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoItem icon={MapPin} wide>
                  {clinic.address}, {clinic.city}
                </InfoItem>
                <InfoItem icon={Phone}>{clinic.phone}</InfoItem>
                <InfoItem icon={Mail}>{clinic.email}</InfoItem>
                <InfoItem icon={Clock} wide>
                  {hoursText(clinic.hours)}
                </InfoItem>
              </div>
            </div>
          </div>

          {clinic.clinicImage.length > 0 && (
            <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
              {clinic.clinicImage.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={clinic.name}
                  className="h-36 w-56 shrink-0 rounded-2xl object-cover shadow-md ring-2 ring-white/80"
                />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Doctors */}
      <Reveal index={1}>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-800">Doctors</h2>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            {clinic.doctors.length}
          </span>
        </div>
      </Reveal>

      {clinic.doctors.length === 0 ? (
        <Reveal index={2}>
          <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-10 text-center backdrop-blur-md">
            <p className="font-semibold text-slate-800">No doctors available right now</p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {clinic.doctors.map((d, i) => (
            <Reveal key={d.id} index={i + 2}>
              <DoctorCard doctor={d} onBook={() => setBookingDoctor(d)} />
            </Reveal>
          ))}
        </div>
      )}

      {bookingDoctor && <BookTokenModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />}
    </div>
  );
}