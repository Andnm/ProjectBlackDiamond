import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { defaultBrandLogo } from "@/lib/brand-assets";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { logout } from "@/app/admin/actions";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The proxy already gates /admin/*, but pages are also guarded here in case
  // they are ever rendered without going through the middleware
  // (defense in depth — /admin/login lives outside this route group).
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-col gap-8 border-b border-neutral-800 px-6 py-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
          <div>
            <Image alt="BlackDiamond" className="h-8 w-auto" src={defaultBrandLogo} />
            <p className="mt-2 font-headline text-xl text-white">ผู้ดูแลระบบ</p>
          </div>

          <AdminSidebarNav />

          <div className="mt-auto flex flex-col gap-3 border-t border-neutral-800 pt-6">
            <p className="truncate text-xs text-neutral-500" title={user.email ?? undefined}>
              {user.email}
            </p>
            <form action={logout}>
              <button
                className="w-full border border-neutral-700 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 transition hover:border-red-500 hover:text-red-400"
                type="submit"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8 lg:px-12 lg:py-12">{children}</main>
      </div>
    </div>
  );
}
