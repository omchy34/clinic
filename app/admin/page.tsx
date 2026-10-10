import { Building2, Users, ClipboardList, CalendarCheck } from "lucide-react";

const stats = [
  { label: "Total Clinics", value: 24, icon: Building2 },
  { label: "Total Users", value: 1280, icon: Users },
  { label: "Pending Requests", value: 6, icon: ClipboardList },
  { label: "Total Bookings", value: 3420, icon: CalendarCheck },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Icon size={22} /></div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}