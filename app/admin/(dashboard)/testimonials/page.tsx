import Link from "next/link";

import { deleteTestimonial, saveTestimonial } from "@/app/admin/actions";
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

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, testimonials] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = testimonials.find((item) => item.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="Client Feedback" description="Social proof for the homepage and Client Feedback page." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit client feedback" : "Add client feedback"}
            action={
              editing ? (
                <Link href="/admin/testimonials" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveTestimonial} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Author" name="author" defaultValue={editing?.author} />
              <AdminInput label="Role" name="role" defaultValue={editing?.role} />
              <AdminInput label="Company" name="company" defaultValue={editing?.company} />
              <AdminInput label="Location" name="location" defaultValue={editing?.location} />
              <AdminTextArea label="Quote" name="quote" defaultValue={editing?.quote} rows={4} />
              <AdminImageUpload name="image" label="Author photo" folder="testimonials" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? testimonials.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add client feedback"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All client feedback" count={testimonials.length} empty="No client feedback yet. Add the first one on the left.">
            {testimonials.map((item) => (
              <AdminListItem
                key={item.id}
                title={item.author}
                subtitle={`${item.role}, ${item.company}`}
                published={item.published}
                active={editing?.id === item.id}
                editHref={`?id=${item.id}`}
                deleteAction={deleteTestimonial}
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
