import type { MetadataRoute } from "next";
import { localizedPath, locales, pathnames } from "@/i18n/routing";
import { collectionPieces } from "@/lib/collection";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";

  const pages = locales.flatMap((locale) =>
    Object.keys(pathnames).map((route) => ({
      url: `${siteUrl}${localizedPath(locale, route as keyof typeof pathnames)}`,
      lastModified: new Date(),
      changeFrequency: route === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "home" ? 1 : 0.75,
    })),
  );

  const collectionPages = locales.flatMap((locale) =>
    collectionPieces.map((piece) => ({
      url: `${siteUrl}${localizedPath(locale, "catalog")}/${piece.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...pages, ...collectionPages];
}
