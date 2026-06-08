"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import type { PieceFormState } from "./actions";
import type { CollectionPieceRow } from "@/lib/admin/types";
import { fromLocalizedJson, fromLocalizedLines } from "@/lib/admin/form-utils";
import { Spinner } from "@/components/admin/Spinner";

type Props = {
  piece?: CollectionPieceRow;
  action: (state: PieceFormState, formData: FormData) => Promise<PieceFormState>;
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

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 3,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      <textarea className={fieldClass} defaultValue={defaultValue} name={name} rows={rows} />
      {hint ? <span className="text-xs text-neutral-500">{hint}</span> : null}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 border border-neutral-800 p-5">
      <legend className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{title}</legend>
      {children}
    </fieldset>
  );
}

export function PieceForm({ piece, action, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState<PieceFormState, FormData>(action, null);
  const [imagePreview, setImagePreview] = useState<string | null>(piece?.image_url ?? null);
  const certificate = piece?.certificate ?? null;
  const specs = piece?.specs ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Section title="Thông tin cơ bản">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={piece?.slug} label="Slug (URL định danh)" name="slug" placeholder="obsidian-radiant" required />
          <Field defaultValue={piece?.display_order ?? 0} label="Thứ tự hiển thị" name="display_order" type="number" />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-neutral-300">
          <input defaultChecked={piece?.published ?? true} name="published" type="checkbox" />
          Hiển thị công khai (published)
        </label>
      </Section>

      <Section title="Hình ảnh">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {imagePreview ? (
            <div className="relative h-40 w-40 shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900">
              <Image alt="Xem trước" className="object-cover" fill src={imagePreview} unoptimized />
            </div>
          ) : null}
          <div className="flex-1 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Tải ảnh lên (để trống nếu giữ ảnh hiện tại)</span>
              <input
                accept="image/*"
                className="text-sm text-neutral-300"
                name="image"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
                type="file"
              />
            </label>
            <input name="existing_image_url" type="hidden" value={piece?.image_url ?? ""} />
            <Field
              defaultValue={fromLocalizedJson(piece?.image_alt)}
              label="Mô tả ảnh (alt text)"
              name="image_alt"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field defaultValue={piece?.source_label ?? ""} label="Nguồn ảnh — tên" name="source_label" placeholder="Pexels" />
              <Field defaultValue={piece?.source_url ?? ""} label="Nguồn ảnh — URL" name="source_url" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Nội dung chính">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson(piece?.name)} label="Tên sản phẩm" name="name" required />
          <Field defaultValue={fromLocalizedJson(piece?.line)} label="Dòng sản phẩm" name="line" />
        </div>
        <TextAreaField defaultValue={fromLocalizedJson(piece?.summary)} label="Mô tả tóm tắt" name="summary" rows={4} />
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_2fr]">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Giá khởi điểm</span>
            <input
              className={fieldClass}
              defaultValue={piece?.price_amount ?? ""}
              inputMode="decimal"
              min={0}
              name="price_amount"
              placeholder="18400"
              step="any"
              type="number"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Đơn vị tiền tệ</span>
            <select className={fieldClass} defaultValue={piece?.price_currency ?? "USD"} name="price_currency">
              <option value="USD">USD ($)</option>
              <option value="VND">VND (VNĐ)</option>
            </select>
          </label>
          <Field defaultValue={fromLocalizedJson(piece?.price_note)} label="Ghi chú giá" name="price_note" />
        </div>
        <p className="text-xs text-neutral-500">
          Giá hiển thị công khai sẽ tự động ghép tiền tố “Từ”/“From” theo ngôn ngữ — chỉ cần nhập số tiền và chọn đơn vị
          tệ ở đây.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={piece?.rarity_index ?? ""} label="Chỉ số hiếm (0–100)" name="rarity_index" type="number" />
          <Field defaultValue={fromLocalizedJson(piece?.origin)} label="Xuất xứ" name="origin" />
        </div>
        <Field defaultValue={(piece?.tags ?? []).join(", ")} label="Tags (phân cách bằng dấu phẩy)" name="tags" />
      </Section>

      <Section title="Chứng nhận (tuỳ chọn)">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Đơn vị cấp chứng nhận</span>
          <select className={fieldClass} defaultValue={certificate?.authority ?? "none"} name="certificate_authority">
            <option value="none">Không có</option>
            <option value="GIA">GIA</option>
            <option value="IGI">IGI</option>
            <option value="Internal">Internal</option>
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={certificate?.reportNumber ?? ""} label="Số báo cáo" name="certificate_report_number" />
          <Field defaultValue={certificate?.reportType ?? ""} label="Loại báo cáo" name="certificate_report_type" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={certificate?.issueDate ?? ""} label="Ngày cấp" name="certificate_issue_date" placeholder="2024-01-01" />
          <Field defaultValue={certificate?.verifyUrl ?? ""} label="Link xác thực" name="certificate_verify_url" />
        </div>
        <Field defaultValue={certificate?.pdfUrl ?? ""} label="Link PDF chứng nhận (tuỳ chọn)" name="certificate_pdf_url" />
      </Section>

      <Section title="Thông số kỹ thuật (specs)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={"carat" in specs ? specs.carat : ""} label="Carat" name="specs_carat" />
          <Field defaultValue={"dimensions" in specs ? specs.dimensions : ""} label="Kích thước" name="specs_dimensions" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("cut" in specs ? specs.cut : undefined)} label="Giác cắt (cut)" name="specs_cut" />
          <Field defaultValue={fromLocalizedJson("setting" in specs ? specs.setting : undefined)} label="Ổ đá (setting)" name="specs_setting" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("metal" in specs ? specs.metal : undefined)} label="Kim loại" name="specs_metal" />
          <Field defaultValue={fromLocalizedJson("origin" in specs ? specs.origin : undefined)} label="Xuất xứ (specs)" name="specs_origin" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={"certification" in specs ? specs.certification : ""} label="Chứng nhận (mã)" name="specs_certification" />
          <Field defaultValue={"hardness" in specs ? specs.hardness : ""} label="Độ cứng" name="specs_hardness" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("luster" in specs ? specs.luster : undefined)} label="Độ bóng (luster)" name="specs_luster" />
          <Field defaultValue={fromLocalizedJson("treatment" in specs ? specs.treatment : undefined)} label="Xử lý (treatment)" name="specs_treatment" />
        </div>
      </Section>

      <Section title="Phân tích &amp; Thu mua">
        <TextAreaField
          defaultValue={fromLocalizedLines(piece?.analysis)}
          hint="Mỗi dòng là một gạch đầu dòng."
          label="Phân tích chuyên sâu (mỗi dòng 1 ý)"
          name="analysis"
          rows={4}
        />
        <TextAreaField
          defaultValue={fromLocalizedLines(piece?.acquisition)}
          hint="Mỗi dòng là một gạch đầu dòng."
          label="Quy trình thu mua (mỗi dòng 1 ý)"
          name="acquisition"
          rows={4}
        />
      </Section>

      <Section title="Mô tả chi tiết">
        <TextAreaField defaultValue={fromLocalizedJson(piece?.inclusion_profile)} label="Đặc điểm tạp chất (inclusion profile)" name="inclusion_profile" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.light_behavior)} label="Phản ứng ánh sáng" name="light_behavior" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.provenance)} label="Nguồn gốc xuất xứ (provenance)" name="provenance" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.wearability)} label="Khả năng đeo" name="wearability" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.care)} label="Hướng dẫn bảo quản" name="care" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.investment_note)} label="Ghi chú đầu tư" name="investment_note" />
      </Section>

      {state?.error ? (
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">{state.error}</p>
      ) : null}

      <div className="flex items-center gap-4">
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
