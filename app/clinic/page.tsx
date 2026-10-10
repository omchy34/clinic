import { CalendarCheck, Stethoscope, Users, IndianRupee } from "lucide-react";

const stats = [
  { label: "Today's Appointments", value: 12, icon: CalendarCheck },
  { label: "Doctors", value: 4, icon: Stethoscope },
  { label: "Total Patients", value: 340, icon: Users },
  { label: "Revenue (month)", value: "₹48,500", icon: IndianRupee },
];

const appointments = [
  { name: "Rahul Kumar", doctor: "Dr. Sharma", time: "10:30 AM", status: "Confirmed" },
  { name: "Priya Singh", doctor: "Dr. Verma", time: "11:15 AM", status: "Pending" },
  { name: "Amit Raj", doctor: "Dr. Sharma", time: "12:00 PM", status: "Confirmed" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Clinic Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600"><Icon size={22} /></div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white">
        <h2 className="border-b p-4 font-semibold">Aaj ke appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.name} className="border-t">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3">{a.doctor}</td>
                  <td className="p-3">{a.time}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      a.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}