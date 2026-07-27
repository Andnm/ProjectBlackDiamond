import type { Metadata } from "next";
import { AboutSections } from "@/components/sections/AboutSections";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const dictionary = await getDictionary(typedLocale);

  return createPageMetadata(typedLocale, "about", dictionary);
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const dictionary = await getDictionary(typedLocale);

  return <AboutSections dictionary={dictionary} locale={typedLocale} />;
}
