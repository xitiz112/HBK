import Link from "next/link";

import { deleteTeamMember, saveTeamMember } from "@/app/admin/actions";
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

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, members] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = members.find((member) => member.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Team" description="People shown on the firm profile." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit team member" : "Add team member"}
            action={
              editing ? (
                <Link href="/admin/team" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveTeamMember} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Name" name="name" defaultValue={editing?.name} />
              <AdminInput label="Role" name="role" defaultValue={editing?.role} />
              <AdminInput label="Qualifications" name="qualifications" defaultValue={editing?.qualifications} />
              <AdminInput label="Email" name="email" defaultValue={editing?.email} required={false} />
              <AdminInput label="LinkedIn" name="linkedin" defaultValue={editing?.linkedin} required={false} />
              <AdminImageUpload name="avatar" label="Photo" folder="team" defaultValue={editing?.avatar} />
              <AdminTextArea label="Bio" name="bio" defaultValue={editing?.bio} rows={4} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? members.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add member"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All team members" count={members.length} empty="No team members yet. Add the first one on the left.">
            {members.map((member) => (
              <AdminListItem
                key={member.id}
                title={member.name}
                subtitle={member.role}
                published={member.published}
                active={editing?.id === member.id}
                editHref={`?id=${member.id}`}
                deleteAction={deleteTeamMember}
                csrfToken={csrfToken}
                id={member.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
