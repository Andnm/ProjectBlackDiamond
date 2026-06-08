"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteBlogPost } from "./actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
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
        message={`Xoá bài viết "${title}"? Hành động này không thể hoàn tác.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          startTransition(async () => {
            await deleteBlogPost(id);
          });
        }}
        open={confirmOpen}
        pending={isPending}
        title="Xoá bài viết"
      />
    </>
  );
}
