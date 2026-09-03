import Link from "next/link";

import { deleteCompanyStat, saveCompanyStat } from "@/app/admin/actions";
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
} from "@/components/admin";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { getOrCreateAdminCsrfToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, stats] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.companyStat.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = stats.find((stat) => stat.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Stats" description="Trust metrics used on the homepage and About page." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit stat" : "Add stat"}
            action={
              editing ? (
                <Link href="/admin/stats" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveCompanyStat} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Value" name="value" defaultValue={editing?.value} />
              <AdminInput label="Label" name="label" defaultValue={editing?.label} />
              <AdminImageUpload name="image" label="Image" folder="stats" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? stats.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add stat"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All stats" count={stats.length} empty="No stats yet. Add the first one on the left.">
            {stats.map((stat) => (
              <AdminListItem
                key={stat.id}
                title={stat.value}
                subtitle={stat.label}
                published={stat.published}
                active={editing?.id === stat.id}
                editHref={`?id=${stat.id}`}
                deleteAction={deleteCompanyStat}
                csrfToken={csrfToken}
                id={stat.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
