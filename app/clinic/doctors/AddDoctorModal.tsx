"use client";

// app/clinic/doctors/AddDoctorModal.tsx

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import {
  DAYS,
  SPECIALTIES,
  toMinutes,
  type Specialty,
  type Weekday,
} from "./shared";

// Create this API route next: app/api/clinic/doctors/route.ts (POST)
const ENDPOINT = "/api/clinic/doctors";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_MB = 2;
const NAME_MAX = 100;
const DESC_MAX = 300;

const field =
  "w-full rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2.5 text-[15px] text-[#14302B] placeholder:text-[#7C8F8A] outline-none focus-visible:border-[#14302B] focus-visible:ring-2 focus-visible:ring-[#F5B82E]";
const label = "mb-1.5 block text-sm font-medium text-[#14302B]";
const hint = "mt-1.5 text-xs text-[#5B726C]";
const errorText = "mt-1.5 text-xs text-[#B42318]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]";

// One rule = "these days, this time window, this many minutes per patient"
type Rule = {
  id: string;
  days: Weekday[];
  startTime: string;
  endTime: string;
  tokenMinutes: string;
};

type Photo = { file: File; url: string };

function newRule(startTime = "10:00", endTime = "13:00"): Rule {
  return { id: crypto.randomUUID(), days: [], startTime, endTime, tokenMinutes: "15" };
}

// Returns a message if the time part of a rule is not valid
function ruleProblem(r: Rule): string | null {
  if (!r.startTime || !r.endTime) return "Set a start time and an end time.";
  const length = toMinutes(r.endTime) - toMinutes(r.startTime);
  if (length <= 0) return "End time must be after the start time.";
  const mins = Number(r.tokenMinutes);
  if (!Number.isInteger(mins) || mins < 5 || mins > 60) {
    return "Minutes per patient must be a whole number from 5 to 60.";
  }
  if (length < mins) return "This time window is shorter than one patient.";
  return null;
}

function tokensPerDay(r: Rule): number {
  return Math.floor((toMinutes(r.endTime) - toMinutes(r.startTime)) / Number(r.tokenMinutes));
}

