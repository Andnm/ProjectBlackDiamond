import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { organizationSchema } from "@/lib/schema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  // Thai-only for now: only pre-render the "th" locale tree.
  // (proxy.ts redirects any old /vi/* or /en/* request to its /th/* equivalent.)
  return [{ locale: defaultLocale }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;

  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <Header dictionary={dictionary} locale={typedLocale} />
      {children}
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
