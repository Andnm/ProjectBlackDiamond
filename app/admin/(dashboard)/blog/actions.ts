"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseTags, readInt, readText, toLocalizedJson } from "@/lib/admin/form-utils";
import type { BlogPostRow } from "@/lib/admin/types";

export type PostFormState = { error?: string } | null;

async function uploadCoverImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `blog/${randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Tải ảnh thất bại: ${error.message}`);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

async function buildPostPayload(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  existingCoverUrl: string | null,
) {
  const slug = readText(formData, "slug");
  if (!slug) throw new Error("Vui lòng nhập slug.");

  let coverImageUrl = existingCoverUrl;
  const coverFile = formData.get("cover_image");
  if (coverFile instanceof File && coverFile.size > 0) {
    coverImageUrl = await uploadCoverImage(supabase, coverFile);
  }

  const bodyHtml = String(formData.get("body") ?? "").trim();

  return {
    slug,
    category: toLocalizedJson(formData.get("category")),
    date: readText(formData, "date") ?? new Date().toISOString().slice(0, 10),
    read_minutes: readInt(formData, "read_minutes") ?? 5,
    title: toLocalizedJson(formData.get("title")),
    excerpt: toLocalizedJson(formData.get("excerpt")),
    cover_image_url: coverImageUrl,
    body: bodyHtml ? { vi: bodyHtml } : {},
    tags: parseTags(formData.get("tags")),
    published: formData.get("published") === "on",
  };
}

function revalidatePublicBlog(slug?: string) {
  revalidatePath("/vi/blog");
  if (slug) revalidatePath(`/vi/blog/${slug}`);
}

export async function createBlogPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const supabase = await createClient();

  try {
    const payload = await buildPostPayload(supabase, formData, null);
    const { error } = await supabase.from("blog_posts").insert(payload);
    if (error) {
      if (error.code === "23505") return { error: "Slug này đã tồn tại, vui lòng chọn slug khác." };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định." };
  }

  revalidatePath("/admin/blog");
  revalidatePublicBlog();
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const supabase = await createClient();
  const existingCoverUrl = readText(formData, "existing_cover_image_url");

  try {
    const payload = await buildPostPayload(supabase, formData, existingCoverUrl);
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
    if (error) {
      if (error.code === "23505") return { error: "Slug này đã tồn tại, vui lòng chọn slug khác." };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định." };
  }

  revalidatePath("/admin/blog");
  revalidatePublicBlog();
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();

  const { data } = await supabase.from("blog_posts").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePublicBlog((data as Pick<BlogPostRow, "slug"> | null)?.slug);
}
