import { submitContactForm } from "@/app/actions";

import { ds, StatusNotice } from "@/components/design-system";

export function ContactForm({
  status,
  returnTo = "/contact",
}: {
  status?: string;
  returnTo?: string;
}) {
  return (
    <form action={submitContactForm} className={`${ds.card} p-6 sm:p-8`}>
      <div>
        <p className={ds.eyebrow}>Request A Consultation</p>
        <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
          Tell us what support you need
        </h3>
      </div>
      <input type="hidden" name="returnTo" value={returnTo} />
      <div className="mt-6">{status ? <StatusNotice status={status} /> : null}</div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Full name
          <input required name="name" className={ds.input} placeholder="Your full name" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            name="email"
            className={ds.input}
            placeholder="you@company.com"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Phone
          <input name="phone" className={ds.input} placeholder="+977-98..." />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Company
          <input name="company" className={ds.input} placeholder="Company name" />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Service needed
          <select name="serviceInterest" className={ds.input} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option value="Audit & Assurance">Audit & Assurance</option>
            <option value="Tax Planning & Compliance">Tax Planning & Compliance</option>
            <option value="Business Advisory">Business Advisory</option>
            <option value="Risk & Internal Controls">Risk & Internal Controls</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Message
          <textarea
            required
            name="message"
            rows={6}
            className={ds.input}
            placeholder="Share your current challenge, timeline, or the type of support you are looking for."
          />
        </label>
      </div>
      <button type="submit" className={`mt-6 ${ds.btnPrimary}`}>
        Submit Inquiry
      </button>
    </form>
  );
}
