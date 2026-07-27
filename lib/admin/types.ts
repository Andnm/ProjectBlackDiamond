import type { Locale } from "@/i18n/routing";

/**
 * Row shapes for the Supabase-backed admin CRUD area.
 *
 * Localized text columns are stored as JSONB keyed by locale, e.g.
 * `{ "th": "ชื่อสินค้า" }`. The site is Thai-only for now, so the admin UI
 * only edits the "th" key — but the column can hold more locale keys later
 * (vi/lo/zh/en...) without any schema migration.
 */
export type LocalizedJson = Partial<Record<Locale, string>>;

export type Certificate = {
  authority: "GIA" | "IGI" | "Internal";
  reportNumber: string;
  reportType: string;
  issueDate: string;
  verifyUrl: string;
  pdfUrl?: string;
};

export type CollectionPieceSpecs = {
  carat: string;
  dimensions: string;
  cut: LocalizedJson;
  setting: LocalizedJson;
  metal: LocalizedJson;
  origin: LocalizedJson;
  certification: string;
  hardness: string;
  luster: LocalizedJson;
  treatment: LocalizedJson;
};

export type CollectionPieceRow = {
  id: string;
  slug: string;
  display_order: number;

  image_url: string | null;
  image_alt: LocalizedJson;
  source_label: string | null;
  source_url: string | null;

  name: LocalizedJson;
  line: LocalizedJson;
  summary: LocalizedJson;

  price_amount: number | null;
  price_currency: "THB" | null;
  price_note: LocalizedJson;
  rarity_index: number | null;
  origin: LocalizedJson;

  certificate: Certificate | null;
  specs: CollectionPieceSpecs | Record<string, never>;
  analysis: Partial<Record<Locale, string[]>>;
  acquisition: Partial<Record<Locale, string[]>>;

  inclusion_profile: LocalizedJson;
  light_behavior: LocalizedJson;
  provenance: LocalizedJson;
  wearability: LocalizedJson;
  care: LocalizedJson;
  investment_note: LocalizedJson;

  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Rich-text content authored in the admin's WYSIWYG (Tiptap) editor,
 * persisted as sanitized HTML and keyed by locale — e.g. `{ "th": "<p>…</p>" }`.
 */
export type BlogBodyJson = LocalizedJson;

export type BlogPostRow = {
  id: string;
  slug: string;
  category: LocalizedJson;
  date: string;
  read_minutes: number;
  title: LocalizedJson;
  excerpt: LocalizedJson;
  cover_image_url: string | null;
  body: BlogBodyJson;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};
