"use client";

import { useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { Activity, Menu, PackageIcon, X } from "lucide-react";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { openSignIn } = useClerk()
  const { user } = useUser();


  return (
    <header
      className={`${display.variable} ${body.variable} sticky top-0 z-50 border-b border-[#E4DED2] bg-[#F7F5F0]/80 backdrop-blur-md font-(family-name:--font-body)`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#265C50] text-[#F7F5F0]">
            <Activity size={16} strokeWidth={2.5} />
          </span>
          <span className="font-(family-name:--font-display) text-lg tracking-tight text-[#265C50]">
            Apana{" "}
            <span className="italic font-normal text-[#8FAF9E]">Clinic</span>
          </span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-[#17231F]/70 transition-colors hover:text-[#265C50]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 md:flex">

          {!user ?
            <button
              onClick={() => openSignIn()}
              className="rounded-full bg-[#265C50] px-4 py-2 text-sm font-medium text-[#F7F5F0] shadow-[0_8px_20px_-8px_rgba(38,92,80,0.5)] transition-transform hover:-translate-y-0.5 hover:bg-[#357566]"
            >
              Log in
            </button>
            : <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action labelIcon={<PackageIcon size={16} />} label="Booked Slots" onClick={() => router.push('/orders')} />
              </UserButton.MenuItems>
            </UserButton>
          }

        </div>

        {/* Mobile toggle */}
        <button
          className="text-[#265C50] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#E4DED2] bg-[#F7F5F0] px-6 pb-5 md:hidden">
          <ul className="flex flex-col gap-3.5 pt-4">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-[#17231F]/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5">
            {!user ?
              <button
                onClick={() => openSignIn()}
                className="rounded-full bg-[#265C50] px-4 py-2 text-sm font-medium text-[#F7F5F0] shadow-[0_8px_20px_-8px_rgba(38,92,80,0.5)] transition-transform hover:-translate-y-0.5 hover:bg-[#357566]"
              >
                Log in
              </button>
              : <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action labelIcon={<PackageIcon size={16} />} label="Booked Slots" onClick={() => router.push('/orders')} />
                </UserButton.MenuItems>
              </UserButton>
            }
          </div>
        </div>
      )}
    </header>
  );
}