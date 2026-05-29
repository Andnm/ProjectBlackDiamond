import "server-only";
import en from "@/messages/en.json";
import vi from "@/messages/vi.json";
import { defaultLocale, isLocale, type Locale } from "./routing";

const dictionaries = { en, vi };

export type Dictionary = typeof en;

export async function getDictionary(locale: string): Promise<Dictionary> {
  const normalizedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[normalizedLocale];
}
