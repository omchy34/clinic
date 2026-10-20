"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import { useAuth, useUser } from "@clerk/nextjs";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

const field =
  "w-full rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2.5 text-[15px] text-[#14302B] placeholder:text-[#7C8F8A] outline-none focus-visible:border-[#14302B] focus-visible:ring-2 focus-visible:ring-[#F5B82E]";
const label = "mb-1.5 block text-sm font-medium text-[#14302B]";
const hint = "mt-1.5 text-xs text-[#5B726C]";
const errorText = "mt-1.5 text-xs text-[#B42318]";
const secondaryBtn =
  "cursor-pointer rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] focus-within:ring-2 focus-within:ring-[#F5B82E]";
const primaryLink =
  "mt-6 inline-block rounded-md bg-[#14302B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C4038] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2";

const ENDPOINT = "/api/user/create";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTOS = 8;
// Size of the file the user picks. We shrink it before upload.
const MAX_INPUT_MB = 15;
// Everything we upload together. Vercel functions reject request bodies above ~4.5 MB.
const MAX_TOTAL_MB = 4;
const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;
const TOTAL_MSG = `Total upload must stay under ${MAX_TOTAL_MB} MB. Remove a photo or pick smaller images.`;

type Status = "loading" | "none" | "pending" | "approved" | "error";
type Preview = { id: string; file: File; url: string };

function toPreview(file: File): Preview {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return { id, file, url: URL.createObjectURL(file) };
}

function check(file: File): string | null {
  if (!TYPES.includes(file.type)) return "Only JPG, PNG or WebP images are allowed.";
  if (file.size > MAX_INPUT_MB * 1024 * 1024) return `Each file must be under ${MAX_INPUT_MB} MB.`;
  return null;
}

function totalBytes(items: (Preview | null)[]): number {
  return items.reduce((sum, p) => sum + (p?.file.size ?? 0), 0);
}

// Resize and recompress an image in the browser. If anything fails, the original file is used.
async function shrink(
  file: File,
  maxSide: number,
  type: "image/jpeg" | "image/png",
): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    if (type === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, 0.82),
    );
    if (!blob || blob.size >= file.size) return file;

    const base = file.name.replace(/\.[^.]+$/, "");
    const ext = type === "image/png" ? "png" : "jpg";
    return new File([blob], `${base}.${ext}`, { type: blob.type || type });
  } catch {
    return file;
  }
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`${font.className} flex min-h-screen items-center justify-center bg-[#F3F6F5] px-5 py-10`}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center ring-1 ring-[#DCE6E3]">
        {children}
      </div>
    </main>
  );
}

function StatusCard({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Centered>
      <CheckCircle2 className="mx-auto text-[#1F7A5C]" size={44} aria-hidden="true" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#14302B]">{title}</h1>
      <p className="mt-2 text-[15px] text-[#5B726C]">{text}</p>
      <Link href={href} className={primaryLink}>
        Open dashboard
      </Link>
    </Centered>
  );
}

