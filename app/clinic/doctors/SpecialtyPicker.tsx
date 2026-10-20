"use client";

// app/clinic/doctors/SpecialtyPicker.tsx
// Search a specialty, or browse all of them grouped by category.

import { useMemo, useState } from "react";
import { SPECIALTIES, type Specialty } from "./shared";
import { ui } from "./ui";

const listBox = "overflow-auto rounded-md border border-[#C9D6D2] bg-white";

function Option({
  specialty,
  detail,
  onPick,
}: {
  specialty: Specialty;
  detail: string;
  onPick: (s: Specialty) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(specialty)}
      className="w-full px-3.5 py-2.5 text-left hover:bg-[#F3F6F5] focus-visible:bg-[#F3F6F5] focus-visible:outline-none"
    >
      <span className="block text-[15px] font-medium text-[#14302B]">{specialty.name}</span>
      <span className="block text-xs text-[#5B726C]">{detail}</span>
    </button>
  );
}

export default function SpecialtyPicker({
  value,
  onChange,
}: {
  value: Specialty | null;
  onChange: (s: Specialty | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [browsing, setBrowsing] = useState(false);
  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!q) return [];
    return SPECIALTIES.filter((s) =>
      [s.name, s.category, s.description, ...s.keywords].some((t) => t.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [q]);

  const groups = useMemo(() => {
    const map = new Map<string, Specialty[]>();
    for (const s of SPECIALTIES) map.set(s.category, [...(map.get(s.category) ?? []), s]);
    return [...map.entries()];
  }, []);

  function pick(s: Specialty) {
    onChange(s);
    setQuery("");
    setBrowsing(false);
  }

  // Already chosen: show it with a Change button
  if (value) {
    return (
      <div className="flex items-start justify-between gap-3 rounded-md border border-[#C9D6D2] px-3.5 py-2.5">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-[#14302B]">{value.name}</p>
          <p className="text-xs text-[#5B726C]">
            {value.category}. {value.description}
          </p>
        </div>
        <button type="button" onClick={() => onChange(null)} className={`shrink-0 ${ui.link}`}>
          Change
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        aria-label="Search specialty"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setBrowsing(false);
        }}
        autoComplete="off"
        placeholder="Search, for example dentist, child or X-ray"
        className={ui.input}
      />

      {q ? (
        matches.length > 0 ? (
          <ul className={`mt-2 max-h-64 ${listBox}`}>
            {matches.map((s) => (
              <li key={s.slug}>
                <Option specialty={s} detail={`${s.category}. ${s.description}`} onPick={pick} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={ui.hint}>No specialty found. Try another word.</p>
        )
      ) : (
        <>
          <button
            type="button"
            onClick={() => setBrowsing((b) => !b)}
            aria-expanded={browsing}
            className={`mt-2 ${ui.link}`}
          >
            {browsing ? "Hide the list" : "Browse all specialties"}
          </button>

          {browsing && (
            <div className={`mt-2 max-h-72 ${listBox}`}>
              {groups.map(([category, items]) => (
                <div key={category}>
                  <p className="sticky top-0 bg-[#F3F6F5] px-3.5 py-1.5 text-xs font-semibold text-[#5B726C]">
                    {category}
                  </p>
                  <ul>
                    {items.map((s) => (
                      <li key={s.slug}>
                        <Option specialty={s} detail={s.description} onPick={pick} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}