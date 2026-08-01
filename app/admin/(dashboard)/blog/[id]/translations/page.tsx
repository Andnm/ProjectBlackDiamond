import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/admin/blog-queries";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { getTranslationMatrix } from "@/lib/translation/manual-edit";
import { BLOG_FIELD_LABELS } from "@/lib/translation/field-labels";
import { TranslationsTable } from "@/components/admin/TranslationsTable";
import { HelpPopover } from "@/components/admin/HelpPopover";
import { TranslationsHelpContent } from "@/components/admin/TranslationsHelpContent";

type Props = { params: Promise<{ id: string }> };

export default async function BlogTranslationsPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  const cells = await getTranslationMatrix("blog_post", id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400"
          href="/admin/blog"
        >
          ← กลับไปยังรายการ
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <h1 className="font-headline text-3xl text-white">
            คำแปล: {fromLocalizedJson(post.title) || post.slug}
          </h1>
          <HelpPopover>
            <TranslationsHelpContent />
          </HelpPopover>
        </div>
      </div>

      <TranslationsTable cells={cells} contentId={id} contentType="blog_post" fieldLabels={BLOG_FIELD_LABELS} />
    </div>
  );
}
