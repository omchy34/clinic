// components/Footer.tsx
import { Activity } from "lucide-react";

const columns = [
  {
    title: "Care",
    links: ["Services", "Our Doctors", "Book a visit", "Emergency"],
  },
  {
    title: "Patients",
    links: ["Patient portal", "Insurance", "Billing", "Records request"],
  },
  {
    title: "Clinic",
    links: ["About Apana", "Careers", "Press", "Contact"],
  },
];

// Plain constant: no new Date() during render
const YEAR = 2026;

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#E4DED2] bg-[#F7F5F0] font-body"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#265C50] text-[#F7F5F0]">
                <Activity size={16} strokeWidth={2.5} />
              </span>
              <span className="font-(family-name:--font-fraunces) text-lg text-[#265C50]">
                Apana{" "}
                <span className="font-normal italic text-[#8FAF9E]">Clinic</span>
              </span>
            </a>
            <p className="mt-3.5 max-w-xs text-sm text-[#17231F]/60">
              212 Harbor View Road, Suite 4 · Open Mon–Sat, 8am–8pm
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-(family-name:--font-plex-mono) text-[11px] uppercase tracking-wide text-[#17231F]/40">
                {col.title}
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#17231F]/70 transition-colors hover:text-[#265C50]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E4DED2] pt-5 sm:flex-row">
          <p className="font-(family-name:--font-plex-mono) text-[11px] text-[#17231F]/40">
            © {YEAR} Apana Clinic. All rights reserved.
          </p>
          <p className="font-(family-name:--font-plex-mono) text-[11px] text-[#17231F]/40">
            In a medical emergency, call 911 immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}