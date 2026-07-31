export const locales = ["th", "vi", "lo", "zh", "en"] as const;
export const defaultLocale = "th";

export type Locale = (typeof locales)[number];

export const pathnames = {
  home: "",
  about: "about",
  education: "education",
  catalog: "catalog",
  blog: "blog",
  lifestyle: "lifestyle",
  membership: "membership",
} as const;

export type RouteKey = keyof typeof pathnames;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, route: RouteKey = "home") {
  const segment = pathnames[route];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}
