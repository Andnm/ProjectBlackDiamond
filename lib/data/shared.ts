import type { Locale } from "@/i18n/routing";

/**
 * The site is Vietnamese-only for now: every localized JSONB column from
 * Supabase only carries a "vi" key (e.g. `{ "vi": "..." }`). These helpers
 * fan that single value out into the `Record<Locale, T>` shape that the
 * existing components/schema functions expect — falling back to "vi" for
 * "en" so nothing breaks if/when English content is reintroduced later
 * (at which point the JSONB can simply gain an "en" key, no migration).
 */

export function localizedText(value: unknown): Record<Locale, string> {
  const record = (value ?? {}) as Partial<Record<Locale, string>>;
  const vi = record.vi ?? record.en ?? "";
  const en = record.en ?? record.vi ?? "";
  return { vi, en };
}

export function localizedStringArray(value: unknown): Record<Locale, string[]> {
  const record = (value ?? {}) as Partial<Record<Locale, string[]>>;
  const vi = Array.isArray(record.vi) ? record.vi : Array.isArray(record.en) ? record.en : [];
  const en = Array.isArray(record.en) ? record.en : vi;
  return { vi, en };
}
