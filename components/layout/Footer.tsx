import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dictionary: Dictionary;
  locale: Locale;
};

export function Footer({ dictionary, locale }: Props) {
  const links = [
    { href: localizedPath(locale, "about"), label: dictionary.nav.story },
    { href: localizedPath(locale, "education"), label: dictionary.nav.education },
    { href: localizedPath(locale, "catalog"), label: dictionary.nav.catalog },
    { href: localizedPath(locale, "lifestyle"), label: dictionary.nav.lifestyle },
    { href: localizedPath(locale, "blog"), label: dictionary.nav.blog },
  ];

  return (
    <footer className="border-t border-outline/30 bg-surface-low py-16">
      <div className="section-shell grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <Link className="font-headline text-3xl text-primary" href={localizedPath(locale)}>
            {dictionary.brand.name}
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-on-muted">{dictionary.brand.tagline}</p>
        </section>
        <section>
          <h2 className="eyebrow mb-6">{dictionary.footer.quickLinks}</h2>
          <ul className="space-y-3 text-sm text-on-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-primary" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="eyebrow mb-6">{dictionary.footer.support}</h2>
          <ul className="space-y-3 text-sm text-on-muted">
            <li>
              <a className="transition hover:text-primary" href={`mailto:${dictionary.common.email}`}>
                {dictionary.common.email}
              </a>
            </li>
            <li>
              <a className="transition hover:text-primary" href="tel:+6621234567">
                {dictionary.common.phone}
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="eyebrow mb-6">{dictionary.footer.newsletter}</h2>
          <p className="mb-6 text-sm leading-7 text-on-muted">{dictionary.footer.newsletterCopy}</p>
          <form className="flex border-b border-outline/70" action="/api/newsletter">
            <input
              aria-label={dictionary.common.newsletterPlaceholder}
              className="w-full bg-transparent py-3 text-sm text-on-surface outline-none placeholder:text-on-muted"
              name="email"
              placeholder={dictionary.common.newsletterPlaceholder}
              type="email"
            />
            <button className="px-3 text-primary" type="submit" aria-label={dictionary.common.requestConsultation}>
              ส่ง
            </button>
          </form>
        </section>
      </div>
      <div className="section-shell mt-12 border-t border-outline/20 pt-8 text-xs uppercase tracking-[0.18em] text-on-muted">
        {dictionary.footer.copyright}
      </div>
    </footer>
  );
}
