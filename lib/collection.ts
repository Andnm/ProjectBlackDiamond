import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Price } from "@/lib/format-price";

type LocalizedText = Record<Locale, string>;

export type Certificate = {
  authority: "GIA" | "IGI" | "Internal";
  reportNumber: string;
  reportType: string;
  issueDate: string;
  verifyUrl: string;
  pdfUrl?: string;
};

export type CollectionPiece = {
  slug: string;
  image: string | StaticImageData;
  imageAlt: LocalizedText;
  source: {
    label: string;
    url: string;
  };
  name: LocalizedText;
  line: LocalizedText;
  summary: LocalizedText;
  price: Price | null;
  priceNote: LocalizedText;
  rarityIndex: number;
  origin: LocalizedText;
  certificate: Certificate | null;
  specs: {
    carat: string;
    dimensions: string;
    cut: LocalizedText;
    setting: LocalizedText;
    metal: LocalizedText;
    origin: LocalizedText;
    certification: string;
    hardness: string;
    luster: LocalizedText;
    treatment: LocalizedText;
  };
  analysis: Record<Locale, string[]>;
  acquisition: Record<Locale, string[]>;
  inclusionProfile: LocalizedText;
  lightBehavior: LocalizedText;
  provenance: LocalizedText;
  wearability: LocalizedText;
  care: LocalizedText;
  investmentNote: LocalizedText;
  tags: string[];
};

