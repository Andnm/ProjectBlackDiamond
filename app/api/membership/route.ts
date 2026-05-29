import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !email.includes("@")) {
    return NextResponse.json({ message: "Name and valid email are required." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Membership application received.",
  });
}
