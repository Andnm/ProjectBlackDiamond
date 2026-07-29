import type { StaticImageData } from "next/image";

import thLogo from "@/assets/images/brand/th_version/logo.png";
import viLogo from "@/assets/images/brand/vi_version/logo.png";
import enLogo from "@/assets/images/brand/en_version/logo.png";

/** Site default — used for admin (single-locale UI) and as the "other locale" fallback. */
export const defaultBrandLogo: StaticImageData = thLogo;

export function getBrandLogo(locale: string): StaticImageData {
  if (locale === "th") return thLogo;
  if (locale === "vi") return viLogo;
  // Any other locale (including "en") defaults to the English mark.
  return enLogo;
}
