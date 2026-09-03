import Link from "next/link";

import { deleteSocialLink, saveSocialLink } from "@/app/admin/actions";
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

export default async function AdminSocialPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, links] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = links.find((link) => link.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Social links" description="Profile links used in the footer and contact areas." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit link" : "Add link"}
            action={
              editing ? (
                <Link href="/admin/social" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveSocialLink} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Platform" name="platform" defaultValue={editing?.platform} />
              <AdminInput label="URL" name="url" defaultValue={editing?.url} />
              <AdminInput label="Icon" name="icon" defaultValue={editing?.icon ?? "Globe"} />
              <AdminImageUpload name="image" label="Image" folder="social" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? links.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add link"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All links" count={links.length} empty="No social links yet. Add the first one on the left.">
            {links.map((link) => (
              <AdminListItem
                key={link.id}
                title={link.platform}
                subtitle={link.url}
                published={link.published}
                active={editing?.id === link.id}
                editHref={`?id=${link.id}`}
                deleteAction={deleteSocialLink}
                csrfToken={csrfToken}
                id={link.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
