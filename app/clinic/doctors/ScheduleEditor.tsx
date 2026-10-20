"use client";

// app/clinic/doctors/ScheduleEditor.tsx
// The weekly schedule part of the Add doctor form.
// One rule = "these days, this time window".
// On submit every rule is expanded to one row per day (see rulesToSchedules).

import {
  DAYS,
  toMinutes,
  type SchedulePayload,
  type Weekday,
} from "./shared";
import { Field, ui } from "./ui";
import type { ScheduleRow } from "./shared";

export type Rule = {
  id: string;
  days: Weekday[];
  startTime: string;
  endTime: string;
  bookingCloseTime: string; // "" = closes when the session ends
};

export const newRule = (startTime = "10:00", endTime = "13:00"): Rule => ({
  id: crypto.randomUUID(),
  days: [],
  startTime,
  endTime,
  bookingCloseTime: "",
});

export function schedulesToRules(schedules: ScheduleRow[]): Rule[] {
  const groups = new Map<
    string,
    { days: Weekday[]; startTime: string; endTime: string; bookingCloseTime: string }
  >();

  for (const s of schedules) {
    const key = `${s.startTime}|${s.endTime}|${s.bookingCloseTime ?? ""}`;
    const g = groups.get(key) ?? {
      days: [],
      startTime: s.startTime,
      endTime: s.endTime,
      bookingCloseTime: s.bookingCloseTime ?? "",
    };
    g.days.push(s.day);
    groups.set(key, g);
  }

  // newRule() supplies the id and any other fields, so every rule keeps a unique id
  return [...groups.values()].map((g) => ({ ...newRule(), ...g }));
}

/* ------------------------------ validation ------------------------------ */

// Same rules as the API route
function timeProblem(r: Rule): string | null {
  if (r.bookingCloseTime && r.bookingCloseTime <= "00:00") return "Booking opens at 12:00 AM, so it cannot close then.";
  if (!r.startTime || !r.endTime) return "Set a start time and an end time.";

  const length = toMinutes(r.endTime) - toMinutes(r.startTime);
  if (length <= 0) return "End time must be after the start time.";

  if (r.bookingCloseTime && r.bookingCloseTime > r.endTime) {
    return "Booking cannot close after the session ends.";
  }
  return null;
}

// Two rules on the same day must not overlap
function overlapProblem(rules: Rule[]): string | null {
  for (const day of DAYS) {
    const spans = rules
      .filter((r) => r.days.includes(day.value) && !timeProblem(r))
      .map((r) => [toMinutes(r.startTime), toMinutes(r.endTime)])
      .sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < spans.length; i++) {
      if (spans[i][0] < spans[i - 1][1]) return `${day.long} has times that overlap.`;
    }
  }
  return null;
}

// First problem found, or null if all rules are fine
export function validateRules(rules: Rule[]): string | null {
  if (rules.length === 0) return "Add at least one weekly time.";
  for (const r of rules) {
    if (r.days.length === 0) return "Pick at least one day for each weekly time.";
    const problem = timeProblem(r);
    if (problem) return problem;
  }
  return overlapProblem(rules);
}

// One row per day, the shape the API route expects
export function rulesToSchedules(rules: Rule[]): SchedulePayload[] {
  return rules.flatMap((r) =>
    r.days.map((day) => ({
      day,
      startTime: r.startTime,
      endTime: r.endTime,
      bookingCloseTime: r.bookingCloseTime || null,
    }))
  );
}

/* -------------------------------- component ------------------------------- */

export default function ScheduleEditor({
  rules,
  onChange,
}: {
  rules: Rule[];
  onChange: (rules: Rule[]) => void;
}) {
  const update = (id: string, patch: Partial<Rule>) =>
    onChange(rules.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const toggleDay = (r: Rule, day: Weekday) =>
    update(r.id, {
      days: r.days.includes(day) ? r.days.filter((d) => d !== day) : [...r.days, day],
    });

  return (
    <div>
      <div className="space-y-4">
        {rules.map((r, index) => {
          const problem = timeProblem(r);

          return (
            <div key={r.id} className="rounded-lg border border-[#DCE6E3] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[#14302B]">Weekly time {index + 1}</p>
                {rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onChange(rules.filter((x) => x.id !== r.id))}
                    className={ui.dangerLink}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Days">
                {DAYS.map((d) => {
                  const on = r.days.includes(d.value);
                  return (
                    <button
                      key={d.value}
                      type="button"
                      aria-pressed={on}
                      aria-label={d.long}
                      onClick={() => toggleDay(r, d.value)}
                      className={`rounded-md border px-3 py-1.5 text-sm font-medium ${ui.ring} ${
                        on
                          ? "border-[#14302B] bg-[#14302B] text-white"
                          : "border-[#C9D6D2] bg-white text-[#14302B] hover:bg-[#F3F6F5]"
                      }`}
                    >
                      {d.short}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Field id={`start-${r.id}`} label="Doctor starts">
                  <input
                    id={`start-${r.id}`}
                    type="time"
                    value={r.startTime}
                    onChange={(e) => update(r.id, { startTime: e.target.value })}
                    className={ui.input}
                  />
                </Field>
                <Field id={`end-${r.id}`} label="Doctor finishes">
                  <input
                    id={`end-${r.id}`}
                    type="time"
                    value={r.endTime}
                    onChange={(e) => update(r.id, { endTime: e.target.value })}
                    className={ui.input}
                  />
                </Field>
                <Field
                  id={`close-${r.id}`}
                  label="Booking closes (optional)"
                  hint="Empty means when the doctor finishes."
                >
                  <input
                    id={`close-${r.id}`}
                    type="time"
                    value={r.bookingCloseTime}
                    onChange={(e) => update(r.id, { bookingCloseTime: e.target.value })}
                    className={ui.input}
                  />
                </Field>
              </div>

              {problem && (
                <p role="alert" className={ui.error}>
                  {problem}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onChange([...rules, newRule("17:00", "20:00")])}
        className={`mt-3 ${ui.outlineBtn}`}
      >
        Add another weekly time
      </button>
    </div>
  );
}