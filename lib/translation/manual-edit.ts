import "server-only";
import { createHash } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { getAtPath, setLocaleAtPath } from "@/lib/translation/json-path";
import { fieldsForContentType, tableForContentType, type ContentType, type TranslatableField } from "@/lib/translation/fields";
import { translateContent } from "@/lib/translation/translate-content";
import { locales, type Locale } from "@/i18n/routing";

export type TargetLocale = Exclude<Locale, "th">;

const TARGET_LOCALES = locales.filter((l): l is TargetLocale => l !== "th");

function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export type TranslationStatusValue = "done" | "pending" | "in_progress" | "failed" | "manual_edited" | "untranslated";

export type TranslationCell = {
  fieldName: string;
  fieldKind: TranslatableField["kind"];
  locale: TargetLocale;
  /** Display value: plain text as-is, "lines" joined with \n, html as raw markup. */
  value: string;
  status: TranslationStatusValue;
  errorMessage: string | null;
  updatedAt: string | null;
};

function fieldValueToDisplayString(value: unknown, kind: TranslatableField["kind"]): string {
  if (kind === "lines") return Array.isArray(value) ? (value as string[]).join("\n") : "";
  return typeof value === "string" ? value : "";
}

function parseDisplayValue(raw: string, kind: TranslatableField["kind"]): unknown {
  if (kind === "lines") {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return raw.trim();
}

/** Full field x locale matrix for the translations admin page, including fields with no Thai source yet (nothing to translate) so the table stays a stable shape. */
export async function getTranslationMatrix(contentType: ContentType, contentId: string): Promise<TranslationCell[]> {
  const supabase = await createClient();
  const table = tableForContentType(contentType);
  const fields = fieldsForContentType(contentType);

  const { data: row, error } = await supabase.from(table).select("*").eq("id", contentId).single();
  if (error || !row) throw new Error(error?.message ?? `Could not load ${table} row ${contentId}.`);

  const { data: statusRows, error: statusError } = await supabase
    .from("translation_status")
    .select("field_name, locale, status, error_message, updated_at")
    .eq("content_type", contentType)
    .eq("content_id", contentId);
  if (statusError) throw new Error(statusError.message);

  const statusMap = new Map((statusRows ?? []).map((r) => [`${r.field_name}:${r.locale}`, r]));

  const cells: TranslationCell[] = [];
  for (const field of fields) {
    const localized = getAtPath(row, field.path) as Record<string, unknown> | undefined;
    for (const locale of TARGET_LOCALES) {
      const status = statusMap.get(`${field.name}:${locale}`);
      cells.push({
        fieldName: field.name,
        fieldKind: field.kind,
        locale,
        value: fieldValueToDisplayString(localized?.[locale], field.kind),
        status: (status?.status as TranslationStatusValue | undefined) ?? "untranslated",
        errorMessage: status?.error_message ?? null,
        updatedAt: status?.updated_at ?? null,
      });
    }
  }
  return cells;
}

/**
 * Overwrites one field/locale with an admin-typed value and marks it
 * "manual_edited" — the translation engine skips manual_edited fields
 * unconditionally, so this value is never silently overwritten by a later
 * auto-translate pass.
 */
export async function saveManualTranslation(
  contentType: ContentType,
  contentId: string,
  fieldName: string,
  locale: TargetLocale,
  rawValue: string,
): Promise<void> {
  const supabase = await createClient();
  const table = tableForContentType(contentType);
  const field = fieldsForContentType(contentType).find((f) => f.name === fieldName);
  if (!field) throw new Error(`Unknown field "${fieldName}" for ${contentType}.`);

  const { data: row, error } = await supabase.from(table).select("*").eq("id", contentId).single();
  if (error || !row) throw new Error(error?.message ?? `Could not load ${table} row ${contentId}.`);

  const value = parseDisplayValue(rawValue, field.kind);
  const topKey = field.path[0];
  const currentTop = (row as Record<string, unknown>)[topKey] as Record<string, unknown> | undefined;
  const updatedTop = setLocaleAtPath(currentTop, field.path.slice(1), locale, value);

  const { error: updateError } = await supabase.from(table).update({ [topKey]: updatedTop }).eq("id", contentId);
  if (updateError) throw new Error(updateError.message);

  const localized = getAtPath(row, field.path) as Record<string, unknown> | undefined;
  const thText = fieldValueToDisplayString(localized?.th, field.kind);

  const { error: statusError } = await supabase.from("translation_status").upsert(
    {
      content_type: contentType,
      content_id: contentId,
      field_name: fieldName,
      locale,
      status: "manual_edited",
      source_hash: hashText(thText),
      error_message: null,
    },
    { onConflict: "content_type,content_id,field_name,locale" },
  );
  if (statusError) throw new Error(statusError.message);
}

/**
 * Forces one or more field/locale cells back through the translation
 * engine, regardless of their current status (done-and-unchanged,
 * manual_edited, failed, pending) — deleting the status row makes it look
 * "never translated" to translateContent, which then re-translates it
 * normally (still subject to quota).
 */
export async function retranslateCells(
  contentType: ContentType,
  contentId: string,
  targets: { fieldName: string; locale: TargetLocale }[],
): Promise<void> {
  if (targets.length === 0) return;
  const supabase = await createClient();

  for (const { fieldName, locale } of targets) {
    const { error } = await supabase
      .from("translation_status")
      .delete()
      .eq("content_type", contentType)
      .eq("content_id", contentId)
      .eq("field_name", fieldName)
      .eq("locale", locale);
    if (error) throw new Error(error.message);
  }

  await translateContent(contentType, contentId);
}
