import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/admin/blog-queries";
import { fromLocalizedJson } from "@/lib/admin/form-utils";
import { PostForm } from "../../PostForm";
import { updateBlogPost } from "../../actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-amber-400" href="/admin/blog">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-3 font-headline text-3xl text-white">Sửa: {fromLocalizedJson(post.title) || post.slug}</h1>
      </div>

      <PostForm action={updateWithId} post={post} submitLabel="Lưu thay đổi" />
    </div>
  );
}
