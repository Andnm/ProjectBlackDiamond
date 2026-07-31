"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseTags, readInt, readText, toLocalizedJson } from "@/lib/admin/form-utils";
import type { BlogPostRow } from "@/lib/admin/types";
import { syncTranslations } from "@/lib/translation/translate-content";

export type PostFormState = { error?: string } | null;

async function uploadCoverImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `blog/${randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`อัปโหลดรูปภาพล้มเหลว: ${error.message}`);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

async function buildPostPayload(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  existingCoverUrl: string | null,
) {
  const slug = readText(formData, "slug");
  if (!slug) throw new Error("กรุณากรอก slug");

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
    body: bodyHtml ? { th: bodyHtml } : {},
    tags: parseTags(formData.get("tags")),
    published: true,
  };
}

function revalidatePublicBlog(slug?: string) {
  revalidatePath("/th/blog");
  if (slug) revalidatePath(`/th/blog/${slug}`);
}

export async function createBlogPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const supabase = await createClient();

  let newId: string | null = null;
  try {
    const payload = await buildPostPayload(supabase, formData, null);
    const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
    if (error) {
      if (error.code === "23505") return { error: "ตัวระบุ URL นี้มีอยู่แล้ว กรุณาเลือกค่าอื่น" };
      return { error: error.message };
    }
    newId = data.id;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }

  if (newId) await syncTranslations("blog_post", newId);

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
      if (error.code === "23505") return { error: "ตัวระบุ URL นี้มีอยู่แล้ว กรุณาเลือกค่าอื่น" };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }

  await syncTranslations("blog_post", id);

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
