import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "ภาพรวม" },
  { href: "/admin/collection", label: "คอลเลกชัน" },
  { href: "/admin/blog", label: "บทความ" },
];

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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">BlackDiamond</p>
            <p className="mt-1 font-headline text-xl text-white">ผู้ดูแลระบบ</p>
          </div>

          <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
            {navItems.map((item) => (
              <Link
                className="border border-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 transition hover:border-neutral-700 hover:text-amber-400"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
