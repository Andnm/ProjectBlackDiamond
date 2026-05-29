import type { Metadata } from "next";
import { CatalogSections } from "@/components/sections/CatalogSections";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

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

  return <CatalogSections dictionary={dictionary} locale={typedLocale} />;
}
