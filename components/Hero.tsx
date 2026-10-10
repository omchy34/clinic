"use client";

import Image from "next/image";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Ticket, ArrowRight } from "lucide-react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

export default function Hero() {
  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden bg-[#F7F5F0] font-(family-name:--font-body)`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-20">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DED2] bg-white px-3 py-1 text-[11px] font-medium text-[#265C50]">
            <Ticket size={12} />
            No more waiting-room guesswork
          </div>

          <h1 className="mt-4 font-(family-name:--font-display) text-3xl leading-[1.1] text-[#17231F] sm:text-4xl lg:text-[2.75rem]">
            Walk in with a{" "}
            <span className="italic text-[#265C50]">reserved</span> spot,
            not a guess.
          </h1>

          <p className="mt-3.5 max-w-sm text-[15px] leading-relaxed text-[#17231F]/60">
            Pick a Meridian branch, choose your slot, and get a token number
            before you leave the house. Show up, skip the line.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#265C50] px-5 py-2.5 text-sm font-medium text-[#F7F5F0] transition-transform hover:-translate-y-0.5 hover:bg-[#357566]"
            >
              Book your slot
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#doctors"
              className="text-sm font-medium text-[#17231F]/70 hover:text-[#265C50]"
            >
              Meet our doctors →
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex items-center gap-7 border-t border-[#E4DED2] pt-5">
            <div>
              <p className="font-(family-name:--font-display) text-xl text-[#17231F]">
                3
              </p>
              <p className="text-[11px] text-[#17231F]/50">Branches in the city</p>
            </div>
            <div>
              <p className="font-(family-name:--font-display) text-xl text-[#17231F]">
                12k+
              </p>
              <p className="text-[11px] text-[#17231F]/50">Tokens issued monthly</p>
            </div>
          </div>
        </div>

        {/* Right: collage */}
        <div className="relative mx-auto h-95 w-full max-w-105 lg:h-110">
          {/* Back photo — clinic interior, slightly rotated */}
          <div className="absolute right-0 top-0 h-[70%] w-[68%] -rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-[0_15px_35px_-10px_rgba(23,35,31,0.25)]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80"
              alt="Meridian clinic waiting area"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Front photo — doctor close-up, overlapping bottom-left */}
          <div className="absolute bottom-0 left-0 h-[62%] w-[58%] rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-[0_15px_35px_-10px_rgba(23,35,31,0.3)]">
            <Image
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
              alt="Doctor at Meridian Clinic"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating ticket-stub card — the signature element */}
          <div className="absolute -bottom-4 right-2 w-40 -rotate-1 rounded-xl border border-[#E4DED2] bg-white p-3.5 shadow-[0_15px_35px_-12px_rgba(23,35,31,0.3)]">
            <div className="flex items-center justify-between border-b border-dashed border-[#E4DED2] pb-2">
              <span className="text-[9px] font-medium uppercase tracking-wider text-[#17231F]/40">
                Your token
              </span>
              <Ticket size={12} className="text-[#E3A234]" />
            </div>
            <p className="mt-2 font-mono text-lg text-[#265C50]">
              A-14
            </p>
            <p className="mt-0.5 text-[10px] text-[#17231F]/50">Today, 2:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}