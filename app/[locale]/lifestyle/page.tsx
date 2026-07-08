import type { Metadata } from "next";
import { LifestyleSections } from "@/components/sections/LifestyleSections";
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

  return createPageMetadata(typedLocale, "lifestyle", dictionary);
}

export default async function LifestylePage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "vi";
  const dictionary = await getDictionary(typedLocale);

  return <LifestyleSections dictionary={dictionary} locale={typedLocale} />;
}
