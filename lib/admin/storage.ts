/**
 * Extracts the storage-relative path from a Supabase public storage URL
 * (e.g. "https://xxx.supabase.co/storage/v1/object/public/media/collection/abc.jpg"
 * -> "collection/abc.jpg"), so an uploaded file can be removed from the
 * `media` bucket when its owning row is deleted. Returns null if the URL
 * doesn't look like one of our own storage URLs (e.g. empty, or some other
 * host) — callers should skip removal rather than guess.
 */
export function storagePathFromPublicUrl(url: string | null | undefined, bucket = "media"): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length);
}
