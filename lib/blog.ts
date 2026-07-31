import type { Locale } from "@/i18n/routing";

/**
 * Public BlogPost shape used by components & schema.
 * `body` is rich-text content (sanitized HTML) per locale, as authored via
 * the admin's WYSIWYG editor and stored in Supabase — e.g. `{ th: "<p>…</p>" }`.
 */
export type BlogPost = {
  slug: string;
  category: Record<Locale, string>;
  date: string; // ISO date string
  readMinutes: number;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
  coverImage?: string | null;
  tags: string[];
};

const DATE_LOCALE_TAGS: Record<Locale, string> = {
  th: "th-TH",
  vi: "vi-VN",
  lo: "lo-LA",
  zh: "zh-CN",
  en: "en-GB",
};

export function formatDate(dateString: string, locale: string): string {
  const tag = DATE_LOCALE_TAGS[locale as Locale] ?? DATE_LOCALE_TAGS.en;
  return new Date(dateString).toLocaleDateString(tag, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
