/**
 * Provider-agnostic translation interface. The rest of the pipeline (quota
 * tracking, translation_status rows, admin UI) only depends on this shape —
 * swapping or adding a provider (Google Cloud Translation, Azure Translator,
 * ...) later means writing one more implementation of this interface, not
 * touching anything else.
 */
export type TranslateOptions = {
  /** Set when the source text is HTML (e.g. blog body) so tags are preserved instead of mangled. */
  html?: boolean;
};

export type TranslationProvider = {
  /** Machine-readable id, e.g. "azure_translator". Used as the `provider` key in translation_quota. */
  id: string;
  /**
   * How this provider's free/paid allowance resets.
   * - "monthly": a fixed character budget that refills every calendar month (e.g. Azure Translator, Google Cloud Translation).
   * - "none": a one-time, non-resetting budget — once spent, it's gone until someone upgrades the plan.
   */
  quotaResetPeriod: "monthly" | "none";
  /**
   * Batch-first: a piece/post has many translatable fields, and sending
   * them as one array in one request (instead of one request per field)
   * cuts request count drastically and avoids per-minute rate limits.
   * Returns translations in the same order as `texts`.
   */
  translateBatch(texts: string[], fromLocale: string, toLocale: string, options?: TranslateOptions): Promise<string[]>;
};

/**
 * No real provider is wired in yet. Calling this always fails so callers
 * fall back to queuing the field as "pending" instead of silently doing
 * nothing or crashing.
 */
export const unconfiguredProvider: TranslationProvider = {
  id: "unconfigured",
  quotaResetPeriod: "none",
  async translateBatch() {
    throw new Error(
      "No translation provider is configured yet. Content stays in 'pending' status until one is wired in.",
    );
  },
};

/**
 * Picks whichever provider has credentials configured. Azure Translator is
 * checked first since it's the current front-runner (2M free chars/month,
 * confirmed Thai-source + Lao support — see
 * MULTILINGUAL_TRANSLATION_PROJECT.md §3); Google Cloud Translation can be
 * added the same way once its billing setup is unblocked.
 */
export function getActiveTranslationProvider(): TranslationProvider {
  const azureKey = process.env.AZURE_TRANSLATOR_KEY;
  const azureEndpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
  if (azureKey && azureEndpoint) {
    // Lazy require avoids pulling in the Azure module (and its "server-only"
    // guard) for code paths that never need it, e.g. client bundles.
    const { createAzureTranslationProvider } = require("@/lib/translation/providers/azure") as typeof import("@/lib/translation/providers/azure");
    return createAzureTranslationProvider({
      key: azureKey,
      endpoint: azureEndpoint,
      region: process.env.AZURE_TRANSLATOR_REGION || undefined,
    });
  }

  return unconfiguredProvider;
}
