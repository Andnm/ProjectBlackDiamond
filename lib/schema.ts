import type { Locale } from "@/i18n/routing";
import type { CollectionPiece } from "@/lib/collection";
import type { BlogPost } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
const BRAND_NAME = "BlackDiamond";
const BRAND_EMAIL = "contact@blackdiamondluxury.org";
const BRAND_PHONE = "+84123456789";

function abs(path: string) {
  return `${SITE_URL}${path}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: abs("/images/education-background.png"),
      width: 1200,
      height: 630,
    },
    description:
      "A refined destination for natural black diamonds — certified collector-grade stones, architectural jewelry, and authenticated provenance.",
    email: BRAND_EMAIL,
    telephone: BRAND_PHONE,
    foundingLocation: {
      "@type": "Place",
      name: "Vietnam",
    },
    knowsAbout: [
      "Black diamonds",
      "Carbonado",
      "GIA certification",
      "Luxury gemstones",
      "Diamond investment",
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/{locale}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["vi-VN", "en-US"],
  };
}

export function breadcrumbSchema(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function articleSchema(post: BlogPost, locale: Locale) {
  const localeTag = locale === "vi" ? "vi-VN" : "en-US";
  const url = abs(`/${locale}/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title[locale],
    description: post.excerpt[locale],
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: localeTag,
    keywords: post.tags.join(", "),
    articleSection: post.category[locale],
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
    },
    image: {
      "@type": "ImageObject",
      url: abs("/images/education-background.png"),
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function gemstoneProductSchema(piece: CollectionPiece, locale: Locale) {
  const url = abs(`/${locale}/catalog/${piece.slug}`);
  const imageUrl =
    typeof piece.image === "string" ? piece.image : piece.image.src;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: piece.name[locale],
    description: piece.summary[locale],
    url,
    image: imageUrl ? abs(imageUrl) : abs("/images/education-background.png"),
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    material: "Natural Black Diamond",
    keywords: piece.tags.join(", "),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Carat",
        value: piece.specs.carat,
      },
      {
        "@type": "PropertyValue",
        name: "Rarity Index",
        value: piece.rarityIndex.toString(),
      },
      {
        "@type": "PropertyValue",
        name: "Origin",
        value: piece.specs.origin[locale],
      },
      {
        "@type": "PropertyValue",
        name: "Certification",
        value: piece.specs.certification,
      },
    ],
  };
}

export function blogListSchema(
  posts: BlogPost[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `BlackDiamond Journal — ${locale === "vi" ? "Tạp chí" : "Articles"}`,
    url: abs(`/${locale}/blog`),
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/${locale}/blog/${post.slug}`),
      name: post.title[locale],
    })),
  };
}

export function catalogListSchema(
  pieces: CollectionPiece[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `BlackDiamond Collection — ${locale === "vi" ? "Bộ sưu tập" : "Catalog"}`,
    url: abs(`/${locale}/catalog`),
    itemListElement: pieces.map((piece, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/${locale}/catalog/${piece.slug}`),
      name: piece.name[locale],
    })),
  };
}
