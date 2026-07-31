"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/routing";

/**
 * Corrects <html lang> to the real locale on the client. The root layout
 * (which owns the <html> tag) sits above the [locale] segment and can't
 * read params.locale without forcing dynamic rendering site-wide (see
 * app/layout.tsx), so it renders a static default and this fixes it up
 * post-hydration instead.
 */
export function SyncHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
