import Image from "next/image";
import Link from "next/link";
import { PosterShowcase } from "@/components/PosterShowcase";
import { getInformationImages } from "@/lib/information-assets";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function LifestyleSections({ dictionary, locale }: Props) {
  const d = dictionary.lifestyle;
  const informationImages = getInformationImages(locale);
  /** The four wide lifestyle banners, in dictionary order. */
  const BANNERS = [
    informationImages.eliteLifestyle,
    informationImages.performance,
    informationImages.fineJewelry,
    informationImages.hauteHorlogerie,
  ] as const;

  return (
    <main>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/lifestyle-background.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="section-shell relative z-10 py-32">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">{d.eyebrow}</p>
            <h1 className="mb-8 font-headline text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
              {d.titleHead} <span className="italic text-primary">{d.titleTail}</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">{d.intro}</p>
          </div>
        </div>

        <div className="absolute bottom-12 right-0 hidden items-center gap-4 lg:flex">
          <span className="h-px w-12 bg-primary" />
          <span className="eyebrow opacity-50">{d.scrollHint}</span>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell max-w-3xl text-center">
          <p className="eyebrow mb-4">{d.worldsEyebrow}</p>
          <h2 className="mb-8 font-headline text-4xl md:text-5xl">{d.worldsTitle}</h2>
          <p className="text-lg leading-relaxed text-on-surface-variant">{d.worldsIntro}</p>
          <div className="mx-auto mt-10 h-2 w-2 rotate-45 bg-primary" />
        </div>
      </section>

      {BANNERS.map((image, index) => {
        const item = d.items[index];
        const isOdd = index % 2 === 1;
        const number = String(index + 1).padStart(2, "0");
        return (
          <section
            className={index % 2 === 0 ? "bg-surface-low py-24 md:py-32" : "bg-surface py-24 md:py-32"}
            key={item.title}
          >
            <div className="section-shell">
              <div className="mb-12 grid items-end gap-8 md:grid-cols-12">
                <div className={`md:col-span-7 ${isOdd ? "md:order-2 md:text-right" : ""}`}>
                  <div className={`mb-4 flex items-center gap-5 ${isOdd ? "md:justify-end" : ""}`}>
                    <span className="font-headline text-6xl text-primary/25 md:text-7xl">{number}</span>
                    <span className="h-px w-16 bg-primary/40" />
                    <span className="font-label text-[11px] uppercase tracking-[0.22em] text-primary">{item.tag}</span>
                  </div>
                  <h3 className="font-headline text-3xl leading-tight md:text-5xl">{item.title}</h3>
                </div>
                <div className={`md:col-span-5 ${isOdd ? "md:order-1" : ""}`}>
                  <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">{item.body}</p>
                </div>
              </div>

              <PosterShowcase alt={item.title} image={image} priority={index === 0} variant="banner" />
            </div>
          </section>
        );
      })}

      <section className="relative overflow-hidden border-t border-outline/10">
        <div className="absolute inset-0">
          <Image
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-30"
            fill
            sizes="100vw"
            src="/images/lifestyle-background.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/70" />
        </div>
        <div className="section-shell relative z-10 flex flex-col items-center gap-8 py-28 text-center">
          <h2 className="max-w-2xl font-headline text-3xl md:text-5xl">{d.ctaTitle}</h2>
          <p className="max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">{d.ctaBody}</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Link
              className="bg-primary px-10 py-4 text-xs font-label uppercase tracking-[0.2em] text-on-primary transition hover:bg-primary-container"
              href={localizedPath(locale, "catalog")}
            >
              {dictionary.common.viewCatalog}
            </Link>
            <Link
              className="border border-outline px-10 py-4 text-xs font-label uppercase tracking-[0.2em] text-on-surface transition hover:bg-primary/10"
              href={localizedPath(locale, "membership")}
            >
              {dictionary.common.joinMembership}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
