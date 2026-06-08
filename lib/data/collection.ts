import { createPublicClient } from "@/lib/supabase/public";
import type { CollectionPiece } from "@/lib/collection";
import { isPriceCurrency, type Price } from "@/lib/format-price";
import { localizedText, localizedStringArray } from "./shared";

function mapPrice(row: Record<string, unknown>): Price | null {
  const amount = row.price_amount;
  const currency = row.price_currency;
  if (typeof amount !== "number" || !isPriceCurrency(currency)) return null;
  return { amount, currency };
}

const PLACEHOLDER_IMAGE = "/images/education-background.png";

function mapRow(row: Record<string, unknown>): CollectionPiece {
  const specs = (row.specs ?? {}) as Record<string, unknown>;

  return {
    slug: String(row.slug),
    image: (row.image_url as string | null) || PLACEHOLDER_IMAGE,
    imageAlt: localizedText(row.image_alt),
    source: {
      label: (row.source_label as string | null) ?? "",
      url: (row.source_url as string | null) ?? "",
    },
    name: localizedText(row.name),
    line: localizedText(row.line),
    summary: localizedText(row.summary),
    price: mapPrice(row),
    priceNote: localizedText(row.price_note),
    rarityIndex: (row.rarity_index as number | null) ?? 0,
    origin: localizedText(row.origin),
    certificate: (row.certificate as CollectionPiece["certificate"]) ?? null,
    specs: {
      carat: (specs.carat as string) ?? "",
      dimensions: (specs.dimensions as string) ?? "",
      cut: localizedText(specs.cut),
      setting: localizedText(specs.setting),
      metal: localizedText(specs.metal),
      origin: localizedText(specs.origin),
      certification: (specs.certification as string) ?? "",
      hardness: (specs.hardness as string) ?? "",
      luster: localizedText(specs.luster),
      treatment: localizedText(specs.treatment),
    },
    analysis: localizedStringArray(row.analysis),
    acquisition: localizedStringArray(row.acquisition),
    inclusionProfile: localizedText(row.inclusion_profile),
    lightBehavior: localizedText(row.light_behavior),
    provenance: localizedText(row.provenance),
    wearability: localizedText(row.wearability),
    care: localizedText(row.care),
    investmentNote: localizedText(row.investment_note),
    tags: (row.tags as string[] | null) ?? [],
  };
}

export async function getPublishedCollectionPieces(): Promise<CollectionPiece[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("collection_pieces")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

/**
 * Returns a small set of "signature" pieces for homepage teasers — the
 * rarest (highest `rarity_index`) and, as a tiebreaker, the most recently
 * added pieces. Used by the "Kho tàng dấu ấn" bento grid on the homepage.
 */
export async function getFeaturedCollectionPieces(limit = 3): Promise<CollectionPiece[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("collection_pieces")
    .select("*")
    .eq("published", true)
    .order("rarity_index", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function getPublishedCollectionPiece(slug: string): Promise<CollectionPiece | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("collection_pieces")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? mapRow(data) : undefined;
}

export async function getPublishedCollectionSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("collection_pieces").select("slug").eq("published", true);

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => row.slug as string);
}
