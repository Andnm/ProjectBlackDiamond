import Image from "next/image";
import Link from "next/link";
import { remoteImages } from "@/lib/assets";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";
import storyBg from "@/assets/images/background/story_background.png";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function AboutSections({ dictionary, locale }: Props) {
  const d = dictionary.about;
  const trust = dictionary.home.trustItems;

  return (
    <main className="pt-20">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <Image
          alt={d.heroTitle}
          className="absolute inset-0 -z-10 object-cover opacity-55"
          fill
          priority
          sizes="100vw"
          src={storyBg}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="section-shell w-full py-24">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">{d.eyebrow}</p>
            <h1 className="mb-8 font-headline text-6xl leading-[1.1] md:text-8xl">{d.heroTitle}</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-on-surface-variant">{d.heroCopy}</p>
          </div>
        </div>
      </section>

      {/* ── Brand Statistics ─────────────────────────────── */}
      <section className="bg-surface-container-lowest py-20">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-px bg-outline/10 md:grid-cols-4">
            {d.statsItems.map((stat) => (
              <div className="bg-surface-container px-8 py-10 text-center" key={stat.label}>
                <p className="font-headline text-5xl text-primary">{stat.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Narrative ──────────────────────────────── */}
      <section className="bg-surface py-24 md:py-40">
        <div className="section-shell">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-24">
            {/* Image */}
            <div className="relative order-2 aspect-[3/4] bg-surface-container-low lg:order-1 lg:col-span-5">
              <Image
                alt={d.heroTitle}
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
            {/* Text */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <h2 className="mb-10 font-headline text-4xl leading-tight md:text-5xl lg:text-6xl">
                {d.narrativeTitle}
              </h2>
              <div className="max-w-xl space-y-8">
                {d.narrativeBody.map((paragraph) => (
                  <p className="text-lg leading-relaxed text-on-surface-variant" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto ────────────────────────────────────── */}
      <section className="bg-surface-container py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-8">{d.manifestoTitle}</p>
            <blockquote className="font-headline text-3xl leading-relaxed text-on-surface md:text-4xl">
              &ldquo;{d.manifesto}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow mb-4">{d.processEyebrow}</p>
              <h2 className="font-headline text-4xl md:text-5xl">{d.processTitle}</h2>
            </div>
          </div>
          <div className="grid gap-px bg-outline/10 sm:grid-cols-2 lg:grid-cols-4">
            {d.processSteps.map((step) => (
              <div className="bg-surface p-8 transition hover:bg-surface-container" key={step.step}>
                <span className="mb-6 block font-headline text-5xl text-primary/30">{step.step}</span>
                <h3 className="mb-4 font-headline text-xl">{step.title}</h3>
                <p className="text-sm leading-7 text-on-surface-variant">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust pillars ────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="section-shell border-y border-outline/10 py-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {trust.map((item, i) => (
              <div className="flex flex-col gap-4" key={item.title}>
                <TrustIcon index={i} />
                <h4 className="font-headline text-2xl">{item.title}</h4>
                <p className="text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-24">
        <div className="section-shell text-center">
          <Link
            className="inline-flex items-center gap-4 border border-primary/40 px-12 py-5 font-label text-sm uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary"
            href={localizedPath(locale, "catalog")}
          >
            {d.ctaLabel}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

function TrustIcon({ index }: { index: number }) {
  const icons = [
    <svg key="v" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="a" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="i" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}
