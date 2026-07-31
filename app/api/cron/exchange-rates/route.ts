import { NextRequest, NextResponse } from "next/server";
import { refreshExchangeRates } from "@/lib/data/exchange-rates";

/**
 * Meant to be hit once a day by a scheduler (Vercel Cron — see
 * vercel.json — or any external cron service/GitHub Action). Protected by
 * CRON_SECRET so it can't be triggered by anyone who finds the URL.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await refreshExchangeRates();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
