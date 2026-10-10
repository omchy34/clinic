"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { MapPin, Phone, ArrowRight } from "lucide-react";

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
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

type Branch = {
  id: string;
  name: string;
  tag: string;
  accent: string;
  city: string;
  address: string;
  hours: string;
  wait: string;
  doctors: number;
  specialties: number;
  phone: string;
  image: string;
};

const branches: Branch[] = [
  {
    id: "central",
    name: "MedCare Central",
    tag: "MAIN BRANCH",
    accent: "#1F6F5C",
    city: "Salt Lake City, Kolkata",
    address: "Block CE-45, Sector III, Salt Lake, Kolkata – 700106",
    hours: "Mon – Sat · 8am – 8pm",
    wait: "Wait ~10 min",
    doctors: 24,
    specialties: 12,
    phone: "+91 98300 00001",
    image:
      "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "southpoint",
    name: "MedCare Southpoint",
    tag: "SOUTH HUB",
    accent: "#B4622F",
    city: "Tollygunge, Kolkata",
    address: "12A, Prince Anwar Shah Rd, Tollygunge, Kolkata – 700033",
    hours: "Mon – Sat · 9am – 7pm",
    wait: "Wait ~15 min",
    doctors: 18,
    specialties: 9,
    phone: "+91 98300 00002",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "newtown",
    name: "MedCare Newtown",
    tag: "24/7 OPEN",
    accent: "#2C4A86",
    city: "Newtown, Kolkata",
    address: "Plot AA-2, Newtown Rd, Action Area I, Kolkata – 700156",
    hours: "Mon – Sun · 8am – 9pm",
    wait: "Wait ~8 min",
    doctors: 30,
    specialties: 15,
    phone: "+91 98300 00003",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BranchesNearYou() {
  const router = useRouter();

  return (
    <section
      className={`${display.variable} ${body.variable} ${mono.variable} bg-[#F7F5F0] py-16 font-(family-name:--font-body) lg:py-20`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-(family-name:--font-display) text-3xl text-[#17231F] sm:text-4xl">
            Find a Branch
          </h2>
          <h2 className="font-(family-name:--font-display) text-3xl sm:text-4xl">
            <span className="italic text-[#265C50]">Near</span>{" "}
            <span className="text-[#17231F]">You</span>
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#E4DED2]" />
            <span className="text-[#E3A234]">✦</span>
            <span className="h-px w-8 bg-[#E4DED2]" />
          </div>
          <p className="mt-4 text-[15px] text-[#17231F]/60">
            Three convenient locations across Kolkata — each equipped with
            specialists, modern facilities, and minimal wait times.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <div
              key={b.id}
              className="overflow-hidden rounded-2xl border border-[#E4DED2] bg-white"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-white"
                  style={{ backgroundColor: b.accent }}
                >
                  {b.tag}
                </span>
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {b.wait}
                </span>
              </div>

              <div className="p-5">
                <p className="font-(family-name:--font-display) text-lg text-[#17231F]">
                  {b.name}
                </p>
                <p
                  className="mt-0.5 flex items-center gap-1 text-[12px] font-medium uppercase tracking-wide"
                  style={{ color: b.accent }}
                >
                  <MapPin size={11} /> {b.city}
                </p>
                <p className="mt-2 text-[13px] text-[#17231F]/60">{b.address}</p>

                <div className="mt-4 flex items-center justify-between border-t border-[#E4DED2] pt-3">
                  <div className="flex gap-4">
                    <div>
                      <p className="font-(family-name:--font-display) text-base" style={{ color: b.accent }}>
                        {b.doctors}+
                      </p>
                      <p className="font-mono text-[10px] uppercase text-[#17231F]/45">
                        Doctors
                      </p>
                    </div>
                    <div>
                      <p className="font-(family-name:--font-display) text-base" style={{ color: b.accent }}>
                        {b.specialties}+
                      </p>
                      <p className="font-mono text-[10px] uppercase text-[#17231F]/45">
                        Specialties
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#17231F]/50">
                    <p className="font-medium">{b.hours}</p>
                    <p className="mt-0.5 flex items-center justify-end gap-1">
                      <Phone size={10} /> {b.phone}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/appointment?branch=${b.id}`)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: b.accent }}
                >
                  Book Appointment <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}