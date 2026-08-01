import Image from "next/image";
import { remoteImages } from "@/lib/assets";
import type { Dictionary } from "@/i18n/dictionaries";
import { PosterShowcase } from "@/components/PosterShowcase";
import { getInformationImages } from "@/lib/information-assets";
import { MembershipForm } from "@/components/MembershipForm";
import type { Locale } from "@/i18n/routing";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function MembershipSections({ dictionary, locale }: Props) {
  const d = dictionary.membership;
  const informationImages = getInformationImages(locale);

  return (
    <main>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
        <div className="section-shell grid grid-cols-12 items-center gap-8">
          <div className="z-10 col-span-12 lg:col-span-7">
            <p className="eyebrow mb-6">{d.eyebrow}</p>
            <h1 className="mb-8 font-headline text-6xl leading-[1.1] md:text-8xl">
              {d.heroTitleLine1}
              <br />
              <span className="text-outline">{d.heroTitleLine2}</span>
            </h1>
            <p className="mb-12 max-w-lg text-lg leading-relaxed text-on-surface-variant">
              {d.intro}
            </p>
            <div className="flex items-center gap-12 border-t border-outline/20 pt-12">
              {d.heroStats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-headline text-3xl mb-1">{stat.value}</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 relative lg:col-span-5">
            <div className="group relative aspect-[4/5] overflow-hidden bg-surface-container-high">
              <Image
                alt={d.title}
                className="h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                src={remoteImages.membership}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden w-48 border border-primary/20 bg-primary/10 p-6 backdrop-blur-xl md:block">
              <span className="mb-4 block font-label text-[10px] tracking-widest">
                {d.heroInfoLabel}
              </span>
              <p className="text-xs leading-relaxed text-on-surface-variant">{d.heroInfoBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-headline text-4xl">{d.requestTitle}</h2>
            <p className="text-on-surface-variant">{d.requestBody}</p>
          </div>
          <MembershipForm
            emailLabel={d.form.email}
            errorMessage={dictionary.common.genericError}
            locale={locale}
            nameLabel={d.form.name}
            submitLabel={d.form.submit}
            successMessage={dictionary.common.thankYou}
          />
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24 md:py-32">
        <div className="section-shell grid gap-16 md:grid-cols-2">
          <PosterShowcase
            alt={dictionary.posters.occasionEyebrow}
            caption={dictionary.posters.occasionCaption}
            eyebrow={dictionary.posters.occasionEyebrow}
            image={informationImages.occasion}
            variant="portrait"
          />
          <PosterShowcase
            alt={dictionary.posters.companionEyebrow}
            caption={dictionary.posters.companionCaption}
            eyebrow={dictionary.posters.companionEyebrow}
            image={informationImages.companion}
            variant="portrait"
          />
        </div>
      </section>

      <section className="bg-surface py-32">
        <div className="section-shell">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <p className="eyebrow mb-6">{d.bespokeEyebrow}</p>
              <h2 className="font-headline text-4xl md:text-5xl">{d.bespokeTitle}</h2>
              <p className="mt-6 text-on-surface-variant">{d.bespokeBody}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="border border-outline/50 px-8 py-3 font-label text-[10px] uppercase tracking-widest transition hover:bg-on-background/5"
                type="button"
              >
                {d.retailTab}
              </button>
              <button
                className="bg-surface-container-highest px-8 py-3 font-label text-[10px] uppercase tracking-widest"
                type="button"
              >
                {d.wholesaleTab}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-px border border-outline/20 bg-outline/20">
            <div className="col-span-12 bg-surface p-10 md:p-16 lg:col-span-8">
              <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                <div className="space-y-12">
                  <div>
                    <label className="mb-6 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      {d.sizeLabel}
                    </label>
                    <div className="relative pt-6">
                      <div className="h-px w-full bg-outline/50" />
                      <div className="absolute left-1/4 top-[23px] -mt-2 h-4 w-4 border-4 border-surface bg-primary" />
                      <div className="mt-6 flex justify-between font-label text-[10px] tracking-tighter text-outline">
                        <span>0.5ct</span>
                        <span className="font-bold text-primary">{d.sizeSelectedLabel}</span>
                        <span>15.0ct+</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-6 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      {d.shadeLabel}
                    </label>
                    <div className="flex gap-4">
                      {(["#050505", "#1a1a1a", "#2d2d2d"] as const).map((color, i) => (
                        <button
                          key={color}
                          className={`h-12 w-12 p-1 ${i === 0 ? "border border-primary" : "border border-transparent"}`}
                          style={{ background: color }}
                          type="button"
                        >
                          <div className="h-full w-full" style={{ background: color }} />
                        </button>
                      ))}
                    </div>
                    <span className="mt-3 block font-body text-[10px] italic text-outline">
                      {d.shadeName}
                    </span>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <label className="mb-4 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      {d.cutLabel}
                    </label>
                    <select className="w-full appearance-none border-b border-outline/50 bg-transparent py-4 text-sm focus:outline-none">
                      {d.cutOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-4 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      {d.quantityLabel}
                    </label>
                    <input
                      className="w-full border-b border-outline/50 bg-transparent py-4 text-sm placeholder:text-surface-container-highest focus:outline-none"
                      defaultValue="1"
                      min={1}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <button className="group flex items-center gap-4 text-primary" type="button">
                  <span className="font-label text-xs tracking-[0.3em]">{d.quotationBtn}</span>
                  <div className="h-px w-12 bg-primary transition-all group-hover:w-20" />
                </button>
              </div>
            </div>

            <div className="col-span-12 flex flex-col justify-between bg-surface-container-low p-10 md:p-16 lg:col-span-4">
              <div>
                <h3 className="mb-6 font-headline text-2xl">{d.contactTitle}</h3>
                <div className="mb-12 flex items-center gap-6">
                  <div className="h-20 w-20 shrink-0 overflow-hidden border border-outline/30 grayscale">
                    <Image
                      alt={d.conciergeAlt}
                      className="h-full w-full object-cover"
                      height={80}
                      src={remoteImages.concierge}
                      width={80}
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold">BlackDiamond</span>
                    <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                      {d.conciergeRole}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-xs leading-relaxed text-on-surface-variant">{d.contactBody}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t border-outline/10 pt-12">
                <span className="mb-4 block font-label text-[10px] uppercase tracking-widest text-outline">
                  {d.contactTitle}
                </span>
                <p className="mb-1 text-sm">{dictionary.common.email}</p>
                <p className="text-sm">{dictionary.common.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
