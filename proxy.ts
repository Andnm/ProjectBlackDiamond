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
    const target = request.nextUrl.clone();
    target.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
