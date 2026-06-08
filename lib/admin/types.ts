/**
 * Row shapes for the Supabase-backed admin CRUD area.
 *
 * Localized text columns are stored as JSONB keyed by locale, e.g.
 * `{ "vi": "Tên sản phẩm" }`. The site is Vietnamese-only for now, so the
 * admin UI only edits the "vi" key — but the column can hold an "en" key
 * later (for re-enabling English) without any schema migration.
 */
export type LocalizedJson = Partial<Record<"vi" | "en", string>>;

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
  price_currency: "VND" | "USD" | null;
  price_note: LocalizedJson;
  rarity_index: number | null;
  origin: LocalizedJson;

  certificate: Certificate | null;
  specs: CollectionPieceSpecs | Record<string, never>;
  analysis: Partial<Record<"vi" | "en", string[]>>;
  acquisition: Partial<Record<"vi" | "en", string[]>>;

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
 * persisted as sanitized HTML and keyed by locale — e.g. `{ "vi": "<p>…</p>" }`.
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
