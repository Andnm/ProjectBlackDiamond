"use server";

import { createPublicClient } from "@/lib/supabase/public";
import type { PublicFormState } from "@/lib/public-form-state";

export async function submitMembershipApplication(
  locale: string,
  errorMessage: string,
  _prevState: PublicFormState,
  formData: FormData,
): Promise<PublicFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email.includes("@")) {
    return { status: "error", message: errorMessage };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("membership_applications").insert({ name, email, locale });
  if (error) return { status: "error", message: errorMessage };

  return { status: "success" };
}

export async function subscribeNewsletter(
  locale: string,
  errorMessage: string,
  _prevState: PublicFormState,
  formData: FormData,
): Promise<PublicFormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email.includes("@")) {
    return { status: "error", message: errorMessage };
  }

  const supabase = createPublicClient();
  // Duplicate email (unique constraint) is treated as a quiet success —
  // the visitor is already subscribed, no need to surface that as an error.
  const { error } = await supabase.from("newsletter_subscribers").insert({ email, locale });
  if (error && error.code !== "23505") return { status: "error", message: errorMessage };

  return { status: "success" };
}
