import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import {
  Activity,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Siren,
} from "lucide-react";

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

const columns = [
  {
    title: "Care",
    links: [
      { label: "Services", href: "#" },
      { label: "Our doctors", href: "#" },
      { label: "Book a visit", href: "#" },
      { label: "Emergency", href: "#" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Patient portal", href: "#" },
      { label: "Insurance", href: "#" },
      { label: "Billing", href: "#" },
      { label: "Records request", href: "#" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "About Doctor Token", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "https://sites.google.com/view/dt--privacy--policy/home",
  },
  {
    label: "Terms & Conditions",
    href: "https://sites.google.com/view/dt-terms-conditions/home",
  },
  {
    label: "Refund Policy",
    href: "https://sites.google.com/view/dt-refund-policy/home",
  },
  {
    label: "FAQs",
    href: "https://sites.google.com/view/dtfaqs/home",
  },
];

// Plain constant: no new Date() during render
const YEAR = 2026;

export default function Footer() {
  return (
    <footer
      id="contact"
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-linear-to-b from-white to-emerald-50 font-(family-name:--font-body)`}
    >
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-24">
        {/* Closing call to action */}
        <div className="relative overflow-hidden rounded-3xl bg-emerald-600 px-6 py-10 shadow-[0_30px_60px_-30px_rgba(5,150,105,0.8)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.16)_1px,transparent_0)] bg-size-[22px_22px] mask-[linear-gradient(to_left,black,transparent_75%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-emerald-400/40 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-(family-name:--font-display) text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Skip the wait,
                <br />
                not the care.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-emerald-50 sm:text-lg">
                Book a token now and get seen on time at any of our branches.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 sm:w-auto ${focusRing} focus-visible:outline-white`}
              >
                Book a token
                <ArrowRight size={18} />
              </a>
              <a
                href="#"
                className={`inline-flex w-full items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto ${focusRing} focus-visible:outline-white`}
              >
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className={`inline-flex items-center gap-2.5 ${focusRing}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Activity size={20} strokeWidth={2.25} />
              </span>
              <span className="font-(family-name:--font-display) text-xl font-semibold tracking-tight text-slate-900">
                Doctor Token
              </span>
            </a>

            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <MapPin size={16} strokeWidth={1.75} />
                </span>
                <span className="pt-1">212 Harbor View Road, Suite 4</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Clock size={16} strokeWidth={1.75} />
                </span>
                <span className="pt-1">Open Mon–Sat, 8am–8pm</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-(family-name:--font-display) text-base font-semibold text-slate-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`group inline-flex items-center gap-1 rounded text-sm text-slate-600 transition-colors hover:text-emerald-700 ${focusRing}`}
                    >
                      {link.label}
                      <ArrowRight
                        size={14}
                        aria-hidden
                        className="-translate-x-1 text-emerald-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-slate-500">
              © {YEAR} Doctor Token. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded text-sm text-slate-600 transition-colors hover:text-emerald-700 ${focusRing}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
              Your health data stays private.
            </p>
            <p className="inline-flex items-center gap-2 self-start rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-700 sm:self-auto">
              <Siren size={16} className="shrink-0" />
              In an emergency, call 112 immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}