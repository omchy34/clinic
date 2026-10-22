import Link from "next/link";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Stethoscope,
  Ticket,
} from "lucide-react";

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

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

const primaryBtn = `inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_-14px_rgba(5,150,105,0.7)] transition-colors hover:bg-emerald-700 sm:w-auto ${focusRing}`;

/* Each step carries a tiny glimpse of the real screen it describes */
const steps = [
  {
    icon: Search,
    title: "Find doctors",
    text: "Browse doctors by branch and see who is available today.",
    preview: (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-emerald-700 shadow-sm">
          DS
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            Dr. Sharma
          </p>
          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
            <MapPin size={12} className="shrink-0" />
            Central branch
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          Today
        </span>
      </div>
    ),
  },
  {
    icon: Ticket,
    title: "Book token",
    text: "Pick a time that suits you and get your token number instantly.",
    preview: (
      <div>
        <div className="flex gap-1.5">
          <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-500">
            11:00
          </span>
          <span className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">
            2:00 PM
          </span>
          <span className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-500">
            4:30
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-900/10 pt-2.5">
          <span className="font-(family-name:--font-display) text-xl font-semibold leading-none tabular-nums text-slate-900">
            A-14
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
            <CheckCircle2 size={14} />
            Confirmed
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: Activity,
    title: "Track live queue",
    text: "Watch the queue from your phone and leave home at the right time.",
    highlight: true,
    preview: (
      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-2 text-emerald-50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Now serving
          </span>
          <span className="font-(family-name:--font-display) text-base font-semibold tabular-nums text-white">
            A-09
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-4/5 rounded-full bg-white" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-emerald-50">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            About 20 min
          </span>
          <span className="font-semibold text-white">You: A-14</span>
        </div>
      </div>
    ),
  },
  {
    icon: Stethoscope,
    title: "Arrive and consult",
    text: "Walk in when your turn is near and see the doctor without waiting.",
    preview: (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
          <CheckCircle2 size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">You are next</p>
          <p className="text-xs text-slate-500">Please proceed to Room 3</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`${display.variable} ${body.variable} relative scroll-mt-20 overflow-hidden bg-linear-to-b from-emerald-50 to-white font-(family-name:--font-body)`}
    >
      {/* Soft dot texture, fades out toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(5,150,105,0.14)_1px,transparent_0)] bg-size-[24px_24px] mask-[linear-gradient(to_bottom,black,transparent_70%)]"
      />
      {/* Glow, echoes the offset shape behind the hero photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Heading */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="font-(family-name:--font-display) text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            From your couch
            <br />
            to the consult room.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            No standing in line. Book once, follow your turn live, and arrive
            right on time.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {/* Dashed rail linking the four icons, desktop only */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-12 hidden border-t-2 border-dashed border-emerald-300 lg:block"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const hl = step.highlight;

            return (
              <li
                key={step.title}
                className={`group relative z-10 flex flex-col rounded-3xl border p-5 transition-all duration-200 sm:p-6 ${
                  hl
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_30px_60px_-30px_rgba(5,150,105,0.8)] lg:-translate-y-3"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_40px_-28px_rgba(15,23,42,0.35)]"
                }`}
              >
                {/* Icon + step number */}
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      hl
                        ? "bg-white text-emerald-600"
                        : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span
                    aria-hidden
                    className={`font-(family-name:--font-display) text-4xl font-semibold leading-none tabular-nums ${
                      hl ? "text-white/30" : "text-emerald-100"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Copy */}
                <p
                  className={`mt-5 text-xs font-semibold ${
                    hl ? "text-emerald-100" : "text-emerald-700"
                  }`}
                >
                  Step {i + 1}
                </p>
                <h3
                  className={`mt-1 font-(family-name:--font-display) text-xl font-semibold ${
                    hl ? "text-white" : "text-slate-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    hl ? "text-emerald-50" : "text-slate-600"
                  }`}
                >
                  {step.text}
                </p>

                {/* Screen glimpse */}
                <div
                  className={`mt-5 rounded-2xl p-3.5 sm:mt-auto sm:pt-3.5 ${
                    hl
                      ? "border border-white/25 bg-white/10"
                      : "border border-emerald-100 bg-emerald-50"
                  }`}
                >
                  {step.preview}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing action */}
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:mt-14">
          <Link href={BOOKING_PATH} className={primaryBtn}>
            Book a token
            <ArrowRight size={18} />
          </Link>
          <p className="text-sm text-slate-500">
            Takes under a minute. No queue to join.
          </p>
        </div>
      </div>
    </section>
  );
}