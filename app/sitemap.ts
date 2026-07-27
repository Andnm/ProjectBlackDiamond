import type { MetadataRoute } from "next";
import { defaultLocale, localizedPath, pathnames } from "@/i18n/routing";
import { getPublishedCollectionPieces } from "@/lib/data/collection";
import { getPublishedBlogPosts } from "@/lib/data/blog";

// Thai-only for now: only list the "th" locale tree in the sitemap.
const locales = [defaultLocale] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
  const now = new Date();
  const [collectionPieces, blogPosts] = await Promise.all([
    getPublishedCollectionPieces(),
    getPublishedBlogPosts(),
  ]);

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

  const collectionPages = locales.flatMap((locale) =>
    collectionPieces.map((piece) => ({
      url: `${siteUrl}${localizedPath(locale, "catalog")}/${piece.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

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
