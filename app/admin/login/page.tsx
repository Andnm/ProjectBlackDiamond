import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị | BlackDiamond",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm border border-neutral-800 bg-neutral-900/40 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">BlackDiamond</p>
        <h1 className="mt-2 font-headline text-2xl text-white">Khu vực quản trị</h1>
        <p className="mt-1 text-sm text-neutral-400">Đăng nhập để quản lý bộ sưu tập &amp; blog.</p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
