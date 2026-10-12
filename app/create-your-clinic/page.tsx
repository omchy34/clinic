"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

// If the font import gives an error, remove these 2 lines and the font.className uses below
const font = Bricolage_Grotesque({ subsets: ["latin"] });

const field =
  "w-full rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2.5 text-[15px] text-[#14302B] placeholder:text-[#7C8F8A] outline-none focus-visible:border-[#14302B] focus-visible:ring-2 focus-visible:ring-[#F5B82E]";
const label = "mb-1.5 block text-sm font-medium text-[#14302B]";
const hint = "mt-1.5 text-xs text-[#5B726C]";
const errorText = "mt-1.5 text-xs text-[#B42318]";
const secondaryBtn =
  "cursor-pointer rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] focus-within:ring-2 focus-within:ring-[#F5B82E]";

// Same path as your route file: app/api/user/create/route.ts
const ENDPOINT = "/api/user/create";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTOS = 8;
const LOGO_MB = 2;
const PHOTO_MB = 5;

type Preview = { id: string; file: File; url: string };

function toPreview(file: File): Preview {
  return { id: crypto.randomUUID(), file, url: URL.createObjectURL(file) };
}

function check(file: File, maxMb: number): string | null {
  if (!TYPES.includes(file.type)) return "Only JPG, PNG or WebP images are allowed.";
  if (file.size > maxMb * 1024 * 1024) return `Each file must be under ${maxMb} MB.`;
  return null;
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [logo, setLogo] = useState<Preview | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Preview[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const problem = check(file, LOGO_MB);
    if (problem) {
      setLogoError(problem);
      return;
    }
    setLogoError(null);
    if (logo) URL.revokeObjectURL(logo.url);
    setLogo(toPreview(file));
  }

  function removeLogo() {
    if (logo) URL.revokeObjectURL(logo.url);
    setLogo(null);
    setLogoError(null);
  }

  function onPhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    const room = MAX_PHOTOS - photos.length;
    const accepted: Preview[] = [];
    let problem: string | null = null;

    for (const f of files) {
      const p = check(f, PHOTO_MB);
      if (p) {
        problem = p;
        continue;
      }
      if (accepted.length >= room) {
        problem = `You can add up to ${MAX_PHOTOS} photos.`;
        break;
      }
      accepted.push(toPreview(f));
    }

    setPhotoError(problem);
    setPhotos((prev) => [...prev, ...accepted]);
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const gone = prev.find((p) => p.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return prev.filter((p) => p.id !== id);
    });
    setPhotoError(null);
  }

  // The first photo in the list is the cover, so "make cover" moves it to the front
  function makeCover(id: string) {
    setPhotos((prev) => {
      const pick = prev.find((p) => p.id === id);
      if (!pick) return prev;
      return [pick, ...prev.filter((p) => p.id !== id)];
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);

    try {
      const body = new FormData(e.currentTarget);
      if (logo) body.append("logo", logo.file);
      photos.forEach((p) => body.append("clinicImage", p.file));

      await axios.post(ENDPOINT, body);
      setSubmitted(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 413) {
          setSubmitError("The files are too large. Try fewer or smaller photos.");
        } else if (err.response) {
          setSubmitError(err.response.data?.message ?? "Something went wrong. Please try again.");
        } else {
          setSubmitError("Network error. Check your connection and try again.");
        }
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main
        className={`${font.className} flex min-h-screen items-center justify-center bg-[#F3F6F5] px-5 py-10`}
      >
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center ring-1 ring-[#DCE6E3]">
          <CheckCircle2 className="mx-auto text-[#1F7A5C]" size={44} aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#14302B]">
            Request sent
          </h1>
          <p className="mt-2 text-[15px] text-[#5B726C]">
            An admin will check your details. Your clinic goes live for patients once it is
            approved.
          </p>
          <Link
            href="/user/dashboard"
            className="mt-6 inline-block rounded-md bg-[#14302B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C4038] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2"
          >
            Open dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${font.className} min-h-screen bg-[#F3F6F5] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
    >
      {/* Left: brand + token example */}
      <aside className="bg-[#14302B] px-6 py-10 text-white lg:flex lg:min-h-screen lg:items-center lg:px-14">
        <div className="mx-auto w-full max-w-sm">
          <p className="text-3xl font-semibold tracking-tight">Apna Clinic</p>
          <p className="mt-2 text-[#B9CCC7]">
            Token booking for clinics. Patients book from home, you run the line from your
            dashboard.
          </p>

          <p className="mb-3 mt-8 text-sm text-[#B9CCC7]">Patients get a token like this</p>

          <div className="relative rounded-lg bg-[#F5B82E] text-[#14302B]" aria-hidden="true">
            <div className="flex items-end justify-between p-5">
              <div>
                <p className="font-semibold">Dr. Sen, Dentist</p>
                <p className="text-sm">Today, 10:00 to 1:00</p>
              </div>
              <p className="text-6xl font-bold leading-none tabular-nums">07</p>
            </div>

            <div className="relative">
              <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-[#14302B]" />
              <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-[#14302B]" />
              <div className="border-t-2 border-dashed border-[#14302B]/30" />
            </div>

            <div className="p-5 text-sm">
              <p>Now serving: Token 4. 3 people ahead of you.</p>
              <p className="mt-0.5 font-semibold">Estimated time: about 11:30</p>
            </div>
          </div>

          <div className="mt-8 hidden space-y-3 text-[15px] text-[#D3E0DC] lg:block">
            <p>
              Patients see an estimated time with their token, so your waiting room stays
              clear.
            </p>
            <p>
              Tap Complete &amp; Next or Skip &amp; Next, and every patient's estimate updates
              on its own.
            </p>
          </div>
        </div>
      </aside>

      {/* Right: form */}
      <section className="flex items-center justify-center px-5 py-10 lg:px-14">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-5 rounded-xl bg-white p-6 ring-1 ring-[#DCE6E3] sm:p-8"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">
              Register your clinic
            </h1>
            <p className="mt-1 text-sm text-[#5B726C]">
              Fill in your details. An admin will review and approve your clinic.
            </p>
          </div>

          <div>
            <label htmlFor="name" className={label}>
              Clinic name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="organization"
              placeholder="Sen Dental Care"
              className={field}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={label}>
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                title="Enter a 10-digit mobile number"
                required
                autoComplete="tel-national"
                placeholder="98XXXXXXXX"
                className={field}
              />
              <p className={hint}>Shown to patients on your clinic page.</p>
            </div>
            <div>
              <label htmlFor="city" className={label}>
                City
              </label>
              <input
                id="city"
                name="city"
                required
                autoComplete="address-level2"
                placeholder="Kolkata"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className={label}>
              Full address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              autoComplete="street-address"
              placeholder="Building or shop number, road, area, landmark"
              className={field}
            />
          </div>

          {/* Logo */}
          <div>
            <p className={label}>Clinic logo (optional)</p>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#C9D6D2] bg-[#F3F6F5] text-xs text-[#5B726C]">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.url} alt="Clinic logo preview" className="h-full w-full object-cover" />
                ) : (
                  "No logo"
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <label className={secondaryBtn}>
                  <input
                    type="file"
                    accept={TYPES.join(",")}
                    onChange={onLogoChange}
                    className="sr-only"
                  />
                  {logo ? "Change logo" : "Upload logo"}
                </label>
                {logo && (
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className={hint}>
              A square image works best. JPG, PNG or WebP, up to {LOGO_MB} MB.
            </p>
            {logoError && (
              <p role="alert" className={errorText}>
                {logoError}
              </p>
            )}
          </div>

          {/* Clinic photos */}
          <div>
            <p className={label}>Clinic photos (optional)</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((p, i) => (
                <div key={p.id}>
                  <div className="relative aspect-4/3 overflow-hidden rounded-md bg-[#E8EFED]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={`Clinic photo ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute left-2 top-2 rounded bg-[#14302B] px-2 py-0.5 text-xs font-medium text-white">
                        Cover
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
                    {i > 0 ? (
                      <button
                        type="button"
                        onClick={() => makeCover(p.id)}
                        className="rounded font-medium text-[#14302B] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                      >
                        Make cover
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(p.id)}
                      aria-label={`Remove photo ${i + 1}`}
                      className="rounded font-medium text-[#B42318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {photos.length < MAX_PHOTOS && (
                <label className="flex aspect-4/3 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#C9D6D2] px-2 text-center text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] focus-within:ring-2 focus-within:ring-[#F5B82E]">
                  <input
                    type="file"
                    accept={TYPES.join(",")}
                    multiple
                    onChange={onPhotosChange}
                    className="sr-only"
                  />
                  Add photos
                </label>
              )}
            </div>
            <p className={hint}>
              Up to {MAX_PHOTOS} photos, {PHOTO_MB} MB each. The first photo is the cover.
            </p>
            {photoError && (
              <p role="alert" className={errorText}>
                {photoError}
              </p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-[#B42318]">
              {submitError}
            </p>
          )}

          <button
            disabled={submitting}
            className="w-full rounded-md bg-[#F5B82E] px-4 py-3 text-[15px] font-semibold text-[#14302B] hover:bg-[#E6A91F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14302B] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send for approval"}
          </button>
        </form>
      </section>
    </main>
  );
}