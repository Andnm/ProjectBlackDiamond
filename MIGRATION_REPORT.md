# BlackDiamond Next.js Migration Report

## 1. Source Audit

The legacy `blackdiamond` source was built as separate HTML pages with repeated Tailwind CDN configuration, duplicated header/footer markup, inline scripts, and page-specific CSS. The multilingual behavior was handled by `js/site-i18n.js`, which scans browser text nodes and swaps strings at runtime. That approach creates SEO gaps because crawlers do not receive stable per-language HTML, makes translation coverage fragile, and caused visible mojibake in Vietnamese copy such as `CÃ¢u chuyá»‡n`.

The old pages also relied on `onclick` navigation, repeated Google Font and icon imports, repeated mobile menu scripts, limited metadata, and many remote images without a central image policy. The design direction was strong: dark editorial luxury, gold accents, high-contrast product imagery, and collector/investment positioning. The migration keeps that brand spirit while moving structure, SEO, i18n, and backend readiness into Next.js.

## 2. New Architecture

The new project uses Next.js App Router, React functional components, TypeScript, Tailwind CSS, locale-based routing, server-rendered dictionaries, dynamic page metadata, generated sitemap/robots, and starter API routes.

Routes:

- `/vi`
- `/en`
- `/vi/about`
- `/en/about`
- `/vi/education`
- `/en/education`
- `/vi/catalog`
- `/en/catalog`
- `/vi/investment`
- `/en/investment`
- `/vi/membership`
- `/en/membership`

The root `/` redirects to `/vi` through `proxy.ts`.

## 3. Folder Structure

```txt
app/
  [locale]/
    about/page.tsx
    catalog/page.tsx
    education/page.tsx
    investment/page.tsx
    membership/page.tsx
    layout.tsx
    page.tsx
  api/
    membership/route.ts
    newsletter/route.ts
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  LanguageSwitcher.tsx
  layout/
    Footer.tsx
    Header.tsx
  sections/
    CatalogSections.tsx
    EducationSections.tsx
    HomeSections.tsx
    InvestmentSections.tsx
    MembershipSections.tsx
i18n/
  dictionaries.ts
  routing.ts
lib/
  assets.ts
  metadata.ts
messages/
  en.json
  vi.json
public/images/
```

## 4. Migration Method

Content from each legacy HTML page was mapped into one Next.js page route and one or more section components. Shared layout moved into `Header` and `Footer`. Repeated UI text moved into `messages/en.json` and `messages/vi.json`. Page metadata moved into locale-specific dictionary entries and is generated through `lib/metadata.ts`.

## 5. i18n Approach

The site now uses locale segments instead of query params or localStorage:

- Stable localized URLs are available at build time.
- The language switcher swaps only the first route segment, so `/en/catalog` becomes `/vi/catalog`.
- All translated UI and page copy lives in message files.
- Components consume a typed dictionary instead of hard-coding translatable text in JSX.

For larger scale, the next step would be `next-intl` or a CMS-backed translation workflow, but the current dictionary layer is deliberately simple and production-safe for a small bilingual marketing/catalog site.

## 6. SEO

Each page has localized:

- `title`
- `description`
- `keywords`
- Open Graph metadata
- Twitter card metadata
- canonical URL
- alternate language URLs

The project also includes `app/sitemap.ts` and `app/robots.ts`. Semantic heading structure is enforced in each page section with one `h1` per page and clear `h2`/`h3` section hierarchy. Images use `next/image`, with remote Google-hosted legacy images allowed in `next.config.ts`.

## 7. Backend Readiness

Starter API endpoints are included:

- `app/api/newsletter/route.ts`
- `app/api/membership/route.ts`

They currently validate form data and return JSON. These can later connect to a CRM, email service, database, authentication layer, or admin dashboard.

## 8. Collection Expansion

The catalog now includes a dossier-style collection system powered by `lib/collection.ts`. Each piece has bilingual naming, line positioning, technical specifications, curatorial analysis, acquisition notes, image references, and source links. The App Router also includes detail routes at `/[locale]/catalog/[slug]`, with localized metadata and language switching that preserves the same product detail page.

Research cues used for this expansion include public jewelry imagery from Pexels, a CC BY-SA black diamond ring image from Wikimedia Commons, and gemological context from GIA on black diamond inclusions, cutting, polishing, and setting difficulty.

## 9. Scale-Up Recommendations

Recommended next steps:

- Move product inventory into typed data files first, then a CMS or database.
- Add a CMS such as Sanity, Contentful, Strapi, or Payload for editorial pages and product content.
- Add authentication for private membership, wholesale pricing, or admin dashboard.
- Add database models for members, inquiries, products, certificates, and newsletter leads.
- Add schema.org structured data for organization, products, breadcrumbs, and articles.
- Add image ownership review and replace temporary remote assets with licensed production assets.
- Add analytics, consent management, error monitoring, and form spam protection.
- Add automated tests for routing, metadata, language switching, API validation, and responsive navigation.
