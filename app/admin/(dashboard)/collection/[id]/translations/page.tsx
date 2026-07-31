import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionPieceById } from "@/lib/admin/collection-queries";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { getTranslationMatrix } from "@/lib/translation/manual-edit";
import { COLLECTION_FIELD_LABELS } from "@/lib/translation/field-labels";
import { TranslationsTable } from "@/components/admin/TranslationsTable";

type Props = { params: Promise<{ id: string }> };

export default async function CollectionTranslationsPage({ params }: Props) {
  const { id } = await params;
  const piece = await getCollectionPieceById(id);
  if (!piece) notFound();

  const cells = await getTranslationMatrix("collection_piece", id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400"
          href={`/admin/collection/${id}/edit`}
        >
          ← กลับไปแก้ไขสินค้า
        </Link>
        <h1 className="mt-3 font-headline text-3xl text-white">
          คำแปล: {fromLocalizedJson(piece.name) || piece.slug}
        </h1>
      </div>

      <TranslationsTable cells={cells} contentId={id} contentType="collection_piece" fieldLabels={COLLECTION_FIELD_LABELS} />
    </div>
  );
}
