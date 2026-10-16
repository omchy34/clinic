"use client";

// app/clinic/doctors/page.tsx

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import AddDoctorModal from "./AddDoctorModal";
import {
  DAYS,
  SPECIALTY_BY_SLUG,
  formatTime,
  toMinutes,
  type DoctorRow,
  type ScheduleRow,
  type Weekday,
} from "./shared";

// Create this API route next: app/api/clinic/doctors/route.ts (GET returns { doctors: [...] })
const ENDPOINT = "/api/clinic/doctors";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]";

// [MON, WED, FRI] becomes "Mon, Wed, Fri". Three or more days in a row become "Mon to Fri"
function formatDays(days: Weekday[]): string {
  const order = DAYS.map((d) => d.value);
  const short = (d: Weekday) => DAYS[order.indexOf(d)].short;
  const sorted = [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));

  const parts: string[] = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j + 1 < sorted.length && order.indexOf(sorted[j + 1]) === order.indexOf(sorted[j]) + 1) {
      j++;
    }
    if (j - i + 1 >= 3) {
      parts.push(`${short(sorted[i])} to ${short(sorted[j])}`);
    } else {
      for (let k = i; k <= j; k++) parts.push(short(sorted[k]));
    }
    i = j + 1;
  }
  return parts.join(", ");
}

// Rows with the same time window are shown together as one line
function summarizeSchedule(schedules: ScheduleRow[]) {
  const groups = new Map<
    string,
    { days: Weekday[]; startTime: string; endTime: string; tokenMinutes: number }
  >();
  for (const s of schedules) {
    const key = `${s.startTime}|${s.endTime}|${s.tokenMinutes}`;
    const group = groups.get(key) ?? {
      days: [],
      startTime: s.startTime,
      endTime: s.endTime,
      tokenMinutes: s.tokenMinutes,
    };
    group.days.push(s.day);
    groups.set(key, group);
  }

  const order = DAYS.map((d) => d.value);
  return [...groups.values()]
    .map((g) => ({
      ...g,
      daysLabel: formatDays(g.days),
      tokens: Math.floor((toMinutes(g.endTime) - toMinutes(g.startTime)) / g.tokenMinutes),
      firstDay: Math.min(...g.days.map((d) => order.indexOf(d))),
    }))
    .sort((a, b) => a.firstDay - b.firstDay || toMinutes(a.startTime) - toMinutes(b.startTime));
}

function initials(name: string): string {
  return name
    .replace(/^dr\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function DoctorCard({ doctor }: { doctor: DoctorRow }) {
  const specialty = SPECIALTY_BY_SLUG.get(doctor.specialtySlug);
  const lines = summarizeSchedule(doctor.schedules);

  return (
    <li className="rounded-xl bg-white p-5 ring-1 ring-[#DCE6E3]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8EFED] text-lg font-semibold text-[#14302B]">
          {doctor.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
          ) : (
            initials(doctor.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold leading-tight text-[#14302B]">{doctor.name}</h2>
            {!doctor.isActive && (
              <span className="rounded bg-[#FEF3F2] px-2 py-0.5 text-xs font-medium text-[#B42318]">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-[#14302B]">
            {specialty ? specialty.name : "Specialty not found"}
          </p>
          {specialty && <p className="text-xs text-[#5B726C]">{specialty.category}</p>}
        </div>
      </div>

      {doctor.description && (
        <p className="mt-3 line-clamp-2 text-sm text-[#5B726C]">{doctor.description}</p>
      )}

      <div className="mt-4 space-y-2 border-t border-[#EEF3F1] pt-3">
        {lines.length === 0 ? (
          <p className="text-sm text-[#B42318]">No weekly schedule yet</p>
        ) : (
          lines.map((l) => (
            <div key={`${l.daysLabel}-${l.startTime}`} className="text-sm">
              <p className="font-medium text-[#14302B]">
                {l.daysLabel}
                <span className="font-normal text-[#5B726C]">
                  {" "}
                  {formatTime(l.startTime)} to {formatTime(l.endTime)}
                </span>
              </p>
              <p className="text-xs text-[#5B726C]">
                {l.tokens} tokens a day, {l.tokenMinutes} minutes each
              </p>
            </div>
          ))
        )}
      </div>
    </li>
  );
}

export default function Page() {
  const [doctors, setDoctors] = useState<DoctorRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const res = await axios.get<{ doctors: DoctorRow[] }>(ENDPOINT);
      setDoctors(res.data.doctors);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Could not load your doctors. Please try again.";
      setLoadError(message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">Doctors</h1>
      <p className="mt-1 text-sm text-[#5B726C]">
        Patients can book tokens with the doctors listed here.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#F5B82E] px-4 py-2.5 text-[15px] font-semibold text-[#14302B] hover:bg-[#E6A91F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14302B] focus-visible:ring-offset-2"
        >
          <Plus size={18} aria-hidden="true" />
          Add doctor
        </button>
        {doctors && doctors.length > 0 && (
          <p className="text-sm text-[#5B726C]">
            {doctors.length} {doctors.length === 1 ? "doctor" : "doctors"}
          </p>
        )}
      </div>

      <div className="mt-6">
        {loadError ? (
          <div role="alert" className="rounded-xl bg-white p-6 ring-1 ring-[#DCE6E3]">
            <p className="text-sm text-[#B42318]">{loadError}</p>
            <button
              type="button"
              onClick={load}
              className={`mt-3 rounded-md border border-[#C9D6D2] px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] ${focusRing}`}
            >
              Try again
            </button>
          </div>
        ) : doctors === null ? (
          <ul className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Loading doctors">
            {[0, 1].map((i) => (
              <li
                key={i}
                className="h-44 rounded-xl bg-white ring-1 ring-[#DCE6E3] motion-safe:animate-pulse"
              />
            ))}
          </ul>
        ) : doctors.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-[#C9D6D2] p-10 text-center">
            <p className="font-medium text-[#14302B]">No doctors yet</p>
            <p className="mt-1 text-sm text-[#5B726C]">
              Use Add doctor to create the first one. Patients can book once a doctor has a
              weekly schedule.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </ul>
        )}
      </div>

      {open && (
        <AddDoctorModal
          onClose={() => setOpen(false)}
          onAdded={() => {
            setOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
}