import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionPieceById } from "@/lib/admin/collection-queries";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { PieceForm } from "../../PieceForm";
import { updateCollectionPiece } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditCollectionPiecePage({ params }: Props) {
  const { id } = await params;
  const piece = await getCollectionPieceById(id);
  if (!piece) notFound();

  const updateWithId = updateCollectionPiece.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400" href="/admin/collection">
          ← กลับไปยังรายการ
        </Link>
        <h1 className="mt-3 font-headline text-3xl text-white">แก้ไข: {fromLocalizedJson(piece.name) || piece.slug}</h1>
      </div>

      <PieceForm action={updateWithId} piece={piece} submitLabel="บันทึกการเปลี่ยนแปลง" />
    </div>
  );
}
