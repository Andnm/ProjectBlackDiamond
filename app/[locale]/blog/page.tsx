import type { Metadata } from "next";
import { BlogSections } from "@/components/sections/BlogSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/blog";
import { blogListSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  return createPageMetadata(typedLocale, "blog", dictionary);
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";

  return (
    <>
      <JsonLd schema={[
        blogListSchema(blogPosts, typedLocale),
        breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${typedLocale}` },
          { name: dictionary.blog.eyebrow },
        ]),
      ]} />
      <BlogSections dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
