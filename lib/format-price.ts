import type { Locale } from "@/i18n/routing";

export const PRICE_CURRENCIES = ["THB"] as const;
export type PriceCurrency = (typeof PRICE_CURRENCIES)[number];

export type Price = {
  amount: number;
  currency: PriceCurrency;
};

const CURRENCY_SYMBOL: Record<PriceCurrency, string> = {
  THB: "บาท",
};

const NUMBER_FORMATTERS: Record<PriceCurrency, Intl.NumberFormat> = {
  THB: new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }),
};

export function formatPriceValue(amount: number, currency: PriceCurrency): string {
  const formatted = NUMBER_FORMATTERS[currency].format(amount);
  return `${formatted} ${CURRENCY_SYMBOL[currency]}`;
}

/**
 * Build the full localized "starting price" line, e.g. "เริ่มต้น 660,000 บาท".
 * The prefix is supplied by the caller from the i18n dictionary
 * (`dictionary.catalog.priceFrom`) so no locale string is hardcoded here.
 */
export function formatPriceFrom(price: Price | null, fromLabel: string): string {
  if (!price) return "";
  return `${fromLabel} ${formatPriceValue(price.amount, price.currency)}`;
}

export function isPriceCurrency(value: unknown): value is PriceCurrency {
  return typeof value === "string" && (PRICE_CURRENCIES as readonly string[]).includes(value);
}

/** Re-exported so components can type a `locale` prop without importing from i18n directly. */
export type { Locale };
