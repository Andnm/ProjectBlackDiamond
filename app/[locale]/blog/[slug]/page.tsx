import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostSections } from "@/components/sections/BlogPostSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const post = getBlogPost(slug);
  const dictionary = await getDictionary(typedLocale);

  if (!post) return { title: dictionary.blog.eyebrow };

  const ogLocale = typedLocale === "vi" ? "vi_VN" : "en_US";
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
        vi: `${siteUrl}/vi/blog/${slug}`,
        en: `${siteUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title[typedLocale],
      description: post.excerpt[typedLocale],
      url,
      siteName: dictionary.brand.name,
      locale: ogLocale,
      alternateLocale: typedLocale === "vi" ? ["en_US"] : ["vi_VN"],
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

  const post = getBlogPost(slug);
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
