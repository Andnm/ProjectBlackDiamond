import type { Metadata } from "next";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath, locales, type Locale, type RouteKey } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";

export function createPageMetadata(
  locale: Locale,
  route: RouteKey,
  dictionary: Dictionary,
): Metadata {
  const pageSeo = dictionary.seo[route];
  const path = localizedPath(locale, route);
  const url = new URL(path, siteUrl);
  const languages = Object.fromEntries(
    locales.map((item) => [item, localizedPath(item, route)]),
  );

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    alternates: {
      canonical: url.toString(),
      languages,
    },
    openGraph: {
      title: pageSeo.title,
      description: pageSeo.description,
      url: url.toString(),
      siteName: dictionary.brand.name,
      locale,
      type: "website",
      images: [
        {
          url: "/images/education-background.png",
          width: 1200,
          height: 630,
          alt: dictionary.brand.name,
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
