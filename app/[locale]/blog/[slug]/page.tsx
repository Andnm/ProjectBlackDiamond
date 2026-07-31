import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostSections } from "@/components/sections/BlogPostSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedBlogPost, getPublishedBlogSlugs } from "@/lib/data/blog";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

// Re-fetch from Supabase at most once per minute so admin edits show up
// without a full redeploy, while keeping the page statically cacheable.
export const revalidate = 60;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const post = await getPublishedBlogPost(slug);
  const dictionary = await getDictionary(typedLocale);

  if (!post) return { title: dictionary.blog.eyebrow };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
  const url = `${siteUrl}/${typedLocale}/blog/${slug}`;

  return {
    title: post.title[typedLocale],
    description: post.excerpt[typedLocale],
    keywords: post.tags,
    authors: [{ name: "BlackDiamond", url: siteUrl }],
    alternates: {
      canonical: url,
      languages: {
        th: `${siteUrl}/th/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title[typedLocale],
      description: post.excerpt[typedLocale],
      url,
      siteName: dictionary.brand.name,
      locale: "th_TH",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.category[typedLocale],
      tags: post.tags,
      images: [
        {
          url: "/images/education-background.png",
          width: 1200,
          height: 630,
          alt: post.title[typedLocale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title[typedLocale],
      description: post.excerpt[typedLocale],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const dictionary = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

  return (
    <>
      <JsonLd schema={[
        articleSchema(post, locale),
        breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: dictionary.blog.eyebrow, url: `${siteUrl}/${locale}/blog` },
          { name: post.title[locale] },
        ]),
      ]} />
      <BlogPostSections post={post} locale={locale} dictionary={dictionary} />
    </>
  );
}
