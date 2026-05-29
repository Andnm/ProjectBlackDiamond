import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath, locales, type Locale, type RouteKey } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

/** Convert locale to BCP-47 / OG format */
function ogLocale(locale: Locale) {
  return locale === "vi" ? "vi_VN" : "en_US";
}

/** Alternate locales for OG */
function ogLocaleAlternates(locale: Locale) {
  return locales.filter((l) => l !== locale).map(ogLocale);
}

export function createPageMetadata(
  locale: Locale,
  route: RouteKey,
  dictionary: Dictionary,
): Metadata {
  const pageSeo = dictionary.seo[route];
  const path = localizedPath(locale, route);
  const url = new URL(path, siteUrl).toString();
  const languages = Object.fromEntries(
    locales.map((l) => [l, new URL(localizedPath(l, route), siteUrl).toString()]),
  );

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: pageSeo.title,
      description: pageSeo.description,
      url,
      siteName: dictionary.brand.name,
      locale: ogLocale(locale),
      alternateLocale: ogLocaleAlternates(locale),
      type: "website",
      images: [
        {
          url: "/images/education-background.png",
          width: 1200,
          height: 630,
          alt: pageSeo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeo.title,
      description: pageSeo.description,
    },
  };
}
