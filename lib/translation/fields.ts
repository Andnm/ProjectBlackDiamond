export type FieldKind = "text" | "lines" | "html";

export type TranslatableField = {
  /** Matches translation_status.field_name — dot-joined for nested fields, e.g. "specs.cut". */
  name: string;
  /** Path into the row object; path[0] is always the actual DB column name. */
  path: string[];
  kind: FieldKind;
};

export type ContentType = "collection_piece" | "blog_post";

export const COLLECTION_PIECE_FIELDS: TranslatableField[] = [
  { name: "image_alt", path: ["image_alt"], kind: "text" },
  { name: "name", path: ["name"], kind: "text" },
  { name: "line", path: ["line"], kind: "text" },
  { name: "summary", path: ["summary"], kind: "text" },
  { name: "price_note", path: ["price_note"], kind: "text" },
  { name: "origin", path: ["origin"], kind: "text" },
  { name: "specs.cut", path: ["specs", "cut"], kind: "text" },
  { name: "specs.setting", path: ["specs", "setting"], kind: "text" },
  { name: "specs.metal", path: ["specs", "metal"], kind: "text" },
  { name: "specs.origin", path: ["specs", "origin"], kind: "text" },
  { name: "specs.luster", path: ["specs", "luster"], kind: "text" },
  { name: "specs.treatment", path: ["specs", "treatment"], kind: "text" },
  { name: "analysis", path: ["analysis"], kind: "lines" },
  { name: "acquisition", path: ["acquisition"], kind: "lines" },
  { name: "inclusion_profile", path: ["inclusion_profile"], kind: "text" },
  { name: "light_behavior", path: ["light_behavior"], kind: "text" },
  { name: "provenance", path: ["provenance"], kind: "text" },
  { name: "wearability", path: ["wearability"], kind: "text" },
  { name: "care", path: ["care"], kind: "text" },
  { name: "investment_note", path: ["investment_note"], kind: "text" },
];

export const BLOG_POST_FIELDS: TranslatableField[] = [
  { name: "category", path: ["category"], kind: "text" },
  { name: "title", path: ["title"], kind: "text" },
  { name: "excerpt", path: ["excerpt"], kind: "text" },
  { name: "body", path: ["body"], kind: "html" },
];

export function fieldsForContentType(contentType: ContentType): TranslatableField[] {
  return contentType === "collection_piece" ? COLLECTION_PIECE_FIELDS : BLOG_POST_FIELDS;
}

export function tableForContentType(contentType: ContentType): "collection_pieces" | "blog_posts" {
  return contentType === "collection_piece" ? "collection_pieces" : "blog_posts";
}
