import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailSections } from "@/components/sections/CatalogDetailSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { getPublishedCollectionPiece, getPublishedCollectionSlugs } from "@/lib/data/collection";
import { getDisplayRateForLocale } from "@/lib/data/exchange-rates";
import { gemstoneProductSchema, breadcrumbSchema } from "@/lib/schema";

// Re-fetch from Supabase at most once per minute so admin edits show up
// without a full redeploy, while keeping the page statically cacheable.
export const revalidate = 60;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedCollectionSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const dictionary = await getDictionary(typedLocale);
  const piece = await getPublishedCollectionPiece(slug);

  if (!piece) return { title: dictionary.seo.catalog.title };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
  const url = `${siteUrl}/${typedLocale}/catalog/${slug}`;
  const imageUrl = typeof piece.image === "string" ? piece.image : piece.image.src;

  return {
    title: piece.name[typedLocale],
    description: piece.summary[typedLocale],
    keywords: piece.tags,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/catalog/${slug}`])),
    },
    openGraph: {
      title: piece.name[typedLocale],
      description: piece.summary[typedLocale],
      url,
      siteName: dictionary.brand.name,
      type: "website",
      images: [
        {
          url: imageUrl || "/images/education-background.png",
          alt: piece.imageAlt[typedLocale],
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: piece.name[typedLocale],
      description: piece.summary[typedLocale],
    },
  };
}

export default async function CatalogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const piece = await getPublishedCollectionPiece(slug);
  if (!piece) notFound();

  const dictionary = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
  const { currency, rate } = await getDisplayRateForLocale(locale);

  return (
    <>
      <JsonLd schema={[
        gemstoneProductSchema(piece, locale),
        breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: dictionary.seo.catalog.title, url: `${siteUrl}/${locale}/catalog` },
          { name: piece.name[locale] },
        ]),
      ]} />
      <CatalogDetailSections currency={currency} dictionary={dictionary} locale={locale} piece={piece} rate={rate} />
    </>
  );
}
