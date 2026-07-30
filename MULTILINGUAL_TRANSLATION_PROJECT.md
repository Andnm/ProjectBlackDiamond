# Multilingual + Auto-Translate Project — Context Brief

> **Purpose of this file**: this is a resumable project brief. If a future session loses conversation context, paste/read this file to reconstruct the full picture — goal, decisions already locked in, what's built, what's blocked, and what's next. Keep it updated as work progresses (move items from "Pending" to "Done" as they land; add new decisions as they're made).

## 1. Goal

Turn ProjectBlackDiamond (currently Thai-only) into a true multi-locale site, and auto-translate admin-authored Thai content (catalog pieces + blog posts) into the other locales via a cloud MT API, with a converted-currency price display per locale.

## 2. Locked-in decisions

**Locales (5, official, routed)**: `th` (main/source language) · `vi` · `lo` · `zh` · `en`.
Any other locale a visitor might have (not in this list) gets **content fallback to `en`** and **currency fallback to USD** — no dedicated route/URL for it. Extensibility model: locale list lives in one central code config; adding a 6th locale later = add a config entry + translations + redeploy (not a no-deploy admin-UI feature — that's explicitly out of scope unless asked for later).

**Currency per locale**:
| locale | currency | conversion |
|---|---|---|
| `th` | THB | canonical, stored value, no conversion |
| `vi` | VND | converted from THB |
| `lo` | LAK | converted from THB |
| `zh` | CNY | converted from THB |
| `en` | USD | converted from THB |
| other/unmapped | USD | same as `en` |

Converted prices must show a disclaimer that the price is indicative (exchange-rate dependent). Round **up** to a visually clean denomination per currency (not raw ceiling — avoid ugly numbers).

**Translation provider strategy**: build translation calls behind a provider-agnostic interface (`translate(text, from, to)`), so swapping/adding providers later doesn't touch quota tracking, status states, or admin UI. The quota/reset model must support both "monthly recurring" (Google-style) and "one-time non-resetting" semantics as a config value, not a hardcoded assumption.

**Quota management (for Google, once unblocked)**:
- 500,000 chars/month free (Basic v2 + Advanced v3 share the same pool), never expires, then $20/1M chars. Advanced v3 glossary stays at $20/1M unless using custom/adaptive models ($80/1M).
- Thresholds: Yellow 400,000 / Red 450,000 / Hard stop 480,000 (config values, not hardcoded).
- Estimate character count for all target-locale fields **before** calling the API; if estimate would breach the stop threshold, skip the call and mark `pending` instead of risking a Google 403.
- Also catch Google's 403 errors as a second line of defense — distinguish `Daily Limit Exceeded` (monthly-type → requeue as pending) vs `User Rate Limit Exceeded` (per-minute → short retry).
- Atomic increment for the usage counter (`UPDATE ... SET used = used + N WHERE used + N <= threshold`) to avoid a check-then-act race when multiple admin saves happen concurrently.

**Translation status model**: per field × per locale: `pending` ("chờ dịch") / `in_progress` ("đang dịch") / `done` ("đã dịch") / `manual_edited` (admin hand-corrected — must never be silently overwritten by a future auto re-translate).
- Content-drift detection: hash the Thai source text at translation time; if Thai source changes later, flag that field/locale as stale → back to `pending`.
- Fallback locale chain when a locale isn't translated yet: prefer `en`, else `th`. Applied **per field**, not per whole record, so partial translations still show.
- Resume: background cron retries `pending` items periodically once quota allows, **plus** a manual "translate now" button in admin that re-checks quota first.
- HTML blog body: use the provider's HTML-safe mode (Google Cloud Translation: `mimeType: "text/html"`) to preserve markup — not manual tag-stripping.
- Admin UX: status badges + hover tooltips explaining states, per-field manual-edit textarea, dashboard of this month's usage vs thresholds.

## 3. Translation provider status — BLOCKED

- **Google Cloud Translation** (original pick): blocked because the user cannot complete Google Cloud Billing account setup. Error `OR_BACR2_31` ("Billing setup can't be completed... Try again with a different payment method") when adding a Visa card that works fine everywhere else. Escalated via the "not an administrator on any Billing Account" (referencing `OR-BSBBF-103`) path → submitted a request through https://support.google.com/cloud/contact/cloud_platform_suspensions (Google's stated typical response time: 48 hours). **Check ticket status in future sessions before assuming this is still blocked.**
- **DeepL API** — evaluated and **rejected**: DeepL does not support Thai as a *source* language (target-only), and does not support Lao at all (neither source nor target), as of this check. Since the pipeline needs Thai-as-source and Lao-as-a-target, DeepL cannot do this job at all — not just "inconvenient," structurally incapable. Re-check only if DeepL's language coverage changes significantly in the future.
- **Azure Translator** — proposed as a fallback candidate (broad language list, likely covers Thai+Lao) but **not yet verified**. This is the next thing to check if Google's billing ticket doesn't resolve.

## 4. Data model needed (Phase 1) — additive, does not touch existing tables

- Translation status/job tracking (per `collection_pieces`/`blog_posts` row × field × locale)
- Monthly quota usage counter (atomic, keyed by year-month)
- Daily `exchange_rates` table (date, currency code, rate vs THB), populated by a daily cron

## 5. Currency exchange-rate sourcing — needs verification

Original plan: Bank of Thailand (BOT) API (new portal: `portal.api.bot.or.th` — the old `apiportal.bot.or.th` was retired Dec 31, 2025). **Not yet confirmed** whether BOT publishes VND and LAK pairs directly (central banks often only publish major currencies; LAK especially may be missing). If a pair is missing, fall back to cross-rate via USD or a secondary general FX API (e.g. exchangerate-api.io) for just that pair. Cron must handle weekends/Thai holidays (no new rate published — keep yesterday's) and API-down gracefully (keep last-known rate + staleness flag), not crash or blank out prices.

## 6. Locale/routing infra (Phase 0) — what's currently missing

- `i18n/routing.ts`: `locales` is currently `["th"]` only → needs to become `["th","vi","lo","zh","en"]`
- `messages/`: only `th.json` exists → need `vi.json`, `lo.json`, `zh.json`, `en.json` (static UI copy, translated once manually/by AI — **not** part of the auto-translate-on-save pipeline, which is only for admin-authored catalog/blog content)
- `proxy.ts`: currently hard-redirects `/vi/*` and `/en/*` → `/th/*` (leftover from the earlier Thai-only conversion) — must be removed since vi/en (and now lo/zh) become real locales again
- Language switcher UI (doesn't exist) — needs flag icons. Decision: use a **static bundled SVG/icon library** (e.g. `flag-icons` npm package), not a live external API — flags are static data. Country-code mapping: `th`→TH, `vi`→VN, `lo`→LA, `zh`→CN, `en`→**GB** (assumption — ask user if they'd rather use US)
- `generateStaticParams` across all `app/[locale]/*` route files needs to produce paths for all 5 locales
- SEO: hreflang tags, per-locale sitemap entries — not built yet

## 7. Related work already DONE (committed to `main`, earlier in this same project)

- THB-only currency migration for the 8 existing catalog pieces (separate from the new multi-currency *display* work above — that migration made `price_currency` a THB-only literal; this new work displays THB-priced items converted for vi/lo/zh/en, it does not reintroduce multi-currency storage)
- Thai-locale audit fixes (blog body locale-key bug, stale `revalidatePath`s, CSS font var, missing `lang="th"`, query-string-losing redirects, hardcoded English strings) — merged to `main`
- Information images (`lib/information-assets.ts`, `getInformationImages(locale)`) + brand logo (`lib/brand-assets.ts`, `getBrandLogo(locale)`) + favicon — committed as `09b60dd`. **Note**: these two helpers currently only really branch on th/vi/else-en (built before `lo`/`zh` were added to scope) — revisit once Lao/Chinese brand assets exist; until then they silently fall into the `en` branch for `lo`/`zh`.

## 8. Data backfill/reset plan — discussed, NOT yet executed

User wants: (1) backup current `collection_pieces` + `blog_posts` (reuse `scripts/export-supabase-data.mjs`; the existing `backups/` snapshot from 2026-07-27 predates the THB conversion, so it's stale), (2) wipe both tables, (3) build the new schema/pipeline, (4) re-add only 1–2 test items through the new admin flow to validate the whole chain including successful auto-translation.

Step 4 needs a working translation provider — currently blocked (see §3). **Decision for this pass**: build the new schema additively without touching existing data; defer the actual backup+wipe+reseed-test until a translation provider works. Re-confirm with the user immediately before executing the wipe when that time comes — it's a destructive action on production data and deserves a fresh confirmation regardless of this prior agreement.

**Branching rule**: user explicitly said not to code this on `main` — always work on a feature branch for this initiative.

## 9. Status as of this file's creation

Just told to proceed with whatever doesn't need the Translation API while the Google support ticket is pending. Plan: create a feature branch, then build Phase 0 (locale routing infra) first since everything else depends on it, followed by Phase 1 (additive DB schema) and Phase 4 (currency pipeline, pending the BOT API verification in §5). The translation API call itself stays behind the interface as a not-yet-wired stub — manual entry works, auto-translate button stays disabled/queued until credentials exist.
