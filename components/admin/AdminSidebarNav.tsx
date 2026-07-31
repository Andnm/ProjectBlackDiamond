"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "ภาพรวม" },
  { href: "/admin/collection", label: "คอลเลกชัน" },
  { href: "/admin/blog", label: "บทความ" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition ${
              active
                ? "border-amber-400 bg-amber-400/10 text-amber-400"
                : "border-transparent text-neutral-300 hover:border-neutral-700 hover:text-amber-400"
            }`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
