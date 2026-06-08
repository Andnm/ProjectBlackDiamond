import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain Supabase client for public, read-only data fetching (published collection
 * pieces / blog posts) used by Server Components, `generateStaticParams`, and the
 * sitemap. Unlike `lib/supabase/server.ts`, this does NOT depend on Next.js
 * `cookies()`, so it is safe to call at build time (e.g. inside
 * `generateStaticParams`, which runs without an HTTP request context).
 *
 * It only ever reads data gated by the "public read for published rows" RLS
 * policy, so no auth/session wiring is needed here.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
