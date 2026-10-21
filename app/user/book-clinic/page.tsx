"use client";

// app/user/book-clinic/page.tsx

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Clock, Loader2, MapPin, Search, Stethoscope, Users } from "lucide-react";
import { HoursBadge, hoursText, type TodayHours } from "@/lib/clinicHours";

const ENDPOINT = "/api/user/all-clinic";

// Glassmorphism tokens
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
  "rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(79,70,229,0.08)] backdrop-blur-xl";
const gradient = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";
const pill = `rounded-full border border-white/70 bg-white/60 text-sm font-medium text-slate-700 backdrop-blur-md transition hover:bg-white/90 ${ring}`;

type ClinicCard = {
  id: string;
  name: string;
  address: string;
  city: string;
  logo: string | null;
  doctorCount: number;
  specialties: string[];
  hours: TodayHours;
};

function Info({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 text-sm text-slate-600">
      <Icon size={15} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// Fades and slides a card in once it is mounted. `index` staggers the cards one after another.
function Reveal({ index, children }: { index: number; children: React.ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShown(true), 30); // lets the browser paint the hidden state first
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      style={{ transitionDelay: shown ? `${Math.min(index, 8) * 70}ms` : "0ms" }}
      className={`h-full transition duration-500 ease-out motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      {children}
    </div>
  );
}

// Same shape as a real card, so the layout does not jump when the data arrives
function SkeletonCard() {
  const bar = "rounded-full bg-slate-200/80";
  return (
    <div className={`${glass} flex h-full flex-col p-5 motion-safe:animate-pulse`}>
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-200/80" />
        <div className="flex-1 space-y-2">
          <div className={`${bar} h-4 w-2/3`} />
          <div className={`${bar} h-3 w-1/3`} />
        </div>
      </div>
      <div className="mt-4 flex gap-1.5">
        <div className={`${bar} h-5 w-16`} />
        <div className={`${bar} h-5 w-20`} />
        <div className={`${bar} h-5 w-12`} />
      </div>
      <div className="mt-4 space-y-2.5">
        <div className={`${bar} h-3 w-full`} />
        <div className={`${bar} h-3 w-1/2`} />
        <div className={`${bar} h-3 w-3/4`} />
      </div>
      <div className="mt-5 h-10 rounded-xl bg-slate-200/80" />
    </div>
  );
}

function ClinicCardView({
  clinic: c,
  href,
  opening,
  disabled,
  onOpen,
}: {
  clinic: ClinicCard;
  href: string;
  opening: boolean; // this card was clicked and the next page is loading
  disabled: boolean; // another card is opening
  onOpen: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const extra = c.specialties.length - 3;

  return (
    <div
      aria-busy={opening}
      className={`${glass} flex h-full flex-col p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(79,70,229,0.16)] ${
        opening ? "ring-2 ring-indigo-300" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 text-indigo-600 shadow-sm ring-2 ring-white/80">
            {c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={c.name} className="h-full w-full object-cover" />
            ) : (
              <Stethoscope size={24} />
            )}
          </div>
          <h2 className="truncate text-base font-semibold text-slate-800">{c.name}</h2>
        </div>
        <HoursBadge hours={c.hours} />
      </div>

      {c.specialties.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-indigo-50/80 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100"
            >
              {s}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">+{extra}</span>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <Info icon={MapPin}>
          {c.address}, {c.city}
        </Info>
        <Info icon={Users}>
          {c.doctorCount} {c.doctorCount === 1 ? "doctor" : "doctors"}
        </Info>
        <Info icon={Clock}>{hoursText(c.hours)}</Info>
      </div>

      <Link
        href={href}
        onClick={onOpen}
        aria-disabled={disabled || opening}
        tabIndex={disabled ? -1 : undefined}
        className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 ${gradient} ${ring} ${
          disabled ? "pointer-events-none opacity-50" : ""
        } ${opening ? "pointer-events-none" : ""}`}
        style={{ marginTop: "1.25rem" }}
      >
        {opening ? (
          <>
            <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Opening...
          </>
        ) : (
          <>
            View doctors <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </Link>
    </div>
  );
}

export default function BookClinicPage() {
  const { getToken } = useAuth();
  const pathname = usePathname(); // used to build the link to the detail page
  const router = useRouter();

  const [clinics, setClinics] = useState<ClinicCard[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);

  // Opening a clinic: pending stays true until the next page is ready
  const [isPending, startTransition] = useTransition();
  const [openingId, setOpeningId] = useState<string | null>(null);
  const busyId = isPending ? openingId : null;

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const token = await getToken();
      const { data } = await axios.get<{ clinics: ClinicCard[] }>(ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClinics(data.clinics);
    } catch (err) {
      setLoadError(
        (axios.isAxiosError(err) && err.response?.data?.message) ||
          "Could not load clinics. Please try again."
      );
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  function openClinic(e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) {
    // let the browser handle "open in new tab" clicks normally
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (isPending) return;

    setOpeningId(id);
    startTransition(() => router.push(href));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (clinics ?? []).filter((c) => {
      const matchesQuery =
        !q || [c.name, c.address, c.city, ...c.specialties].some((f) => f.toLowerCase().includes(q));
      return matchesQuery && (!onlyOpen || c.hours.status === "open" || c.hours.status === "later");
    });
  }, [clinics, query, onlyOpen]);

  const empty = "rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-10 text-center backdrop-blur-md";

  let body;
  if (loadError) {
    body = (
      <div role="alert" className={`${glass} p-6`}>
        <p className="text-sm text-rose-600">{loadError}</p>
        <button type="button" onClick={load} className={`${pill} mt-3 px-4 py-2`}>
          Try again
        </button>
      </div>
    );
  } else if (!clinics) {
    body = (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
        <p role="status" className="sr-only">
          Loading clinics
        </p>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  } else if (clinics.length === 0) {
    body = (
      <div className={empty}>
        <p className="font-semibold text-slate-800">No clinics available right now</p>
      </div>
    );
  } else if (filtered.length === 0) {
    body = (
      <div className={empty}>
        <p className="font-semibold text-slate-800">No clinics found</p>
        <p className="mt-1 text-sm text-slate-500">Try a different name or area, or clear the filters.</p>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setOnlyOpen(false);
          }}
          className={`${pill} mt-4 px-4 py-2`}
        >
          Clear filters
        </button>
      </div>
    );
  } else {
    body = (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c, i) => {
          const href = `${pathname}/${c.id}`;
          return (
            <Reveal key={c.id} index={i}>
              <ClinicCardView
                clinic={c}
                href={href}
                opening={busyId === c.id}
                disabled={busyId !== null && busyId !== c.id}
                onOpen={(e) => openClinic(e, c.id, href)}
              />
            </Reveal>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Book Clinic
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">Pick a clinic, choose a doctor and book your token.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by clinic, doctor type or area"
            aria-label="Search clinics"
            className="w-full rounded-full border border-white/70 bg-white/60 py-3 pl-11 pr-5 text-sm text-slate-800 shadow-sm outline-none backdrop-blur-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-400"
          />
        </div>
        <label
          className={`inline-flex cursor-pointer select-none items-center justify-center rounded-full border px-5 py-3 text-sm font-medium shadow-sm backdrop-blur-md transition focus-within:ring-2 focus-within:ring-indigo-400 ${
            onlyOpen ? `border-transparent ${gradient}` : "border-white/70 bg-white/60 text-slate-700 hover:bg-white/90"
          }`}
        >
          <input
            type="checkbox"
            checked={onlyOpen}
            onChange={(e) => setOnlyOpen(e.target.checked)}
            className="sr-only"
          />
          Open today
        </label>
      </div>

      {clinics && clinics.length > 0 && (
        <p className="text-sm text-slate-500">
          {filtered.length} clinic{filtered.length === 1 ? "" : "s"} found
        </p>
      )}

      {body}
    </div>
  );
}