import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/* — Supabase-authenticated area, not part of the [locale] tree.
  // Session refresh + auth gate is delegated to updateSession().
  if (pathname.startsWith("/admin")) {
    const adminResponse = await updateSession(request);
    if (adminResponse) return adminResponse;
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Temporarily Vietnamese-only: redirect any /en/* path to its /vi/* equivalent.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice("/en".length);
    return NextResponse.redirect(new URL(`/${defaultLocale}${rest}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
