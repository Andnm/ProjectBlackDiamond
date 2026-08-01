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
import { syncTranslations } from "@/lib/translation/translate-content";
import { storagePathFromPublicUrl } from "@/lib/admin/storage";
import { locales } from "@/i18n/routing";

export type PieceFormState = { error?: string } | null;

async function uploadPieceImage(supabase: Awaited<ReturnType<typeof createClient>>, file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `collection/${randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`อัปโหลดรูปภาพล้มเหลว: ${error.message}`);

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

function buildSpecs(formData: FormData, existing: CollectionPieceRow["specs"] | undefined) {
  const existingSpecs = (existing ?? {}) as Partial<CollectionPieceRow["specs"]>;
  return {
    carat: readText(formData, "specs_carat") ?? "",
    dimensions: readText(formData, "specs_dimensions") ?? "",
    cut: toLocalizedJson(formData.get("specs_cut"), existingSpecs.cut),
    setting: toLocalizedJson(formData.get("specs_setting"), existingSpecs.setting),
    metal: toLocalizedJson(formData.get("specs_metal"), existingSpecs.metal),
    origin: toLocalizedJson(formData.get("specs_origin"), existingSpecs.origin),
    certification: readText(formData, "specs_certification") ?? "",
    hardness: readText(formData, "specs_hardness") ?? "",
    luster: toLocalizedJson(formData.get("specs_luster"), existingSpecs.luster),
    treatment: toLocalizedJson(formData.get("specs_treatment"), existingSpecs.treatment),
  };
}

async function buildPiecePayload(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  existingImageUrl: string | null,
  existingRow: CollectionPieceRow | null,
) {
  const slug = readText(formData, "slug");
  if (!slug) throw new Error("กรุณากรอก slug");

  let imageUrl = existingImageUrl;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadPieceImage(supabase, imageFile);
  }

  return {
    slug,
    display_order: readInt(formData, "display_order") ?? 0,
    image_url: imageUrl,
    image_alt: toLocalizedJson(formData.get("image_alt"), existingRow?.image_alt),
    source_label: readText(formData, "source_label"),
    source_url: readText(formData, "source_url"),
    name: toLocalizedJson(formData.get("name"), existingRow?.name),
    line: toLocalizedJson(formData.get("line"), existingRow?.line),
    summary: toLocalizedJson(formData.get("summary"), existingRow?.summary),
    price_amount: readDecimal(formData, "price_amount"),
    price_currency: (() => {
      const raw = String(formData.get("price_currency") ?? "");
      return isPriceCurrency(raw) ? raw : "THB";
    })(),
    price_note: toLocalizedJson(formData.get("price_note"), existingRow?.price_note),
    rarity_index: readInt(formData, "rarity_index"),
    origin: toLocalizedJson(formData.get("origin"), existingRow?.origin),
    certificate: buildCertificate(formData),
    specs: buildSpecs(formData, existingRow?.specs as CollectionPieceRow["specs"] | undefined),
    analysis: toLocalizedLines(formData.get("analysis"), existingRow?.analysis),
    acquisition: toLocalizedLines(formData.get("acquisition"), existingRow?.acquisition),
    inclusion_profile: toLocalizedJson(formData.get("inclusion_profile"), existingRow?.inclusion_profile),
    light_behavior: toLocalizedJson(formData.get("light_behavior"), existingRow?.light_behavior),
    provenance: toLocalizedJson(formData.get("provenance"), existingRow?.provenance),
    wearability: toLocalizedJson(formData.get("wearability"), existingRow?.wearability),
    care: toLocalizedJson(formData.get("care"), existingRow?.care),
    investment_note: toLocalizedJson(formData.get("investment_note"), existingRow?.investment_note),
    tags: parseTags(formData.get("tags")),
    published: true,
  };
}

function revalidatePublicCollection(slug?: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}/catalog`);
    if (slug) revalidatePath(`/${locale}/catalog/${slug}`);
  }
}

export async function createCollectionPiece(_prevState: PieceFormState, formData: FormData): Promise<PieceFormState> {
  const supabase = await createClient();

  let newId: string | null = null;
  try {
    const payload = await buildPiecePayload(supabase, formData, null, null);
    const { data, error } = await supabase.from("collection_pieces").insert(payload).select("id").single();
    if (error) {
      if (error.code === "23505") return { error: "ตัวระบุ URL นี้มีอยู่แล้ว กรุณาเลือกค่าอื่น" };
      return { error: error.message };
    }
    newId = data.id;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }

  if (newId) await syncTranslations("collection_piece", newId);

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
    const { data: existingRow, error: fetchError } = await supabase
      .from("collection_pieces")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (fetchError) return { error: fetchError.message };

    const payload = await buildPiecePayload(supabase, formData, existingImageUrl, existingRow as CollectionPieceRow | null);
    const { error } = await supabase.from("collection_pieces").update(payload).eq("id", id);
    if (error) {
      if (error.code === "23505") return { error: "ตัวระบุ URL นี้มีอยู่แล้ว กรุณาเลือกค่าอื่น" };
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }

  await syncTranslations("collection_piece", id);

  revalidatePath("/admin/collection");
  revalidatePublicCollection();
  redirect("/admin/collection");
}

export async function deleteCollectionPiece(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("collection_pieces")
    .select("slug, image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("collection_pieces").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await supabase
    .from("translation_status")
    .delete()
    .eq("content_type", "collection_piece")
    .eq("content_id", id);

  const imagePath = storagePathFromPublicUrl(
    (data as Pick<CollectionPieceRow, "image_url"> | null)?.image_url,
  );
  if (imagePath) {
    await supabase.storage.from("media").remove([imagePath]);
  }

  revalidatePath("/admin/collection");
  revalidatePublicCollection((data as Pick<CollectionPieceRow, "slug"> | null)?.slug);
}
