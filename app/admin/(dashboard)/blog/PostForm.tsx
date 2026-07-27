"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { Spinner } from "@/components/admin/Spinner";
import type { BlogPostRow } from "@/lib/admin/types";
import { RichTextEditor } from "./RichTextEditor";
import type { PostFormState } from "./actions";

type Props = {
  post?: BlogPostRow;
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  submitLabel: string;
};

const fieldClass =
  "w-full border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-amber-400";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-neutral-400";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      <input
        className={fieldClass}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function PostForm({ post, action, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState<PostFormState, FormData>(action, null);
  const [coverPreview, setCoverPreview] = useState<string | null>(post?.cover_image_url ?? null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-4 border border-neutral-800 p-5">
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">ข้อมูลบทความ</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={post?.slug} label="ตัวระบุ URL" name="slug" placeholder="cosmic-origin-theory" required />
          <Field defaultValue={fromLocalizedJson(post?.category)} label="หมวดหมู่" name="category" placeholder="วิทยาศาสตร์" />
        </div>

        <Field defaultValue={fromLocalizedJson(post?.title)} label="หัวข้อ" name="title" required />
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>คำอธิบายโดยย่อ</span>
          <textarea className={fieldClass} defaultValue={fromLocalizedJson(post?.excerpt)} name="excerpt" rows={3} />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field defaultValue={post?.date ?? ""} label="วันที่เผยแพร่" name="date" type="date" />
          <Field defaultValue={post?.read_minutes ?? 5} label="เวลาในการอ่าน (นาที)" name="read_minutes" type="number" />
          <Field defaultValue={(post?.tags ?? []).join(", ")} label="แท็ก (คั่นด้วยเครื่องหมายจุลภาค)" name="tags" />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border border-neutral-800 p-5">
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">ภาพปก</legend>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {coverPreview ? (
            <div className="relative h-40 w-full max-w-xs shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900 sm:w-64">
              <Image alt="ตัวอย่างภาพปก" className="object-cover" fill src={coverPreview} unoptimized />
            </div>
          ) : null}
          <div className="flex-1">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>อัปโหลดภาพปก (เว้นว่างหากต้องการใช้รูปเดิม)</span>
              <input
                accept="image/*"
                className="text-sm text-neutral-300"
                name="cover_image"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) setCoverPreview(URL.createObjectURL(file));
                }}
                type="file"
              />
            </label>
            <input name="existing_cover_image_url" type="hidden" value={post?.cover_image_url ?? ""} />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border border-neutral-800 p-5">
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">เนื้อหาบทความ</legend>
        <RichTextEditor defaultValue={fromLocalizedJson(post?.body)} name="body" />
      </fieldset>

      {state?.error ? (
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">{state.error}</p>
      ) : null}

      <div>
        <button
          className="bg-amber-400 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-amber-300 disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Spinner /> กำลังบันทึก…
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
