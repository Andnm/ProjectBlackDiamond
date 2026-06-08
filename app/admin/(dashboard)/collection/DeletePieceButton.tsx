"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteCollectionPiece } from "./actions";

export function DeletePieceButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <button
        className="border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-400 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
        disabled={isPending}
        onClick={() => setConfirmOpen(true)}
        type="button"
      >
        {isPending ? "Đang xoá…" : "Xoá"}
      </button>

      <ConfirmDialog
        message={`Xoá sản phẩm "${name}"? Hành động này không thể hoàn tác.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          startTransition(async () => {
            await deleteCollectionPiece(id);
          });
        }}
        open={confirmOpen}
        pending={isPending}
        title="Xoá sản phẩm"
      />
    </>
  );
}
