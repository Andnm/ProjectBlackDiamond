export function getAtPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, source);
}

/** Sets `[locale]: value` at `path` inside `container`, preserving every other key along the way (other locales, non-localized sibling fields like specs.carat). */
export function setLocaleAtPath(
  container: Record<string, unknown> | undefined,
  path: string[],
  locale: string,
  value: unknown,
): Record<string, unknown> {
  if (path.length === 0) {
    return { ...(container ?? {}), [locale]: value };
  }
  const [head, ...rest] = path;
  const currentChild = (container?.[head] as Record<string, unknown> | undefined) ?? {};
  return { ...(container ?? {}), [head]: setLocaleAtPath(currentChild, rest, locale, value) };
}
