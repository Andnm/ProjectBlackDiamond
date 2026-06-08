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
      label: "Sản phẩm trong bộ sưu tập",
      value: collectionCount ?? 0,
      href: "/admin/collection",
      cta: "Quản lý bộ sưu tập",
    },
    {
      label: "Bài viết blog",
      value: blogCount ?? 0,
      href: "/admin/blog",
      cta: "Quản lý blog",
    },
    {
      label: "Bài viết đã xuất bản",
      value: publishedBlogCount ?? 0,
      href: "/admin/blog",
      cta: "Xem danh sách",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bold uppercase tracking-[0.3em] text-amber-400">
          Tổng quan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Quản lý nội dung bộ sưu tập kim cương đen và blog của BlackDiamond.
          Mọi thay đổi sẽ tự động cập nhật trên trang công khai sau ít phút.
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
