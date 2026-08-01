/**
 * Builds the JSONB payload for a localized text column from the admin's
 * single "th" text input, MERGING onto `existing` (the column's current
 * value, if editing) rather than replacing it outright — a JSONB column
 * update replaces the whole value, so without this merge, every edit would
 * silently wipe out any vi/lo/zh/en keys the translation pipeline had
 * already filled in for that field.
 */
export function toLocalizedJson(
  value: FormDataEntryValue | null | undefined,
  existing?: Record<string, unknown> | null,
): Record<string, unknown> {
  const text = String(value ?? "").trim();
  const base = { ...(existing ?? {}) };
  if (text) {
    base.th = text;
  } else {
    delete base.th;
  }
  return base;
}

export function fromLocalizedJson(value: unknown): string {
  if (value && typeof value === "object" && "th" in (value as Record<string, unknown>)) {
    const th = (value as Record<string, unknown>).th;
    return typeof th === "string" ? th : "";
  }
  return "";
}

/** Same merge-not-replace behavior as toLocalizedJson, for line-array fields (analysis, acquisition). */
export function toLocalizedLines(
  value: FormDataEntryValue | null | undefined,
  existing?: Record<string, unknown> | null,
): Record<string, unknown> {
  const lines = String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const base = { ...(existing ?? {}) };
  if (lines.length) {
    base.th = lines;
  } else {
    delete base.th;
  }
  return base;
}

export function fromLocalizedLines(value: unknown): string {
  if (value && typeof value === "object" && "th" in (value as Record<string, unknown>)) {
    const th = (value as Record<string, unknown>).th;
    if (Array.isArray(th)) return th.filter((item) => typeof item === "string").join("\n");
  }
  return "";
}

export function parseTags(value: FormDataEntryValue | null | undefined): string[] {
  const raw = String(value ?? "");
  const tags = raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return Array.from(new Set(tags));
}

export function readText(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

export function readInt(formData: FormData, key: string): number | null {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function readDecimal(formData: FormData, key: string): number | null {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

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
