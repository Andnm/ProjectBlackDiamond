import type { Locale } from "@/i18n/routing";

// Storage-side: the only currency ever persisted on a collection_pieces row.
export const PRICE_CURRENCIES = ["THB"] as const;
export type PriceCurrency = (typeof PRICE_CURRENCIES)[number];

export type Price = {
  amount: number;
  currency: PriceCurrency;
};

export function isPriceCurrency(value: unknown): value is PriceCurrency {
  return typeof value === "string" && (PRICE_CURRENCIES as readonly string[]).includes(value);
}

// Display-side: what a visitor actually sees, which may be a converted
// currency based on their locale. THB stays canonical/never converted; the
// other four are derived from the daily rate in the `exchange_rates` table.
export const DISPLAY_CURRENCIES = ["THB", "VND", "LAK", "CNY", "USD"] as const;
export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number];

export type DisplayPrice = {
  amount: number;
  currency: DisplayCurrency;
};

const LOCALE_CURRENCY: Record<Locale, DisplayCurrency> = {
  th: "THB",
  vi: "VND",
  lo: "LAK",
  zh: "CNY",
  en: "USD",
};

/** Any locale outside the known set (a future addition not yet mapped) defaults to USD, same as content falls back to `en`. */
export function currencyForLocale(locale: string): DisplayCurrency {
  return (LOCALE_CURRENCY as Record<string, DisplayCurrency | undefined>)[locale] ?? "USD";
}

// Round converted prices up to a visually clean denomination instead of a
// raw ceiling (e.g. avoid "21,543,201 ₫"). Adjust these once real exchange
// rates are in and the resulting magnitudes are known precisely.
const ROUND_UNIT: Record<DisplayCurrency, number> = {
  THB: 1,
  VND: 1_000,
  LAK: 1_000,
  CNY: 10,
  USD: 10,
};

function roundUpToUnit(amount: number, unit: number): number {
  return Math.ceil(amount / unit) * unit;
}

export type ConvertedPrice = DisplayPrice & {
  /** True when this is a THB -> other-currency conversion, not the canonical stored value — callers should show an "indicative price" disclaimer. */
  isConverted: boolean;
};

/**
 * Convert a canonical THB price for display in `targetCurrency`.
 * `rate` = how many units of `targetCurrency` equal 1 THB (see the
 * `exchange_rates` table). If `rate` is null (no rate available yet, e.g.
 * the daily cron hasn't run or a pair is unsupported), falls back to
 * showing the THB amount rather than a wrong/undefined price.
 */
export function convertPrice(price: Price, targetCurrency: DisplayCurrency, rate: number | null): ConvertedPrice {
  if (targetCurrency === "THB") {
    return { amount: price.amount, currency: "THB", isConverted: false };
  }
  if (rate === null) {
    return { amount: price.amount, currency: "THB", isConverted: false };
  }
  const converted = price.amount * rate;
  return { amount: roundUpToUnit(converted, ROUND_UNIT[targetCurrency]), currency: targetCurrency, isConverted: true };
}

const CURRENCY_SYMBOL: Record<DisplayCurrency, string> = {
  THB: "บาท",
  VND: "₫",
  LAK: "₭",
  CNY: "¥",
  USD: "$",
};

const SYMBOL_POSITION: Record<DisplayCurrency, "prefix" | "suffix"> = {
  THB: "suffix",
  VND: "suffix",
  LAK: "suffix",
  CNY: "prefix",
  USD: "prefix",
};

const NUMBER_FORMATTERS: Record<DisplayCurrency, Intl.NumberFormat> = {
  THB: new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }),
  VND: new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }),
  LAK: new Intl.NumberFormat("lo-LA", { maximumFractionDigits: 0 }),
  CNY: new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
};

export function formatPriceValue(amount: number, currency: DisplayCurrency): string {
  const formatted = NUMBER_FORMATTERS[currency].format(amount);
  const symbol = CURRENCY_SYMBOL[currency];
  return SYMBOL_POSITION[currency] === "prefix" ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
}

/**
 * Build the full localized "starting price" line, e.g. "เริ่มต้น 660,000 บาท".
 * The prefix is supplied by the caller from the i18n dictionary
 * (`dictionary.catalog.priceFrom`) so no locale string is hardcoded here.
 */
export function formatPriceFrom(price: DisplayPrice | null, fromLabel: string): string {
  if (!price) return "";
  return `${fromLabel} ${formatPriceValue(price.amount, price.currency)}`;
}

/** Re-exported so components can type a `locale` prop without importing from i18n directly. */
export type { Locale };
