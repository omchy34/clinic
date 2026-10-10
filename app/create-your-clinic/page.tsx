"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function Page() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data); // TODO: yahan Prisma wali API/server action call karo
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md rounded-2xl border bg-white p-8 text-center">
          <CheckCircle2 className="mx-auto text-green-500" size={48} />
          <h1 className="mt-4 text-xl font-bold">Request submit ho gayi</h1>
          <p className="mt-2 text-gray-500">
            Admin approve karega tab aapka clinic dashboard khulega. Tab tak aap normal user ki tarah use kar sakte ho.
          </p>
          <Link href="/user/dashboard" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white">
            Go to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-5 rounded-2xl border bg-white p-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Your Clinic</h1>
          <p className="text-sm text-gray-500">Details bharo, admin review karke approve karega.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Clinic Name</label>
          <input name="clinicName" required placeholder="Meridian Clinic" className={input} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input name="phone" required placeholder="98XXXXXXXX" className={input} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input name="city" required placeholder="Patna" className={input} />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Speciality</label>
          <select name="speciality" className={input}>
            <option>General Physician</option>
            <option>Dental</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Full Address</label>
          <textarea name="address" required rows={3} placeholder="Shop no, street, area..." className={input} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Registration / License No.</label>
          <input name="license" required className={input} />
        </div>

        <button className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700">
          Submit for approval
        </button>
      </form>
    </div>
  );
}