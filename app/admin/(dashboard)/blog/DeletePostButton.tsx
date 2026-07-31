"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Tooltip } from "@/components/admin/Tooltip";
import { TrashIcon } from "@/components/admin/icons";
import { Spinner } from "@/components/admin/Spinner";
import { deleteBlogPost } from "./actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Tooltip label={isPending ? "กำลังลบ…" : "ลบ"}>
        <button
          aria-label="ลบ"
          className="inline-flex h-9 w-9 items-center justify-center border border-neutral-700 text-neutral-400 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
          disabled={isPending}
          onClick={() => setConfirmOpen(true)}
          type="button"
        >
          {isPending ? <Spinner /> : <TrashIcon />}
        </button>
      </Tooltip>

      <ConfirmDialog
        message={`ลบบทความ "${title}"? การกระทำนี้ไม่สามารถย้อนกลับได้`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          startTransition(async () => {
            await deleteBlogPost(id);
          });
        }}
        open={confirmOpen}
        pending={isPending}
        title="ลบบทความ"
      />
    </>
  );
}
