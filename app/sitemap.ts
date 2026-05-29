import type { MetadataRoute } from "next";
import { localizedPath, locales, pathnames } from "@/i18n/routing";
import { collectionPieces } from "@/lib/collection";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";
  const now = new Date();

  /* ── Static pages ─────────────────────────────────────── */
  const staticPages = locales.flatMap((locale) =>
    Object.keys(pathnames).map((route) => {
      const r = route as keyof typeof pathnames;
      const priority =
        r === "home" ? 1.0
        : r === "catalog" ? 0.9
        : r === "blog" ? 0.85
        : r === "membership" ? 0.8
        : 0.7;

      return {
        url: `${siteUrl}${localizedPath(locale, r)}`,
        lastModified: now,
        changeFrequency: (r === "home" || r === "catalog"
          ? "weekly"
          : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority,
      };
    }),
  );

  /* ── Collection detail pages ──────────────────────────── */
  const collectionPages = locales.flatMap((locale) =>
    collectionPieces.map((piece) => ({
      url: `${siteUrl}${localizedPath(locale, "catalog")}/${piece.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  /* ── Blog post pages ──────────────────────────────────── */
  const blogPostPages = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...staticPages, ...collectionPages, ...blogPostPages];
}
