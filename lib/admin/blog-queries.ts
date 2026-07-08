import { createClient } from "@/lib/supabase/server";
import type { BlogPostRow } from "./types";
import type { PagedResult } from "./collection-queries";

export const BLOG_PAGE_SIZE = 8;

export async function listBlogPosts(page = 1, pageSize = BLOG_PAGE_SIZE): Promise<PagedResult<BlogPostRow>> {
  const supabase = await createClient();
  const safePage = Math.max(1, Math.floor(page));
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return {
    rows: (data ?? []) as BlogPostRow[],
    page: safePage,
    pageSize,
    total,
    pageCount,
  };
}

export async function getBlogPostById(id: string): Promise<BlogPostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(error.message);
  return (data as BlogPostRow | null) ?? null;
}
