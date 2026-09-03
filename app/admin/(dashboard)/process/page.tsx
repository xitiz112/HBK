import Link from "next/link";

import { deleteProcessStep, saveProcessStep } from "@/app/admin/actions";
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

export default async function AdminProcessPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, steps] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.processStep.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = steps.find((step) => step.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Process" description="Steps shown in the How We Work section." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit step" : "Add step"}
            action={
              editing ? (
                <Link href="/admin/process" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveProcessStep} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Step number" name="number" defaultValue={editing?.number ?? `0${steps.length + 1}`} />
              <AdminInput label="Title" name="title" defaultValue={editing?.title} />
              <AdminTextArea label="Summary" name="summary" defaultValue={editing?.summary} rows={3} />
              <AdminImageUpload name="image" label="Image" folder="process" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? steps.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add step"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All steps" count={steps.length} empty="No process steps yet. Add the first one on the left.">
            {steps.map((step) => (
              <AdminListItem
                key={step.id}
                title={`${step.number} ${step.title}`}
                subtitle={step.summary}
                published={step.published}
                active={editing?.id === step.id}
                editHref={`?id=${step.id}`}
                deleteAction={deleteProcessStep}
                csrfToken={csrfToken}
                id={step.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
