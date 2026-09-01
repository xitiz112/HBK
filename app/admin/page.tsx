import Link from "next/link";

import {
  deleteCompanyStat,
  deleteDifferentiator,
  deleteIndustry,
  deleteProcessStep,
  deleteService,
  deleteTestimonial,
  logoutAdmin,
  saveAboutContent,
  saveCompanyStat,
  saveContactInfo,
  saveDifferentiator,
  saveHeroContent,
  saveIndustry,
  saveProcessStep,
  saveService,
  saveTestimonial,
  updateSubmissionStatus,
} from "@/app/admin/actions";
import {
  AdminCsrfField,
  AdminCheckbox,
  AdminDelete,
  AdminInput,
  AdminSection,
  AdminShell,
  AdminStatusNotice,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin";
import {
  defaultAboutContent,
  defaultCompanyStats,
  defaultContactInfo,
  defaultDifferentiators,
  defaultHeroContent,
  defaultIndustries,
  defaultProcessSteps,
  defaultServices,
  defaultTestimonials,
} from "@/lib/content";
import { getOrCreateAdminCsrfToken, requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getAdminContent() {
  const [
    hero,
    about,
    contact,
    stats,
    services,
    industries,
    processSteps,
    differentiators,
    testimonials,
    submissions,
  ] = await Promise.all([
    prisma.heroContent.findUnique({ where: { id: "hero" } }).catch(() => null),
    prisma.aboutContent.findUnique({ where: { id: "about" } }).catch(() => null),
    prisma.contactInfo.findUnique({ where: { id: "contact" } }).catch(() => null),
    prisma.companyStat.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.service.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.industry.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.processStep.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.differentiator.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  return {
    hero: hero ?? { id: "hero", ...defaultHeroContent },
    about: about ?? { id: "about", ...defaultAboutContent },
    contact: contact ?? { id: "contact", ...defaultContactInfo },
    stats: stats.length ? stats : defaultCompanyStats.map((item, index) => ({ ...item, order: index + 1, published: true })),
    services: services.length ? services : defaultServices.map((item, index) => ({ ...item, order: index + 1, published: true })),
    industries: industries.length ? industries : defaultIndustries.map((item, index) => ({ ...item, order: index + 1, published: true })),
    processSteps:
      processSteps.length ? processSteps : defaultProcessSteps.map((item, index) => ({ ...item, order: index + 1, published: true })),
    differentiators:
      differentiators.length
        ? differentiators
        : defaultDifferentiators.map((item, index) => ({ ...item, order: index + 1, published: true })),
    testimonials:
      testimonials.length ? testimonials : defaultTestimonials.map((item, index) => ({ ...item, order: index + 1, published: true })),
    submissions,
  };
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, session, data] = await Promise.all([
    searchParams,
    requireAdminSession(),
    getAdminContent(),
  ]);
  const csrfToken = await getOrCreateAdminCsrfToken();

  return (
    <AdminShell
      title={`Welcome, ${session.name}`}
      subtitle="Update the public website content below. Changes are reflected across the homepage and the dedicated inner pages."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
        >
          View Public Site
        </Link>
        <form action={logoutAdmin}>
          <AdminCsrfField token={csrfToken} />
          <AdminSubmit label="Sign Out" />
        </form>
      </div>

      <AdminStatusNotice status={status} />

      <AdminSection
        title="Homepage Hero"
        description="Manage the first impression visitors see on the HBK homepage."
      >
        <form action={saveHeroContent} className="grid gap-5 lg:grid-cols-2">
          <AdminCsrfField token={csrfToken} />
          <AdminInput label="Eyebrow" name="eyebrow" defaultValue={data.hero.eyebrow} />
          <AdminInput label="Main title" name="title" defaultValue={data.hero.title} />
          <div className="lg:col-span-2">
            <AdminTextArea label="Subtitle" name="subtitle" defaultValue={data.hero.subtitle} rows={4} />
          </div>
          <AdminInput label="Primary CTA text" name="primaryCtaText" defaultValue={data.hero.primaryCtaText} />
          <AdminInput label="Primary CTA link" name="primaryCtaHref" defaultValue={data.hero.primaryCtaHref} />
          <AdminInput label="Secondary CTA text" name="secondaryCtaText" defaultValue={data.hero.secondaryCtaText} />
          <AdminInput label="Secondary CTA link" name="secondaryCtaHref" defaultValue={data.hero.secondaryCtaHref} />
          <div className="lg:col-span-2">
            <AdminSubmit label="Save Hero Content" />
          </div>
        </form>
      </AdminSection>

      <AdminSection
        title="Company Story"
        description="Control the core About messaging used across the homepage and the About page."
      >
        <form action={saveAboutContent} className="grid gap-5">
          <AdminCsrfField token={csrfToken} />
          <AdminInput label="Hero title" name="heroTitle" defaultValue={data.about.heroTitle} />
          <AdminTextArea label="Firm story" name="story" defaultValue={data.about.story} rows={5} />
          <AdminTextArea label="Mission" name="mission" defaultValue={data.about.mission} rows={4} />
          <AdminTextArea label="Vision" name="vision" defaultValue={data.about.vision} rows={4} />
          <AdminTextArea label="Approach" name="approach" defaultValue={data.about.approach} rows={4} />
          <AdminSubmit label="Save About Content" />
        </form>
      </AdminSection>

      <AdminSection
        title="Contact Details"
        description="Set the address, email, phone number, and supporting office information shown across the site."
      >
        <form action={saveContactInfo} className="grid gap-5 lg:grid-cols-2">
          <AdminCsrfField token={csrfToken} />
          <AdminInput label="Office title" name="officeTitle" defaultValue={data.contact.officeTitle} />
          <AdminInput label="Email" name="email" defaultValue={data.contact.email} type="email" />
          <AdminInput label="Phone" name="phone" defaultValue={data.contact.phone} />
          <AdminInput label="Hours" name="hours" defaultValue={data.contact.hours} />
          <div className="lg:col-span-2">
            <AdminTextArea label="Address" name="address" defaultValue={data.contact.address} rows={3} />
          </div>
          <div className="lg:col-span-2">
            <AdminInput
              label="Map URL"
              name="mapEmbedUrl"
              defaultValue={data.contact.mapEmbedUrl}
              required={false}
            />
          </div>
          <div className="lg:col-span-2">
            <AdminSubmit label="Save Contact Details" />
          </div>
        </form>
      </AdminSection>

      <AdminSection
        title="Company Stats"
        description="These trust metrics appear on the homepage and About page."
      >
        <div className="space-y-6">
          {data.stats.map((stat) => (
            <div key={stat.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveCompanyStat} className="grid gap-5 lg:grid-cols-[1fr_1.4fr_120px_auto]">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={stat.id} />
                <AdminInput label="Value" name="value" defaultValue={stat.value} />
                <AdminInput label="Label" name="label" defaultValue={stat.label} />
                <AdminInput label="Order" name="order" type="number" defaultValue={stat.order} />
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={stat.published} />
                  <AdminSubmit label="Save" />
                </div>
              </form>
              <form action={deleteCompanyStat} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={stat.id} />
                <AdminDelete label="Delete Stat" />
              </form>
            </div>
          ))}
          <form action={saveCompanyStat} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-[1fr_1.4fr_120px_auto]">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Value" name="value" />
            <AdminInput label="Label" name="label" />
            <AdminInput label="Order" name="order" type="number" defaultValue={data.stats.length + 1} />
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Stat" />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Services"
        description="Edit the service cards shown on the homepage and Services page. Icon values should match a Lucide icon name such as `ShieldCheck` or `ReceiptText`."
      >
        <div className="space-y-6">
          {data.services.map((service) => (
            <div key={service.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveService} className="grid gap-5 lg:grid-cols-2">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={service.id} />
                <AdminInput label="Title" name="title" defaultValue={service.title} />
                <AdminInput label="Icon" name="icon" defaultValue={service.icon} />
                <div className="lg:col-span-2">
                  <AdminTextArea label="Summary" name="summary" defaultValue={service.summary} rows={3} />
                </div>
                <div className="lg:col-span-2">
                  <AdminTextArea label="Details" name="details" defaultValue={service.details} rows={4} />
                </div>
                <AdminInput label="Order" name="order" type="number" defaultValue={service.order} />
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={service.published} />
                  <AdminSubmit label="Save Service" />
                </div>
              </form>
              <form action={deleteService} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={service.id} />
                <AdminDelete label="Delete Service" />
              </form>
            </div>
          ))}
          <form action={saveService} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-2">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Title" name="title" />
            <AdminInput label="Icon" name="icon" defaultValue="ShieldCheck" />
            <div className="lg:col-span-2">
              <AdminTextArea label="Summary" name="summary" rows={3} />
            </div>
            <div className="lg:col-span-2">
              <AdminTextArea label="Details" name="details" rows={4} />
            </div>
            <AdminInput label="Order" name="order" type="number" defaultValue={data.services.length + 1} />
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Service" />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Industries"
        description="Manage the industries section shown on the homepage and the dedicated industries page."
      >
        <div className="space-y-6">
          {data.industries.map((industry) => (
            <div key={industry.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveIndustry} className="grid gap-5 lg:grid-cols-2">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={industry.id} />
                <AdminInput label="Industry name" name="name" defaultValue={industry.name} />
                <AdminInput label="Order" name="order" type="number" defaultValue={industry.order} />
                <div className="lg:col-span-2">
                  <AdminTextArea label="Summary" name="summary" defaultValue={industry.summary} rows={3} />
                </div>
                <div className="lg:col-span-2">
                  <AdminTextArea label="Examples" name="examples" defaultValue={industry.examples} rows={3} />
                </div>
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={industry.published} />
                  <AdminSubmit label="Save Industry" />
                </div>
              </form>
              <form action={deleteIndustry} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={industry.id} />
                <AdminDelete label="Delete Industry" />
              </form>
            </div>
          ))}
          <form action={saveIndustry} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-2">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Industry name" name="name" />
            <AdminInput label="Order" name="order" type="number" defaultValue={data.industries.length + 1} />
            <div className="lg:col-span-2">
              <AdminTextArea label="Summary" name="summary" rows={3} />
            </div>
            <div className="lg:col-span-2">
              <AdminTextArea label="Examples" name="examples" rows={3} />
            </div>
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Industry" />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Process Steps"
        description="Edit the steps shown in the How We Work section."
      >
        <div className="space-y-6">
          {data.processSteps.map((step) => (
            <div key={step.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveProcessStep} className="grid gap-5 lg:grid-cols-2">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={step.id} />
                <AdminInput label="Step number" name="number" defaultValue={step.number} />
                <AdminInput label="Order" name="order" type="number" defaultValue={step.order} />
                <div className="lg:col-span-2">
                  <AdminInput label="Title" name="title" defaultValue={step.title} />
                </div>
                <div className="lg:col-span-2">
                  <AdminTextArea label="Summary" name="summary" defaultValue={step.summary} rows={3} />
                </div>
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={step.published} />
                  <AdminSubmit label="Save Step" />
                </div>
              </form>
              <form action={deleteProcessStep} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={step.id} />
                <AdminDelete label="Delete Step" />
              </form>
            </div>
          ))}
          <form action={saveProcessStep} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-2">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Step number" name="number" defaultValue={`0${data.processSteps.length + 1}`} />
            <AdminInput label="Order" name="order" type="number" defaultValue={data.processSteps.length + 1} />
            <div className="lg:col-span-2">
              <AdminInput label="Title" name="title" />
            </div>
            <div className="lg:col-span-2">
              <AdminTextArea label="Summary" name="summary" rows={3} />
            </div>
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Step" />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Why Choose Us"
        description="Manage the differentiators that help visitors understand why they should work with HBK."
      >
        <div className="space-y-6">
          {data.differentiators.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveDifferentiator} className="grid gap-5 lg:grid-cols-2">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={item.id} />
                <AdminInput label="Title" name="title" defaultValue={item.title} />
                <AdminInput label="Order" name="order" type="number" defaultValue={item.order} />
                <div className="lg:col-span-2">
                  <AdminTextArea label="Summary" name="summary" defaultValue={item.summary} rows={3} />
                </div>
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={item.published} />
                  <AdminSubmit label="Save Item" />
                </div>
              </form>
              <form action={deleteDifferentiator} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={item.id} />
                <AdminDelete label="Delete Item" />
              </form>
            </div>
          ))}
          <form action={saveDifferentiator} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-2">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Title" name="title" />
            <AdminInput label="Order" name="order" type="number" defaultValue={data.differentiators.length + 1} />
            <div className="lg:col-span-2">
              <AdminTextArea label="Summary" name="summary" rows={3} />
            </div>
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Item" />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Testimonials"
        description="Edit social proof for the homepage and testimonials page."
      >
        <div className="space-y-6">
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <form action={saveTestimonial} className="grid gap-5 lg:grid-cols-2">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={testimonial.id} />
                <AdminInput label="Author" name="author" defaultValue={testimonial.author} />
                <AdminInput label="Role" name="role" defaultValue={testimonial.role} />
                <AdminInput label="Company" name="company" defaultValue={testimonial.company} />
                <AdminInput label="Location" name="location" defaultValue={testimonial.location} />
                <AdminInput label="Order" name="order" type="number" defaultValue={testimonial.order} />
                <div className="flex items-end gap-3">
                  <AdminCheckbox label="Published" name="published" defaultChecked={testimonial.published} />
                  <AdminSubmit label="Save Testimonial" />
                </div>
                <div className="lg:col-span-2">
                  <AdminTextArea label="Quote" name="quote" defaultValue={testimonial.quote} rows={4} />
                </div>
              </form>
              <form action={deleteTestimonial} className="mt-4">
                <AdminCsrfField token={csrfToken} />
                <input type="hidden" name="id" value={testimonial.id} />
                <AdminDelete label="Delete Testimonial" />
              </form>
            </div>
          ))}
          <form action={saveTestimonial} className="grid gap-5 rounded-[1.5rem] border border-dashed border-slate-300 p-6 lg:grid-cols-2">
            <AdminCsrfField token={csrfToken} />
            <AdminInput label="Author" name="author" />
            <AdminInput label="Role" name="role" />
            <AdminInput label="Company" name="company" />
            <AdminInput label="Location" name="location" />
            <AdminInput label="Order" name="order" type="number" defaultValue={data.testimonials.length + 1} />
            <div className="flex items-end gap-3">
              <AdminCheckbox label="Published" name="published" defaultChecked />
              <AdminSubmit label="Add Testimonial" />
            </div>
            <div className="lg:col-span-2">
              <AdminTextArea label="Quote" name="quote" rows={4} />
            </div>
          </form>
        </div>
      </AdminSection>

      <AdminSection
        title="Contact Submissions"
        description="Review messages received from the public contact form and update their handling status."
      >
        <div className="space-y-5">
          {data.submissions.length ? (
            data.submissions.map((submission) => (
              <div key={submission.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-3 text-sm text-slate-600 lg:grid-cols-2">
                  <p>
                    <span className="font-semibold text-slate-950">Name:</span> {submission.name}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Email:</span> {submission.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Phone:</span> {submission.phone || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Company:</span> {submission.company || "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Service:</span>{" "}
                    {submission.serviceInterest || "General inquiry"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">Received:</span>{" "}
                    {submission.createdAt.toLocaleString()}
                  </p>
                </div>
                <p className="mt-4 rounded-[1.25rem] bg-white p-4 text-sm leading-7 text-slate-700">
                  {submission.message}
                </p>
                <form action={updateSubmissionStatus} className="mt-5 flex flex-wrap items-center gap-3">
                  <AdminCsrfField token={csrfToken} />
                  <input type="hidden" name="id" value={submission.id} />
                  <select
                    name="status"
                    defaultValue={submission.status}
                    className="rounded-full border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none"
                  >
                    <option value="NEW">New</option>
                    <option value="REVIEWED">Reviewed</option>
                    <option value="RESPONDED">Responded</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                  <AdminSubmit label="Update Status" />
                </form>
              </div>
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              No contact submissions yet.
            </div>
          )}
        </div>
      </AdminSection>
    </AdminShell>
  );
}
