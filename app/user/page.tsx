import Link from "next/link";
import { CalendarCheck, Heart, Clock } from "lucide-react";

const stats = [
  { label: "Upcoming Bookings", value: 2, icon: CalendarCheck },
  { label: "Favorite Clinics", value: 5, icon: Heart },
  { label: "Past Visits", value: 8, icon: Clock },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back 👋</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600"><Icon size={22} /></div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Clinic chalate ho?</h2>
          <p className="text-sm text-blue-100">Apna clinic register karo aur hazaaron patients tak pahuncho.</p>
        </div>
        <Link href="/create-your-clinic" className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-blue-600">
          Create Your Clinic
        </Link>
      </div>
    </div>
  );
}