import Link from "next/link";
import { LockKeyhole, Home } from "lucide-react";

export default function NotSignedIn() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="mb-6 rounded-full bg-red-50 p-5 text-red-500">
        <LockKeyhole size={44} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
        You are not signed in
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        Is page ko dekhne ke liye pehle login karna padega.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Home size={18} /> Go to Home
      </Link>
    </div>
  );
}