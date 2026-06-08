"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { PasswordField } from "@/components/admin/PasswordField";
import { Spinner } from "@/components/admin/Spinner";

const initialState: LoginState = null;

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>

      <PasswordField autoComplete="current-password" id="password" label="Mật khẩu" name="password" required />

      {state?.error ? (
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">{state.error}</p>
      ) : null}

      <button
        className="mt-2 bg-amber-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-amber-300 disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <span className="inline-flex items-center gap-2">
            <Spinner /> Đang đăng nhập…
          </span>
        ) : (
          "Đăng nhập"
        )}
      </button>
    </form>
  );
}
