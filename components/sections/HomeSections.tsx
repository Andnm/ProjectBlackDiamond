import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { remoteImages } from "@/lib/assets";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CollectionPiece } from "@/lib/collection";
import { PosterShowcase } from "@/components/PosterShowcase";
import { getInformationImages } from "@/lib/information-assets";
import homeBg from "@/assets/images/background/home_background.png";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
  featuredPieces: CollectionPiece[];
};

export function HomeSections({ dictionary, locale, featuredPieces }: Props) {
  const d = dictionary.home;
  const informationImages = getInformationImages(locale);
  const fallbackImages = [remoteImages.catalog, remoteImages.catalog2, remoteImages.catalog3];

  return (
    <main>
      <section className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 bg-surface">
          <Image
            alt="ภาพระยะใกล้ของอัญมณีสีเข้มหายากสะท้อนแสงเพียงเล็กน้อย"
            className="h-full w-full object-cover opacity-60"
            fill
            priority
            sizes="100vw"
            src={homeBg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="relative section-shell flex flex-col items-start pt-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">{d.heroEyebrow}</p>
            <h1 className="mb-8 font-headline text-6xl leading-[0.9] md:text-8xl lg:text-[120px]">
              {d.heroTitleLine1}
              <br />
              <span className="italic text-primary">{d.heroTitleLine2}</span>
            </h1>
            <p className="mb-12 max-w-2xl text-lg leading-8 text-on-surface-variant">{d.heroCopy}</p>
            <div className="flex flex-col gap-6 md:flex-row">
              <Link
                className="flex items-center gap-3 bg-primary px-10 py-5 text-sm font-label uppercase tracking-[0.2em] text-on-primary transition hover:bg-primary-container"
                href={localizedPath(locale, "education")}
              >
                {dictionary.common.learnMore}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                className="border border-outline px-10 py-5 text-sm font-label uppercase tracking-[0.2em] text-on-surface transition hover:bg-primary/10"
                href={localizedPath(locale, "membership")}
              >
                {dictionary.common.joinMembership}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-outline/50" />
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-outline">
              EST. MCMLXXXIV
            </span>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-40">
        <div className="section-shell">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="relative order-2 aspect-[3/4] bg-surface-container-low lg:order-1 lg:col-span-5">
              <Image
                alt={d.legacyTitle}
                className="h-full w-full object-cover grayscale brightness-75 transition duration-700 hover:grayscale-0"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                src={remoteImages.story}
              />
              <div className="absolute -bottom-8 -right-8 hidden h-48 w-48 border border-primary/20 p-2 xl:block">
                <div className="flex h-full w-full items-center justify-center border border-primary/40 bg-surface">
                  <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 9l10 13L22 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <p className="eyebrow mb-5">{d.legacyEyebrow}</p>
              <h2 className="mb-10 font-headline text-4xl leading-tight md:text-5xl lg:text-6xl">
                {d.legacyTitle}
              </h2>
              <div className="max-w-xl space-y-8">
                {d.legacyBody.map((paragraph) => (
                  <p className="text-lg leading-relaxed text-on-surface-variant" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                <div className="pt-6">
                  <Link
                    className="group inline-flex items-center gap-2 font-label text-sm uppercase tracking-[0.2em] text-primary"
                    href={localizedPath(locale, "education")}
                  >
                    {d.legacyLink}
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24 md:py-40">
        <div className="section-shell">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div>
              <p className="eyebrow mb-4 opacity-70">{d.vaultEyebrow}</p>
              <h2 className="font-headline text-4xl md:text-5xl">
                {d.vaultTitleHead}{" "}
                <span className="italic font-normal">
                  {d.vaultTitleTail}
                </span>
              </h2>
            </div>
            <Link
              className="border-b border-primary pb-2 text-xs font-label uppercase tracking-[0.2em] transition hover:text-primary"
              href={localizedPath(locale, "catalog")}
            >
              {dictionary.common.viewCatalog}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {featuredPieces[0] ? (
              <BentoImageCard
                category={featuredPieces[0].line[locale]}
                className="md:col-span-2 lg:col-span-3"
                href={`${localizedPath(locale, "catalog")}/${featuredPieces[0].slug}`}
                image={featuredPieces[0].image}
                name={featuredPieces[0].name[locale]}
              />
            ) : (
              <BentoImageCard
                category={d.vaultItems[0].category}
                className="md:col-span-2 lg:col-span-3"
                image={fallbackImages[0]}
                name={d.vaultItems[0].name}
              />
            )}
            {featuredPieces[1] ? (
              <BentoImageCard
                category={featuredPieces[1].line[locale]}
                className="md:col-span-2 lg:col-span-3"
                href={`${localizedPath(locale, "catalog")}/${featuredPieces[1].slug}`}
                image={featuredPieces[1].image}
                name={featuredPieces[1].name[locale]}
              />
            ) : (
              <BentoImageCard
                category={d.vaultItems[1].category}
                className="md:col-span-2 lg:col-span-3"
                image={fallbackImages[1]}
                name={d.vaultItems[1].name}
              />
            )}
            <div className="relative flex flex-col items-center justify-center bg-surface-container-high p-10 text-center md:col-span-4 lg:col-span-2">
              <Image
                alt=""
                className="absolute inset-0 object-cover opacity-60"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                src={remoteImages.catalog4}
              />
              <div className="relative z-10">
                <svg className="mx-auto mb-6 h-12 w-12 text-primary" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path d="M12 2L2 9l10 13L22 9z" />
                </svg>
                <h3 className="mb-4 font-headline text-2xl text-primary">{d.vaultBespokeTitle}</h3>
                <p className="mx-auto max-w-xs text-sm text-on-surface-variant">{d.vaultBespokeBody}</p>
              </div>
            </div>
            {featuredPieces[2] ? (
              <BentoImageCard
                category={featuredPieces[2].line[locale]}
                className="md:col-span-2 lg:col-span-2"
                href={`${localizedPath(locale, "catalog")}/${featuredPieces[2].slug}`}
                image={featuredPieces[2].image}
                name={featuredPieces[2].name[locale]}
                small
              />
            ) : (
              <BentoImageCard
                category={d.vaultItems[2].category}
                className="md:col-span-2 lg:col-span-2"
                image={fallbackImages[2]}
                name={d.vaultItems[2].name}
                small
              />
            )}
            <div className="flex flex-col items-center justify-center border border-primary/20 bg-gradient-to-br from-surface-container to-surface-container-highest p-12 text-center md:col-span-2 lg:col-span-2">
              <span className="mb-6 block font-label text-sm uppercase tracking-[0.3em] text-primary">
                {d.vaultCtaTitle}
              </span>
              <p className="mb-8 text-sm">{d.vaultCtaBody}</p>
              <Link
                className="w-full bg-primary py-4 text-center text-[10px] font-label uppercase tracking-[0.2em] text-on-primary transition hover:bg-primary-container"
                href={localizedPath(locale, "membership")}
              >
                {d.vaultCtaBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell">
          <PosterShowcase
            alt={dictionary.posters.overviewTitle}
            caption={dictionary.posters.overviewCaption}
            eyebrow={dictionary.posters.overviewEyebrow}
            image={informationImages.overview}
            title={dictionary.posters.overviewTitle}
            variant="banner"
          />
        </div>
      </section>

      <section className="bg-surface-container py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">{d.eduTeaserEyebrow}</p>
              <h2 className="font-headline text-4xl md:text-5xl">{d.eduTeaserTitle}</h2>
            </div>
            <Link
              className="group inline-flex items-center gap-3 font-label text-sm uppercase tracking-[0.2em] text-primary transition"
              href={localizedPath(locale, "education")}
            >
              {d.eduTeaserCta}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-px bg-outline/10 sm:grid-cols-3">
            {d.eduTeaserItems.map((item, i) => (
              <Link
                className="group bg-surface p-10 transition hover:bg-surface-container-low"
                href={localizedPath(locale, "education")}
                key={item.title}
              >
                <span className="mb-6 block font-headline text-5xl text-primary/20 group-hover:text-primary/40 transition">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 font-headline text-xl">{item.title}</h3>
                <p className="text-sm leading-7 text-on-surface-variant">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            fill
            sizes="100vw"
            src="/images/lifestyle-background.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="section-shell relative z-10 py-32 md:py-44">
          <div className="max-w-xl">
            <p className="eyebrow mb-5">{dictionary.lifestyle.teaserEyebrow}</p>
            <h2 className="mb-6 font-headline text-4xl leading-[1.05] md:text-6xl">
              {dictionary.lifestyle.teaserTitle}
            </h2>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-on-surface-variant">
              {dictionary.lifestyle.teaserBody}
            </p>
            <Link
              className="group inline-flex items-center gap-3 border border-primary px-10 py-4 font-label text-xs uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary"
              href={localizedPath(locale, "lifestyle")}
            >
              {dictionary.lifestyle.teaserCta}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="section-shell border-y border-outline/10 py-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {d.trustItems.map((item, i) => (
              <div className="flex flex-col gap-4" key={item.title}>
                <TrustIcon index={i} />
                <h4 className="font-headline text-2xl">{item.title}</h4>
                <p className="text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BentoImageCard({
  image,
  name,
  category,
  className = "",
  small = false,
  href,
}: {
  image: string | StaticImageData;
  name: string;
  category: string;
  className?: string;
  small?: boolean;
  href?: string;
}) {
  const content = (
    <>
      <Image
        alt={name}
        className="h-full w-full scale-105 object-cover brightness-50 transition-transform duration-1000 group-hover:scale-100"
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
        src={image}
      />
      <div className={`absolute inset-0 flex flex-col justify-end ${small ? "p-8" : "p-10"}`}>
        <h3 className={`font-headline ${small ? "text-2xl mb-1" : "text-3xl mb-2"}`}>{name}</h3>
        <p className="font-label text-xs uppercase tracking-[0.1em] text-on-surface-variant">{category}</p>
      </div>
    </>
  );

  const cardClass = `group relative aspect-square overflow-hidden bg-surface-container ${className}`;

  if (href) {
    return (
      <Link className={cardClass} href={href}>
        {content}
      </Link>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

function TrustIcon({ index }: { index: number }) {
  const icons = [
    // Verified / shield
    <svg key="v" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Artisan / edit
    <svg key="a" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Investment / trending up
    <svg key="i" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}
