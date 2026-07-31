"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/i18n/routing";

const LOCALE_META: Record<Locale, { label: string; countryCode: string }> = {
  th: { label: "ไทย", countryCode: "th" },
  vi: { label: "Tiếng Việt", countryCode: "vn" },
  lo: { label: "ລາວ", countryCode: "la" },
  zh: { label: "中文", countryCode: "cn" },
  en: { label: "English", countryCode: "gb" },
};

function pathForLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        className="focus-ring flex items-center gap-2 border border-outline/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-on-muted transition hover:text-primary"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden className={`fi fi-${LOCALE_META[locale].countryCode}`} />
        <span className="hidden sm:inline">{LOCALE_META[locale].label}</span>
      </button>

      {isOpen ? (
        <ul
          className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] border border-outline/30 bg-background py-2 shadow-xl"
          role="listbox"
        >
          {locales.map((l) => (
            <li key={l}>
              <Link
                aria-selected={l === locale}
                className={`focus-ring flex items-center gap-2 px-4 py-2 text-sm transition hover:bg-surface-low hover:text-primary ${
                  l === locale ? "text-primary" : "text-on-surface"
                }`}
                href={pathForLocale(pathname, l)}
                onClick={() => setIsOpen(false)}
                role="option"
              >
                <span aria-hidden className={`fi fi-${LOCALE_META[l].countryCode}`} />
                <span>{LOCALE_META[l].label}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
