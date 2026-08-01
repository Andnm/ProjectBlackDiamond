"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions/public-forms";
import { publicFormInitialState } from "@/lib/public-form-state";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  placeholder: string;
  submitLabel: string;
  ariaLabel: string;
  successMessage: string;
  errorMessage: string;
};

export function NewsletterForm({ locale, placeholder, submitLabel, ariaLabel, successMessage, errorMessage }: Props) {
  const action = subscribeNewsletter.bind(null, locale, errorMessage);
  const [state, formAction, isPending] = useActionState(action, publicFormInitialState);

  if (state.status === "success") {
    return <p className="border-b border-outline/70 py-3 text-sm text-primary">{successMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <form action={formAction} className="flex border-b border-outline/70">
        <input
          aria-label={ariaLabel}
          className="w-full bg-transparent py-3 text-sm text-on-surface outline-none placeholder:text-on-muted"
          name="email"
          placeholder={placeholder}
          required
          type="email"
        />
        <button className="px-3 text-primary disabled:opacity-60" disabled={isPending} type="submit">
          {submitLabel}
        </button>
      </form>
      {state.status === "error" ? <p className="text-xs text-red-400">{state.message}</p> : null}
    </div>
  );
}
