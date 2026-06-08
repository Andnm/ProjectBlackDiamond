import type { Locale } from "@/i18n/routing";

/** Currencies the admin can choose for a collection piece's display price. */
export const PRICE_CURRENCIES = ["VND", "USD"] as const;
export type PriceCurrency = (typeof PRICE_CURRENCIES)[number];

export type Price = {
  amount: number;
  currency: PriceCurrency;
};

/** Display symbol/suffix per currency, as requested: "VNĐ" for VND, "$" for USD. */
const CURRENCY_SYMBOL: Record<PriceCurrency, string> = {
  VND: "VNĐ",
  USD: "$",
};

const NUMBER_FORMATTERS: Record<PriceCurrency, Intl.NumberFormat> = {
  VND: new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
};

/** Format a numeric amount with the right grouping + currency symbol, e.g. "18.400.000 VNĐ" or "$18,400". */
export function formatPriceValue(amount: number, currency: PriceCurrency): string {
  const formatted = NUMBER_FORMATTERS[currency].format(amount);
  return currency === "VND" ? `${formatted} ${CURRENCY_SYMBOL.VND}` : `${CURRENCY_SYMBOL.USD}${formatted}`;
}

/**
 * Build the full localized "starting price" line, e.g. "Từ $18,400" (vi) or
 * "From $18,400" (en). The "Từ"/"From" prefix is supplied by the caller from
 * the i18n dictionary (`dictionary.catalog.priceFrom`) so no locale string is
 * hardcoded here.
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
