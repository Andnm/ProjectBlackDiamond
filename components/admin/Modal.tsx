"use client";

import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * Portal-based modal (rendered directly under document.body, like
 * ConfirmDialog) so opening/closing it doesn't fight with a parent
 * component's own re-renders — an earlier inline-expand-in-place version
 * of the translation editor caused a `removeChild` DOM error when a
 * revalidatePath-triggered refresh landed while a row was expanded.
 */
export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <h2 className="font-headline text-lg text-white">{title}</h2>
          <button
            aria-label="ปิด"
            className="text-neutral-500 transition hover:text-white"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
