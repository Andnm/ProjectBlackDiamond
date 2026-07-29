import type { Metadata } from "next";
import Image from "next/image";
import { defaultBrandLogo } from "@/lib/brand-assets";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบผู้ดูแล | BlackDiamond",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm border border-neutral-800 bg-neutral-900/40 p-8">
        <Image alt="BlackDiamond" className="h-9 w-auto" src={defaultBrandLogo} />
        <h1 className="mt-4 font-headline text-2xl text-white">พื้นที่ผู้ดูแลระบบ</h1>
        <p className="mt-1 text-sm text-neutral-400">เข้าสู่ระบบเพื่อจัดการคอลเลกชันและบทความ</p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
