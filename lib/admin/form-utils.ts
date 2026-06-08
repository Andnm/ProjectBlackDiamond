/** Shared helpers for turning admin <form> submissions into DB-ready values. */

/** Wrap a plain Vietnamese string into the `{ vi: "..." }` JSONB shape. */
export function toLocalizedJson(value: FormDataEntryValue | null | undefined) {
  const text = String(value ?? "").trim();
  return text ? { vi: text } : {};
}

/** Read the "vi" string out of a localized JSONB value (for pre-filling forms). */
export function fromLocalizedJson(value: unknown): string {
  if (value && typeof value === "object" && "vi" in (value as Record<string, unknown>)) {
    const vi = (value as Record<string, unknown>).vi;
    return typeof vi === "string" ? vi : "";
  }
  return "";
}

/** Split a textarea (one item per non-empty line) into a string array, wrapped for "vi". */
export function toLocalizedLines(value: FormDataEntryValue | null | undefined) {
  const lines = String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length ? { vi: lines } : {};
}

/** Join a localized string-array's "vi" entries back into newline-separated text. */
export function fromLocalizedLines(value: unknown): string {
  if (value && typeof value === "object" && "vi" in (value as Record<string, unknown>)) {
    const vi = (value as Record<string, unknown>).vi;
    if (Array.isArray(vi)) return vi.filter((item) => typeof item === "string").join("\n");
  }
  return "";
}

/** Parse a comma-separated tag list into a trimmed, de-duplicated string array. */
export function parseTags(value: FormDataEntryValue | null | undefined): string[] {
  const raw = String(value ?? "");
  const tags = raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return Array.from(new Set(tags));
}

/** Read a required text field, returning null when blank. */
export function readText(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

/** Read an optional integer field. */
export function readInt(formData: FormData, key: string): number | null {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Read an optional non-negative decimal field (e.g. a price amount). */
export function readDecimal(formData: FormData, key: string): number | null {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/** Slugify a Vietnamese title into a URL-safe slug (basic diacritic stripping). */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
