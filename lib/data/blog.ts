import { createPublicClient } from "@/lib/supabase/public";
import type { BlogPost } from "@/lib/blog";
import { localizedText } from "./shared";

function mapRow(row: Record<string, unknown>): BlogPost {
  return {
    slug: String(row.slug),
    category: localizedText(row.category),
    date: String(row.date),
    readMinutes: (row.read_minutes as number | null) ?? 5,
    title: localizedText(row.title),
    excerpt: localizedText(row.excerpt),
    body: localizedText(row.body),
    coverImage: (row.cover_image_url as string | null) ?? null,
    tags: (row.tags as string[] | null) ?? [],
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPost | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? mapRow(data) : undefined;
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("blog_posts").select("slug").eq("published", true);

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => row.slug as string);
}
