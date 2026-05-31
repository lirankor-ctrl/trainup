"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "ראשי", icon: "🏠" },
  { href: "/add", label: "הוסף", icon: "➕" },
  { href: "/reports", label: "דוחות", icon: "📊" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md justify-around p-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition ${
                  active
                    ? "bg-ocean-50 font-bold text-ocean-600"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span className="text-xl" aria-hidden>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
