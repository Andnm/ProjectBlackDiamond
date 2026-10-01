# BlackDiamond

A multilingual website and content-management system for a luxury black-diamond jewellery brand, built for a real client. Visitors browse the collection, read articles and register interest in five languages; the client's team manages everything from a private admin area, including automatic translation of new content.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%7C%20Auth%20%7C%20Storage-3ecf8e) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## Features

**Public site**
- Five locales: Thai (default), Vietnamese, Lao, Chinese, English, with locale-aware routing and per-locale SEO metadata, Open Graph tags, JSON-LD, sitemap and robots.
- Catalog and product detail pages with gem specifications and a certificate viewer; blog with rich-text articles.
- Prices are stored once in THB and shown in the visitor's currency (THB, VND, LAK, CNY, USD) using daily exchange rates refreshed by a scheduled job.
- Membership enquiry and newsletter forms, with loading skeletons and incremental static regeneration for fast pages.

**Admin CMS** (`/admin`)
- Supabase-authenticated dashboard to create, edit and delete products and blog posts, with a Tiptap rich-text editor and image upload to storage.
- Translation workflow: write content once, translate into the other locales automatically (Azure Translator), review per-field status, hand-edit any translation, and track monthly character quota.

## Architecture

```mermaid
flowchart LR
  V[Visitor] --> N[Next.js App Router<br/>/[locale]/...]
  A[Admin] --> AD[/admin<br/>Supabase Auth]
  N --> DB[(Supabase Postgres<br/>RLS)]
  AD --> DB
  AD --> ST[(Supabase Storage)]
  AD --> TR[Translation provider]
  CRON[Vercel Cron<br/>daily] --> FX[/api/cron/exchange-rates/] --> DB
```

- **Content model:** every translatable field is stored per locale in JSON; a `translation_status` table tracks each field as pending, done, failed or manually edited, so editing the source never silently overwrites a hand-corrected translation.
- **Security:** authorization enforced in Postgres row-level security as well as in server actions; the cron endpoint refuses to run without its secret rather than failing open.
- **Hosting:** Vercel, chosen with the client for quick delivery and low running cost; scheduled jobs use Vercel Cron.

## Built with AI, verified like a team

The site was developed with AI coding assistants under a process designed for a small team with a real client and no dedicated QA.

1. **Spec first.** Features start as a written requirement and acceptance criteria, then an AI assistant implements against them in small, reviewable branches (`feature/thai-locale`, `feature/multilingual-i18n`).
2. **Independent QA agent.** Before a release, a fresh AI agent with no knowledge of how the code was written is given a self-contained end-to-end test script and audits the running site: all pages across all five locales, SEO, forms, admin authentication, create/edit/delete flows, translation and database policies.
3. **Rules of engagement.** The agent may report but not change code, must back every finding with evidence (file, line, reproduction), must classify severity, and must delete any test data it created and log the cleanup.
4. **Close the loop.** Findings become tracked work items; fixes are re-verified by re-running the same script, so regressions are caught by the process rather than by the client.
5. **Human decides.** AI proposes, implements and challenges; I review every change and remain the final decision-maker on what ships.

## Getting started

```bash
npm install
npm run dev
```

Create `.env.local` with:

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AZURE_TRANSLATOR_ENDPOINT=
AZURE_TRANSLATOR_KEY=
AZURE_TRANSLATOR_REGION=
CRON_SECRET=
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

## Project structure

```
app/[locale]/        public pages: home, catalog, blog, education, investment, lifestyle, membership, about
app/admin/           authenticated CMS (products, blog, translations)
app/api/cron/        scheduled jobs (daily exchange rates)
components/          layout, sections and admin UI
lib/translation/     field registry, provider abstraction, quota tracking, manual-edit protection
lib/supabase/        server, client, middleware and service clients
i18n/, messages/     routing and per-locale dictionaries
```
