"use client";

// app/clinic/doctors/DoctorModal.tsx
// Add a doctor (no `doctor` prop) or edit one (pass `doctor`).

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import SpecialtyPicker from "./SpecialtyPicker";
import ScheduleEditor, {
  newRule,
  rulesToSchedules,
  schedulesToRules,
  validateRules,
  type Rule,
} from "./ScheduleEditor";
import { SPECIALTY_BY_SLUG, errorMessage, type DoctorRow, type Specialty } from "./shared";
import { Field, ui } from "./ui";
import { useAuthHeaders } from "./useAuthHeaders";

const ADD_ENDPOINT = "/api/clinic/add-doctors";
const editEndpoint = (id: string) => `/api/clinic/add-doctors/${id}`;

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_MB = 2; // the API allows up to 5 MB
const NAME_MAX = 100;
const DESC_MAX = 300;

type Photo = { file: File; url: string };

export default function DoctorModal({
  doctor,
  onClose,
  onSaved,
}: {
  doctor?: DoctorRow; // present = edit mode
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!doctor;
  const authHeaders = useAuthHeaders();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState(doctor?.name ?? "");
  const [specialty, setSpecialty] = useState<Specialty | null>(
    () => (doctor ? SPECIALTY_BY_SLUG.get(doctor.specialtySlug) ?? null : null)
  );
  const [description, setDescription] = useState(doctor?.description ?? "");
  const [photo, setPhoto] = useState<Photo | null>(null); // newly picked file
  const [removeExisting, setRemoveExisting] = useState(false); // clear the saved photo
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [rules, setRules] = useState<Rule[]>(() =>
    doctor && doctor.schedules.length ? schedulesToRules(doctor.schedules) : [newRule()]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // photo shown in the circle: a new pick wins, then the saved one (unless removed)
  const previewUrl = photo?.url ?? (removeExisting ? null : doctor?.image ?? null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const close = () => {
    if (!saving) dialogRef.current?.close(); // fires onClose
  };

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!PHOTO_TYPES.includes(file.type)) {
      return setPhotoError("Only JPG, PNG or WebP images are allowed.");
    }
    if (file.size > PHOTO_MB * 1024 * 1024) {
      return setPhotoError(`The photo must be under ${PHOTO_MB} MB.`);
    }
    setPhotoError(null);
    setRemoveExisting(false);
    setPhoto({ file, url: URL.createObjectURL(file) });
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoError(null);
    if (doctor?.image) setRemoveExisting(true);
  }

  function validate(): string | null {
    if (!name.trim()) return "Enter the doctor's name.";
    if (!specialty) return "Choose a specialty.";
    return validateRules(rules);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;

    const problem = validate();
    if (problem) return setError(problem);

    setError(null);
    setSaving(true);

    try {
      const body = new FormData();
      body.append("name", name.trim());
      body.append("specialtySlug", specialty!.slug);
      body.append("description", description.trim()); // empty = clears it on edit
      body.append("schedules", JSON.stringify(rulesToSchedules(rules)));
      if (photo) body.append("image", photo.file);
      else if (isEdit && removeExisting) body.append("removeImage", "true");

      const headers = await authHeaders();
      if (isEdit) await axios.patch(editEndpoint(doctor.id), body, { headers });
      else await axios.post(ADD_ENDPOINT, body, { headers });

      onSaved(); // parent closes the popup and reloads the list
    } catch (err) {
      setError(errorMessage(err, "Something went wrong. Please try again."));
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => saving && e.preventDefault()}
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby="doctor-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-xl bg-white p-0 text-[#14302B] backdrop:bg-black/50"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#DCE6E3] bg-white px-6 py-4">
          <div>
            <h2 id="doctor-modal-title" className="text-xl font-semibold tracking-tight">
              {isEdit ? "Edit doctor" : "Add a doctor"}
            </h2>
            <p className="mt-0.5 text-sm text-[#5B726C]">
              {isEdit
                ? "Changes to the weekly schedule apply to sessions created from now on. Existing sessions are not changed."
                : "Patients can book tokens once the doctor has a weekly schedule."}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={saving}
            aria-label="Close"
            className={`rounded-md p-1.5 text-[#5B726C] hover:bg-[#F3F6F5] disabled:opacity-50 ${ui.ring}`}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 px-6 py-6">
          <section className="space-y-5">
            <Field id="doctor-name" label="Doctor name">
              <input
                id="doctor-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={NAME_MAX}
                required
                autoFocus
                placeholder="Dr. Anita Sen"
                className={ui.input}
              />
            </Field>

            <div>
              <p className={ui.label}>Specialty</p>
              <SpecialtyPicker value={specialty} onChange={setSpecialty} />
            </div>

            <div>
              <p className={ui.label}>Photo (optional)</p>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C9D6D2] bg-[#F3F6F5] text-xs text-[#5B726C]">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Doctor photo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "No photo"
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <label
                    className={`cursor-pointer ${ui.outlineBtn} focus-within:ring-2 focus-within:ring-[#F5B82E]`}
                  >
                    <input
                      type="file"
                      accept={PHOTO_TYPES.join(",")}
                      onChange={onPhotoChange}
                      className="sr-only"
                    />
                    {previewUrl ? "Change photo" : "Upload photo"}
                  </label>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className={`rounded-md px-3 py-2 text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2] ${ui.ring}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <p className={ui.hint}>JPG, PNG or WebP, up to {PHOTO_MB} MB.</p>
              {photoError && (
                <p role="alert" className={ui.error}>
                  {photoError}
                </p>
              )}
            </div>

            <Field
              id="doctor-description"
              label="About the doctor (optional)"
              hint={`${description.length}/${DESC_MAX}`}
            >
              <textarea
                id="doctor-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={DESC_MAX}
                rows={3}
                placeholder="Qualifications, experience, what the doctor treats"
                className={ui.input}
              />
            </Field>
          </section>

          <section>
            <h3 className="text-base font-semibold">Weekly schedule</h3>
            <p className="mb-4 mt-0.5 text-sm text-[#5B726C]">
              Choose the days the doctor sits and the hours. A session is created for every matching day, and booking opens at 12:00 AM that day.
            </p>
            <ScheduleEditor rules={rules} onChange={setRules} />
          </section>

          {error && (
            <p role="alert" className="text-sm text-[#B42318]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button disabled={saving} className={ui.primaryBtn}>
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add doctor"}
            </button>
            <button
              type="button"
              onClick={close}
              disabled={saving}
              className={`rounded-md px-4 py-2.5 text-[15px] font-medium hover:bg-[#F3F6F5] disabled:opacity-50 ${ui.ring}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}