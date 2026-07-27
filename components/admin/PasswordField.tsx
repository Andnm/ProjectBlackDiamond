"use client";

import { useId, useState } from "react";

type Props = {
  id?: string;
  name: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
};

const EyeIcon = () => (
  <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24" width="18">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} viewBox="0 0 24 24" width="18">
    <path d="M3 3l18 18" />
    <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
    <path d="M9.88 5.09A9.4 9.4 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-3.06 4.06M6.1 6.1A17.5 17.5 0 0 0 2 12s3.5 7 10 7a9.5 9.5 0 0 0 4.06-.9" />
  </svg>
);

export function PasswordField({ id, name, label, autoComplete, required, defaultValue }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400" htmlFor={inputId}>
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete={autoComplete}
          className="w-full border border-neutral-700 bg-neutral-900 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-amber-400"
          defaultValue={defaultValue}
          id={inputId}
          name={name}
          required={required}
          type={visible ? "text" : "password"}
        />
        <button
          aria-label={visible ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-neutral-400 transition hover:text-amber-400"
          onClick={() => setVisible((current) => !current)}
          tabIndex={-1}
          type="button"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}
