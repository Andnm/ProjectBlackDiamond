import type { Metadata } from "next";
import { CatalogSections } from "@/components/sections/CatalogSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { collectionPieces } from "@/lib/collection";
import { catalogListSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  return createPageMetadata(typedLocale, "catalog", dictionary);
}

export default async function CatalogPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

  return (
    <>
      <JsonLd schema={[
        catalogListSchema(collectionPieces, typedLocale),
        breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/${typedLocale}` },
          { name: dictionary.seo.catalog.title },
        ]),
      ]} />
      <CatalogSections dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
