// app/clinic/doctors/ui.tsx
// Class names and one small component reused across the doctors screens.

import type { ReactNode } from "react";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]";

export const ui = {
  ring,
  card: "rounded-xl bg-white ring-1 ring-[#DCE6E3]",
  input: `w-full rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2.5 text-[15px] text-[#14302B] placeholder:text-[#7C8F8A] focus-visible:border-[#14302B] ${ring}`,
  label: "mb-1.5 block text-sm font-medium text-[#14302B]",
  hint: "mt-1.5 text-xs text-[#5B726C]",
  error: "mt-1.5 text-xs text-[#B42318]",
  link: `rounded text-sm font-medium text-[#14302B] underline underline-offset-2 ${ring}`,
  dangerLink: `rounded text-sm font-medium text-[#B42318] underline underline-offset-2 ${ring}`,
  outlineBtn: `rounded-md border border-[#C9D6D2] bg-white px-3.5 py-2 text-sm font-medium text-[#14302B] hover:bg-[#F3F6F5] ${ring}`,
  primaryBtn:
    "rounded-md bg-[#F5B82E] px-5 py-2.5 text-[15px] font-semibold text-[#14302B] hover:bg-[#E6A91F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14302B] focus-visible:ring-offset-2 disabled:opacity-60",
};

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={ui.label}>
        {label}
      </label>
      {children}
      {hint && <p className={ui.hint}>{hint}</p>}
    </div>
  );
}