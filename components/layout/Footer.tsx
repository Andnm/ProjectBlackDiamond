import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";
import { getBrandLogo } from "@/lib/brand-assets";
import { NewsletterForm } from "@/components/NewsletterForm";

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
          <Link className="focus-ring inline-flex items-center" href={localizedPath(locale)}>
            <Image alt={dictionary.brand.name} className="h-12 w-auto" src={getBrandLogo(locale)} />
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
          <NewsletterForm
            ariaLabel={dictionary.common.newsletterPlaceholder}
            errorMessage={dictionary.common.genericError}
            locale={locale}
            placeholder={dictionary.common.newsletterPlaceholder}
            submitLabel={dictionary.common.send}
            successMessage={dictionary.common.thankYou}
          />
        </section>
      </div>
      <div className="section-shell mt-12 border-t border-outline/20 pt-8 text-xs uppercase tracking-[0.18em] text-on-muted">
        {dictionary.footer.copyright}
      </div>
    </footer>
  );
}
