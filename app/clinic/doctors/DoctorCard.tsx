// app/clinic/doctors/DoctorCard.tsx

import { Pencil } from "lucide-react";
import {
  SPECIALTY_BY_SLUG,
  formatTime,
  initials,
  summarizeSchedule,
  type DoctorRow,
} from "./shared";
import { ui } from "./ui";

export default function DoctorCard({
  doctor,
  toggling,
  onEdit,
  onToggle,
}: {
  doctor: DoctorRow;
  toggling: boolean;
  onEdit: (doctor: DoctorRow) => void;
  onToggle: (doctor: DoctorRow) => void;
}) {
  const specialty = SPECIALTY_BY_SLUG.get(doctor.specialtySlug);
  const sessions = summarizeSchedule(doctor.schedules);

  return (
    <li className={`${ui.card} p-5`}>
      {/* everything except the footer is dimmed when the doctor is off */}
      <div className={doctor.isActive ? "" : "opacity-60"}>
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
            <h2 className="text-lg font-semibold leading-tight text-[#14302B]">{doctor.name}</h2>
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
      </div>

      {/* footer: on/off switch + edit */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#DCE6E3] pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={doctor.isActive}
            aria-label={`Accepting bookings for ${doctor.name}`}
            disabled={toggling}
            onClick={() => onToggle(doctor)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-60 ${
              doctor.isActive ? "bg-[#14302B]" : "bg-[#C9D6D2]"
            } ${ui.ring}`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                doctor.isActive ? "translate-x-5" : ""
              }`}
            />
          </button>
          <div className="leading-tight">
            <p className="text-sm font-medium text-[#14302B]">
              {doctor.isActive ? "Accepting bookings" : "Bookings off"}
            </p>
            {!doctor.isActive && (
              <p className="text-xs text-[#B42318]">Hidden from patients</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(doctor)}
          className={`inline-flex items-center gap-1.5 ${ui.outlineBtn}`}
        >
          <Pencil size={14} aria-hidden="true" />
          Edit
        </button>
      </div>
    </li>
  );
}