// Two rules on the same day must not overlap
function findOverlap(rules: Rule[]): string | null {
  for (const day of DAYS) {
    const spans = rules
      .filter((r) => r.days.includes(day.value) && !ruleProblem(r))
      .map((r) => [toMinutes(r.startTime), toMinutes(r.endTime)] as const)
      .sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < spans.length; i++) {
      if (spans[i][0] < spans[i - 1][1]) return `${day.long} has times that overlap.`;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Specialty picker: search, or browse all grouped by category
// ---------------------------------------------------------------------------
function SpecialtyPicker({
  value,
  onChange,
}: {
  value: Specialty | null;
  onChange: (s: Specialty | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [browse, setBrowse] = useState(false);
  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!q) return [];
    return SPECIALTIES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [q]);

  const groups = useMemo(() => {
    const map = new Map<string, Specialty[]>();
    for (const s of SPECIALTIES) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return [...map.entries()];
  }, []);

  function pick(s: Specialty) {
    onChange(s);
    setQuery("");
    setBrowse(false);
  }

  if (value) {
    return (
      <div className="flex items-start justify-between gap-3 rounded-md border border-[#C9D6D2] px-3.5 py-2.5">
        <div>
          <p className="text-[15px] font-medium text-[#14302B]">{value.name}</p>
          <p className="text-xs text-[#5B726C]">
            {value.category}. {value.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`shrink-0 rounded text-sm font-medium text-[#14302B] underline underline-offset-2 ${focusRing}`}
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        aria-label="Search specialty"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setBrowse(false);
        }}
        autoComplete="off"
        placeholder="Search, for example dentist, child or X-ray"
        className={field}
      />

      {q ? (
        matches.length > 0 ? (
          <ul className="mt-2 max-h-64 overflow-auto rounded-md border border-[#C9D6D2] bg-white">
            {matches.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => pick(s)}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-[#F3F6F5] focus-visible:bg-[#F3F6F5] focus-visible:outline-none"
                >
                  <span className="block text-[15px] font-medium text-[#14302B]">{s.name}</span>
                  <span className="block text-xs text-[#5B726C]">
                    {s.category}. {s.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={hint}>No specialty found. Try another word.</p>
        )
      ) : (
        <>
          <button
            type="button"
            onClick={() => setBrowse((b) => !b)}
            aria-expanded={browse}
            className={`mt-2 rounded text-sm font-medium text-[#14302B] underline underline-offset-2 ${focusRing}`}
          >
            {browse ? "Hide the list" : "Browse all specialties"}
          </button>

          {browse && (
            <div className="mt-2 max-h-72 overflow-auto rounded-md border border-[#C9D6D2] bg-white">
              {groups.map(([category, items]) => (
                <div key={category}>
                  <p className="sticky top-0 bg-[#F3F6F5] px-3.5 py-1.5 text-xs font-semibold text-[#5B726C]">
                    {category}
                  </p>
                  <ul>
                    {items.map((s) => (
                      <li key={s.slug}>
                        <button
                          type="button"
                          onClick={() => pick(s)}
                          className="w-full px-3.5 py-2 text-left hover:bg-[#F3F6F5] focus-visible:bg-[#F3F6F5] focus-visible:outline-none"
                        >
                          <span className="block text-[15px] text-[#14302B]">{s.name}</span>
                          <span className="block text-xs text-[#5B726C]">{s.description}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The popup
// ---------------------------------------------------------------------------
export default function AddDoctorModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [rules, setRules] = useState<Rule[]>([newRule()]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Native <dialog>: gives Escape to close, a dark backdrop and keeps focus inside
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      nameRef.current?.focus();
    }
  }, []);

  function close() {
    if (submitting) return;
    dialogRef.current?.close(); // fires onClose
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!TYPES.includes(file.type)) {
      setPhotoError("Only JPG, PNG or WebP images are allowed.");
      return;
    }
    if (file.size > PHOTO_MB * 1024 * 1024) {
      setPhotoError(`The photo must be under ${PHOTO_MB} MB.`);
      return;
    }
    setPhotoError(null);
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto({ file, url: URL.createObjectURL(file) });
  }

  function removePhoto() {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    setPhotoError(null);
  }

  function updateRule(id: string, patch: Partial<Rule>) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function toggleDay(id: string, day: Weekday) {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              days: r.days.includes(day) ? r.days.filter((d) => d !== day) : [...r.days, day],
            }
          : r
      )
    );
  }

  function removeRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }

  // Returns the first problem found, or null if the form is fine
  function validate(): string | null {
    if (!name.trim()) return "Enter the doctor's name.";
    if (!specialty) return "Choose a specialty.";
    if (rules.length === 0) return "Add at least one weekly time.";
    for (const r of rules) {
      if (r.days.length === 0) return "Pick at least one day for each time.";
      const p = ruleProblem(r);
      if (p) return p;
    }
    return findOverlap(rules);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const problem = validate();
    if (problem) {
      setSubmitError(problem);
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const body = new FormData();
      body.append("name", name.trim());
      body.append("specialtySlug", specialty!.slug);
      body.append("description", description.trim());
      if (photo) body.append("image", photo.file);

      // One row per day, same shape as the DoctorSchedule model
      const schedules = rules.flatMap((r) =>
        r.days.map((day) => ({
          day,
          startTime: r.startTime,
          endTime: r.endTime,
          tokenMinutes: Number(r.tokenMinutes),
        }))
      );
      body.append("schedules", JSON.stringify(schedules));

      await axios.post(ENDPOINT, body);
      onAdded(); // parent closes the popup and reloads the list
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setSubmitError(err.response.data?.message ?? "Something went wrong. Please try again.");
      } else if (axios.isAxiosError(err)) {
        setSubmitError("Network error. Check your connection and try again.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        if (submitting) e.preventDefault(); // do not close with Escape while saving
      }}
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
            disabled={submitting}
            aria-label="Close"
            className={`rounded-md p-1.5 text-[#5B726C] hover:bg-[#F3F6F5] disabled:opacity-50 ${focusRing}`}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          {/* Name */}
          <div>
            <label htmlFor="doctor-name" className={label}>
              Doctor name
            </label>
            <input
              id="doctor-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={NAME_MAX}
              required
              placeholder="Dr. Anita Sen"
              className={field}
            />
          </div>

          {/* Specialty */}
          <div>
            <p className={label}>Specialty</p>
            <SpecialtyPicker value={specialty} onChange={setSpecialty} />
          </div>

          {/* Photo */}
          <div>
            <p className={label}>Photo (optional)</p>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C9D6D2] bg-[#F3F6F5] text-xs text-[#5B726C]">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt="Doctor photo preview" className="h-full w-full object-cover" />
                ) : (
                  "No photo"
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="cursor-pointer rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] focus-within:ring-2 focus-within:ring-[#F5B82E]">
                  <input
                    type="file"
                    accept={TYPES.join(",")}
                    onChange={onPhotoChange}
                    className="sr-only"
                  />
                  {photo ? "Change photo" : "Upload photo"}
                </label>
                {photo && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className={`rounded-md px-3 py-2 text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2] ${focusRing}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className={hint}>JPG, PNG or WebP, up to {PHOTO_MB} MB.</p>
            {photoError && (
              <p role="alert" className={errorText}>
                {photoError}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="doctor-description" className={label}>
              About the doctor (optional)
            </label>
            <textarea
              id="doctor-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={DESC_MAX}
              rows={3}
              placeholder="Qualifications, experience, what the doctor treats"
              className={field}
            />
            <p className={hint}>
              {description.length}/{DESC_MAX}
            </p>
          </div>

          {/* Weekly schedule */}
          <div>
            <p className={label}>Weekly schedule</p>
            <p className="mb-3 text-xs text-[#5B726C]">
              Choose the days the doctor sits and the time window. Tokens are created for every
              matching day.
            </p>

            <div className="space-y-4">
              {rules.map((r, index) => {
                const problem = ruleProblem(r);
                return (
                  <div key={r.id} className="rounded-lg border border-[#DCE6E3] p-4">
                    <p className="mb-2 text-sm font-medium text-[#14302B]">Time {index + 1}</p>

                    <div className="flex flex-wrap gap-2" role="group" aria-label="Days">
                      {DAYS.map((d) => {
                        const on = r.days.includes(d.value);
                        return (
                          <button
                            key={d.value}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleDay(r.id, d.value)}
                            className={`rounded-md border px-3 py-1.5 text-sm font-medium ${focusRing} ${
                              on
                                ? "border-[#14302B] bg-[#14302B] text-white"
                                : "border-[#C9D6D2] bg-white text-[#14302B] hover:bg-[#F3F6F5]"
                            }`}
                          >
                            {d.short}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <label htmlFor={`start-${r.id}`} className={label}>
                          Start time
                        </label>
                        <input
                          id={`start-${r.id}`}
                          type="time"
                          value={r.startTime}
                          onChange={(e) => updateRule(r.id, { startTime: e.target.value })}
                          className={field}
                        />
                      </div>
                      <div>
                        <label htmlFor={`end-${r.id}`} className={label}>
                          End time
                        </label>
                        <input
                          id={`end-${r.id}`}
                          type="time"
                          value={r.endTime}
                          onChange={(e) => updateRule(r.id, { endTime: e.target.value })}
                          className={field}
                        />
                      </div>
                      <div>
                        <label htmlFor={`mins-${r.id}`} className={label}>
                          Minutes per patient
                        </label>
                        <input
                          id={`mins-${r.id}`}
                          type="number"
                          inputMode="numeric"
                          min={5}
                          max={60}
                          value={r.tokenMinutes}
                          onChange={(e) => updateRule(r.id, { tokenMinutes: e.target.value })}
                          className={field}
                        />
                      </div>
                    </div>

                    {problem ? (
                      <p role="alert" className={errorText}>
                        {problem}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium text-[#1F7A5C]">
                        {tokensPerDay(r)} tokens each day
                      </p>
                    )}

                    {rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRule(r.id)}
                        className={`mt-3 rounded text-sm font-medium text-[#B42318] underline underline-offset-2 ${focusRing}`}
                      >
                        Remove this time
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setRules((prev) => [...prev, newRule("17:00", "20:00")])}
              className={`mt-3 rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] ${focusRing}`}
            >
              Add another time
            </button>
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-[#B42318]">
              {submitError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={submitting}
              className="rounded-md bg-[#F5B82E] px-5 py-2.5 text-[15px] font-semibold text-[#14302B] hover:bg-[#E6A91F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14302B] focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {submitting ? "Adding..." : "Add doctor"}
            </button>
            <button
              type="button"
              onClick={close}
              disabled={submitting}
              className={`rounded-md px-4 py-2.5 text-[15px] font-medium text-[#14302B] hover:bg-[#F3F6F5] disabled:opacity-50 ${focusRing}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}