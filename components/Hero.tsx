"use client";

import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Ticket,
  Timer,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

const HERO_IMAGE = "/clinic-hero.jpg";
const BOOKING_PATH = "/book";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

/* Flat icon circle */
const iconCircle =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:h-11 sm:w-11";

/* Glass surface, only used on top of the photo */
const glass =
  "border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_16px_32px_-16px_rgba(15,23,42,0.4)]";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

const primaryBtn = `inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_-14px_rgba(5,150,105,0.7)] transition-colors hover:bg-emerald-700 sm:w-auto ${focusRing}`;

const secondaryBtn = `inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-emerald-50 sm:w-auto ${focusRing}`;

export default function Hero() {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  return (
    <section
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-linear-to-b from-white to-emerald-50 font-(family-name:--font-body)`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Left: copy + actions */}
        <div className="min-w-0">
          <h1 className="font-(family-name:--font-display) text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Skip the wait,
            <br />
            not the care.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Book a time with a doctor and get your token number before you leave
            home. When you arrive, you are seen on time.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {user ? (
              <Link href={BOOKING_PATH} className={primaryBtn}>
                Book a token
                <ArrowRight size={18} />
              </Link>
            ) : (
              <button
                type="button"
                disabled={!isLoaded}
                onClick={() => openSignIn({ forceRedirectUrl: BOOKING_PATH })}
                className={`${primaryBtn} disabled:opacity-70`}
              >
                Book a token
                <ArrowRight size={18} />
              </button>
            )}

            <a href="#how-it-works" className={secondaryBtn}>
              How it works
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
            Sign in once, then book in under a minute.
          </p>

          {/* Facts */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-slate-200/70 pt-6">
            <div className="flex items-center gap-3">
              <span className={iconCircle}>
                <Building2 size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">3 branches</p>
                <p className="text-sm text-slate-500">across the city</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={iconCircle}>
                <Timer size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">12k+ tokens</p>
                <p className="text-sm text-slate-500">issued every month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: photo with glass cards inside it */}
        <div className="relative min-w-0 lg:pb-4 lg:pr-4">
          {/* Offset backing shape, desktop only */}
          <div
            aria-hidden
            className="absolute bottom-0 left-4 right-0 top-4 hidden rounded-3xl bg-emerald-100 lg:block"
          />

          <div className="relative h-72 overflow-hidden rounded-3xl shadow-[0_30px_60px_-36px_rgba(15,23,42,0.45)] sm:h-96 lg:h-120">
            <Image
              src={HERO_IMAGE}
              alt="Doctor caring for a patient in a bright clinic"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
              priority
            />

            {/* Now serving */}
            <div
              className={`${glass} absolute left-3 top-3 flex items-center gap-2 rounded-xl px-3 py-2 sm:left-5 sm:top-5 sm:px-3.5 sm:py-2.5`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
              </span>
              <p className="text-xs text-slate-700 sm:text-sm">
                Now serving{" "}
                <span className="font-semibold text-slate-900">A-09</span>
              </p>
            </div>

            {/* Example token card */}
            <div
              className={`${glass} absolute bottom-3 left-3 w-48 rounded-xl p-3 sm:bottom-5 sm:left-5 sm:w-56 sm:p-4`}
            >
              <div className="flex items-center gap-3">
                <span className={iconCircle}>
                  <Ticket size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Example token</p>
                  <p className="font-(family-name:--font-display) text-2xl font-semibold leading-none tabular-nums text-slate-900 sm:text-3xl">
                    A-14
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-900/10 pt-2.5 text-[11px] sm:mt-4 sm:pt-3 sm:text-xs">
                <span className="font-medium text-slate-700">2:00 PM</span>
                <span className="inline-flex items-center gap-1 font-medium text-green-700">
                  <CheckCircle2 size={14} />
                  Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}