"use server";

import { revalidatePath } from "next/cache";
import { saveManualTranslation, retranslateCells, type TargetLocale } from "@/lib/translation/manual-edit";
import type { ContentType } from "@/lib/translation/fields";

function translationsPath(contentType: ContentType, contentId: string): string {
  const section = contentType === "collection_piece" ? "collection" : "blog";
  return `/admin/${section}/${contentId}/translations`;
}

export async function saveManualTranslationAction(
  contentType: ContentType,
  contentId: string,
  fieldName: string,
  locale: TargetLocale,
  value: string,
): Promise<{ error?: string }> {
  try {
    await saveManualTranslation(contentType, contentId, fieldName, locale, value);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }
  revalidatePath(translationsPath(contentType, contentId));
  return {};
}

export async function retranslateCellsAction(
  contentType: ContentType,
  contentId: string,
  targets: { fieldName: string; locale: TargetLocale }[],
): Promise<{ error?: string }> {
  try {
    await retranslateCells(contentType, contentId, targets);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" };
  }
  revalidatePath(translationsPath(contentType, contentId));
  return {};
}
