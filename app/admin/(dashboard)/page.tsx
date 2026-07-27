import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: collectionCount },
    { count: blogCount },
    { count: publishedBlogCount },
  ] = await Promise.all([
    supabase
      .from("collection_pieces")
      .select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
  ]);

  const cards = [
    {
      label: "สินค้าในคอลเลกชัน",
      value: collectionCount ?? 0,
      href: "/admin/collection",
      cta: "จัดการคอลเลกชัน",
    },
    {
      label: "บทความบล็อก",
      value: blogCount ?? 0,
      href: "/admin/blog",
      cta: "จัดการบทความ",
    },
    {
      label: "บทความที่เผยแพร่แล้ว",
      value: publishedBlogCount ?? 0,
      href: "/admin/blog",
      cta: "ดูรายการ",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bold uppercase tracking-[0.3em] text-amber-400">
          ภาพรวม
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          จัดการเนื้อหาคอลเลกชันเพชรดำและบทความของ BlackDiamond
          การเปลี่ยนแปลงทั้งหมดจะอัปเดตบนหน้าเว็บสาธารณะโดยอัตโนมัติภายในไม่กี่นาที
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            className="flex flex-col justify-between gap-6 border border-neutral-800 bg-neutral-900/40 p-6"
            key={card.label}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                {card.label}
              </p>
              <p className="mt-3 font-headline text-4xl text-white">
                {card.value}
              </p>
            </div>
            <Link
              className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 transition hover:text-amber-300"
              href={card.href}
            >
              {card.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
