"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, type BlogPost } from "@/lib/blog";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";
import blogBg from "@/assets/images/background/blog_background.png";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
  posts: BlogPost[];
};

const CATEGORY_COLORS: Record<string, string> = {
  Science: "#c6c6c7",
  "วิทยาศาสตร์": "#c6c6c7",
  Guide: "#e9c176",
  "คู่มือ": "#e9c176",
  Certification: "#c5a059",
  "การรับรอง": "#c5a059",
  Market: "#9ab4a0",
  "ตลาด": "#9ab4a0",
  History: "#b4a09a",
  "ประวัติศาสตร์": "#b4a09a",
  Care: "#a09ab4",
  "การดูแลรักษา": "#a09ab4",
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#e9c176";
}

const REST_PAGE_SIZE = 5;

export function BlogSections({ dictionary, locale, posts }: Props) {
  const d = dictionary.blog;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleRestCount, setVisibleRestCount] = useState(REST_PAGE_SIZE);

  const categories = [
    d.allLabel,
    ...Array.from(new Set(posts.map((p) => p.category[locale]))),
  ];

  const filtered =
    activeCategory === "all" || activeCategory === d.allLabel
      ? posts
      : posts.filter((p) => p.category[locale] === activeCategory);

  const [featured, ...rest] = filtered;

  useEffect(() => {
    setVisibleRestCount(REST_PAGE_SIZE);
  }, [activeCategory]);

  const visibleRest = rest.slice(0, visibleRestCount);
  const hasMoreRest = visibleRestCount < rest.length;

  return (
    <main className="pt-20">

      <section className="relative flex min-h-[80vh] items-end overflow-hidden pb-20">
        <Image
          alt=""
          aria-hidden
          className="absolute inset-0 object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={blogBg}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

        <div className="section-shell relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">{d.eyebrow}</p>
            <h1 className="mb-6 font-headline text-6xl leading-[1.05] md:text-7xl lg:text-8xl">
              {d.title}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-on-surface-variant">{d.intro}</p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-muted">
                {posts.length} บทความ
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-outline/10 bg-background/90 backdrop-blur">
        <div className="section-shell">
          <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const isActive =
                cat === activeCategory ||
                (activeCategory === "all" && cat === d.allLabel);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === d.allLabel ? "all" : cat)}
                  className={`shrink-0 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-transparent text-on-muted hover:text-on-surface"
                  }`}
                  type="button"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-surface">

        {featured && (
          <div className="section-shell py-16">
            <Link
              className="group block"
              href={`${localizedPath(locale, "blog")}/${featured.slug}`}
            >
              <div className="relative overflow-hidden bg-surface-container-lowest">
                <span
                  className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none font-headline text-[10rem] leading-none opacity-[0.04] md:text-[14rem]"
                  style={{ color: categoryColor(featured.category[locale]) }}
                  aria-hidden
                >
                  {featured.category[locale]}
                </span>

                <div className="relative z-10 grid gap-0 md:grid-cols-[2fr_3fr]">
                  <div className="border-r border-outline/10 p-10 md:p-14">
                    <span className="mb-8 block font-headline text-7xl text-primary/20 md:text-9xl">01</span>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span
                        className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ borderColor: `${categoryColor(featured.category[locale])}60`, color: categoryColor(featured.category[locale]) }}
                      >
                        {featured.category[locale]}
                      </span>
                    </div>
                    <p className="text-xs text-on-muted">{formatDate(featured.date, locale)}</p>
                    <p className="mt-1 text-xs text-on-muted">{featured.readMinutes} {d.minRead}</p>
                  </div>

                  <div className="p-10 md:p-14 flex flex-col justify-between">
                    <div>
                      <h2 className="mb-6 font-headline text-3xl leading-snug transition-colors group-hover:text-primary md:text-4xl lg:text-5xl">
                        {featured.title[locale]}
                      </h2>
                      <p className="text-base leading-8 text-on-surface-variant md:text-lg">
                        {featured.excerpt[locale]}
                      </p>
                    </div>
                    <div className="mt-10 flex items-center gap-3 border-t border-outline/10 pt-8">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {d.readMore}
                      </span>
                      <svg
                        className="h-4 w-4 text-primary transition-transform group-hover:translate-x-2"
                        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                      >
                        <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {rest.length > 0 && (
          <div className="section-shell pb-24">
            <div className="mb-12 flex items-center gap-6">
              <span className="h-px flex-1 bg-outline/20" />
              <span className="eyebrow opacity-50">
                บทความทั้งหมด
              </span>
              <span className="h-px flex-1 bg-outline/20" />
            </div>

            {visibleRest.length >= 2 && (
              <div className="mb-4 grid gap-4 md:grid-cols-2">
                {visibleRest.slice(0, 2).map((post, i) => (
                  <ArticleCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    index={i + 2}
                    size="large"
                    readMoreLabel={d.readMore}
                    minReadLabel={d.minRead}
                    blogPath={localizedPath(locale, "blog")}
                  />
                ))}
              </div>
            )}

            {visibleRest.length >= 3 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleRest.slice(2).map((post, i) => (
                  <ArticleCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    index={i + 4}
                    size="compact"
                    readMoreLabel={d.readMore}
                    minReadLabel={d.minRead}
                    blogPath={localizedPath(locale, "blog")}
                  />
                ))}
              </div>
            )}

            {hasMoreRest ? (
              <div className="mt-12 flex justify-center">
                <button
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-on-muted transition hover:text-on-surface"
                  onClick={() => setVisibleRestCount((count) => count + REST_PAGE_SIZE)}
                  type="button"
                >
                  <span className="h-px w-20 bg-outline transition duration-500 group-hover:w-32 group-hover:bg-primary" />
                  {d.loadMore}
                  <span className="h-px w-20 bg-outline transition duration-500 group-hover:w-32 group-hover:bg-primary" />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}

function ArticleCard({
  post,
  locale,
  index,
  size,
  readMoreLabel,
  minReadLabel,
  blogPath,
}: {
  post: BlogPost;
  locale: Locale;
  index: number;
  size: "large" | "compact";
  readMoreLabel: string;
  minReadLabel: string;
  blogPath: string;
}) {
  const color = categoryColor(post.category[locale]);

  return (
    <Link
      className="group relative flex flex-col overflow-hidden bg-surface-container transition hover:bg-surface-container-high"
      href={`${blogPath}/${post.slug}`}
    >
      <div className="h-[3px] w-full transition-all" style={{ background: color }} />

      <div className={`flex flex-1 flex-col ${size === "large" ? "p-9" : "p-7"}`}>
        <div className="mb-6 flex items-start justify-between">
          <span
            className="border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ borderColor: `${color}50`, color }}
          >
            {post.category[locale]}
          </span>
          <span className="font-headline text-4xl text-primary/10">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h2
          className={`flex-1 font-headline leading-snug transition-colors group-hover:text-primary ${
            size === "large" ? "mb-5 text-2xl md:text-3xl" : "mb-4 text-xl"
          }`}
        >
          {post.title[locale]}
        </h2>

        {size === "large" && (
          <p className="mb-6 line-clamp-2 text-sm leading-7 text-on-surface-variant">
            {post.excerpt[locale]}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-outline/10 pt-5 mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-on-muted">{formatDate(post.date, locale)}</span>
            <span className="text-on-muted opacity-40">·</span>
            <span className="text-[11px] text-on-muted">{post.readMinutes} {minReadLabel}</span>
          </div>
          <svg
            className="h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
