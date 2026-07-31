import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CollectionPiece } from "@/lib/collection";
import { localizedPath, type Locale } from "@/i18n/routing";
import { convertPrice, formatPriceFrom, type DisplayCurrency } from "@/lib/format-price";
import { CertificateViewer, NoCertificatePlaceholder } from "@/components/CertificateViewer";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
  piece: CollectionPiece;
  currency: DisplayCurrency;
  rate: number | null;
};

export function CatalogDetailSections({ dictionary, locale, piece, currency, rate }: Props) {
  const d = dictionary.catalog;
  const displayPrice = piece.price ? convertPrice(piece.price, currency, rate) : null;

  const rarityColor =
    piece.rarityIndex >= 90
      ? "#e9c176"
      : piece.rarityIndex >= 80
        ? "#c5a059"
        : "#9a8f80";

  const primarySpecRows: [string, string][] = [
    ["Carat", piece.specs.carat],
    [d.detailDimensions, piece.specs.dimensions],
    ["การเจียระไน", piece.specs.cut[locale]],
    [d.detailHardness, piece.specs.hardness],
    [d.detailLuster, piece.specs.luster[locale]],
    [d.detailTreatment, piece.specs.treatment[locale]],
  ];

  const settingSpecRows: [string, string][] = [
    ["ตัวเรือน", piece.specs.setting[locale]],
    ["โลหะ", piece.specs.metal[locale]],
    ["แหล่งที่มา", piece.specs.origin[locale]],
    ["ใบรับรอง", piece.specs.certification],
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[1fr_1fr]">

        <aside className="relative h-[60vh] overflow-hidden border-b border-outline/20 bg-surface-low lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <Image
            alt={piece.imageAlt[locale]}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={piece.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

          <Link
            className="absolute left-6 top-24 z-10 inline-flex items-center gap-3 border border-outline/20 bg-background/70 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur transition hover:border-primary lg:left-10"
            href={localizedPath(locale, "catalog")}
          >
            <span className="h-px w-5 bg-primary" />
            {d.detailBack}
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {piece.tags.map((tag) => (
                <span
                  className="border border-outline/30 bg-background/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-on-muted backdrop-blur"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-on-muted">
              {piece.line[locale]}
            </p>
            <h1 className="font-headline text-4xl leading-tight md:text-5xl lg:text-6xl">
              {piece.name[locale]}
            </h1>

            <div className="mt-6 flex items-center gap-5">
              <div className="h-px flex-1 bg-outline/30">
                <div
                  className="h-full transition-all"
                  style={{ width: `${piece.rarityIndex}%`, background: rarityColor }}
                />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: rarityColor }}
              >
                {d.detailRarity} {piece.rarityIndex}/100
              </span>
            </div>
          </div>
        </aside>

        <section className="px-6 py-20 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-2xl">

            <section className="mb-16">
              <p className="border-l-2 border-primary pl-6 text-xl leading-9 text-on-muted md:text-2xl">
                {piece.summary[locale]}
              </p>

              <div className="mt-10 grid gap-px overflow-hidden border border-outline/20 bg-outline/20 sm:grid-cols-2">
                <div className="bg-surface p-7">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                    {d.detailPricing}
                  </p>
                  <p className="font-headline text-3xl text-primary">
                    {displayPrice ? formatPriceFrom(displayPrice, d.priceFrom) : "—"}
                  </p>
                  {displayPrice?.isConverted ? (
                    <p className="mt-1 text-[11px] text-on-muted/70">{d.priceApproxNote}</p>
                  ) : null}
                  <p className="mt-2 text-xs leading-5 text-on-muted">{piece.priceNote[locale]}</p>
                </div>
                <div className="bg-surface p-7">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                    {d.detailRarity}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="font-headline text-4xl" style={{ color: rarityColor }}>
                      {piece.rarityIndex}
                      <span className="font-headline text-xl text-on-muted">/100</span>
                    </p>
                    <div className="h-1.5 flex-1 overflow-hidden bg-outline/30">
                      <div
                        className="h-full"
                        style={{ width: `${piece.rarityIndex}%`, background: rarityColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <SectionTitle>{d.detailSpecs}</SectionTitle>

              <div className="mb-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {"ข้อมูลจำเพาะอัญมณี"}
                </p>
                <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {primarySpecRows.map(([label, value]) => (
                    <div className="border-b border-outline/20 pb-4" key={label}>
                      <dt className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                        {label}
                      </dt>
                      <dd className="text-sm font-semibold text-on-surface">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {"ตัวเรือนและการฝัง"}
                </p>
                <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {settingSpecRows.map(([label, value]) => (
                    <div className="border-b border-outline/20 pb-4" key={label}>
                      <dt className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                        {label}
                      </dt>
                      <dd className="text-sm font-semibold text-on-surface">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            <section className="mb-16">
              <SectionTitle>{d.detailCertificate}</SectionTitle>
              {piece.certificate ? (
                <CertificateViewer certificate={piece.certificate} dictionary={dictionary} />
              ) : (
                <NoCertificatePlaceholder dictionary={dictionary} />
              )}
            </section>

            <section className="mb-16 space-y-4">
              <SectionTitle>{"การวิเคราะห์เชิงลึก"}</SectionTitle>
              <InsightBlock title={d.detailInclusion} body={piece.inclusionProfile[locale]} accent />
              <InsightBlock title={d.detailLight} body={piece.lightBehavior[locale]} accent />
              <InsightBlock title={d.detailProvenance} body={piece.provenance[locale]} />
              <InsightBlock title={d.detailWearability} body={piece.wearability[locale]} />
              <InsightBlock title={d.detailCare} body={piece.care[locale]} />
            </section>

            <section className="mb-16">
              <SectionTitle>{d.detailInvestment}</SectionTitle>
              <div className="border border-primary/30 bg-surface-container p-7">
                <p className="text-base leading-8 text-on-muted">{piece.investmentNote[locale]}</p>
              </div>
            </section>

            <section className="mb-16">
              <SectionTitle>{d.detailAnalysis}</SectionTitle>
              <div className="space-y-7">
                {piece.analysis[locale].map((item, index) => (
                  <article
                    className="grid gap-4 border-l-2 border-primary/50 pl-6 md:grid-cols-[2.5rem_1fr]"
                    key={index}
                  >
                    <span className="font-headline text-2xl leading-none text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-8 text-on-muted">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <SectionTitle>{d.detailAcquisition}</SectionTitle>
              <div className="mb-8 grid gap-px overflow-hidden border border-outline/20 bg-outline/20 md:grid-cols-3">
                {piece.acquisition[locale].map((item) => (
                  <div
                    className="bg-surface p-5 text-xs font-bold uppercase leading-6 tracking-[0.12em] text-on-muted"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mb-6 flex items-center gap-4 border border-outline/20 bg-surface-container p-5">
                <span className="h-2 w-2 rotate-45 bg-primary" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                    {"แหล่งที่มา"}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-on-surface">
                    {piece.origin[locale]}
                  </p>
                </div>
              </div>

              <div className="inline-flex flex-wrap items-center gap-3 border border-outline/20 px-5 py-4 text-xs">
                <span className="font-bold uppercase tracking-[0.18em] text-on-muted">
                  {d.detailSource}
                </span>
                <a
                  className="text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary"
                  href={piece.source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {piece.source.label}
                </a>
              </div>
            </section>

            <div className="flex flex-col gap-4 border-t border-outline/20 pt-10 sm:flex-row">
              <Link
                className="flex-1 bg-primary py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-on-primary transition hover:bg-primary-muted"
                href={localizedPath(locale, "membership")}
              >
                {dictionary.catalog.requestSearch}
              </Link>
              <Link
                className="flex-1 border border-outline py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-on-surface transition hover:border-primary"
                href={localizedPath(locale, "catalog")}
              >
                {d.detailBack}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 flex items-center gap-5 font-headline text-2xl tracking-[0.06em]">
      <span>{children}</span>
      <span className="h-px flex-1 bg-outline/25" />
    </h2>
  );
}

function InsightBlock({
  title,
  body,
  accent = false,
}: {
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <article
      className={`p-6 ${accent ? "border-l-2 border-primary bg-surface-container" : "border border-outline/20 bg-surface"}`}
    >
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
        {title}
      </h3>
      <p className="text-sm leading-7 text-on-muted">{body}</p>
    </article>
  );
}
