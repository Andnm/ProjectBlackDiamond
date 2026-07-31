import "server-only";
import th from "@/messages/th.json";
import vi from "@/messages/vi.json";
import lo from "@/messages/lo.json";
import zh from "@/messages/zh.json";
import en from "@/messages/en.json";
import { defaultLocale, isLocale, type Locale } from "./routing";

export type Dictionary = typeof th;

// The Record<Locale, Dictionary> annotation forces every translated JSON
// file to structurally match th.json — a missing/extra key in any of them
// fails the build instead of silently rendering blank/undefined text.
const dictionaries: Record<Locale, Dictionary> = { th, vi, lo, zh, en };

export async function getDictionary(locale: string): Promise<Dictionary> {
  const normalizedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[normalizedLocale];
}
