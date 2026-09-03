import Link from "next/link";

import { deleteFAQ, saveFAQ } from "@/app/admin/actions";
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

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; id?: string }>;
}) {
  const [{ status, id }, csrfToken, faqs] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);
  const editing = faqs.find((faq) => faq.id === id) ?? null;

  return (
    <div>
      <AdminPageHeader title="FAQs" description="Common questions grouped by category." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection
            title={editing ? "Edit FAQ" : "Add FAQ"}
            action={
              editing ? (
                <Link href="/admin/faqs" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Cancel
                </Link>
              ) : null
            }
          >
            <form key={editing?.id ?? "new"} action={saveFAQ} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
              <AdminInput label="Question" name="question" defaultValue={editing?.question} />
              <AdminInput label="Category" name="category" defaultValue={editing?.category ?? "General"} />
              <AdminTextArea label="Answer" name="answer" defaultValue={editing?.answer} rows={4} />
              <AdminImageUpload name="image" label="Image" folder="faqs" defaultValue={editing?.image} />
              <AdminInput label="Order" name="order" type="number" defaultValue={editing?.order ?? faqs.length + 1} />
              <div className="flex flex-wrap items-center gap-3">
                <AdminCheckbox label="Published" name="published" defaultChecked={editing?.published ?? true} />
                <AdminSubmit label={editing ? "Save changes" : "Add FAQ"} />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminList title="All FAQs" count={faqs.length} empty="No FAQs yet. Add the first one on the left.">
            {faqs.map((faq) => (
              <AdminListItem
                key={faq.id}
                title={faq.question}
                subtitle={faq.category}
                published={faq.published}
                active={editing?.id === faq.id}
                editHref={`?id=${faq.id}`}
                deleteAction={deleteFAQ}
                csrfToken={csrfToken}
                id={faq.id}
              />
            ))}
          </AdminList>
        }
      />
    </div>
  );
}
