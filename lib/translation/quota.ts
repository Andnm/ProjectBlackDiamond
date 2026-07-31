import { createClient } from "@/lib/supabase/server";
import type { TranslationProvider } from "@/lib/translation/provider";

/**
 * Thresholds are out of Azure Translator's F0 free tier — 2,000,000
 * characters/month (see MULTILINGUAL_TRANSLATION_PROJECT.md §3). Scaled
 * from the original Google-based plan (400k/450k/480k out of 500k — 80%/
 * 90%/96%) at the same percentages: 80%/90%/96% of 2,000,000. Kept as named
 * constants rather than scattered literals so they're easy to retune if the
 * provider or its free-tier size changes.
 */
export const QUOTA_THRESHOLDS = {
  yellow: 1_600_000,
  red: 1_800_000,
  stop: 1_920_000,
} as const;

export type QuotaLevel = "ok" | "yellow" | "red" | "stop";

export type QuotaStatus = {
  used: number;
  remaining: number;
  level: QuotaLevel;
};

function currentPeriodKey(resetPeriod: TranslationProvider["quotaResetPeriod"]): string {
  if (resetPeriod === "none") return "lifetime";
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

function levelFor(used: number): QuotaLevel {
  if (used >= QUOTA_THRESHOLDS.stop) return "stop";
  if (used >= QUOTA_THRESHOLDS.red) return "red";
  if (used >= QUOTA_THRESHOLDS.yellow) return "yellow";
  return "ok";
}

export async function getQuotaStatus(provider: TranslationProvider): Promise<QuotaStatus> {
  const supabase = await createClient();
  const periodKey = currentPeriodKey(provider.quotaResetPeriod);

  const { data, error } = await supabase
    .from("translation_quota")
    .select("characters_used")
    .eq("provider", provider.id)
    .eq("period_key", periodKey)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const used = data?.characters_used ?? 0;
  return { used, remaining: Math.max(0, QUOTA_THRESHOLDS.stop - used), level: levelFor(used) };
}

/**
 * Atomically reserve `characters` against the quota BEFORE calling the
 * translation API, using a pre-estimated character count. Returns false
 * (reserving nothing) if that would push usage past the stop threshold —
 * callers should mark the field "pending" instead of calling the API, so we
 * never rely on catching Google's 403 as the primary guard, only a backstop.
 */
export async function reserveQuota(provider: TranslationProvider, characters: number): Promise<boolean> {
  const supabase = await createClient();
  const periodKey = currentPeriodKey(provider.quotaResetPeriod);

  const { data, error } = await supabase.rpc("reserve_translation_quota", {
    p_provider: provider.id,
    p_period_key: periodKey,
    p_characters: characters,
    p_stop_threshold: QUOTA_THRESHOLDS.stop,
  });

  if (error) throw new Error(error.message);
  return Boolean(data);
}
