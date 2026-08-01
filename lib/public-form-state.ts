export type PublicFormState = { status: "idle" | "success" | "error"; message?: string };

export const publicFormInitialState: PublicFormState = { status: "idle" };
