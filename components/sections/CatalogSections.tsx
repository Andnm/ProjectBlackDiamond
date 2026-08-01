"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CollectionPiece } from "@/lib/collection";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";
import { convertPrice, formatPriceFrom, type DisplayCurrency } from "@/lib/format-price";
import collectionBg from "@/assets/images/background/collection_background.png";
import { PosterShowcase } from "@/components/PosterShowcase";
import { getInformationImages } from "@/lib/information-assets";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
  pieces: CollectionPiece[];
  currency: DisplayCurrency;
  rate: number | null;
};

const CUT_FILTERS = ["Emerald", "Radiant", "Cushion", "Asscher", "Marquise", "Brilliant", "Cabochon"];

const PAGE_SIZE = 9;

export function CatalogSections({ dictionary, locale, pieces, currency, rate }: Props) {
  const informationImages = getInformationImages(locale);
  const [activeTab, setActiveTab] = useState<"retail" | "wholesale">("retail");
  const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function toggleCut(cut: string) {
    setSelectedCuts((prev) =>
      prev.includes(cut) ? prev.filter((c) => c !== cut) : [...prev, cut]
    );
  }

  const filtered =
    selectedCuts.length === 0
      ? pieces
      : pieces.filter((p) =>
          selectedCuts.some((c) =>
            p.specs.cut[locale].toLowerCase().includes(c.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(c.toLowerCase()))
          )
        );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCuts]);

  const visiblePieces = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden border-b border-outline/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-[52%]">
            <Image
              alt=""
              aria-hidden
              className="object-cover object-center"
              fill
              priority
              sizes="52vw"
              src={collectionBg}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/90" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ background: "radial-gradient(ellipse at 80% 40%, #e9c176 0%, transparent 65%)" }}
            />
          </div>

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 79px,#e9c17620 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,#e9c17620 80px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>
        <div className="section-shell relative pb-20 pt-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">{dictionary.catalog.eyebrow}</p>
              <h1 className="font-headline text-5xl leading-[1.02] md:text-6xl lg:text-8xl">
                {dictionary.catalog.heroLine1}
                <br />
                <span className="text-primary">{dictionary.catalog.heroLine2}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-on-muted">
                {dictionary.catalog.intro}
              </p>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5">
              <div className="mb-10 grid grid-cols-3 gap-px overflow-hidden bg-outline/10">
                {dictionary.catalog.heroStats.map((stat) => (
                  <div className="bg-surface px-5 py-6" key={stat.label}>
                    <p className="font-headline text-3xl text-primary">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  className="bg-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition hover:bg-primary-muted"
                  href={localizedPath(locale, "membership")}
                >
                  {dictionary.catalog.requestSearch}
                </Link>
                <button
                  className="border border-outline px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-on-surface transition hover:border-primary"
                  type="button"
                >
                  {dictionary.catalog.downloadCatalog}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-outline/10 bg-surface-container">
        <div className="section-shell py-8">
          <div className="flex flex-wrap gap-8 divide-x divide-outline/30">
            {dictionary.catalog.contextPills.map((pill) => (
              <div className="pl-8 first:pl-0" key={pill.label}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{pill.label}</p>
                <p className="mt-0.5 text-sm text-on-muted">{pill.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex border-b border-outline/30">
            <button
              className={`py-4 pr-8 text-xs font-bold uppercase tracking-[0.18em] transition ${activeTab === "retail" ? "border-b-2 border-primary text-primary" : "text-on-muted hover:text-on-surface"}`}
              onClick={() => setActiveTab("retail")}
              type="button"
            >
              {dictionary.catalog.retailTab}
            </button>
            <button
              className={`px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition ${activeTab === "wholesale" ? "border-b-2 border-primary text-primary" : "text-on-muted hover:text-on-surface"}`}
              onClick={() => setActiveTab("wholesale")}
              type="button"
            >
              {dictionary.catalog.wholesaleTab}
            </button>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-muted">
            {filtered.length} / {pieces.length} {dictionary.catalog.stonesLabel}
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-24 space-y-10">
              <div>
                <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-on-muted">
                  {dictionary.catalog.filterCarat}
                </h2>
                <div className="relative pt-2">
                  <div className="h-px bg-outline" />
                  <div className="absolute left-0 top-2 h-px w-2/3 bg-primary" />
                  <div className="absolute left-2/3 top-[3px] h-4 w-4 -translate-x-1/2 rotate-45 bg-primary" />
                  <div className="mt-5 flex justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-on-muted">
                    <span>3 ct</span>
                    <span>18 ct+</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-on-muted">
                  {dictionary.catalog.filterCut}
                </h2>
                <div className="space-y-3">
                  {CUT_FILTERS.map((cut) => {
                    const active = selectedCuts.includes(cut);
                    return (
                      <button
                        className="flex w-full cursor-pointer items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-on-muted transition hover:text-primary"
                        key={cut}
                        onClick={() => toggleCut(cut)}
                        type="button"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center border transition ${active ? "border-primary bg-primary text-on-primary" : "border-outline"}`}
                        >
                          {active && (
                            <svg
                              className="h-2.5 w-2.5"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.485 1.431a1.473 1.473 0 0 0-2.104 0L6.766 6.046 4.62 3.9a1.473 1.473 0 0 0-2.104 2.104l3.197 3.198a1.473 1.473 0 0 0 2.104 0l5.668-5.669a1.472 1.472 0 0 0 0-2.102z" />
                            </svg>
                          )}
                        </span>
                        {cut}
                      </button>
                    );
                  })}
                </div>
                {selectedCuts.length > 0 && (
                  <button
                    className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-primary underline underline-offset-2 transition hover:text-on-surface"
                    onClick={() => setSelectedCuts([])}
                    type="button"
                  >
                    {dictionary.catalog.clearFilters}
                  </button>
                )}
              </div>

              <div>
                <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-on-muted">
                  {dictionary.catalog.filterPrice}
                </h2>
                <div className="space-y-4 text-[11px] font-bold uppercase tracking-[0.12em]">
                  <div className="flex justify-between border-b border-outline/50 py-2">
                    <span className="text-on-muted">{dictionary.catalog.priceMinLabel}</span>
                    <span>$7,800</span>
                  </div>
                  <div className="flex justify-between border-b border-outline/50 py-2">
                    <span className="text-on-muted">{dictionary.catalog.priceMaxLabel}</span>
                    <span>$50,000+</span>
                  </div>
                </div>
              </div>

              <div className="border border-outline/20 bg-surface-container p-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  {dictionary.catalog.rarityLegendTitle}
                </p>
                {dictionary.catalog.rarityLegend.map((item) => (
                  <div className="mb-2 flex items-center gap-3" key={item.label}>
                    <span
                      className="h-2 w-8 shrink-0"
                      style={{ background: item.color }}
                    />
                    <span className="text-[10px] text-on-muted">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-sm text-on-muted">
                {dictionary.catalog.noResults}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-px overflow-hidden bg-outline/10 md:grid-cols-2 xl:grid-cols-3">
                  {visiblePieces.map((piece) => (
                    <CatalogCard
                      currency={currency}
                      dictionary={dictionary}
                      key={piece.slug}
                      locale={locale}
                      piece={piece}
                      rate={rate}
                    />
                  ))}
                </div>
                <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-on-muted">
                  {visiblePieces.length}/{filtered.length} {dictionary.catalog.stonesLabel}
                </p>
              </>
            )}

            {hasMore ? (
              <div className="mt-12 flex justify-center">
                <button
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-on-muted transition hover:text-on-surface"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  type="button"
                >
                  <span className="h-px w-20 bg-outline transition duration-500 group-hover:w-32 group-hover:bg-primary" />
                  {dictionary.catalog.loadMore}
                  <span className="h-px w-20 bg-outline transition duration-500 group-hover:w-32 group-hover:bg-primary" />
                </button>
              </div>
            ) : null}
          </section>
        </div>
      </section>

      <section className="border-y border-outline/10 bg-surface-container py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">{dictionary.catalog.researchEyebrow}</p>
            <h2 className="font-headline text-4xl leading-tight md:text-5xl">
              {dictionary.catalog.researchTitle}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="border-l-2 border-primary/60 pl-8 text-lg leading-8 text-on-muted">
              {dictionary.catalog.researchBody}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {dictionary.catalog.researchPillars.map((p) => (
                <div className="border border-outline/20 p-5" key={p.title}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">{p.title}</p>
                  <p className="text-sm leading-6 text-on-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell grid gap-16 md:grid-cols-2">
          <PosterShowcase
            alt={dictionary.posters.crownEyebrow}
            caption={dictionary.posters.crownCaption}
            eyebrow={dictionary.posters.crownEyebrow}
            image={informationImages.crown}
            variant="portrait"
          />
          <PosterShowcase
            alt={dictionary.posters.collectorEyebrow}
            caption={dictionary.posters.collectorCaption}
            eyebrow={dictionary.posters.collectorEyebrow}
            image={informationImages.collector}
            variant="portrait"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-low py-28">
        <div className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 select-none font-headline text-[18rem] leading-none text-on-surface/[0.03] md:text-[22rem]">
          {dictionary.catalog.bespokeBackgroundWord}
        </div>
        <div className="section-shell grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-5">{dictionary.catalog.bespokeEyebrow}</p>
            <h2 className="font-headline text-5xl leading-tight md:text-6xl">
              {dictionary.catalog.bespokeTitle}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-on-muted">
              {dictionary.catalog.bespokeBody}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                className="bg-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition hover:bg-primary-muted"
                href={localizedPath(locale, "membership")}
              >
                {dictionary.catalog.requestSearch}
              </Link>
              <button
                className="border border-outline px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-on-surface transition hover:border-primary"
                type="button"
              >
                {dictionary.catalog.downloadCatalog}
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {dictionary.catalog.bespokeFeatures.map((f) => (
                <div className="border-l border-primary/40 pl-5" key={f.title}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{f.title}</p>
                  <p className="mt-1 text-sm text-on-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              alt={dictionary.catalog.bespokeImageAlt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={collectionBg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-outline/10 bg-surface/80 p-8 backdrop-blur">
              <p className="font-headline text-4xl text-primary">100%</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-on-muted">
                {dictionary.catalog.ethicalLabel}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CatalogCard({
  piece,
  locale,
  dictionary,
  currency,
  rate,
}: {
  piece: CollectionPiece;
  locale: Locale;
  dictionary: Dictionary;
  currency: DisplayCurrency;
  rate: number | null;
}) {
  const displayPrice = piece.price ? convertPrice(piece.price, currency, rate) : null;
  const rarityColor =
    piece.rarityIndex >= 90
      ? "#e9c176"
      : piece.rarityIndex >= 80
        ? "#c5a059"
        : "#9a8f80";

  return (
    <article className="group relative flex min-h-[40rem] flex-col overflow-hidden bg-surface transition hover:bg-surface-container">
      <Link
        className="relative block overflow-hidden bg-surface-low"
        href={`${localizedPath(locale, "catalog")}/${piece.slug}`}
        style={{ aspectRatio: "1 / 1" }}
      >
        <Image
          alt={piece.imageAlt[locale]}
          className="object-cover transition duration-700 ease-in-out group-hover:scale-105"
          fill
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
          src={piece.image}
        />

        <div
          className="absolute inset-0 transition-[clip-path] duration-700 ease-in-out [clip-path:inset(0_0%_0_0%)] group-hover:[clip-path:inset(0_0%_0_100%)]"
        >
          <Image
            alt=""
            aria-hidden
            className="object-cover brightness-[0.25] grayscale"
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
            src={piece.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-primary/70 to-transparent opacity-0 transition-[left,opacity] duration-700 ease-in-out [left:0%] group-hover:opacity-100 group-hover:[left:100%]"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2 bg-background/90 px-3 py-1.5 backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: rarityColor }}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: rarityColor }}>
            {piece.rarityIndex}/100
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {piece.tags.slice(0, 2).map((tag) => (
            <span
              className="bg-background/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-on-muted backdrop-blur"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-on-muted">
              {piece.line[locale]}
            </p>
            <h2 className="font-headline text-2xl leading-tight">{piece.name[locale]}</h2>
          </div>
          {displayPrice ? (
            <div className="flex shrink-0 flex-col items-end text-right">
              <span className="whitespace-nowrap text-sm font-bold text-primary">
                {formatPriceFrom(displayPrice, dictionary.catalog.priceFrom)}
              </span>
              {displayPrice.isConverted ? (
                <span className="mt-0.5 max-w-[8rem] text-[9px] leading-tight text-on-muted/70">
                  {dictionary.catalog.priceApproxNote}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-on-muted">{piece.summary[locale]}</p>

        <dl className="mt-6 grid grid-cols-4 gap-3 border-t border-outline/20 pt-5 text-[10px] uppercase tracking-[0.12em] text-on-muted">
          <div>
            <dt>{dictionary.catalog.detailCarat}</dt>
            <dd className="mt-1 font-bold text-on-surface">{piece.specs.carat}</dd>
          </div>
          <div>
            <dt>{dictionary.catalog.detailCut}</dt>
            <dd className="mt-1 font-bold text-on-surface">{piece.specs.cut[locale]}</dd>
          </div>
          <div>
            <dt>{dictionary.catalog.detailMetal}</dt>
            <dd className="mt-1 font-bold text-on-surface">{piece.specs.metal[locale]}</dd>
          </div>
          <div>
            <dt>{dictionary.catalog.detailRarity}</dt>
            <dd className="mt-1 font-bold" style={{ color: rarityColor }}>
              {piece.rarityIndex}
            </dd>
          </div>
        </dl>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-surface-high/95 p-7 backdrop-blur transition duration-500 group-hover:translate-y-0">
          <p className="mb-4 text-xs leading-6 text-on-muted">{piece.lightBehavior[locale]}</p>
          <Link
            className="block w-full bg-primary py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition hover:bg-primary-muted"
            href={`${localizedPath(locale, "catalog")}/${piece.slug}`}
          >
            {dictionary.catalog.viewDetail}
          </Link>
        </div>
      </div>
    </article>
  );
}
