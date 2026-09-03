import { saveContactInfo } from "@/app/admin/actions";
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
import { defaultContactInfo } from "@/lib/content";
import { mediaSrc } from "@/lib/media";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, csrfToken, contact] = await Promise.all([
    searchParams,
    getOrCreateAdminCsrfToken(),
    prisma.contactInfo.findUnique({ where: { id: "contact" } }).catch(() => null),
  ]);
  const data = contact ?? { id: "contact", ...defaultContactInfo };

  return (
    <div>
      <AdminPageHeader title="Contact details" description="Office information shown in the footer and contact page." />
      <AdminStatusNotice status={status} />
      <AdminSplit
        form={
          <AdminSection title="Edit office details">
            <form action={saveContactInfo} className="grid gap-4">
              <AdminCsrfField token={csrfToken} />
              <AdminInput label="Office title" name="officeTitle" defaultValue={data.officeTitle} />
              <AdminInput label="Email" name="email" defaultValue={data.email} type="email" />
              <AdminInput label="Phone" name="phone" defaultValue={data.phone} />
              <AdminInput label="Hours" name="hours" defaultValue={data.hours} />
              <AdminTextArea label="Address" name="address" defaultValue={data.address} rows={3} />
              <AdminInput label="Map URL" name="mapEmbedUrl" defaultValue={data.mapEmbedUrl} required={false} />
              <AdminImageUpload name="image" label="Office image" folder="contact" defaultValue={data.image} />
              <AdminSubmit label="Save contact details" />
            </form>
          </AdminSection>
        }
        list={
          <AdminSection title="Current contact">
            <div className="space-y-3 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-900">{data.officeTitle}</p>
              <p>{data.address}</p>
              <p>{data.phone}</p>
              <p>{data.email}</p>
              <p>{data.hours}</p>
              {data.mapEmbedUrl ? <p className="break-all text-slate-500">{data.mapEmbedUrl}</p> : null}
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
