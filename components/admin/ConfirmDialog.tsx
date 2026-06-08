"use client";

import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Styled confirmation modal used in place of the browser's native
 * `window.confirm`, which renders with the OS locale/font and looks out of
 * place inside the admin UI.
 */
export function ConfirmDialog({
  open,
  title = "Xác nhận",
  message,
  confirmLabel = "Xoá",
  cancelLabel = "Huỷ",
  danger = true,
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onCancel}
      role="alertdialog"
    >
      <div
        className="w-full max-w-sm border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-headline text-xl text-white">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-300">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="border border-neutral-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 transition hover:border-neutral-500 hover:text-white disabled:opacity-50"
            disabled={pending}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition disabled:opacity-50 ${
              danger
                ? "bg-red-500/90 text-white hover:bg-red-500"
                : "bg-amber-400 text-neutral-950 hover:bg-amber-300"
            }`}
            disabled={pending}
            onClick={onConfirm}
            type="button"
          >
            {pending ? "Đang xử lý…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
