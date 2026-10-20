"use client";

// app/clinic/doctors/page.tsx

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import DoctorModal from "./AddDoctorModal";
import DoctorCard from "./DoctorCard";
import { errorMessage, type DoctorRow } from "./shared";
import { ui } from "./ui";
import { useAuthHeaders } from "./useAuthHeaders";

const LIST_ENDPOINT = "/api/clinic/add-doctors";
const doctorEndpoint = (id: string) => `/api/clinic/add-doctors/${id}`;

export default function DoctorsPage() {
  const authHeaders = useAuthHeaders();
  const [doctors, setDoctors] = useState<DoctorRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<DoctorRow | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const { data } = await axios.get<{ doctors: DoctorRow[] }>(LIST_ENDPOINT, {
        headers: await authHeaders(),
      });
      setDoctors(data.doctors);
    } catch (err) {
      setLoadError(errorMessage(err, "Could not load your doctors. Please try again."));
    }
  }, [authHeaders]);

  useEffect(() => {
    void load();
  }, [load]);

  // on/off switch: updates the screen first, goes back if the API fails
  const toggleActive = useCallback(
    async (doctor: DoctorRow) => {
      if (togglingId) return;
      const next = !doctor.isActive;

      const setActive = (value: boolean) =>
        setDoctors((list) =>
          list && list.map((d) => (d.id === doctor.id ? { ...d, isActive: value } : d))
        );

      setActionError(null);
      setTogglingId(doctor.id);
      setActive(next);

      try {
        await axios.patch(
          doctorEndpoint(doctor.id),
          { isActive: next },
          { headers: await authHeaders() }
        );
      } catch (err) {
        setActive(doctor.isActive);
        setActionError(errorMessage(err, "Could not update the doctor. Please try again."));
      } finally {
        setTogglingId(null);
      }
    },
    [authHeaders, togglingId]
  );

  let content;
  if (loadError) {
    content = (
      <div role="alert" className={`${ui.card} p-6`}>
        <p className="text-sm text-[#B42318]">{loadError}</p>
        <button type="button" onClick={load} className={`mt-3 ${ui.outlineBtn}`}>
          Try again
        </button>
      </div>
    );
  } else if (!doctors) {
    content = (
      <ul className="grid gap-4 md:grid-cols-2" aria-busy="true" aria-label="Loading doctors">
        {[0, 1].map((i) => (
          <li key={i} className={`h-64 ${ui.card} motion-safe:animate-pulse`} />
        ))}
      </ul>
    );
  } else if (doctors.length === 0) {
    content = (
      <div className="rounded-xl border-2 border-dashed border-[#C9D6D2] p-10 text-center">
        <p className="font-medium text-[#14302B]">No doctors yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-[#5B726C]">
          Add your first doctor with a weekly schedule. Patients can book tokens once a schedule
          is set.
        </p>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className={`mt-5 inline-flex items-center gap-2 ${ui.primaryBtn}`}
        >
          <Plus size={18} aria-hidden="true" />
          Add doctor
        </button>
      </div>
    );
  } else {
    content = (
      <ul className="grid gap-4 md:grid-cols-2">
        {doctors.map((d) => (
          <DoctorCard
            key={d.id}
            doctor={d}
            toggling={togglingId === d.id}
            onEdit={setEditing}
            onToggle={toggleActive}
          />
        ))}
      </ul>
    );
  }

  const activeCount = doctors?.filter((d) => d.isActive).length ?? 0;

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">Doctors</h1>
          <p className="mt-1 text-sm text-[#5B726C]">
            {doctors?.length
              ? `${activeCount} of ${doctors.length} ${doctors.length === 1 ? "doctor is" : "doctors are"} taking token bookings.`
              : "Patients book tokens with the doctors listed here."}
          </p>
        </div>

        {!!doctors?.length && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className={`inline-flex items-center gap-2 ${ui.primaryBtn}`}
          >
            <Plus size={18} aria-hidden="true" />
            Add doctor
          </button>
        )}
      </div>

      {actionError && (
        <p role="alert" className="mt-4 rounded-lg bg-[#FEF3F2] px-3.5 py-2.5 text-sm text-[#B42318]">
          {actionError}
        </p>
      )}

      <div className="mt-6">{content}</div>

      {(adding || editing) && (
        <DoctorModal
          key={editing?.id ?? "new"}
          doctor={editing ?? undefined}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            void load();
          }}
        />
      )}
    </div>
  );
}