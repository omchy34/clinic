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

export default function DashboardShell({ title, items, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link href="/" className="text-lg font-bold text-blue-600">
            {title}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {items.map(({ label, href, icon: Icon }) => {
            const active =
              pathname === href ||
              (!["/user", "/clinic", "/admin"].includes(href) && pathname.startsWith(href + "/"));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
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
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="ml-auto">
            <UserButton />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}