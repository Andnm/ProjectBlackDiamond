import type { Metadata } from "next";
import { MembershipSections } from "@/components/sections/MembershipSections";
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

  return createPageMetadata(typedLocale, "membership", dictionary);
}

export default async function MembershipPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "th";
  const dictionary = await getDictionary(typedLocale);

  return <MembershipSections dictionary={dictionary} locale={typedLocale} />;
}
