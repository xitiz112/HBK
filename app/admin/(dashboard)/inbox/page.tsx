import Link from "next/link";

import { deleteSubmission, updateSubmissionStatus } from "@/app/admin/actions";
import {
  AdminCsrfField,
  AdminDelete,
  AdminList,
  AdminListItem,
  AdminPageHeader,
  AdminSection,
  AdminSplit,
  AdminStatusNotice,
  AdminSubmit,
  StatusBadge,
} from "@/components/admin";
import { getOrCreateAdminCsrfToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, submissions] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);
  const selected = submissions.find((submission) => submission.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Inbox" description="Review contact form submissions and update their status." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={selected ? selected.name : "Submission"}
            description={selected ? "Update status or delete this message." : "Select a message from the list."}
            action={
              selected ? (
                <Link href="/admin/inbox" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Close
                </Link>
              ) : null
            }
          >
            {selected ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={selected.status} />
                  <p className="text-xs text-slate-500">{selected.createdAt.toLocaleString()}</p>
                </div>
                <div className="grid gap-2 text-sm text-slate-600">
                  <p><span className="font-medium text-slate-900">Email:</span> {selected.email}</p>
                  <p><span className="font-medium text-slate-900">Phone:</span> {selected.phone || "Not provided"}</p>
                  <p><span className="font-medium text-slate-900">Company:</span> {selected.company || "Not provided"}</p>
                  <p><span className="font-medium text-slate-900">Service:</span> {selected.serviceInterest || "General inquiry"}</p>
                </div>
                <p className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{selected.message}</p>
                <form action={updateSubmissionStatus} className="flex flex-wrap items-center gap-3">
                  <AdminCsrfField token={csrfToken} />
                  <input type="hidden" name="id" value={selected.id} />
                  <select
                    name="status"
                    defaultValue={selected.status}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
                  >
                    <option value="NEW">New</option>
                    <option value="REVIEWED">Reviewed</option>
                    <option value="RESPONDED">Responded</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                  <AdminSubmit label="Update status" />
                </form>
                <form action={deleteSubmission}>
                  <AdminCsrfField token={csrfToken} />
                  <input type="hidden" name="id" value={selected.id} />
                  <AdminDelete label="Delete" />
                </form>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Choose a submission on the right to review it here.</p>
            )}
          </AdminSection>
        }
        list={
          <AdminList title="All submissions" count={submissions.length} empty="No contact submissions yet.">
            {submissions.map((submission) => (
              <AdminListItem
                key={submission.id}
                title={submission.name}
                subtitle={submission.email}
                active={selected?.id === submission.id}
                editHref={`?id=${submission.id}`}
                editLabel="View"
                deleteAction={deleteSubmission}
                csrfToken={csrfToken}
                id={submission.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
