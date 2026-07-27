import "server-only";
import th from "@/messages/th.json";
import { defaultLocale, isLocale, type Locale } from "./routing";

const dictionaries = { th };

export type Dictionary = typeof th;

export async function getDictionary(locale: string): Promise<Dictionary> {
  const normalizedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[normalizedLocale];
}
