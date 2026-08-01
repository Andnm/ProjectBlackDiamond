"use client";

import { useActionState } from "react";
import { submitMembershipApplication } from "@/app/actions/public-forms";
import { publicFormInitialState } from "@/lib/public-form-state";
import { Spinner } from "@/components/admin/Spinner";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  nameLabel: string;
  emailLabel: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
};

export function MembershipForm({ locale, nameLabel, emailLabel, submitLabel, successMessage, errorMessage }: Props) {
  const action = submitMembershipApplication.bind(null, locale, errorMessage);
  const [state, formAction, isPending] = useActionState(action, publicFormInitialState);

  if (state.status === "success") {
    return <p className="py-12 text-center text-lg text-primary">{successMessage}</p>;
  }

  return (
    <form action={formAction} className="space-y-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative">
          <label className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
            {nameLabel}
          </label>
          <input
            className="w-full border-b border-outline/50 bg-transparent py-4 text-sm transition-colors focus:border-primary focus:outline-none placeholder:text-surface-container-highest"
            name="name"
            placeholder="ณัฐพล วรรณสิริ"
            required
            type="text"
          />
        </div>
        <div className="relative">
          <label className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
            {emailLabel}
          </label>
          <input
            className="w-full border-b border-outline/50 bg-transparent py-4 text-sm transition-colors focus:border-primary focus:outline-none placeholder:text-surface-container-highest"
            name="email"
            placeholder="NATTAPON@ARCHIVE.CO"
            required
            type="email"
          />
        </div>
      </div>

      {state.status === "error" ? <p className="text-sm text-red-400">{state.message}</p> : null}

      <div className="pt-8">
        <button
          className="w-full bg-gradient-to-r from-primary to-primary-container py-5 font-label text-sm uppercase tracking-[0.25em] text-on-primary transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Spinner /> {submitLabel}
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
