import Link from "next/link";

import { deleteBlogPost, saveBlogPost } from "@/app/admin/actions";
import {
  AdminCheckbox,
  AdminCsrfField,
  AdminInput,
  AdminList,
  AdminListItem,
  AdminPageHeader,
  AdminSection,
  AdminSplit,
  AdminStatusNotice,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { getOrCreateAdminCsrfToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function toDatetimeLocal(value: Date) {
  const offset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, posts] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } }).catch(() => []),
  ]);
  const editing = posts.find((post) => post.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Blog" description="Articles for the insights section. Slugs must be lowercase with hyphens." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit post" : "Add post"}
            action={
              editing ? (
                <Link href="/admin/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveBlogPost} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Title" name="title" defaultValue={editing?.title} />
              <AdminInput label="Slug" name="slug" defaultValue={editing?.slug} placeholder="example-post-slug" />
              <AdminInput label="Category" name="category" defaultValue={editing?.category ?? "Advisory"} />
              <AdminInput label="Author" name="author" defaultValue={editing?.author ?? "HBK & Associates"} />
              <AdminImageUpload name="coverImage" label="Cover image" folder="blog" defaultValue={editing?.coverImage} />
              <AdminInput
                label="Published at"
                name="publishedAt"
                type="datetime-local"
                defaultValue={editing ? toDatetimeLocal(editing.publishedAt) : undefined}
              />
              <AdminTextArea label="Excerpt" name="excerpt" defaultValue={editing?.excerpt} rows={3} />
              <AdminTextArea label="Content" name="content" defaultValue={editing?.content} rows={8} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? posts.length + 1} />
              <div className="flex flex-wrap items-center gap-4">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? false} />
                <AdminCheckbox label="Featured" name="featured" defaultChecked={editing?.featured ?? false} />
              </div>
              <AdminSubmit label={editing ? "Save changes" : "Add post"} />
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All posts" count={posts.length} empty="No posts yet. Add the first one on the left.">
            {posts.map((post) => (
              <AdminListItem
                key={post.id}
                title={post.title}
                subtitle={post.category}
                published={post.published}
                active={editing?.id === post.id}
                editHref={`?id=${post.id}`}
                deleteAction={deleteBlogPost}
                csrfToken={csrfToken}
                id={post.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
