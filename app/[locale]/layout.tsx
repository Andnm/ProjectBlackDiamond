import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
      <Header dictionary={dictionary} locale={typedLocale} />
      {children}
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
