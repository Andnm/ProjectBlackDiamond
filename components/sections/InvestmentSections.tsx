import Image from "next/image";
import Link from "next/link";
import { remoteImages } from "@/lib/assets";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function InvestmentSections({ dictionary, locale }: Props) {
  const d = dictionary.investment;

  return (
    <main className="pt-20">

      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Abstract obsidian texture — investment grade black diamonds"
            className="h-full w-full object-cover opacity-40"
            fill
            priority
            sizes="100vw"
            src={remoteImages.investmentHero}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="section-shell relative z-10 grid items-center gap-16 py-24 lg:grid-cols-2">
          <div className="space-y-8">
            <p className="eyebrow">{d.eyebrow}</p>
            <h1 className="font-headline text-6xl leading-[1.1] md:text-8xl">{d.title}</h1>
            <p className="max-w-xl text-lg font-light leading-relaxed text-on-surface-variant">
              {d.intro}
            </p>
            <div className="flex gap-4">
              <Link
                className="bg-gradient-to-r from-primary to-primary-container px-10 py-4 font-label text-xs uppercase tracking-[0.2em] text-on-primary transition hover:-translate-y-1"
                href={localizedPath(locale, "catalog")}
              >
                Request Portfolio
              </Link>
              <button
                className="border border-outline px-10 py-4 font-label text-xs uppercase tracking-[0.2em] text-on-background transition hover:bg-primary/5"
                type="button"
              >
                Market Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32">
        <div className="section-shell">
          <div className="mb-20 space-y-4">
            <h2 className="font-headline text-4xl">{d.performanceTitle}</h2>
            <div className="h-px w-24 bg-primary" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <div className="border-l border-primary bg-surface p-10 md:col-span-2 lg:col-span-2">
              <div className="mb-12 flex items-start justify-between">
                <div>
                  <span className="font-label text-xs uppercase tracking-widest text-outline">
                    {d.stats[0].label}
                  </span>
                  <h3 className="mt-2 font-headline text-4xl">
                    {d.stats[0].value}
                  </h3>
                </div>
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex h-48 items-end gap-2">
                {[20, 35, 55, 85, 65, 90].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full ${i === 3 ? "bg-primary" : "bg-surface-container-high"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="mt-6 font-label text-xs uppercase tracking-widest text-on-surface-variant">
                {d.stats[0].body}
              </p>
            </div>

            <div className="flex flex-col justify-between bg-surface-container-highest p-10">
              <svg className="mb-6 h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 9l10 13L22 9z" />
              </svg>
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {d.stats[1].label}
                </span>
                <h3 className="mt-2 font-headline text-3xl">{d.stats[1].value}</h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{d.stats[1].body}</p>
              </div>
            </div>

            <div className="border-t border-outline/50 bg-surface p-10">
              <span className="font-label text-xs uppercase tracking-widest text-outline">
                {d.stats[2].label}
              </span>
              <h3 className="mt-4 font-headline text-3xl text-primary">{d.stats[2].value}</h3>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{d.stats[2].body}</p>
            </div>

            <div className="relative h-[400px] overflow-hidden bg-surface md:col-span-3 lg:col-span-4">
              <Image
                alt="Secure luxury vault"
                className="h-full w-full object-cover grayscale opacity-50 transition-transform duration-700 hover:scale-105"
                fill
                sizes="100vw"
                src={remoteImages.vault}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 flex flex-col items-end justify-between gap-8 md:flex-row">
                <div className="max-w-xl">
                  <h4 className="mb-4 font-headline text-3xl">{d.vaultSectionTitle}</h4>
                  <p className="font-light text-sm text-on-surface-variant">{d.vaultSectionBody}</p>
                </div>
                <Link
                  className="bg-on-surface px-8 py-3 font-label text-xs uppercase tracking-[0.2em] text-background transition hover:opacity-90"
                  href={localizedPath(locale, "membership")}
                >
                  {d.vaultSectionBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-32">
        <div className="section-shell">
          <div className="grid items-center gap-24 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-6">{d.standardsEyebrow}</p>
              <h2 className="mb-8 font-headline text-4xl md:text-5xl">{d.standardsTitle}</h2>
              <p className="mb-12 text-lg font-light leading-relaxed text-on-surface-variant">
                {d.standardsBody}
              </p>
              <div className="space-y-10">
                {[
                  {
                    code: "GIA",
                    name: "Gemological Institute of America",
                    body: "The global authority on color, clarity, and provenance. Every GIA-certified black diamond comes with a digital laser inscription.",
                  },
                  {
                    code: "IGI",
                    name: "International Gemological Institute",
                    body: "Premier certification for fancy color diamonds and technical cut precision. Recognized by leading financial institutions.",
                  },
                ].map((inst) => (
                  <div className="group flex gap-8" key={inst.code}>
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-outline/30 bg-surface-container-high transition group-hover:border-primary">
                      <span className="font-headline text-xl text-primary">{inst.code}</span>
                    </div>
                    <div>
                      <h4 className="mb-2 font-label text-sm uppercase tracking-widest">{inst.name}</h4>
                      <p className="text-sm leading-relaxed text-on-surface-variant">{inst.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 z-0 border border-outline/20" />
              <div className="relative z-10 border border-outline/50 bg-surface-container-low p-8">
                <div className="mb-8 flex items-center justify-between border-b border-outline/30 pb-4">
                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-outline">
                    Certificate Sample #882109
                  </span>
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                </div>
                <div className="aspect-[3/4] flex flex-col bg-surface p-10">
                  <div className="mb-10 flex justify-center">
                    <div className="flex h-32 w-32 items-center justify-center border border-primary/30 bg-surface-container">
                      <span className="font-headline text-3xl text-primary">GIA</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-px w-full bg-outline/30" />
                    <CertRow label="Identity" value="Natural Black Diamond" />
                    <CertRow label="Weight" value="12.45 Carats" />
                    <CertRow label="Shape" value="Emerald Cut" />
                    <CertRow label="Polish" value="Excellent" />
                    <div className="pt-10">
                      <div className="h-12 w-full bg-outline/10 opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-32">
        <div className="section-shell text-center">
          <p className="eyebrow mb-6">{d.channelsEyebrow}</p>
          <h2 className="mb-16 font-headline text-4xl md:text-5xl">{d.channelsTitle}</h2>
          <div className="grid gap-px md:grid-cols-3">
            {d.channels.map((channel, i) => (
              <div
                className="border border-outline/10 bg-surface p-12 text-left transition duration-500 hover:bg-surface-container"
                key={channel.title}
              >
                <h5 className="mb-8 font-label text-xs uppercase tracking-widest text-primary">
                  {["Boutique Selection", "Institutional", "Bespoke"][i]}
                </h5>
                <h4 className="mb-6 font-headline text-2xl">{channel.title}</h4>
                <p className="mb-8 min-h-20 text-sm font-light leading-relaxed text-on-surface-variant">
                  {channel.body}
                </p>
                <Link
                  className="border-b border-primary pb-1 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface"
                  href={localizedPath(locale, "membership")}
                >
                  {dictionary.common.requestConsultation}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CertRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-label text-[10px] uppercase text-outline">{label}</span>
      <span className="font-label text-[10px] uppercase text-on-surface">{value}</span>
    </div>
  );
}
