"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Building2, Users, ClipboardList, CalendarCheck } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DASHBOARD_API = "/api/admin/dashboard";

type RevenuePoint = { month: string; amount: number };

type DashboardData = {
  clinic?: number;
  users?: number;
  pendingClinics?: number;
  bookings?: number;
  revenue?: RevenuePoint[]; 
};

const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const stats = [
  { label: "Total Clinics", key: "clinic", icon: Building2 },
  { label: "Total Users", key: "users", icon: Users },
  { label: "Pending Requests", key: "pendingClinics", icon: ClipboardList },
  { label: "Total Bookings", key: "bookings", icon: CalendarCheck },
] as const;

export default function Page() {
  const { getToken } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = await getToken();
        const { data } = await axios.get(DASHBOARD_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboard(data.dashboard ?? data);
      } catch (err) {
        console.error(err);
        setError("Could not load dashboard stats. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [getToken]);

  // Shows "..." while loading, and "-" if the API did not send that number
  function display(value: number | undefined) {
    if (loading) return "...";
    return value === undefined ? "-" : value.toLocaleString("en-IN");
  }

  // Same numbers as the cards, in the shape the chart needs. Missing values count as 0.
  const chartData = stats.map(({ label, key }) => ({
    name: label.replace("Total ", ""),
    value: dashboard?.[key] ?? 0,
  }));

  const revenue = dashboard?.revenue ?? [];
  const totalRevenue = revenue.reduce((sum, point) => sum + point.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, key, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{display(dashboard?.[key])}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Overview</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "rgba(147, 51, 234, 0.08)" }} />
              <Bar dataKey="value" name="Count" fill="#9333ea" radius={[6, 6, 0, 0]} maxBarSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Revenue</h2>
          {revenue.length > 0 && (
            <p className="text-sm text-gray-500">
              Total <span className="text-lg font-bold text-gray-800">{rupees(totalRevenue)}</span>
            </p>
          )}
        </div>

        {revenue.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-500">
            {loading ? "Loading..." : "No revenue data yet."}
          </p>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(v) => rupees(Number(v))} tickLine={false} axisLine={false} width={72} />
                <Tooltip formatter={(v) => [rupees(Number(v)), "Revenue"]} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#9333ea"
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}