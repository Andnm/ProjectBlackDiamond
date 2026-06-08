"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localizedPath, type Locale, type RouteKey } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

const navItems: Array<{ key: RouteKey; labelKey: keyof Dictionary["nav"] }> = [
  { key: "about", labelKey: "story" },
  { key: "education", labelKey: "education" },
  { key: "catalog", labelKey: "catalog" },
  { key: "blog", labelKey: "blog" },
];

export function Header({ dictionary, locale }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  /** Desktop: inline link with underline right under text when active */
  const desktopNav = navItems.map((item) => {
    const href = localizedPath(locale, item.key);
    const isActive = pathname === href;
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={`focus-ring text-xs font-bold uppercase tracking-[0.2em] transition hover:text-primary ${
          isActive
            ? "border-b-2 border-primary pb-0.5 text-primary"
            : "text-on-muted"
        }`}
        href={href}
        key={item.key}
      >
        {dictionary.nav[item.labelKey]}
      </Link>
    );
  });

  /** Mobile: stacked links with left-border active indicator */
  const mobileNav = navItems.map((item) => {
    const href = localizedPath(locale, item.key);
    const isActive = pathname === href;
    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={`focus-ring border-l-2 pl-4 text-lg font-bold uppercase tracking-[0.2em] transition hover:text-primary ${
          isActive ? "border-primary text-primary" : "border-transparent text-on-muted"
        }`}
        href={href}
        key={item.key}
        onClick={() => setIsOpen(false)}
      >
        {dictionary.nav[item.labelKey]}
      </Link>
    );
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline/30 bg-background/85 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            className="focus-ring font-headline text-2xl tracking-tight text-primary"
            href={localizedPath(locale)}
            onClick={() => setIsOpen(false)}
          >
            {dictionary.brand.name}
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
            {desktopNav}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            className="focus-ring hidden bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition hover:bg-primary-muted lg:inline-flex"
            href={localizedPath(locale, "membership")}
          >
            {dictionary.nav.membership}
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? dictionary.common.closeMenu : dictionary.common.openMenu}
            className="focus-ring border border-outline/70 px-3 py-2 text-sm font-bold uppercase tracking-[0.15em] text-primary lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-outline/30 bg-background lg:hidden">
          <nav className="section-shell flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8">
            {mobileNav}
            <Link
              className="focus-ring bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-on-primary"
              href={localizedPath(locale, "membership")}
              onClick={() => setIsOpen(false)}
            >
              {dictionary.nav.membership}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
