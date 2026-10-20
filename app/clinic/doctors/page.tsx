"use client";

// app/clinic/doctors/page.tsx

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import AddDoctorModal from "./AddDoctorModal";
import DoctorCard from "./DoctorCard";
import { errorMessage, type DoctorRow } from "./shared";
import { ui } from "./ui";
import { useAuthHeaders } from "./useAuthHeaders";

const ENDPOINT = "/api/clinic/add-doctors";

export default function DoctorsPage() {
  const authHeaders = useAuthHeaders();
  const [doctors, setDoctors] = useState<DoctorRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const { data } = await axios.get<{ doctors: DoctorRow[] }>(ENDPOINT, {
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
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </ul>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">Doctors</h1>
          <p className="mt-1 text-sm text-[#5B726C]">
            {doctors?.length
              ? `${doctors.length} ${doctors.length === 1 ? "doctor takes" : "doctors take"} token bookings at your clinic.`
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

      <div className="mt-6">{content}</div>

      {adding && (
        <AddDoctorModal
          onClose={() => setAdding(false)}
          onAdded={() => {
            setAdding(false);
            void load();
          }}
        />
      )}
    </div>
  );
}