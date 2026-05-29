import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailSections } from "@/components/sections/CatalogDetailSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { collectionPieces, getCollectionPiece } from "@/lib/collection";
import { gemstoneProductSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    collectionPieces.map((piece) => ({ locale, slug: piece.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  const piece = getCollectionPiece(slug);

  if (!piece) return { title: dictionary.seo.catalog.title };

  const ogLocale = typedLocale === "vi" ? "vi_VN" : "en_US";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
  const url = `${siteUrl}/${typedLocale}/catalog/${slug}`;
  const imageUrl = typeof piece.image === "string" ? piece.image : piece.image.src;

  return {
    title: piece.name[typedLocale],
    description: piece.summary[typedLocale],
    keywords: piece.tags,
    alternates: {
      canonical: url,
      languages: {
        vi: `${siteUrl}/vi/catalog/${slug}`,
        en: `${siteUrl}/en/catalog/${slug}`,
      },
    },
    openGraph: {
      title: piece.name[typedLocale],
      description: piece.summary[typedLocale],
      url,
      siteName: dictionary.brand.name,
      locale: ogLocale,
      alternateLocale: typedLocale === "vi" ? ["en_US"] : ["vi_VN"],
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

  const piece = getCollectionPiece(slug);
  if (!piece) notFound();

  const dictionary = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

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
      <CatalogDetailSections dictionary={dictionary} locale={locale} piece={piece} />
    </>
  );
}
