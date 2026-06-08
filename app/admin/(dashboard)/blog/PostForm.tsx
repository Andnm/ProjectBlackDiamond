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
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Thông tin bài viết</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={post?.slug} label="Slug (URL định danh)" name="slug" placeholder="cosmic-origin-theory" required />
          <Field defaultValue={fromLocalizedJson(post?.category)} label="Chuyên mục" name="category" placeholder="Khoa học" />
        </div>

        <Field defaultValue={fromLocalizedJson(post?.title)} label="Tiêu đề" name="title" required />
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Mô tả ngắn (excerpt)</span>
          <textarea className={fieldClass} defaultValue={fromLocalizedJson(post?.excerpt)} name="excerpt" rows={3} />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field defaultValue={post?.date ?? ""} label="Ngày đăng" name="date" type="date" />
          <Field defaultValue={post?.read_minutes ?? 5} label="Thời gian đọc (phút)" name="read_minutes" type="number" />
          <Field defaultValue={(post?.tags ?? []).join(", ")} label="Tags (phân cách bằng dấu phẩy)" name="tags" />
        </div>

        <label className="flex items-center gap-2.5 text-sm text-neutral-300">
          <input defaultChecked={post?.published ?? true} name="published" type="checkbox" />
          Xuất bản công khai (published)
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border border-neutral-800 p-5">
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Ảnh bìa</legend>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {coverPreview ? (
            <div className="relative h-40 w-full max-w-xs shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900 sm:w-64">
              <Image alt="Xem trước ảnh bìa" className="object-cover" fill src={coverPreview} unoptimized />
            </div>
          ) : null}
          <div className="flex-1">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Tải ảnh bìa lên (để trống nếu giữ ảnh hiện tại)</span>
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
        <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Nội dung bài viết</legend>
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
              <Spinner /> Đang lưu…
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
