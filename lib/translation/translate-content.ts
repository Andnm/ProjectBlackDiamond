import "server-only";
import { createHash } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { getActiveTranslationProvider } from "@/lib/translation/provider";
import type { TranslationProvider } from "@/lib/translation/provider";
import { reserveQuota } from "@/lib/translation/quota";
import { fieldsForContentType, tableForContentType, type ContentType, type TranslatableField } from "@/lib/translation/fields";
import { getAtPath, setLocaleAtPath } from "@/lib/translation/json-path";
import { locales, type Locale } from "@/i18n/routing";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const TARGET_LOCALES = locales.filter((locale): locale is Exclude<Locale, "th"> => locale !== "th");

function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function getFieldSourceTexts(row: Record<string, unknown>, field: TranslatableField): string[] {
  const localized = getAtPath(row, field.path) as Record<string, unknown> | undefined;
  const th = localized?.th;
  if (field.kind === "lines") {
    return Array.isArray(th) ? (th as string[]) : [];
  }
  return typeof th === "string" && th.trim() ? [th] : [];
}

type DueField = { field: TranslatableField; sourceTexts: string[]; sourceHash: string };

type UpsertStatusArgs = {
  contentType: ContentType;
  contentId: string;
  fieldName: string;
  locale: Locale;
  status: "done" | "pending" | "failed";
  sourceHash?: string;
  errorMessage?: string | null;
};

async function upsertStatus(supabase: SupabaseClient, args: UpsertStatusArgs): Promise<void> {
  await supabase.from("translation_status").upsert(
    {
      content_type: args.contentType,
      content_id: args.contentId,
      field_name: args.fieldName,
      locale: args.locale,
      status: args.status,
      source_hash: args.sourceHash ?? null,
      error_message: args.errorMessage ?? null,
    },
    { onConflict: "content_type,content_id,field_name,locale" },
  );
}

async function translateFieldGroup(
  supabase: SupabaseClient,
  provider: TranslationProvider,
  group: DueField[],
  locale: Locale,
  html: boolean,
  contentType: ContentType,
  contentId: string,
  columnPatches: Record<string, Record<string, unknown>>,
): Promise<void> {
  if (group.length === 0) return;

  const flatTexts: string[] = [];
  const boundaries: number[] = [0];
  for (const { sourceTexts } of group) {
    flatTexts.push(...sourceTexts);
    boundaries.push(flatTexts.length);
  }

  const translated = await provider.translateBatch(flatTexts, "th", locale, { html });

  for (let i = 0; i < group.length; i++) {
    const { field, sourceHash } = group[i];
    const slice = translated.slice(boundaries[i], boundaries[i + 1]);
    const value: unknown = field.kind === "lines" ? slice : slice[0];

    const topKey = field.path[0];
    columnPatches[topKey] = setLocaleAtPath(columnPatches[topKey], field.path.slice(1), locale, value);

    await upsertStatus(supabase, {
      contentType,
      contentId,
      fieldName: field.name,
      locale,
      status: "done",
      sourceHash,
    });
  }
}

/**
 * Translates every stale/untranslated field of a collection_pieces or
 * blog_posts row from Thai into every other configured locale, respecting
 * quota, skipping fields an admin has manually edited, and re-translating
 * fields whose Thai source changed since the last successful translation.
 *
 * Never throws for translation failures (quota exhaustion, provider
 * errors) — those are recorded as "pending"/"failed" translation_status
 * rows so the Thai save this is called after always succeeds regardless.
 * Only fetch/database errors on the content row itself propagate.
 */
export async function translateContent(contentType: ContentType, contentId: string): Promise<void> {
  const supabase = await createClient();
  const table = tableForContentType(contentType);
  const fields = fieldsForContentType(contentType);

  const { data: row, error: fetchError } = await supabase.from(table).select("*").eq("id", contentId).single();
  if (fetchError || !row) {
    throw new Error(fetchError?.message ?? `Could not load ${table} row ${contentId} to translate.`);
  }

  const provider = getActiveTranslationProvider();

  // Seed each touched column with its FULL current value (not just {}), so
  // non-localized sibling keys (e.g. specs.carat) and other locales already
  // translated aren't dropped when we patch in the new locale's value.
  const columnPatches: Record<string, Record<string, unknown>> = {};
  for (const topKey of new Set(fields.map((f) => f.path[0]))) {
    columnPatches[topKey] = structuredClone(((row as Record<string, unknown>)[topKey] as Record<string, unknown>) ?? {});
  }

  for (const locale of TARGET_LOCALES) {
    const { data: statusRows } = await supabase
      .from("translation_status")
      .select("field_name, status, source_hash")
      .eq("content_type", contentType)
      .eq("content_id", contentId)
      .eq("locale", locale);

    const statusByField = new Map((statusRows ?? []).map((r) => [r.field_name, r]));

    const dueFields: DueField[] = [];
    for (const field of fields) {
      const sourceTexts = getFieldSourceTexts(row as Record<string, unknown>, field);
      if (sourceTexts.length === 0) continue;

      const sourceHash = hashText(sourceTexts.join("\n"));
      const existing = statusByField.get(field.name);
      if (existing?.status === "manual_edited") continue;
      if (existing?.status === "done" && existing.source_hash === sourceHash) continue;

      dueFields.push({ field, sourceTexts, sourceHash });
    }

    if (dueFields.length === 0) continue;

    const totalChars = dueFields.reduce(
      (sum, f) => sum + f.sourceTexts.reduce((s, t) => s + t.length, 0),
      0,
    );
    const reserved = await reserveQuota(provider, totalChars);
    if (!reserved) {
      await Promise.all(
        dueFields.map(({ field }) =>
          upsertStatus(supabase, { contentType, contentId, fieldName: field.name, locale, status: "pending" }),
        ),
      );
      continue;
    }

    try {
      const plainFields = dueFields.filter((f) => f.field.kind !== "html");
      const htmlFields = dueFields.filter((f) => f.field.kind === "html");
      await translateFieldGroup(supabase, provider, plainFields, locale, false, contentType, contentId, columnPatches);
      await translateFieldGroup(supabase, provider, htmlFields, locale, true, contentType, contentId, columnPatches);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await Promise.all(
        dueFields.map(({ field }) =>
          upsertStatus(supabase, { contentType, contentId, fieldName: field.name, locale, status: "failed", errorMessage: message }),
        ),
      );
    }
  }

  if (Object.keys(columnPatches).length > 0) {
    const { error: updateError } = await supabase.from(table).update(columnPatches).eq("id", contentId);
    if (updateError) throw new Error(updateError.message);
  }
}

/**
 * Fire-and-handle wrapper for admin server actions: never lets a
 * translation failure block the Thai save that already succeeded.
 */
export async function syncTranslations(contentType: ContentType, contentId: string): Promise<void> {
  try {
    await translateContent(contentType, contentId);
  } catch (err) {
    console.error(`[translation] Failed to sync translations for ${contentType} ${contentId}:`, err);
  }
}
