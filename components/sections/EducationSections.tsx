import Image from "next/image";
import Link from "next/link";
import { remoteImages } from "@/lib/assets";
import { localizedPath, type Locale } from "@/i18n/routing";
import { type Dictionary } from "@/i18n/dictionaries";
import { PosterShowcase } from "@/components/PosterShowcase";
import { informationImages } from "@/lib/information-assets";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function EducationSections({ dictionary, locale }: Props) {
  const d = dictionary.education;

  return (
    <main className="pt-20">

      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-surface">
        <div className="absolute inset-0 opacity-40">
          <Image alt="" aria-hidden className="h-full w-full object-cover" fill priority sizes="100vw" src="/images/education-background.png" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="section-shell relative z-10 flex min-h-[90vh] flex-col justify-center py-32">
          <p className="eyebrow mb-6">{d.eyebrow}</p>
          <h1 className="mb-8 max-w-4xl font-headline text-6xl leading-[1.1] md:text-8xl">{d.title}</h1>
          <p className="max-w-2xl text-xl leading-relaxed text-on-surface-variant">{d.intro}</p>
          <div className="absolute bottom-12 right-0 hidden items-center gap-4 lg:flex">
            <span className="h-px w-12 bg-primary" />
            <span className="eyebrow opacity-50">Scroll to explore</span>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32">
        <div className="section-shell grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-8 font-headline text-4xl leading-tight md:text-5xl">{d.originTitle}</h2>
            <div className="space-y-6 text-lg leading-relaxed text-on-surface-variant">
              {d.originBody.map((p) => <p key={p}>{p}</p>)}
              <blockquote className="border-l-2 border-primary py-2 pl-6 italic">{d.originQuote}</blockquote>
            </div>
          </div>
          <div className="group relative h-[600px] lg:col-span-7">
            <Image
              alt="Deep space nebula"
              className="h-full w-full object-cover grayscale brightness-50 transition duration-700 group-hover:grayscale-0 group-hover:brightness-75"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              src={remoteImages.educationOrigin}
            />
            <div className="absolute -bottom-8 -left-8 max-w-sm border border-outline/10 bg-surface-container-highest p-8 shadow-2xl">
              <p className="eyebrow mb-2">{d.originEvidenceLabel}</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">{d.originEvidenceBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-32">
        <div className="section-shell">
          <div className="mb-24 text-center">
            <h2 className="mb-4 font-headline text-4xl md:text-5xl">{d.propertiesTitle}</h2>
            <p className="eyebrow opacity-60">The physical profile of a black diamond</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="border border-outline/5 bg-surface-container p-12 md:col-span-2">
              <DiamondIcon />
              <h3 className="mb-4 font-headline text-2xl">{d.properties[0].title}</h3>
              <p className="leading-relaxed text-on-surface-variant">{d.properties[0].body}</p>
            </div>
            <div className="flex flex-col justify-between border border-outline/5 bg-surface-container-high p-12">
              <div><TextureIcon /><h3 className="mb-4 font-headline text-2xl">{d.properties[1].title}</h3></div>
              <p className="text-sm leading-relaxed text-on-surface-variant">{d.properties[1].body}</p>
            </div>
            <div className="border border-outline/5 bg-surface-container-lowest p-12">
              <MoonIcon />
              <h3 className="mb-4 font-headline text-2xl">{d.properties[2].title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{d.properties[2].body}</p>
            </div>
            <div className="group relative h-80 overflow-hidden bg-surface-container-low md:col-span-3">
              <Image alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105" fill sizes="75vw" src={remoteImages.educationRarity} />
              <div className="relative z-10 flex h-full flex-col justify-end p-12">
                <h3 className="mb-2 font-headline text-3xl">{d.rarityCardTitle}</h3>
                <p className="max-w-xl text-on-surface-variant">{d.rarityCardBody}</p>
              </div>
            </div>
            <Link className="group flex cursor-pointer items-center justify-center bg-primary p-8 transition hover:bg-primary-container active:scale-95" href={localizedPath(locale, "catalog")}>
              <div className="text-center">
                <p className="mb-2 font-label text-xs uppercase tracking-widest text-on-primary">Investment</p>
                <p className="font-headline text-xl text-on-primary">{d.catalogCtaLabel}</p>
                <svg className="mx-auto mt-4 h-6 w-6 text-on-primary transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-highest py-20 md:py-32">
        <div className="section-shell">
          <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square">
                <Image alt={d.rawTitle} className="h-full w-full object-cover" fill sizes="(min-width: 768px) 50vw, 100vw" src="/images/the-raw-state.png" />
                <div className="absolute inset-0 border-[20px] border-surface-container-highest" />
              </div>
              <div className="mt-8">
                <p className="eyebrow mb-2">Nature&apos;s Brutalism</p>
                <h3 className="mb-4 font-headline text-2xl md:text-3xl">{d.rawTitle}</h3>
                <p className="leading-relaxed text-on-surface-variant">{d.rawBody}</p>
              </div>
            </div>
            <div className="w-full pt-0 md:w-1/2 md:pt-48">
              <div className="relative aspect-square">
                <Image alt={d.cutTitle} className="h-full w-full object-cover" fill sizes="(min-width: 768px) 50vw, 100vw" src="/images/the-cut-aesthetic.png" />
                <div className="absolute inset-0 border-[20px] border-surface-container-highest" />
              </div>
              <div className="mt-8">
                <p className="eyebrow mb-2">Human Precision</p>
                <h3 className="mb-4 font-headline text-2xl md:text-3xl">{d.cutTitle}</h3>
                <p className="leading-relaxed text-on-surface-variant">{d.cutBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-16">
            <p className="eyebrow mb-4">{d.geographyEyebrow}</p>
            <h2 className="font-headline text-4xl md:text-5xl">{d.geographyTitle}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {d.regions.map((region) => (
              <div className="border border-outline/10 bg-surface-container p-10" key={region.name}>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-2xl">{region.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-on-muted">{region.location}</p>
                  </div>
                  <div className="h-2 w-2 shrink-0 rotate-45 bg-primary mt-2" />
                </div>
                <p className="mb-8 text-sm leading-7 text-on-surface-variant">{region.body}</p>
                <div className="grid grid-cols-3 gap-px bg-outline/10">
                  {region.stats.map((stat) => (
                    <div className="bg-surface-container-low px-4 py-5" key={stat.label}>
                      <p className="font-headline text-xl text-primary">{stat.value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-on-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-4">
            <p className="eyebrow mb-4">{d.gradingEyebrow}</p>
            <h2 className="mb-6 font-headline text-4xl md:text-5xl">{d.gradingTitle}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">{d.gradingIntro}</p>
          </div>
          <div className="mt-16 grid gap-px bg-outline/10 sm:grid-cols-2">
            {d.gradingCriteria.map((criterion, i) => (
              <div className="bg-surface p-10 transition hover:bg-surface-container" key={criterion.title}>
                <span className="mb-6 block font-headline text-4xl text-primary/25">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-4 font-headline text-xl">{criterion.title}</h3>
                <p className="text-sm leading-7 text-on-surface-variant">{criterion.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-4">
            <p className="eyebrow mb-4">{d.cuttingEyebrow}</p>
            <h2 className="mb-6 font-headline text-4xl md:text-5xl">{d.cuttingTitle}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">{d.cuttingIntro}</p>
          </div>
          <div className="relative mt-16">
            <div className="absolute left-6 top-0 h-full w-px bg-outline/20 md:left-8" />
            <div className="space-y-0">
              {d.cuttingSteps.map((step, i) => (
                <div className="grid gap-6 border-b border-outline/10 py-10 pl-16 md:grid-cols-[12rem_1fr] md:gap-12 md:pl-20" key={step.step}>
                  <div className="absolute left-4 mt-1 flex h-5 w-5 items-center justify-center md:left-6">
                    <div className={`h-2 w-2 rotate-45 ${i === d.cuttingSteps.length - 1 ? "bg-primary" : "bg-outline/40"}`} />
                  </div>
                  <div>
                    <span className="font-headline text-4xl text-primary/30">{step.step}</span>
                    <h3 className="mt-2 font-headline text-xl">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-on-surface-variant">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline/10 bg-surface-container-lowest py-20 md:py-32">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline text-3xl md:text-4xl">{d.caratTitle}</h2>
              <p className="text-on-surface-variant">{d.caratBody}</p>
            </div>
            <div className="relative py-16 md:py-20">
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-outline/40" />
              <div className="absolute left-[15%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary md:left-1/4 md:h-4 md:w-4" />
              <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border-2 border-primary bg-surface shadow-lg md:h-8 md:w-8">
                <div className="h-1.5 w-1.5 bg-primary md:h-2 md:w-2" />
              </div>
              <div className="absolute left-[85%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-outline md:left-3/4 md:h-4 md:w-4" />
              <div className="mt-16 flex justify-between md:mt-20">
                <div className="flex-1 text-center">
                  <p className="eyebrow mb-1 opacity-60">Subtle</p>
                  <p className="font-headline text-base md:text-lg">1.0 ct</p>
                </div>
                <div className="flex-1 scale-105 text-center md:scale-110">
                  <p className="eyebrow mb-1">Impact</p>
                  <p className="font-headline text-lg text-primary md:text-xl">5.0 ct</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="eyebrow mb-1 opacity-60">Statement</p>
                  <p className="font-headline text-base md:text-lg">15.0+ ct</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="section-shell">
          <PosterShowcase
            alt={dictionary.posters.formationEyebrow}
            caption={dictionary.posters.formationCaption}
            eyebrow={dictionary.posters.formationEyebrow}
            image={informationImages.formation}
            variant="banner"
          />
        </div>
      </section>
    </main>
  );
}

function DiamondIcon() { return <svg className="mb-6 h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 9l10 13L22 9z" /></svg>; }
function TextureIcon() {
  return <svg className="mb-6 h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function MoonIcon() {
  return <svg className="mb-6 h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
