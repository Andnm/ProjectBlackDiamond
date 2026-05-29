import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/i18n/routing";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
