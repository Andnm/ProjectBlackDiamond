import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailSections } from "@/components/sections/CatalogDetailSections";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { collectionPieces, getCollectionPiece } from "@/lib/collection";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    collectionPieces.map((piece) => ({
      locale,
      slug: piece.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  const piece = getCollectionPiece(slug);

  if (!piece) {
    return {
      title: dictionary.seo.catalog.title,
    };
  }

  const title = `${piece.name[typedLocale]} | ${dictionary.seo.catalog.title}`;
  const description = piece.summary[typedLocale];
  const path = `/${typedLocale}/catalog/${piece.slug}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        vi: `/vi/catalog/${piece.slug}`,
        en: `/en/catalog/${piece.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: dictionary.brand.name,
      locale: typedLocale,
      type: "website",
      images: [
        {
          url: typeof piece.image === "string" ? piece.image : piece.image.src,
          alt: piece.imageAlt[typedLocale],
        },
      ],
    },
  };
}

export default async function CatalogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const piece = getCollectionPiece(slug);

  if (!piece) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <CatalogDetailSections dictionary={dictionary} locale={locale} piece={piece} />;
}
