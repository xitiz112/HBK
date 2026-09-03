import Link from "next/link";

import { deleteAward, saveAward } from "@/app/admin/actions";
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

export default async function AdminAwardsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, awards] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.award.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = awards.find((award) => award.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Awards" description="Certifications and recognitions for the firm." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit award" : "Add award"}
            action={
              editing ? (
                <Link href="/admin/awards" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveAward} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Title" name="title" defaultValue={editing?.title} />
              <AdminInput label="Issuer" name="issuer" defaultValue={editing?.issuer} />
              <AdminInput label="Year" name="year" defaultValue={editing?.year} />
              <AdminTextArea label="Description" name="description" defaultValue={editing?.description} rows={3} required={false} />
              <AdminImageUpload name="image" label="Image" folder="awards" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? awards.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add award"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All awards" count={awards.length} empty="No awards yet. Add the first one on the left.">
            {awards.map((award) => (
              <AdminListItem
                key={award.id}
                title={award.title}
                subtitle={`${award.issuer} · ${award.year}`}
                published={award.published}
                active={editing?.id === award.id}
                editHref={`?id=${award.id}`}
                deleteAction={deleteAward}
                csrfToken={csrfToken}
                id={award.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
