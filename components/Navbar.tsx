"use client";

import { useState } from "react";
import Image from "next/image";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Menu, PackageIcon, X } from "lucide-react";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

const links = [
  { label: "Services", href: "#services" },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Patient Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const authControl = !user ? (
    <button
      onClick={() => openSignIn()}
      className={`rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:px-5 ${focusRing}`}
    >
      Log in
    </button>
  ) : (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          labelIcon={<PackageIcon size={16} />}
          label="Booked Slots"
          onClick={() => router.push("/orders")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  return (
    <header
      className={`${display.variable} ${body.variable} sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md font-(family-name:--font-body)`}
    >
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between gap-3 px-6 py-3 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            aria-label="Doctor Token home"
            className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
          >
            <Image
              src="/logo.png"
              alt="Doctor Token logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="font-(family-name:--font-display) text-xl font-bold tracking-tight text-slate-900">
              Doctor <span className="text-emerald-600">Token</span>
            </span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-slate-900 ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions: login + hamburger together on mobile */}
          <div className="flex items-center gap-2">
            {authControl}
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-emerald-50 md:hidden ${focusRing}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-200 px-6 pb-4 pt-2 md:hidden">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}