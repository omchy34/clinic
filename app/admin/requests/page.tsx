"use client";

import { useState } from "react";
import { Check, X, MapPin, Phone } from "lucide-react";

const initial = [
  { id: 1, name: "Sunrise Clinic", city: "Patna", phone: "9876543210", address: "Boring Road, Patna", by: "rahul@gmail.com" },
  { id: 2, name: "HealWell Care", city: "Gaya", phone: "9123456780", address: "Station Road, Gaya", by: "priya@gmail.com" },
  { id: 3, name: "City Dental", city: "Ranchi", phone: "9988776655", address: "Main Road, Ranchi", by: "amit@gmail.com" },
];

export default function Page() {
  const [requests, setRequests] = useState(initial);

  function decide(id: number, status: "approved" | "rejected") {
    console.log(id, status); // TODO: Prisma update yahan
    setRequests((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Clinic Requests</h1>
      <p className="mb-6 text-gray-500">{requests.length} pending</p>

      {requests.length === 0 && (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">Koi pending request nahi 🎉</div>
      )}

      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="flex flex-col gap-4 rounded-xl border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{r.name}</p>
              <p className="flex items-center gap-1.5 text-sm text-gray-500"><MapPin size={14} /> {r.address}, {r.city}</p>
              <p className="flex items-center gap-1.5 text-sm text-gray-500"><Phone size={14} /> {r.phone}</p>
              <p className="text-xs text-gray-400">Requested by {r.by}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => decide(r.id, "approved")}
                className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                <Check size={16} /> Approve
              </button>
              <button onClick={() => decide(r.id, "rejected")}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">
                <X size={16} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}