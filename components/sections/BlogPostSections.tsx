import Link from "next/link";
import { formatDate, type BlogPost } from "@/lib/blog";
import { localizedPath, type Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  post: BlogPost;
  locale: Locale;
  dictionary: Dictionary;
};

export function BlogPostSections({ post, locale, dictionary }: Props) {
  const d = dictionary.blog;

  return (
    <main className="pt-20">

      <section className="border-b border-outline/10 bg-surface py-20 md:py-28">
        <div className="section-shell">
          <Link
            className="mb-10 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted transition hover:text-primary"
            href={localizedPath(locale, "blog")}
          >
            <span className="h-px w-5 bg-current" />
            {d.eyebrow}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="eyebrow">{post.category[locale]}</span>
            <span className="text-on-muted">·</span>
            <span className="text-xs text-on-muted">{formatDate(post.date, locale)}</span>
            <span className="text-on-muted">·</span>
            <span className="text-xs text-on-muted">{post.readMinutes} {d.minRead}</span>
          </div>

          <h1 className="mb-8 max-w-4xl font-headline text-4xl leading-tight md:text-6xl">
            {post.title[locale]}
          </h1>

          <p className="max-w-3xl border-l-2 border-primary pl-6 text-xl leading-9 text-on-surface-variant">
            {post.excerpt[locale]}
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="section-shell">
          <div
            className="prose prose-lg mx-auto max-w-3xl text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-a:text-primary prose-img:my-10"
            dangerouslySetInnerHTML={{ __html: post.body[locale] ?? "" }}
          />
        </div>
      </section>

      <section className="border-t border-outline/10 bg-surface py-12">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="border border-outline/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-on-muted"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-20">
        <div className="section-shell text-center">
          <Link
            className="inline-flex items-center gap-4 border border-primary/40 px-10 py-4 font-label text-sm uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary"
            href={localizedPath(locale, "blog")}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M7 16l-4-4 4-4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {d.eyebrow}
          </Link>
        </div>
      </section>
    </main>
  );
}
