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
          ตัวหนา
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
        >
          ตัวเอียง
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          type="button"
        >
          หัวข้อ H2
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          type="button"
        >
          หัวข้อ H3
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
        >
          รายการ
        </button>
        <button
          className={toolbarButtonClass}
          data-active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type="button"
        >
          คำพูดอ้างอิง
        </button>
        <button
          className={toolbarButtonClass}
          onClick={() => setActivePrompt("link")}
          type="button"
        >
          ลิงก์
        </button>
        <button
          className={toolbarButtonClass}
          onClick={() => setActivePrompt("image")}
          type="button"
        >
          แทรกรูปภาพ
        </button>
        <button className={toolbarButtonClass} onClick={() => editor.chain().focus().undo().run()} type="button">
          ย้อนกลับ
        </button>
        <button className={toolbarButtonClass} onClick={() => editor.chain().focus().redo().run()} type="button">
          ทำซ้ำ
        </button>
      </div>

      <EditorContent editor={editor} />
      <input defaultValue={defaultValue} id={`${name}__hidden`} name={name} type="hidden" />

      <PromptDialog
        confirmLabel="แทรกลิงก์"
        label="URL ลิงก์"
        onCancel={() => setActivePrompt(null)}
        onConfirm={(url) => {
          setActivePrompt(null);
          editor.chain().focus().setLink({ href: url }).run();
        }}
        open={activePrompt === "link"}
        placeholder="https://..."
        title="แทรกลิงก์"
      />
      <PromptDialog
        confirmLabel="แทรกรูปภาพ"
        label="URL รูปภาพ"
        onCancel={() => setActivePrompt(null)}
        onConfirm={(url) => {
          setActivePrompt(null);
          editor.chain().focus().setImage({ src: url }).run();
        }}
        open={activePrompt === "image"}
        placeholder="https://..."
        title="แทรกรูปภาพ"
      />
    </div>
  );
}
