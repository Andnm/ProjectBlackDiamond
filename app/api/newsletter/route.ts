import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "A valid email is required." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Newsletter request received.",
  });
}
