import Link from "next/link";
import { PostForm } from "../PostForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400" href="/admin/blog">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-3 font-headline text-3xl text-white">Viết bài mới</h1>
      </div>

      <PostForm action={createBlogPost} submitLabel="Đăng bài viết" />
    </div>
  );
}
