import Link from "next/link";

import { deleteIndustry, saveIndustry } from "@/app/admin/actions";
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

export default async function AdminIndustriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, industries] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.industry.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = industries.find((industry) => industry.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Industries" description="Sectors shown on the homepage and Industries page." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit industry" : "Add industry"}
            action={
              editing ? (
                <Link href="/admin/industries" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveIndustry} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Industry name" name="name" defaultValue={editing?.name} />
              <AdminTextArea label="Summary" name="summary" defaultValue={editing?.summary} rows={3} />
              <AdminTextArea label="Examples" name="examples" defaultValue={editing?.examples} rows={3} />
              <AdminImageUpload name="image" label="Image" folder="industries" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? industries.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add industry"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All industries" count={industries.length} empty="No industries yet. Add the first one on the left.">
            {industries.map((industry) => (
              <AdminListItem
                key={industry.id}
                title={industry.name}
                subtitle={industry.summary}
                published={industry.published}
                active={editing?.id === industry.id}
                editHref={`?id=${industry.id}`}
                deleteAction={deleteIndustry}
                csrfToken={csrfToken}
                id={industry.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
