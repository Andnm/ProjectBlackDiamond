import type { Locale } from "@/i18n/routing";
import type { CollectionPiece } from "@/lib/collection";
import type { BlogPost } from "@/lib/blog";
import fallbackImage from "@/assets/images/background/education_background.png";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";
const BRAND_NAME = "BlackDiamond";
const BRAND_EMAIL = "contact@blackdiamondluxury.org";
const BRAND_PHONE = "+6621234567";

function abs(path: string) {
  return `${SITE_URL}${path}`;
}

const LOCALE_TAG: Record<Locale, string> = {
  th: "th-TH",
  vi: "vi-VN",
  lo: "lo-LA",
  zh: "zh-CN",
  en: "en-US",
};

const ORGANIZATION_DESCRIPTION: Record<Locale, string> = {
  th: "จุดหมายปลายทางระดับสูงสำหรับเพชรดำธรรมชาติ — อัญมณีระดับสะสมที่ได้รับการรับรอง เครื่องประดับเชิงสถาปัตยกรรม และแหล่งที่มาที่ตรวจสอบได้",
  vi: "Điểm đến hàng đầu cho kim cương đen tự nhiên — đá quý sưu tầm được chứng nhận, trang sức mang tính kiến trúc và nguồn gốc có thể xác minh.",
  lo: "ຈຸດໝາຍປາຍທາງລະດັບສູງສຳລັບເພັດດຳທຳມະຊາດ — ອັນຍະມະນີລະດັບສະສົມທີ່ໄດ້ຮັບການຮັບຮອງ, ເຄື່ອງປະດັບເຊີງສະຖາປັດຕະຍະກຳ ແລະ ແຫຼ່ງທີ່ມາທີ່ກວດສອບໄດ້.",
  zh: "天然黑钻的顶级目的地——经过认证的收藏级宝石、建筑感珠宝设计，以及可验证的来源。",
  en: "The premier destination for natural black diamonds — certified collector-grade gemstones, architectural jewelry, and verifiable provenance.",
};

const KNOWS_ABOUT: Record<Locale, string[]> = {
  th: ["เพชรดำ", "Carbonado", "การรับรอง GIA", "อัญมณีหรูหรา", "การลงทุนเพชร"],
  vi: ["Kim cương đen", "Carbonado", "Chứng nhận GIA", "Đá quý xa xỉ", "Đầu tư kim cương"],
  lo: ["ເພັດດຳ", "Carbonado", "ການຮັບຮອງ GIA", "ອັນຍະມະນີຫລູຫລາ", "ການລົງທຶນເພັດ"],
  zh: ["黑钻石", "Carbonado", "GIA认证", "奢华宝石", "钻石投资"],
  en: ["Black Diamonds", "Carbonado", "GIA Certification", "Luxury Gemstones", "Diamond Investment"],
};

export function organizationSchema(locale: Locale = "th") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: abs(fallbackImage.src),
      width: 1200,
      height: 630,
    },
    description: ORGANIZATION_DESCRIPTION[locale],
    email: BRAND_EMAIL,
    telephone: BRAND_PHONE,
    foundingLocation: {
      "@type": "Place",
      name: "Thailand",
    },
    knowsAbout: KNOWS_ABOUT[locale],
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
    inLanguage: Object.values(LOCALE_TAG),
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
  const localeTag = LOCALE_TAG[locale];
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
      url: abs(fallbackImage.src),
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

const MATERIAL_LABEL: Record<Locale, string> = {
  th: "เพชรดำธรรมชาติ",
  vi: "Kim cương đen tự nhiên",
  lo: "ເພັດດຳທຳມະຊາດ",
  zh: "天然黑钻石",
  en: "Natural Black Diamond",
};

const PRODUCT_PROPERTY_LABELS: Record<Locale, { carat: string; rarityIndex: string; origin: string; certification: string }> = {
  th: { carat: "กะรัต", rarityIndex: "ดัชนีความหายาก", origin: "แหล่งที่มา", certification: "ใบรับรอง" },
  vi: { carat: "Carat", rarityIndex: "Chỉ số hiếm", origin: "Xuất xứ", certification: "Chứng nhận" },
  lo: { carat: "ກະລັດ", rarityIndex: "ດັດຊະນີຄວາມຫາຍາກ", origin: "ແຫຼ່ງກຳເນີດ", certification: "ໃບຮັບຮອງ" },
  zh: { carat: "克拉", rarityIndex: "稀有指数", origin: "产地", certification: "证书" },
  en: { carat: "Carat", rarityIndex: "Rarity Index", origin: "Origin", certification: "Certification" },
};

export function gemstoneProductSchema(piece: CollectionPiece, locale: Locale) {
  const url = abs(`/${locale}/catalog/${piece.slug}`);
  const imageUrl =
    typeof piece.image === "string" ? piece.image : piece.image.src;
  const labels = PRODUCT_PROPERTY_LABELS[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: piece.name[locale],
    description: piece.summary[locale],
    url,
    image: imageUrl ? abs(imageUrl) : abs(fallbackImage.src),
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    material: MATERIAL_LABEL[locale],
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
        name: labels.carat,
        value: piece.specs.carat,
      },
      {
        "@type": "PropertyValue",
        name: labels.rarityIndex,
        value: piece.rarityIndex.toString(),
      },
      {
        "@type": "PropertyValue",
        name: labels.origin,
        value: piece.specs.origin[locale],
      },
      {
        "@type": "PropertyValue",
        name: labels.certification,
        value: piece.specs.certification,
      },
    ],
  };
}

const BLOG_LIST_NAME: Record<Locale, string> = {
  th: "BlackDiamond Journal — บทความ",
  vi: "BlackDiamond Journal — Bài viết",
  lo: "BlackDiamond Journal — ບົດຄວາມ",
  zh: "BlackDiamond 杂志 — 文章",
  en: "BlackDiamond Journal — Articles",
};

const CATALOG_LIST_NAME: Record<Locale, string> = {
  th: "BlackDiamond คอลเลกชัน",
  vi: "Bộ sưu tập BlackDiamond",
  lo: "ຄໍເລັກຊັນ BlackDiamond",
  zh: "BlackDiamond 典藏系列",
  en: "BlackDiamond Collection",
};

export function blogListSchema(
  posts: BlogPost[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: BLOG_LIST_NAME[locale],
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
    name: CATALOG_LIST_NAME[locale],
    url: abs(`/${locale}/catalog`),
    itemListElement: pieces.map((piece, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/${locale}/catalog/${piece.slug}`),
      name: piece.name[locale],
    })),
  };
}
