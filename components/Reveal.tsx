"use client";

// Fades (and slides or pops) its children in once mounted.
// `index` staggers items one after another, `pop` scales in instead of sliding up.

import { useEffect, useState, type ReactNode } from "react";

export default function Reveal({
  index = 0,
  pop = false,
  className = "",
  children,
}: {
  index?: number;
  pop?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShown(true), 30); // lets the browser paint the hidden state first
    return () => clearTimeout(id);
  }, []);

  const hidden = pop ? "scale-90 opacity-0" : "translate-y-4 opacity-0";
  const visible = pop ? "scale-100 opacity-100" : "translate-y-0 opacity-100";

  return (
    <div
      style={{ transitionDelay: shown ? `${Math.min(index, 8) * 70}ms` : "0ms" }}
      className={`transition duration-500 ease-out motion-reduce:transition-none ${
        shown ? visible : `${hidden} motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100`
      } ${className}`}
    >
      {children}
    </div>
  );
}