import Link from "next/link";
import { PieceForm } from "../PieceForm";
import { createCollectionPiece } from "../actions";

export default function NewCollectionPiecePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400" href="/admin/collection">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-3 font-headline text-3xl text-white">Thêm sản phẩm mới</h1>
      </div>

      <PieceForm action={createCollectionPiece} submitLabel="Tạo sản phẩm" />
    </div>
  );
}
