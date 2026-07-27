import type { Metadata } from "next";
import { EducationSections } from "@/components/sections/EducationSections";
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

  return createPageMetadata(typedLocale, "education", dictionary);
}

export default async function EducationPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const dictionary = await getDictionary(typedLocale);

  return <EducationSections dictionary={dictionary} locale={typedLocale} />;
}
