// app/clinic/doctors/DoctorCard.tsx

import {
  SPECIALTY_BY_SLUG,
  formatTime,
  initials,
  summarizeSchedule,
  type DoctorRow,
} from "./shared";
import { ui } from "./ui";

export default function DoctorCard({ doctor }: { doctor: DoctorRow }) {
  const specialty = SPECIALTY_BY_SLUG.get(doctor.specialtySlug);
  const sessions = summarizeSchedule(doctor.schedules);

  return (
    <li className={`${ui.card} p-5`}>
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
          <p className="text-sm text-[#14302B]">{specialty?.name ?? "Specialty not found"}</p>
          {specialty && <p className="text-xs text-[#5B726C]">{specialty.category}</p>}
        </div>
      </div>

      {doctor.description && (
        <p className="mt-3 line-clamp-2 text-sm text-[#5B726C]">{doctor.description}</p>
      )}

      <div className="mt-4 space-y-2.5">
        {sessions.length === 0 ? (
          <p className="rounded-lg bg-[#FEF3F2] px-3.5 py-2.5 text-sm text-[#B42318]">
            No weekly schedule yet, so patients cannot book this doctor.
          </p>
        ) : (
          sessions.map((s) => (
            // Each weekly time looks like a ticket: hours on the left, booking closing time on the stub
            <div
              key={`${s.daysLabel}-${s.startTime}-${s.endTime}`}
              className="flex overflow-hidden rounded-lg border border-[#DCE6E3] bg-[#F7FAF9]"
            >
              <div className="min-w-0 flex-1 px-3.5 py-2.5">
                <p className="text-sm font-semibold text-[#14302B]">{s.daysLabel}</p>
                <p className="text-sm tabular-nums text-[#14302B]">
                  {formatTime(s.startTime)} to {formatTime(s.endTime)}
                </p>
              </div>
              <div className="flex w-28 shrink-0 flex-col items-center justify-center border-l-2 border-dashed border-[#C9D6D2] bg-[#FFF6DD] px-2 py-2 text-center">
                <span className="text-xs text-[#5B726C]">Booking closes</span>
                <span className="text-sm font-semibold tabular-nums text-[#14302B]">
                  {s.bookingCloseTime ? formatTime(s.bookingCloseTime) : "At session end"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </li>
  );
}