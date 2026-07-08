import { createClient } from "@/lib/supabase/server";
import type { CollectionPieceRow } from "./types";

export const COLLECTION_PAGE_SIZE = 8;

export type PagedResult<T> = {
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

export async function listCollectionPieces(page = 1, pageSize = COLLECTION_PAGE_SIZE): Promise<PagedResult<CollectionPieceRow>> {
  const supabase = await createClient();
  const safePage = Math.max(1, Math.floor(page));
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("collection_pieces")
    .select("*", { count: "exact" })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return {
    rows: (data ?? []) as CollectionPieceRow[],
    page: safePage,
    pageSize,
    total,
    pageCount,
  };
}

export async function getCollectionPieceById(id: string): Promise<CollectionPieceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("collection_pieces").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(error.message);
  return (data as CollectionPieceRow | null) ?? null;
}
