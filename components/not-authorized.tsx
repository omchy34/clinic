"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

const REDIRECT_TO = "/user";
const REDIRECT_AFTER_SECONDS = 3;

export default function NotAuthorized() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(REDIRECT_AFTER_SECONDS);

  useEffect(() => {
    if (seconds === 0) {
      router.replace(REDIRECT_TO);
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <ShieldAlert size={28} aria-hidden="true" />
        </div>

        <h1 className="mt-4 text-xl font-semibold text-gray-800">
          You are not authorized to access this page
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Taking you to your dashboard in {seconds}s.
        </p>

        <Link
          href={REDIRECT_TO}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          Go to user dashboard
        </Link>
      </div>
    </main>
  );
}