import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 * Only for trusted, non-user-facing server code with no session to
 * authenticate as (e.g. the exchange-rates cron route). Never expose this
 * client or the underlying key to the browser. Everywhere else in the app
 * uses lib/supabase/server.ts, which respects RLS under the signed-in
 * admin's session.
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set — required for server-only, session-less writes.");
  }

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
