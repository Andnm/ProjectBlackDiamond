"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: Props) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "vi" ? "en" : "vi";

  return (
    <Link
      aria-label={label}
      className="focus-ring inline-flex items-center gap-1.5 border border-outline/50 px-3 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-primary transition hover:border-primary hover:bg-primary/10"
      href={switchLocalePath(pathname, nextLocale)}
      hrefLang={nextLocale}
    >
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" strokeLinecap="round" />
      </svg>
      {nextLocale.toUpperCase()}
    </Link>
  );
}
