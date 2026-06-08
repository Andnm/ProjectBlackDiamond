import Image from "next/image";
import Link from "next/link";
import { listBlogPosts } from "@/lib/admin/blog-queries";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { Pagination } from "@/components/admin/Pagination";
import { DeletePostButton } from "./DeletePostButton";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminBlogListPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const { rows: posts, page, pageCount, total } = await listBlogPosts(
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Blog</p>
          <h1 className="mt-2 font-headline text-3xl text-white">Bài viết ({total})</h1>
        </div>
        <Link
          className="bg-amber-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-amber-300"
          href="/admin/blog/new"
        >
          + Viết bài mới
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="border border-dashed border-neutral-800 px-6 py-12 text-center text-sm text-neutral-500">
          Chưa có bài viết nào. Bấm “Viết bài mới” để bắt đầu.
        </p>
      ) : (
        <div className="overflow-x-auto border border-neutral-800">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-left text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                <th className="px-4 py-3">Ảnh bìa</th>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Ngày đăng</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr className="border-b border-neutral-900 last:border-0" key={post.id}>
                  <td className="px-4 py-3">
                    {post.cover_image_url ? (
                      <Image
                        alt={fromLocalizedJson(post.title) || post.slug}
                        className="object-cover"
                        height={56}
                        src={post.cover_image_url}
                        width={56}
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center border border-neutral-800 bg-neutral-900 text-[10px] uppercase tracking-[0.1em] text-neutral-600">
                        Không có
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{fromLocalizedJson(post.title) || "—"}</td>
                  <td className="px-4 py-3 text-neutral-400">{post.slug}</td>
                  <td className="px-4 py-3 text-neutral-400">{post.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        post.published ? "bg-emerald-950/60 text-emerald-300" : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {post.published ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        className="border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400"
                        href={`/admin/blog/${post.id}/edit`}
                      >
                        Sửa
                      </Link>
                      <DeletePostButton id={post.id} title={fromLocalizedJson(post.title) || post.slug} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination basePath="/admin/blog" page={page} pageCount={pageCount} />
    </div>
  );
}
