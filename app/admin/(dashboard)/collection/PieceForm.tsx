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
      <Section title="ข้อมูลพื้นฐาน">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={piece?.slug} label="ตัวระบุ URL" name="slug" placeholder="obsidian-radiant" required />
          <Field defaultValue={piece?.display_order ?? 0} label="ลำดับการแสดงผล" name="display_order" type="number" />
        </div>
      </Section>

      <Section title="รูปภาพ">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {imagePreview ? (
            <div className="relative h-40 w-40 shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900">
              <Image alt="ตัวอย่าง" className="object-cover" fill src={imagePreview} unoptimized />
            </div>
          ) : null}
          <div className="flex-1 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>อัปโหลดรูปภาพ (เว้นว่างหากต้องการใช้รูปเดิม)</span>
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
          label="คำอธิบายรูปภาพสำหรับการเข้าถึง"
              name="image_alt"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field defaultValue={piece?.source_label ?? ""} label="แหล่งที่มารูปภาพ — ชื่อ" name="source_label" placeholder="Pexels" />
              <Field defaultValue={piece?.source_url ?? ""} label="แหล่งที่มารูปภาพ — URL" name="source_url" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="เนื้อหาหลัก">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson(piece?.name)} label="ชื่อสินค้า" name="name" required />
          <Field defaultValue={fromLocalizedJson(piece?.line)} label="ไลน์สินค้า" name="line" />
        </div>
        <TextAreaField defaultValue={fromLocalizedJson(piece?.summary)} label="คำอธิบายโดยย่อ" name="summary" rows={4} />
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_2fr]">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>ราคาเริ่มต้น (บาท)</span>
            <input
              className={fieldClass}
              defaultValue={piece?.price_amount ?? ""}
              inputMode="decimal"
              min={0}
              name="price_amount"
              placeholder="660000"
              step="any"
              type="number"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>สกุลเงิน</span>
            <input className={`${fieldClass} text-neutral-500`} disabled value="บาท (THB)" />
            <input name="price_currency" type="hidden" value="THB" />
          </label>
          <Field defaultValue={fromLocalizedJson(piece?.price_note)} label="หมายเหตุราคา" name="price_note" />
        </div>
        <p className="text-xs text-neutral-500">
          ราคาที่แสดงต่อสาธารณะจะเติมคำนำหน้า “เริ่มต้น” ให้อัตโนมัติ — เพียงกรอกจำนวนเงินเป็นสกุลบาทที่นี่
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={piece?.rarity_index ?? ""} label="ดัชนีความหายาก (0–100)" name="rarity_index" type="number" />
          <Field defaultValue={fromLocalizedJson(piece?.origin)} label="แหล่งที่มา" name="origin" />
        </div>
        <Field defaultValue={(piece?.tags ?? []).join(", ")} label="แท็ก (คั่นด้วยเครื่องหมายจุลภาค)" name="tags" />
      </Section>

      <Section title="ใบรับรอง (ไม่บังคับ)">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>หน่วยงานผู้ออกใบรับรอง</span>
          <select className={fieldClass} defaultValue={certificate?.authority ?? "none"} name="certificate_authority">
            <option value="none">ไม่มี</option>
            <option value="GIA">GIA</option>
            <option value="IGI">IGI</option>
            <option value="Internal">ภายใน</option>
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={certificate?.reportNumber ?? ""} label="หมายเลขรายงาน" name="certificate_report_number" />
          <Field defaultValue={certificate?.reportType ?? ""} label="ประเภทรายงาน" name="certificate_report_type" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={certificate?.issueDate ?? ""} label="วันที่ออก" name="certificate_issue_date" placeholder="2024-01-01" />
          <Field defaultValue={certificate?.verifyUrl ?? ""} label="ลิงก์ตรวจสอบ" name="certificate_verify_url" />
        </div>
        <Field defaultValue={certificate?.pdfUrl ?? ""} label="ลิงก์ PDF ใบรับรอง (ไม่บังคับ)" name="certificate_pdf_url" />
      </Section>

      <Section title="ข้อมูลทางเทคนิค">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={"carat" in specs ? specs.carat : ""} label="กะรัต" name="specs_carat" />
          <Field defaultValue={"dimensions" in specs ? specs.dimensions : ""} label="ขนาด" name="specs_dimensions" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("cut" in specs ? specs.cut : undefined)} label="การเจียระไน" name="specs_cut" />
          <Field defaultValue={fromLocalizedJson("setting" in specs ? specs.setting : undefined)} label="ตัวเรือน" name="specs_setting" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("metal" in specs ? specs.metal : undefined)} label="โลหะ" name="specs_metal" />
          <Field defaultValue={fromLocalizedJson("origin" in specs ? specs.origin : undefined)} label="แหล่งที่มาตามข้อมูลทางเทคนิค" name="specs_origin" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={"certification" in specs ? specs.certification : ""} label="รหัสใบรับรอง" name="specs_certification" />
          <Field defaultValue={"hardness" in specs ? specs.hardness : ""} label="ความแข็ง" name="specs_hardness" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field defaultValue={fromLocalizedJson("luster" in specs ? specs.luster : undefined)} label="ความวาว" name="specs_luster" />
          <Field defaultValue={fromLocalizedJson("treatment" in specs ? specs.treatment : undefined)} label="การปรับปรุงคุณภาพ" name="specs_treatment" />
        </div>
      </Section>

      <Section title="การวิเคราะห์และการจัดหา">
        <TextAreaField
          defaultValue={fromLocalizedLines(piece?.analysis)}
          hint="แต่ละบรรทัดคือหนึ่งหัวข้อย่อย"
          label="การวิเคราะห์เชิงลึก (หนึ่งบรรทัดต่อหนึ่งประเด็น)"
          name="analysis"
          rows={4}
        />
        <TextAreaField
          defaultValue={fromLocalizedLines(piece?.acquisition)}
          hint="แต่ละบรรทัดคือหนึ่งหัวข้อย่อย"
          label="ขั้นตอนการจัดหา (หนึ่งบรรทัดต่อหนึ่งประเด็น)"
          name="acquisition"
          rows={4}
        />
      </Section>

      <Section title="รายละเอียดเพิ่มเติม">
        <TextAreaField defaultValue={fromLocalizedJson(piece?.inclusion_profile)} label="ลักษณะมลทิน" name="inclusion_profile" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.light_behavior)} label="ปฏิกิริยาต่อแสง" name="light_behavior" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.provenance)} label="ประวัติแหล่งที่มา" name="provenance" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.wearability)} label="การสวมใส่" name="wearability" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.care)} label="คำแนะนำการดูแลรักษา" name="care" />
        <TextAreaField defaultValue={fromLocalizedJson(piece?.investment_note)} label="หมายเหตุการลงทุน" name="investment_note" />
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
