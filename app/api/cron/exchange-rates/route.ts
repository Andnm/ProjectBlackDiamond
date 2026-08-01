import { NextRequest, NextResponse } from "next/server";
import { refreshExchangeRates } from "@/lib/data/exchange-rates";

/**
 * Meant to be hit once a day by a scheduler (Vercel Cron — see
 * vercel.json — or any external cron service/GitHub Action). Protected by
 * CRON_SECRET so it can't be triggered by anyone who finds the URL.
 *
 * CRON_SECRET is REQUIRED, not optional — this route writes to the
 * database using the service-role client (bypasses RLS), so if the secret
 * were merely optional, forgetting to set the env var in production would
 * silently leave a service-role-backed write endpoint open to the public
 * internet. Refuse to run at all rather than fail open.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured — refusing to run rather than allow unauthenticated access." },
      { status: 503 },
    );
  }

  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await refreshExchangeRates();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
