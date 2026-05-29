export const locales = ["vi", "en"] as const;
export const defaultLocale = "vi";

export type Locale = (typeof locales)[number];

export const pathnames = {
  home: "",
  about: "about",
  education: "education",
  catalog: "catalog",
  blog: "blog",
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

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}
