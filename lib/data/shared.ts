import { locales, type Locale } from "@/i18n/routing";

/**
 * Localized JSONB columns from Supabase are keyed by locale (e.g.
 * `{ "th": "...", "en": "..." }`), but a given row may not have every
 * locale key yet — content is authored in Thai first and translated into
 * the others afterward. Any locale missing its own key falls back to "th",
 * the always-complete source language.
 */

export function localizedText(value: unknown): Record<Locale, string> {
  const record = (value ?? {}) as Partial<Record<Locale, string>>;
  const th = record.th ?? "";
  return Object.fromEntries(locales.map((l) => [l, record[l] ?? th])) as Record<Locale, string>;
}

export function localizedStringArray(value: unknown): Record<Locale, string[]> {
  const record = (value ?? {}) as Partial<Record<Locale, string[]>>;
  const th = Array.isArray(record.th) ? record.th : [];
  return Object.fromEntries(
    locales.map((l) => [l, Array.isArray(record[l]) ? (record[l] as string[]) : th]),
  ) as Record<Locale, string[]>;
}
