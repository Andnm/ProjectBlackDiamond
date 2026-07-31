import "server-only";
import type { TranslateOptions, TranslationProvider } from "@/lib/translation/provider";

/**
 * Azure's language codes mostly match ours, except Simplified Chinese —
 * Azure requires "zh-Hans", not the bare "zh" we use internally.
 */
function toAzureLocale(locale: string): string {
  return locale === "zh" ? "zh-Hans" : locale;
}

type AzureTranslateResponse = Array<{
  translations: Array<{ text: string; to: string }>;
}>;

export function createAzureTranslationProvider(config: {
  key: string;
  endpoint: string;
  region?: string;
}): TranslationProvider {
  return {
    id: "azure_translator",
    quotaResetPeriod: "monthly",
    async translateBatch(
      texts: string[],
      fromLocale: string,
      toLocale: string,
      options?: TranslateOptions,
    ): Promise<string[]> {
      if (texts.length === 0) return [];

      const url = new URL("/translate", config.endpoint);
      url.searchParams.set("api-version", "3.0");
      url.searchParams.set("from", toAzureLocale(fromLocale));
      url.searchParams.set("to", toAzureLocale(toLocale));
      if (options?.html) url.searchParams.set("textType", "html");

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": config.key,
      };
      if (config.region) headers["Ocp-Apim-Subscription-Region"] = config.region;

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(texts.map((text) => ({ Text: text }))),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Azure Translator request failed (${response.status}): ${body}`);
      }

      const data = (await response.json()) as AzureTranslateResponse;
      if (data.length !== texts.length) {
        throw new Error(
          `Azure Translator returned ${data.length} results for ${texts.length} inputs — response shape mismatch.`,
        );
      }
      return data.map((item, i) => {
        const translated = item.translations[0]?.text;
        if (translated === undefined) {
          throw new Error(`Azure Translator returned no translation for input index ${i}.`);
        }
        return translated;
      });
    },
  };
}
