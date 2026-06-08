"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { PromptDialog } from "@/components/admin/PromptDialog";

type Props = {
  name: string;
  defaultValue?: string;
};

const toolbarButtonClass =
  "border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400 disabled:opacity-40 data-[active=true]:border-amber-400 data-[active=true]:text-amber-400";

/**
 * WYSIWYG rich-text editor (Tiptap) that persists its content as sanitized
 * HTML into a hidden <input> so it submits naturally with the surrounding
 * <form action={serverAction}>.
 */
export function RichTextEditor({ name, defaultValue = "" }: Props) {
  const [activePrompt, setActivePrompt] = useState<"link" | "image" | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base max-w-none min-h-[280px] border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 outline-none focus:border-amber-400",
      },
    },
  });

  // Keep a hidden input in sync so the form submits the latest HTML.
  useEffect(() => {
    if (!editor) return;
    const input = document.getElementById(`${name}__hidden`) as HTMLInputElement | null;
    if (input) input.value = editor.getHTML();

    const handleUpdate = () => {
      if (input) input.value = editor.getHTML();
    };
    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, name]);

  if (!editor) {
    return <div className="min-h-[280px] border border-neutral-700 bg-neutral-900" />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
        >
          Đậm
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
        >
          Nghiêng
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          type="button"
        >
          Tiêu đề H2
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          type="button"
        >
          Tiêu đề H3
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
        >
          Danh sách
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type="button"
        >
          Trích dẫn
        </button>
        <button
          className={toolbarButtonClass}
          onClick={() => setActivePrompt("link")}
          type="button"
        >
          Liên kết
        </button>
        <button
          className={toolbarButtonClass}
          onClick={() => setActivePrompt("image")}
          type="button"
        >
          Chèn ảnh
        </button>
        <button className={toolbarButtonClass} onClick={() => editor.chain().focus().undo().run()} type="button">
          Hoàn tác
        </button>
        <button className={toolbarButtonClass} onClick={() => editor.chain().focus().redo().run()} type="button">
          Làm lại
        </button>
      </div>

      <EditorContent editor={editor} />
      <input defaultValue={defaultValue} id={`${name}__hidden`} name={name} type="hidden" />

      <PromptDialog
        confirmLabel="Chèn liên kết"
        label="URL liên kết"
        onCancel={() => setActivePrompt(null)}
        onConfirm={(url) => {
          setActivePrompt(null);
          editor.chain().focus().setLink({ href: url }).run();
        }}
        open={activePrompt === "link"}
        placeholder="https://..."
        title="Chèn liên kết"
      />
      <PromptDialog
        confirmLabel="Chèn ảnh"
        label="URL hình ảnh"
        onCancel={() => setActivePrompt(null)}
        onConfirm={(url) => {
          setActivePrompt(null);
          editor.chain().focus().setImage({ src: url }).run();
        }}
        open={activePrompt === "image"}
        placeholder="https://..."
        title="Chèn hình ảnh"
      />
    </div>
  );
}
