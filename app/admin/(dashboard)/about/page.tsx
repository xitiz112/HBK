import { saveAboutContent } from "@/app/admin/actions";
import {
  AdminCsrfField,
  AdminInput,
  AdminPageHeader,
  AdminSection,
  AdminSplit,
  AdminStatusNotice,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin";
import { AdminImageUpload } from "@/components/admin-image-upload";
import { getOrCreateAdminCsrfToken } from "@/lib/auth";
import { defaultAboutContent } from "@/lib/content";
import { mediaSrc } from "@/lib/media";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, csrfToken, about] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.aboutContent.findUnique({ where: { id: "about" } }).catch(() => null),
  ]);
  const data = about ?? { id: "about", ...defaultAboutContent };

  return (
    <div>
      <AdminPageHeader title="About" description="Firm story, mission, vision, and approach." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection title="Edit about">
            <form action={saveAboutContent} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              <AdminInput label="Hero title" name="heroTitle" defaultValue={data.heroTitle} />
              <AdminTextArea label="Firm story" name="story" defaultValue={data.story} rows={5} />
              <AdminTextArea label="Mission" name="mission" defaultValue={data.mission} rows={4} />
              <AdminTextArea label="Vision" name="vision" defaultValue={data.vision} rows={4} />
              <AdminTextArea label="Approach" name="approach" defaultValue={data.approach} rows={4} />
              <AdminImageUpload name="image" label="About image" folder="about" defaultValue={data.image} />
              <AdminSubmit label="Save about" />
            </form>
          </AdminSection>
        }
        list={
          <AdminSection title="Current about">
            <div className="space-y-4 text-sm leading-6 text-slate-600">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Title</p>
                <p className="mt-1 font-semibold text-slate-900">{data.heroTitle}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Story</p>
                <p className="mt-1">{data.story}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mission</p>
                <p className="mt-1">{data.mission}</p>
              </div>
              {data.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaSrc(data.image)} alt="" className="h-40 w-full rounded-lg object-cover" />
              ) : null}
            </div>
          </AdminSection>
        }
      />
    </div>
  );
}
