import type { StaticImageData } from "next/image";

import vi1 from "@/assets/images/information/vi_version/1.jpg";
import vi2 from "@/assets/images/information/vi_version/2.jpg";
import vi3 from "@/assets/images/information/vi_version/3.jpg";
import vi4 from "@/assets/images/information/vi_version/4.jpg";
import vi5 from "@/assets/images/information/vi_version/5.jpg";
import vi6 from "@/assets/images/information/vi_version/6.jpg";
import vi7 from "@/assets/images/information/vi_version/7.jpg";
import vi8 from "@/assets/images/information/vi_version/8.jpg";
import vi9 from "@/assets/images/information/vi_version/9.jpg";
import vi10 from "@/assets/images/information/vi_version/10.jpg";
import vi11 from "@/assets/images/information/vi_version/11.jpg";

import en1 from "@/assets/images/information/en_version/1.jpg";
import en3 from "@/assets/images/information/en_version/3.jpg";
import en4 from "@/assets/images/information/en_version/4.jpg";
import en5 from "@/assets/images/information/en_version/5.jpg";
import en6 from "@/assets/images/information/en_version/6.jpg";
import en7 from "@/assets/images/information/en_version/7.jpg";
import en8 from "@/assets/images/information/en_version/8.jpg";
import en9 from "@/assets/images/information/en_version/9.jpg";
import en10 from "@/assets/images/information/en_version/10.jpg";
import en11 from "@/assets/images/information/en_version/11.jpg";

import th3 from "@/assets/images/information/th_version/3.jpg";
import th4 from "@/assets/images/information/th_version/4.jpg";
import th5 from "@/assets/images/information/th_version/5.jpg";
import th6 from "@/assets/images/information/th_version/6.jpg";
import th7 from "@/assets/images/information/th_version/7.jpg";
import th8 from "@/assets/images/information/th_version/8.jpg";
import th9 from "@/assets/images/information/th_version/9.jpg";
import th10 from "@/assets/images/information/th_version/10.jpg";
import th11 from "@/assets/images/information/th_version/11.jpg";

type ImageKey =
  | "formation"
  | "overview"
  | "legacy"
  | "occasion"
  | "collector"
  | "companion"
  | "crown"
  | "eliteLifestyle"
  | "performance"
  | "fineJewelry"
  | "hauteHorlogerie";

const KEY_TO_NUMBER: Record<ImageKey, number> = {
  formation: 1,
  overview: 2,
  legacy: 3,
  occasion: 4,
  collector: 5,
  companion: 6,
  crown: 7,
  eliteLifestyle: 8,
  performance: 9,
  fineJewelry: 10,
  hauteHorlogerie: 11,
};

/** Vietnamese set is the original photoshoot — always complete, used as the fallback for every other locale. */
const VI: Record<number, StaticImageData> = {
  1: vi1,
  2: vi2,
  3: vi3,
  4: vi4,
  5: vi5,
  6: vi6,
  7: vi7,
  8: vi8,
  9: vi9,
  10: vi10,
  11: vi11,
};

const EN: Partial<Record<number, StaticImageData>> = {
  1: en1,
  3: en3,
  4: en4,
  5: en5,
  6: en6,
  7: en7,
  8: en8,
  9: en9,
  10: en10,
  11: en11,
};

const TH: Partial<Record<number, StaticImageData>> = {
  3: th3,
  4: th4,
  5: th5,
  6: th6,
  7: th7,
  8: th8,
  9: th9,
  10: th10,
  11: th11,
};

function resolveImage(locale: string, imageNumber: number): StaticImageData {
  if (locale === "th") return TH[imageNumber] ?? VI[imageNumber];
  if (locale === "vi") return VI[imageNumber];
  // "en" and any other locale not yet localized default to the English set,
  // itself falling back to the always-complete Vietnamese set.
  return EN[imageNumber] ?? VI[imageNumber];
}

export function getInformationImages(locale: string): Record<ImageKey, StaticImageData> {
  const entries = (Object.entries(KEY_TO_NUMBER) as [ImageKey, number][]).map(
    ([key, imageNumber]) => [key, resolveImage(locale, imageNumber)] as const,
  );
  return Object.fromEntries(entries) as Record<ImageKey, StaticImageData>;
}
