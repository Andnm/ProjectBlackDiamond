"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  parseTags,
  readDecimal,
  readInt,
  readText,
  toLocalizedJson,
  toLocalizedLines,
} from "@/lib/admin/form-utils";
import { isPriceCurrency } from "@/lib/format-price";
import type { Certificate, CollectionPieceRow } from "@/lib/admin/types";

export type PieceFormState = { error?: string } | null;

async function uploadPieceImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `collection/${randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Tải ảnh thất bại: ${error.message}`);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

function buildCertificate(formData: FormData): Certificate | null {
  const authority = String(formData.get("certificate_authority") ?? "");
  if (!authority || authority === "none") return null;

  const reportNumber = readText(formData, "certificate_report_number");
  const reportType = readText(formData, "certificate_report_type");
  const issueDate = readText(formData, "certificate_issue_date");
  const verifyUrl = readText(formData, "certificate_verify_url");
  const pdfUrl = readText(formData, "certificate_pdf_url");

  if (!reportNumber || !reportType || !issueDate || !verifyUrl) return null;

  return {
    authority: authority as Certificate["authority"],
    reportNumber,
    reportType,
    issueDate,
    verifyUrl,
    ...(pdfUrl ? { pdfUrl } : {}),
  };
}

function buildSpecs(formData: FormData) {
  return {
    carat: readText(formData, "specs_carat") ?? "",
    dimensions: readText(formData, "specs_dimensions") ?? "",
    cut: toLocalizedJson(formData.get("specs_cut")),
    setting: toLocalizedJson(formData.get("specs_setting")),
    metal: toLocalizedJson(formData.get("specs_metal")),
    origin: toLocalizedJson(formData.get("specs_origin")),
    certification: readText(formData, "specs_certification") ?? "",
    hardness: readText(formData, "specs_hardness") ?? "",
    luster: toLocalizedJson(formData.get("specs_luster")),
    treatment: toLocalizedJson(formData.get("specs_treatment")),
  };
}

async function buildPiecePayload(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  existingImageUrl: string | null,
) {
  const slug = readText(formData, "slug");
  if (!slug) throw new Error("Vui lòng nhập slug.");

  let imageUrl = existingImageUrl;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadPieceImage(supabase, imageFile);
  }

  return {
    slug,
    display_order: readInt(formData, "display_order") ?? 0,
    image_url: imageUrl,
    image_alt: toLocalizedJson(formData.get("image_alt")),
    source_label: readText(formData, "source_label"),
    source_url: readText(formData, "source_url"),
    name: toLocalizedJson(formData.get("name")),
    line: toLocalizedJson(formData.get("line")),
    summary: toLocalizedJson(formData.get("summary")),
    price_amount: readDecimal(formData, "price_amount"),
    price_currency: (() => {
      const raw = String(formData.get("price_currency") ?? "");
      return isPriceCurrency(raw) ? raw : "USD";
    })(),
    price_note: toLocalizedJson(formData.get("price_note")),
    rarity_index: readInt(formData, "rarity_index"),
    origin: toLocalizedJson(formData.get("origin")),
    certificate: buildCertificate(formData),
    specs: buildSpecs(formData),
    analysis: toLocalizedLines(formData.get("analysis")),
    acquisition: toLocalizedLines(formData.get("acquisition")),
    inclusion_profile: toLocalizedJson(formData.get("inclusion_profile")),
    light_behavior: toLocalizedJson(formData.get("light_behavior")),
    provenance: toLocalizedJson(formData.get("provenance")),
    wearability: toLocalizedJson(formData.get("wearability")),
    care: toLocalizedJson(formData.get("care")),
    investment_note: toLocalizedJson(formData.get("investment_note")),
    tags: parseTags(formData.get("tags")),
    published: formData.get("published") === "on",
  };
}

function revalidatePublicCollection(slug?: string) {
  revalidatePath("/vi/catalog");
  if (slug) revalidatePath(`/vi/catalog/${slug}`);
}

export async function createCollectionPiece(_prevState: PieceFormState, formData: FormData): Promise<PieceFormState> {
  const supabase = await createClient();

  try {
    const payload = await buildPiecePayload(supabase, formData, null);
    const { error } = await supabase.from("collection_pieces").insert(payload);
    if (error) {
      if (error.code === "23505") return { error: "Slug này đã tồn tại, vui lòng chọn slug khác." };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định." };
  }

  revalidatePath("/admin/collection");
  revalidatePublicCollection();
  redirect("/admin/collection");
}

export async function updateCollectionPiece(
  id: string,
  _prevState: PieceFormState,
  formData: FormData,
): Promise<PieceFormState> {
  const supabase = await createClient();
  const existingImageUrl = readText(formData, "existing_image_url");

  try {
    const payload = await buildPiecePayload(supabase, formData, existingImageUrl);
    const { error } = await supabase.from("collection_pieces").update(payload).eq("id", id);
    if (error) {
      if (error.code === "23505") return { error: "Slug này đã tồn tại, vui lòng chọn slug khác." };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định." };
  }

  revalidatePath("/admin/collection");
  revalidatePublicCollection();
  redirect("/admin/collection");
}

export async function deleteCollectionPiece(id: string) {
  const supabase = await createClient();

  const { data } = await supabase.from("collection_pieces").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("collection_pieces").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/collection");
  revalidatePublicCollection((data as Pick<CollectionPieceRow, "slug"> | null)?.slug);
}
