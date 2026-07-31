"use client";

import { useState, useTransition } from "react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Spinner } from "@/components/admin/Spinner";
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
  const [expanded, setExpanded] = useState<string | null>(null);
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
    if (result.error) setErrorByKey((prev) => ({ ...prev, [key]: result.error! }));
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
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          กดสถานะเพื่อดูและแก้ไขคำแปล — ข้อความที่ทำเครื่องหมาย “แก้ไขเอง” จะไม่ถูกแปลทับให้อัตโนมัติอีก
        </p>
        <button
          className="inline-flex items-center gap-2 border border-neutral-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400 disabled:opacity-50"
          disabled={retranslating}
          onClick={() =>
            handleRetranslate(
              fieldNames.flatMap((fieldName) => TARGET_LOCALES.map((locale) => ({ fieldName, locale }))),
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
            "แปลใหม่ทั้งหมด"
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
                    const key = cellKey(fieldName, locale);
                    const isExpanded = expanded === key;
                    return (
                      <td className="px-4 py-3" key={locale}>
                        <button
                          className="focus-ring"
                          onClick={() => setExpanded(isExpanded ? null : key)}
                          type="button"
                        >
                          <StatusBadge status={cell.status} />
                        </button>

                        {isExpanded ? (
                          <div className="mt-3 flex w-64 flex-col gap-2">
                            <textarea
                              className={fieldClass}
                              onChange={(event) => setDraft((prev) => ({ ...prev, [key]: event.target.value }))}
                              rows={cell.fieldKind === "html" ? 8 : 4}
                              value={valueFor(cell)}
                            />
                            {cell.errorMessage ? (
                              <p className="text-xs text-red-400">{cell.errorMessage}</p>
                            ) : null}
                            {errorByKey[key] ? <p className="text-xs text-red-400">{errorByKey[key]}</p> : null}
                            <div className="flex gap-2">
                              <button
                                className="border border-amber-400 bg-amber-400 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neutral-950 transition hover:bg-amber-300 disabled:opacity-50"
                                disabled={savingKey === key}
                                onClick={() => handleSave(cell)}
                                type="button"
                              >
                                {savingKey === key ? <Spinner /> : "บันทึก"}
                              </button>
                              <button
                                className="border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400 disabled:opacity-50"
                                disabled={retranslating}
                                onClick={() => handleRetranslate([{ fieldName, locale }], key)}
                                type="button"
                              >
                                {retranslating && retranslatingKey === key ? <Spinner /> : "แปลตอนนี้"}
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
