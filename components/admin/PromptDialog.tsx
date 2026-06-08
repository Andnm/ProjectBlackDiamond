"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
};

/**
 * Styled single-input modal used in place of the browser's native
 * `window.prompt` (e.g. for inserting links/images in the rich-text editor),
 * which renders with the OS locale/font and breaks the admin's visual style.
 */
export function PromptDialog({
  open,
  title,
  label,
  placeholder,
  defaultValue = "",
  confirmLabel = "Chèn",
  cancelLabel = "Huỷ",
  onConfirm,
  onCancel,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (open) setValue(defaultValue);
  }, [open, defaultValue]);

  if (!open) return null;

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed) onConfirm(trimmed);
  };

  // Rendered as a plain <div> (not <form>) and portaled to document.body:
  // this dialog is mounted from inside the rich-text editor's toolbar, which
  // itself lives inside the post's <form>. A nested <form> there is invalid
  // HTML and triggers a React hydration error, so we emulate form submission
  // (Enter to confirm) without an actual <form> element.
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
    >
      <div
        className="w-full max-w-sm border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onCancel();
          } else if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
        }}
      >
        <h2 className="font-headline text-xl text-white">{title}</h2>
        <label className="mt-4 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
          {label}
        </label>
        <input
          autoFocus
          className="mt-2 w-full border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 outline-none transition focus:border-amber-400"
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          type="text"
          value={value}
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="border border-neutral-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 transition hover:border-neutral-500 hover:text-white"
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className="bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-950 transition hover:bg-amber-300 disabled:opacity-50"
            disabled={!value.trim()}
            onClick={submit}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
