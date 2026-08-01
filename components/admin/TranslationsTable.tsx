"use client";

import { useState, useTransition } from "react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Spinner } from "@/components/admin/Spinner";
import { Modal } from "@/components/admin/Modal";
import { saveManualTranslationAction, retranslateCellsAction } from "@/app/admin/(dashboard)/translations-actions";
import type { ContentType } from "@/lib/translation/fields";
import type { TargetLocale, TranslationCell } from "@/lib/translation/manual-edit";
import { LOCALE_LABELS } from "@/lib/translation/field-labels";

const TARGET_LOCALES: TargetLocale[] = ["vi", "lo", "zh", "en"];

const fieldClass =
  "w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-400";

type Props = {
  contentType: ContentType;
  contentId: string;
  cells: TranslationCell[];
  fieldLabels: Record<string, string>;
};

function cellKey(fieldName: string, locale: string): string {
  return `${fieldName}:${locale}`;
}

export function TranslationsTable({ contentType, contentId, cells, fieldLabels }: Props) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [retranslating, startRetranslate] = useTransition();
  const [retranslatingKey, setRetranslatingKey] = useState<string | null>(null);
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});

  const byField = new Map<string, Map<string, TranslationCell>>();
  for (const cell of cells) {
    if (!byField.has(cell.fieldName)) byField.set(cell.fieldName, new Map());
    byField.get(cell.fieldName)!.set(cell.locale, cell);
  }
  const fieldNames = [...byField.keys()];

  const activeCell = activeKey ? cells.find((c) => cellKey(c.fieldName, c.locale) === activeKey) ?? null : null;

  function valueFor(cell: TranslationCell): string {
    const key = cellKey(cell.fieldName, cell.locale);
    return draft[key] ?? cell.value;
  }

  async function handleSave(cell: TranslationCell) {
    const key = cellKey(cell.fieldName, cell.locale);
    setSavingKey(key);
    setErrorByKey((prev) => ({ ...prev, [key]: "" }));
    const result = await saveManualTranslationAction(contentType, contentId, cell.fieldName, cell.locale, valueFor(cell));
    setSavingKey(null);
    if (result.error) {
      setErrorByKey((prev) => ({ ...prev, [key]: result.error! }));
    } else {
      setActiveKey(null);
    }
  }

  function handleRetranslate(targets: { fieldName: string; locale: TargetLocale }[], key: string) {
    setRetranslatingKey(key);
    startRetranslate(async () => {
      const result = await retranslateCellsAction(contentType, contentId, targets);
      setRetranslatingKey(null);
      if (result.error) {
        setErrorByKey((prev) => {
          const next = { ...prev };
          for (const t of targets) next[cellKey(t.fieldName, t.locale)] = result.error!;
          return next;
        });
      } else if (key !== "__all__") {
        setActiveKey(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          กดสถานะเพื่อเปิดหน้าต่างดูและแก้ไขคำแปล — ข้อความที่ทำเครื่องหมาย “แก้ไขโดยแอดมิน” จะไม่ถูกแปลทับให้อัตโนมัติอีก
        </p>
        <button
          className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400 disabled:opacity-50"
          disabled={retranslating}
          onClick={() =>
            handleRetranslate(
              // Excludes manual_edited cells on purpose — "translate all" is a
              // broad sweep, not a deliberate per-cell override, so it must
              // never silently clobber an admin's hand-corrected text. The
              // per-cell "translate now" button inside a cell's own modal is
              // the deliberate, scoped action that's allowed to override it.
              cells.filter((c) => c.status !== "manual_edited").map((c) => ({ fieldName: c.fieldName, locale: c.locale })),
              "__all__",
            )
          }
          type="button"
        >
          {retranslating && retranslatingKey === "__all__" ? (
            <>
              <Spinner /> กำลังแปลทั้งหมด…
            </>
          ) : (
            "แปลใหม่ทั้งหมด (ไม่ทับที่แก้ไขเอง)"
          )}
        </button>
      </div>

      <div className="overflow-x-auto border border-neutral-800">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-left text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
              <th className="px-4 py-3">ฟิลด์</th>
              {TARGET_LOCALES.map((locale) => (
                <th className="px-4 py-3" key={locale}>
                  {LOCALE_LABELS[locale]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fieldNames.map((fieldName) => {
              const rowCells = byField.get(fieldName)!;
              return (
                <tr className="border-b border-neutral-900 align-top last:border-0" key={fieldName}>
                  <td className="px-4 py-3 font-medium text-white">{fieldLabels[fieldName] ?? fieldName}</td>
                  {TARGET_LOCALES.map((locale) => {
                    const cell = rowCells.get(locale);
                    if (!cell) return <td className="px-4 py-3 text-neutral-600" key={locale}>—</td>;
                    return (
                      <td className="px-4 py-3" key={locale}>
                        <button
                          className="focus-ring"
                          onClick={() => setActiveKey(cellKey(fieldName, locale))}
                          type="button"
                        >
                          <StatusBadge status={cell.status} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        onClose={() => setActiveKey(null)}
        open={activeCell !== null}
        title={activeCell ? `${fieldLabels[activeCell.fieldName] ?? activeCell.fieldName} — ${LOCALE_LABELS[activeCell.locale]}` : ""}
      >
        {activeCell ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={activeCell.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                  ต้นฉบับ (ภาษาไทย)
                </span>
                <div className={`${fieldClass} min-h-[8rem] cursor-text whitespace-pre-wrap text-neutral-400`}>
                  {activeCell.sourceValue || "—"}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                  คำแปล ({LOCALE_LABELS[activeCell.locale]})
                </span>
                <textarea
                  className={fieldClass}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, [cellKey(activeCell.fieldName, activeCell.locale)]: event.target.value }))
                  }
                  rows={activeCell.fieldKind === "html" ? 10 : 6}
                  value={valueFor(activeCell)}
                />
              </div>
            </div>

            {activeCell.errorMessage ? <p className="text-xs text-red-400">{activeCell.errorMessage}</p> : null}
            {errorByKey[cellKey(activeCell.fieldName, activeCell.locale)] ? (
              <p className="text-xs text-red-400">{errorByKey[cellKey(activeCell.fieldName, activeCell.locale)]}</p>
            ) : null}

            <div className="flex gap-2">
              <button
                className="border border-amber-400 bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-amber-300 disabled:opacity-50"
                disabled={savingKey === cellKey(activeCell.fieldName, activeCell.locale)}
                onClick={() => handleSave(activeCell)}
                type="button"
              >
                {savingKey === cellKey(activeCell.fieldName, activeCell.locale) ? <Spinner /> : "บันทึก"}
              </button>
              <button
                className="border border-neutral-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400 disabled:opacity-50"
                disabled={retranslating}
                onClick={() =>
                  handleRetranslate(
                    [{ fieldName: activeCell.fieldName, locale: activeCell.locale }],
                    cellKey(activeCell.fieldName, activeCell.locale),
                  )
                }
                type="button"
              >
                {retranslating && retranslatingKey === cellKey(activeCell.fieldName, activeCell.locale) ? (
                  <Spinner />
                ) : (
                  "แปลตอนนี้"
                )}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
