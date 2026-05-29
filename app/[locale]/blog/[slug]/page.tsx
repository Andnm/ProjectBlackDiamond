import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostSections } from "@/components/sections/BlogPostSections";
import { getDictionary } from "@/i18n/dictionaries";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { isLocale, locales, type Locale } from "@/i18n/routing";

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

  const title = `${post.title[typedLocale]} | ${dictionary.brand.name}`;
  const description = post.excerpt[typedLocale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `${siteUrl}/${typedLocale}/blog/${slug}`,
      languages: {
        vi: `/vi/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${typedLocale}/blog/${slug}`,
      siteName: dictionary.brand.name,
      locale: typedLocale,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = getBlogPost(slug);
  if (!post) notFound();

  const dictionary = await getDictionary(locale);

  return <BlogPostSections post={post} locale={locale} dictionary={dictionary} />;
}
