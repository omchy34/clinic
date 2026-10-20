"use client";

// app/clinic/doctors/AddDoctorModal.tsx

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import SpecialtyPicker from "./SpecialtyPicker";
import ScheduleEditor, {
  newRule,
  rulesToSchedules,
  validateRules,
  type Rule,
} from "./ScheduleEditor";
import { errorMessage, type Specialty } from "./shared";
import { Field, ui } from "./ui";
import { useAuthHeaders } from "./useAuthHeaders";

const ENDPOINT = "/api/clinic/add-doctors";

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_MB = 2; // the API allows up to 5 MB
const NAME_MAX = 100;
const DESC_MAX = 300;

type Photo = { file: File; url: string };

export default function AddDoctorModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const authHeaders = useAuthHeaders();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [rules, setRules] = useState<Rule[]>(() => [newRule()]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Native <dialog>: Escape closes it, the page behind goes dark, focus stays inside
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Free the preview image when the photo changes or the popup closes
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
    e.target.value = ""; // lets the same file be picked again
    if (!file) return;

    if (!PHOTO_TYPES.includes(file.type)) {
      return setPhotoError("Only JPG, PNG or WebP images are allowed.");
    }
    if (file.size > PHOTO_MB * 1024 * 1024) {
      return setPhotoError(`The photo must be under ${PHOTO_MB} MB.`);
    }
    setPhotoError(null);
    setPhoto({ file, url: URL.createObjectURL(file) });
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
      // Field names match what the API route reads
      const body = new FormData();
      body.append("name", name.trim());
      body.append("specialtySlug", specialty!.slug);
      body.append("description", description.trim());
      body.append("schedules", JSON.stringify(rulesToSchedules(rules)));
      if (photo) body.append("image", photo.file);

      await axios.post(ENDPOINT, body, { headers: await authHeaders() });
      onAdded(); // parent closes the popup and reloads the list
    } catch (err) {
      setError(errorMessage(err, "Something went wrong. Please try again."));
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => saving && e.preventDefault()} // no Escape while saving
      onClick={(e) => e.target === e.currentTarget && close()} // click on the dark area
      aria-labelledby="add-doctor-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-xl bg-white p-0 text-[#14302B] backdrop:bg-black/50"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#DCE6E3] bg-white px-6 py-4">
          <div>
            <h2 id="add-doctor-title" className="text-xl font-semibold tracking-tight">
              Add a doctor
            </h2>
            <p className="mt-0.5 text-sm text-[#5B726C]">
              Patients can book tokens once the doctor has a weekly schedule.
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
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.url}
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
                    {photo ? "Change photo" : "Upload photo"}
                  </label>
                  {photo && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoError(null);
                      }}
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
              {saving ? "Adding..." : "Add doctor"}
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