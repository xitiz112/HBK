import { saveHeroContent } from "@/app/admin/actions";
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
import { defaultHeroContent } from "@/lib/content";
import { mediaSrc } from "@/lib/media";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, csrfToken, hero] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.heroContent.findUnique({ where: { id: "hero" } }).catch(() => null),
  ]);
  const data = hero ?? { id: "hero", ...defaultHeroContent };

  return (
    <div>
      <AdminPageHeader title="Hero" description="Control the first impression on the homepage." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection title="Edit hero" description="Headline, supporting copy, and call-to-action buttons.">
            <form action={saveHeroContent} className="grid min-w-0 gap-4 sm:grid-cols-2">
              <AdminCsrfField token={csrfToken} />
              <div className="sm:col-span-2">
                <AdminInput label="Eyebrow" name="eyebrow" defaultValue={data.eyebrow} />
              </div>
              <div className="sm:col-span-2">
                <AdminInput label="Main title" name="title" defaultValue={data.title} />
              </div>
              <div className="sm:col-span-2">
                <AdminTextArea label="Subtitle" name="subtitle" defaultValue={data.subtitle} rows={4} />
              </div>
              <AdminInput label="Primary CTA text" name="primaryCtaText" defaultValue={data.primaryCtaText} />
              <AdminInput label="Primary CTA link" name="primaryCtaHref" defaultValue={data.primaryCtaHref} />
              <AdminInput label="Secondary CTA text" name="secondaryCtaText" defaultValue={data.secondaryCtaText} />
              <AdminInput label="Secondary CTA link" name="secondaryCtaHref" defaultValue={data.secondaryCtaHref} />
              <div className="sm:col-span-2">
                <AdminImageUpload name="image" label="Hero image" folder="hero" defaultValue={data.image} />
              </div>
              <div className="sm:col-span-2">
                <AdminSubmit label="Save hero" />
              </div>
            </form>
          </AdminSection>
        }
        list={
          <AdminSection title="Current hero">
            <div className="space-y-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">{data.eyebrow}</p>
              <h3 className="text-lg font-bold text-slate-900">{data.title}</h3>
              <p className="leading-6 text-slate-600">{data.subtitle}</p>
              <p className="text-slate-500">{data.primaryCtaText} → {data.primaryCtaHref}</p>
              <p className="text-slate-500">{data.secondaryCtaText} → {data.secondaryCtaHref}</p>
              {data.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaSrc(data.image)} alt="" className="mt-2 h-40 w-full max-w-full rounded-lg object-cover" />
              ) : null}
            </div>
          </AdminSection>
        }
      />
    </div>
  );
}
