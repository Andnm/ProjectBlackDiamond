import { Tooltip } from "@/components/admin/Tooltip";
import type { TranslationStatusValue } from "@/lib/translation/manual-edit";

// Labels are deliberately worded as different ACTIONS (not just "done" twice
// in different colors) — "done" and "manual_edited" both represent finished,
// usable text, but via a different path, and that distinction matters (one
// can be silently re-translated later, the other never will be).
const STATUS_META: Record<TranslationStatusValue, { label: string; className: string; hint: string }> = {
  done: {
    label: "แปลอัตโนมัติแล้ว",
    className: "bg-emerald-950/60 text-emerald-300",
    hint: "ระบบแปลอัตโนมัติสำเร็จ และตรงกับต้นฉบับภาษาไทยล่าสุด หากแก้ไขต้นฉบับภาษาไทยภายหลัง ข้อความนี้จะถูกแปลใหม่โดยอัตโนมัติ",
  },
  pending: {
    label: "รอคิวแปล",
    className: "bg-amber-950/60 text-amber-300",
    hint: "ยังไม่ได้แปล เพราะโควต้าเต็มตอนที่บันทึก — ระบบจะแปลอัตโนมัติเมื่อโควต้าเดือนถัดไปเปิดใหม่ หรือกด \"แปลตอนนี้\" เพื่อลองอีกครั้ง",
  },
  in_progress: {
    label: "กำลังแปล...",
    className: "bg-blue-950/60 text-blue-300",
    hint: "กำลังส่งข้อความนี้ไปแปล",
  },
  failed: {
    label: "แปลไม่สำเร็จ",
    className: "bg-red-950/60 text-red-300",
    hint: "เรียก API แปลไม่สำเร็จ (ดูข้อความผิดพลาดด้านล่าง) — กด \"แปลตอนนี้\" เพื่อลองใหม่",
  },
  manual_edited: {
    label: "แก้ไขโดยแอดมิน",
    className: "bg-purple-950/60 text-purple-300",
    hint: "แอดมินพิมพ์/แก้ไขข้อความนี้เอง — ถูกล็อกไว้ ระบบจะไม่แปลทับให้อัตโนมัติอีก แม้ต้นฉบับภาษาไทยจะเปลี่ยนภายหลังก็ตาม (ต้องกด \"แปลตอนนี้\" เองถ้าต้องการให้ระบบแปลทับ)",
  },
  untranslated: {
    label: "ยังไม่แปล",
    className: "bg-neutral-800 text-neutral-400",
    hint: "ยังไม่เคยพยายามแปลข้อความนี้เลย",
  },
};

export function StatusBadge({ status }: { status: TranslationStatusValue }) {
  const meta = STATUS_META[status];
  return (
    <Tooltip label={meta.hint}>
      <span
        className={`inline-flex cursor-help items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] ${meta.className}`}
      >
        {meta.label}
        <span aria-hidden className="text-[10px] opacity-70">
          ?
        </span>
      </span>
    </Tooltip>
  );
}
