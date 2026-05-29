import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function InvestmentPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = isLocale(locale) ? locale : "vi";
  redirect(`/${typedLocale}/blog`);
}
