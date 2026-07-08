export function toLocalizedJson(value: FormDataEntryValue | null | undefined) {
  const text = String(value ?? "").trim();
  return text ? { vi: text } : {};
}

export function fromLocalizedJson(value: unknown): string {
  if (value && typeof value === "object" && "vi" in (value as Record<string, unknown>)) {
    const vi = (value as Record<string, unknown>).vi;
    return typeof vi === "string" ? vi : "";
  }
  return "";
}

export function toLocalizedLines(value: FormDataEntryValue | null | undefined) {
  const lines = String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length ? { vi: lines } : {};
}

export function fromLocalizedLines(value: unknown): string {
  if (value && typeof value === "object" && "vi" in (value as Record<string, unknown>)) {
    const vi = (value as Record<string, unknown>).vi;
    if (Array.isArray(vi)) return vi.filter((item) => typeof item === "string").join("\n");
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
