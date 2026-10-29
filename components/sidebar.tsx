"use client";

import DashboardShell, { type NavItem } from "./DashboardShell";
import {
  LayoutDashboard, CalendarCheck, Heart, User, Stethoscope,
  Settings, Users, Building2, ClipboardList, PlusCircle, UserCheck, IndianRupee
} from "lucide-react";

const userItems: NavItem[] = [
  { label: "Dashboard", href: "/user", icon: LayoutDashboard },
  { label: "My Bookings", href: "/user/my-tokens", icon: CalendarCheck },
  { label: "Book Clinic", href: "/user/book-clinic", icon: UserCheck },
  { label: "Create Your Clinic", href: "/create-your-clinic", icon: PlusCircle },
  { label: "Settings", href: "/user/settings", icon: Settings },
];

const clinicItems: NavItem[] = [
  { label: "Dashboard", href: "/clinic", icon: LayoutDashboard },
  { label: "Appointments", href: "/clinic/appointments", icon: CalendarCheck },
  { label: "Doctors", href: "/clinic/doctors", icon: Stethoscope },
  { label: "Settings", href: "/clinic/settings", icon: Settings },
];

const adminItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Clinic Requests", href: "/admin/requests", icon: Building2 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: IndianRupee },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function UserSidebar({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="My Account" items={userItems}>{children}</DashboardShell>;
}
export function ClinicSidebar({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="Clinic Panel" items={clinicItems}>{children}</DashboardShell>;
}
export function AdminSidebar({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="Admin Panel" items={adminItems}>{children}</DashboardShell>;
}