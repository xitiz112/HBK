import { saveSiteSettings } from "@/app/admin/actions";
import {
  AdminCheckbox,
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
import { SiteBrand } from "@/components/site-brand";
import { getOrCreateAdminCsrfToken } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";
import { mediaSrc } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, csrfToken, settings] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    getSiteSettings(),
  ]);
  const data = { id: "site" as const, ...settings };

  return (
    <div>
      <AdminPageHeader
        title="General settings"
        description="Site name, logo, favicon, and the copy used in the header, footer, and browser tab."
      />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection title="Edit settings">
            <form action={saveSiteSettings} className="grid min-w-0 gap-4">
              <AdminCsrfField token={csrfToken} />
              <AdminInput label="Site name" name="siteName" defaultValue={data.siteName} />
              <AdminInput label="Short name" name="shortName" defaultValue={data.shortName} />
              <AdminTextArea label="Footer tagline" name="tagline" defaultValue={data.tagline} rows={3} />
              <AdminTextArea
                label="SEO description"
                name="description"
                defaultValue={data.description}
                rows={4}
              />
              <AdminImageUpload
                name="logo"
                label="Site logo"
                folder="brand"
                defaultValue={data.logo}
                fit="contain"
                allowClear
              />
              <AdminImageUpload
                name="favicon"
                label="Favicon"
                folder="brand"
                defaultValue={data.favicon}
                fit="contain"
                allowClear
              />
              <AdminCheckbox label="Show site name next to the logo" name="showSiteName" defaultChecked={data.showSiteName} />
              <AdminSubmit label="Save settings" />
            </form>
          </AdminSection>
        }
        list={
          <AdminSection title="Current branding">
            <div className="space-y-5 text-sm">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Header</p>
                <SiteBrand
                  siteName={data.siteName}
                  shortName={data.shortName}
                  logo={data.logo}
                  showSiteName={false}
                  size="lg"
                />
              </div>
              <div className="rounded-lg bg-slate-950 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Footer</p>
                <SiteBrand
                  siteName={data.siteName}
                  shortName={data.shortName}
                  logo={data.logo}
                  showSiteName={data.showSiteName}
                  inverted
                />
                <p className="mt-3 leading-6 text-slate-400">{data.tagline}</p>
              </div>
              {data.favicon ? (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Favicon</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaSrc(data.favicon)} alt="" className="h-8 w-8 object-contain" />
                </div>
              ) : null}
              <p className="leading-6 text-slate-500">{data.description}</p>
            </div>
          </AdminSection>
        }
      />
    </div>
  );
}
