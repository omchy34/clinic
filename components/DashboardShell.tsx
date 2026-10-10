"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, type LucideIcon } from "lucide-react";
import { useState } from "react";

export type NavItem = { label: string; href: string; icon: LucideIcon };

type Props = {
  title: string;
  items: NavItem[];
  children: React.ReactNode;
};

const glass =
  "border border-white/60 bg-white/40 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";

export default function DashboardShell({ title, items, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-100 via-sky-50 to-purple-100">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />

      <div className="relative flex min-h-screen">
        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform lg:sticky lg:top-4 lg:m-4 lg:h-[calc(100vh-2rem)] lg:translate-x-0 lg:self-start lg:rounded-2xl ${glass} max-lg:bg-white/80 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-white/50 px-5">
            <Link
              href="/"
              className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-bold text-transparent"
            >
              {title}
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1.5 p-3">
            {items.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (!["/user", "/clinic", "/admin"].includes(href) &&
                  pathname.startsWith(href + "/"));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
                      : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col p-4 lg:pl-0">
          <header
            className={`flex h-16 items-center justify-between rounded-2xl px-4 lg:px-6 ${glass}`}
          >
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="ml-auto">
              <UserButton />
            </div>
          </header>
          <main className="flex-1 pt-4 lg:pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}