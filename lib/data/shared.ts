import type { Locale } from "@/i18n/routing";

/**
 * The site is Thai-only for now: every localized JSONB column from Supabase
 * only carries a "th" key (e.g. `{ "th": "..." }`). These helpers read that
 * single value into the `Record<Locale, T>` shape the existing
 * components/schema functions expect. Once more locale keys are added to the
 * JSONB (vi/lo/zh/en...), this should read the requested locale directly
 * instead of always reading "th".
 */

export function localizedText(value: unknown): Record<Locale, string> {
  const record = (value ?? {}) as Partial<Record<Locale, string>>;
  return { th: record.th ?? "" };
}

export function localizedStringArray(value: unknown): Record<Locale, string[]> {
  const record = (value ?? {}) as Partial<Record<Locale, string[]>>;
  return { th: Array.isArray(record.th) ? record.th : [] };
}