export default function Page() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [logo, setLogo] = useState<Preview | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Preview[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Keep the latest preview URLs so they can be released when the page closes
  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    urlsRef.current = [...(logo ? [logo.url] : []), ...photos.map((p) => p.url)];
  }, [logo, photos]);
  useEffect(() => {
    return () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  // Find out if this user already has a clinic, and whether it is approved
  useEffect(() => {
    let cancelled = false;

    async function checkClinic() {
      try {
        const token = await getToken();
        const { data } = await axios.get(ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;

        const approved = data?.state ?? data?.isApproved;
        if (approved === true) {
          setStatus("approved");
          router.replace("/clinic");
        } else if (approved === false) {
          setStatus("pending");
        } else {
          setStatus("none");
        }
      } catch (err) {
        if (cancelled) return;
        // 404 means "no clinic yet", so the registration form should show
        if (axios.isAxiosError(err) && err.response?.status === 404) setStatus("none");
        else setStatus("error");
      }
    }

    checkClinic();
    return () => {
      cancelled = true;
    };
  }, [getToken, attempt, router]);

  function retry() {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }

  async function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const problem = check(file);
    if (problem) {
      setLogoError(problem);
      return;
    }

    setProcessing(true);
    try {
      const small = await shrink(file, 512, file.type === "image/png" ? "image/png" : "image/jpeg");
      if (totalBytes(photos) + small.size > MAX_TOTAL_BYTES) {
        setLogoError(TOTAL_MSG);
        return;
      }
      setLogoError(null);
      if (logo) URL.revokeObjectURL(logo.url);
      setLogo(toPreview(small));
    } finally {
      setProcessing(false);
    }
  }

  function removeLogo() {
    if (logo) URL.revokeObjectURL(logo.url);
    setLogo(null);
    setLogoError(null);
  }

  async function onPhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setProcessing(true);
    try {
      const room = MAX_PHOTOS - photos.length;
      let used = totalBytes([logo, ...photos]);
      const accepted: Preview[] = [];
      let problem: string | null = null;

      for (const f of files) {
        const p = check(f);
        if (p) {
          problem = p;
          continue;
        }
        if (accepted.length >= room) {
          problem = `You can add up to ${MAX_PHOTOS} photos.`;
          break;
        }
        const small = await shrink(f, 1400, "image/jpeg");
        if (used + small.size > MAX_TOTAL_BYTES) {
          problem = TOTAL_MSG;
          break;
        }
        used += small.size;
        accepted.push(toPreview(small));
      }

      setPhotoError(problem);
      setPhotos((prev) => [...prev, ...accepted]);
    } finally {
      setProcessing(false);
    }
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

  function clearPreviews() {
    if (logo) URL.revokeObjectURL(logo.url);
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setLogo(null);
    setPhotos([]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || processing) return;
    setSubmitError(null);
    setSubmitting(true);

    try {
      const body = new FormData(e.currentTarget);
      if (logo) body.append("logo", logo.file);
      photos.forEach((p) => body.append("clinicImage", p.file));

      const token = await getToken();
      await axios.post(ENDPOINT, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearPreviews();
      setStatus("pending");
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

  if (status === "loading") {
    return (
      <Centered>
        <p role="status" className="text-[15px] text-[#5B726C]">
          Loading...
        </p>
      </Centered>
    );
  }

  if (status === "error") {
    return (
      <Centered>
        <h1 className="text-2xl font-semibold tracking-tight text-[#14302B]">
          Could not load your clinic
        </h1>
        <p className="mt-2 text-[15px] text-[#5B726C]">
          Check your connection and try again.
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-6 rounded-md bg-[#14302B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C4038] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </Centered>
    );
  }

  if (status === "pending") {
    return (
      <StatusCard
        title="Request sent"
        text="An admin will check your details. Your clinic goes live for patients once it is approved."
        href="/user"
      />
    );
  }

  if (status === "approved") {
    return (
      <Centered>
        <p role="status" className="text-[15px] text-[#5B726C]">
          Opening your clinic...
        </p>
      </Centered>
    );
  }

  // status === "none": no clinic yet, show the registration form
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
              Tap Complete &amp; Next or Skip &amp; Next, and every patient&apos;s estimate
              updates on its own.
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

          <div>
            <label htmlFor="email" className={label}>
              Clinic email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              defaultValue={user?.primaryEmailAddress?.emailAddress ?? ""}
              placeholder="clinic@example.com"
              className={field}
            />
            <p className={hint}>
              Pre-filled with your login email. Change it if the clinic uses a different one.
            </p>
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
                    disabled={processing}
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
              A square image works best. JPG, PNG or WebP. Large images are resized
              automatically.
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
                    disabled={processing}
                    className="sr-only"
                  />
                  {processing ? "Resizing..." : "Add photos"}
                </label>
              )}
            </div>
            <p className={hint}>
              Up to {MAX_PHOTOS} photos. Large photos are resized automatically. The first photo
              is the cover.
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
            type="submit"
            disabled={submitting || processing}
            className="w-full rounded-md bg-[#F5B82E] px-4 py-3 text-[15px] font-semibold text-[#14302B] hover:bg-[#E6A91F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14302B] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send for approval"}
          </button>
        </form>
      </section>
    </main>
  );
}