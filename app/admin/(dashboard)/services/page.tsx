import Link from "next/link";

import { deleteService, saveService } from "@/app/admin/actions";
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

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, services] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.service.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = services.find((service) => service.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Service cards on the homepage and Services page. Use a Lucide icon name such as ShieldCheck."
      />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit service" : "Add service"}
            action={
              editing ? (
                <Link href="/admin/services" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveService} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Title" name="title" defaultValue={editing?.title} />
              <AdminInput label="Icon" name="icon" defaultValue={editing?.icon ?? "ShieldCheck"} />
              <AdminTextArea label="Summary" name="summary" defaultValue={editing?.summary} rows={3} />
              <AdminTextArea label="Details" name="details" defaultValue={editing?.details} rows={4} />
              <AdminImageUpload name="image" label="Image" folder="services" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? services.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add service"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All services" count={services.length} empty="No services yet. Add the first one on the left.">
            {services.map((service) => (
              <AdminListItem
                key={service.id}
                title={service.title}
                subtitle={service.summary}
                published={service.published}
                active={editing?.id === service.id}
                editHref={`?id=${service.id}`}
                deleteAction={deleteService}
                csrfToken={csrfToken}
                id={service.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
