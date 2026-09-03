import Link from "next/link";

import { deleteDifferentiator, saveDifferentiator } from "@/app/admin/actions";
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

export default async function AdminDifferentiatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, items] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.differentiator.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = items.find((item) => item.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Why choose us" description="Differentiators that explain why clients work with HBK." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit item" : "Add item"}
            action={
              editing ? (
                <Link href="/admin/differentiators" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveDifferentiator} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Title" name="title" defaultValue={editing?.title} />
              <AdminTextArea label="Summary" name="summary" defaultValue={editing?.summary} rows={3} />
              <AdminImageUpload name="image" label="Image" folder="differentiators" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? items.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add item"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All items" count={items.length} empty="No items yet. Add the first one on the left.">
            {items.map((item) => (
              <AdminListItem
                key={item.id}
                title={item.title}
                subtitle={item.summary}
                published={item.published}
                active={editing?.id === item.id}
                editHref={`?id=${item.id}`}
                deleteAction={deleteDifferentiator}
                csrfToken={csrfToken}
                id={item.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
