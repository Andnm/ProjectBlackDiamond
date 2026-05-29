import type { Metadata } from "next";
import { HomeSections } from "@/components/sections/HomeSections";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { webSiteSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);

  return createPageMetadata(typedLocale, "home", dictionary);
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <JsonLd schema={webSiteSchema()} />
      <HomeSections dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
