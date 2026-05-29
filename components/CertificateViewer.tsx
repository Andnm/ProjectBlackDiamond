"use client";

import { useState } from "react";
import type { Certificate } from "@/lib/collection";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  certificate: Certificate;
  dictionary: Dictionary;
};

const AUTHORITY_META: Record<
  Certificate["authority"],
  { color: string; bg: string; logo: string; fullName: string }
> = {
  GIA: {
    color: "#e9c176",
    bg: "rgba(233,193,118,0.08)",
    logo: "GIA",
    fullName: "Gemological Institute of America",
  },
  IGI: {
    color: "#c6c6c7",
    bg: "rgba(198,198,199,0.08)",
    logo: "IGI",
    fullName: "International Gemological Institute",
  },
  Internal: {
    color: "#9a8f80",
    bg: "rgba(154,143,128,0.08)",
    logo: "BDX",
    fullName: "BlackDiamond Internal Grading",
  },
};

export function CertificateViewer({ certificate, dictionary }: Props) {
  const [expanded, setExpanded] = useState(false);
  const d = dictionary.catalog;
  const meta = AUTHORITY_META[certificate.authority];

  const rows: [string, string][] = [
    [d.detailCertAuthority, `${certificate.authority} — ${meta.fullName}`],
    [d.detailCertNumber, certificate.reportNumber],
    [d.detailCertType, certificate.reportType],
    [d.detailCertDate, new Date(certificate.issueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })],
  ];

  return (
    <div className="border border-outline/25 bg-surface">
      {/* Header — always visible */}
      <button
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-7 py-5 text-left transition hover:bg-surface-container"
        onClick={() => setExpanded((v) => !v)}
        type="button"
      >
        <div className="flex items-center gap-5">
          {/* Authority badge */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center text-[10px] font-bold"
            style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}30` }}
          >
            {meta.logo}
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-muted">
              {d.detailCertificate}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-on-surface">
              {certificate.authority} · {certificate.reportNumber}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-outline/30 transition duration-300"
          style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div className="border-t border-outline/20 px-7 py-6">
          {/* Data rows */}
          <dl className="mb-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {rows.map(([label, value]) => (
              <div className="border-b border-outline/15 pb-4" key={label}>
                <dt className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-muted">
                  {label}
                </dt>
                <dd className="text-sm font-semibold text-on-surface">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Verification note */}
          <p className="mb-6 flex items-start gap-3 text-xs leading-6 text-on-muted">
            <span
              className="mt-0.5 h-1.5 w-1.5 shrink-0 rotate-45"
              style={{ background: meta.color }}
            />
            {d.detailCertNote}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-on-primary transition hover:opacity-90"
              href={certificate.verifyUrl}
              rel="noopener noreferrer"
              style={{ background: meta.color, color: "#1a1000" }}
              target="_blank"
            >
              {/* External link icon */}
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d.detailCertVerify}
            </a>

            {certificate.pdfUrl && (
              <a
                className="inline-flex items-center gap-2.5 border border-outline/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-on-surface transition hover:border-primary"
                href={certificate.pdfUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* Document icon */}
                <svg className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
                {d.detailCertView}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Placeholder shown when no cert exists ─────────────── */
export function NoCertificatePlaceholder({ dictionary }: { dictionary: Dictionary }) {
  const d = dictionary.catalog;
  return (
    <div className="flex items-start gap-5 border border-outline/20 bg-surface p-6">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-outline/30 text-[10px] font-bold text-on-muted">
        —
      </span>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-on-muted">
          {d.detailCertificate}
        </p>
        <p className="text-sm leading-7 text-on-muted">{d.detailCertNone}</p>
      </div>
    </div>
  );
}
