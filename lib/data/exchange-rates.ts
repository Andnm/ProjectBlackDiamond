import { createPublicClient } from "@/lib/supabase/public";
import { createServiceClient } from "@/lib/supabase/service";
import { currencyForLocale, type DisplayCurrency } from "@/lib/format-price";

/**
 * Most recent published rate for `currency` (THB -> currency multiplier).
 * Returns null if no rate has been recorded yet (e.g. the daily cron hasn't
 * run, or this pair isn't sourced yet) — callers should fall back to
 * showing the THB amount rather than guessing.
 *
 * Uses the cookie-free public client (not lib/supabase/server.ts) since
 * this is called from statically-generated catalog pages — going through
 * the cookies()-based client would force those routes into dynamic
 * rendering, losing SSG for every non-default locale (confirmed by build
 * output regressing from ● to ƒ when this used createClient() instead).
 */
export async function getLatestExchangeRate(currency: Exclude<DisplayCurrency, "THB">): Promise<number | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("exchange_rates")
    .select("rate")
    .eq("currency_code", currency)
    .order("rate_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.rate ?? null;
}

/**
 * Currency + rate to display a THB price for `locale`. Rate is null for
 * `th` itself (no conversion needed) and for any locale whose currency
 * hasn't got a rate recorded yet — callers should fall back to THB in
 * that case (see convertPrice in lib/format-price.ts).
 */
export async function getDisplayRateForLocale(locale: string): Promise<{ currency: DisplayCurrency; rate: number | null }> {
  const currency = currencyForLocale(locale);
  if (currency === "THB") return { currency, rate: null };
  const rate = await getLatestExchangeRate(currency);
  return { currency, rate };
}

const RATE_CURRENCIES: Exclude<DisplayCurrency, "THB">[] = ["VND", "LAK", "CNY", "USD"];

// fawazahmed0/currency-api — free, no API key/registration, no rate limits,
// updated daily. Bank of Thailand's own API needs an account (see
// MULTILINGUAL_TRANSLATION_PROJECT.md §5) and wasn't confirmed to cover
// LAK, so this covers all 4 pairs from one source instead. Primary is a
// jsDelivr CDN mirror; .pages.dev is the documented fallback if that CDN
// is unreachable.
const RATE_SOURCE_URLS = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/thb.json",
  "https://currency-api.pages.dev/v1/currencies/thb.json",
];

type RateApiResponse = {
  date: string;
  thb: Record<string, number>;
};

async function fetchThbRates(): Promise<RateApiResponse> {
  let lastError: unknown;
  for (const url of RATE_SOURCE_URLS) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Rate source returned ${response.status}`);
      return (await response.json()) as RateApiResponse;
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error(`All exchange rate sources failed: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

/**
 * Fetches today's THB -> {VND,LAK,CNY,USD} rates and upserts them into
 * exchange_rates (one row per currency per day; re-running the same day
 * overwrites that day's row rather than duplicating it). Meant to be
 * called by a scheduled job (see app/api/cron/exchange-rates/route.ts) —
 * safe to call more than once a day if needed.
 */
export async function refreshExchangeRates(): Promise<{ date: string; rates: Record<string, number> }> {
  const { date, thb } = await fetchThbRates();
  // This runs from an unauthenticated cron route (no admin session to be
  // "authenticated" under), so it needs the service-role client to bypass
  // RLS rather than the normal cookie-based client used everywhere else.
  const supabase = createServiceClient();

  const rows = RATE_CURRENCIES.filter((code) => typeof thb[code.toLowerCase()] === "number").map((code) => ({
    rate_date: date,
    currency_code: code,
    rate: thb[code.toLowerCase()],
    source: "fawazahmed0/currency-api",
  }));

  if (rows.length === 0) {
    throw new Error("Rate source response did not include any of VND/LAK/CNY/USD.");
  }

  const { error } = await supabase.from("exchange_rates").upsert(rows, { onConflict: "rate_date,currency_code" });
  if (error) throw new Error(error.message);

  return { date, rates: Object.fromEntries(rows.map((r) => [r.currency_code, r.rate])) };
}
