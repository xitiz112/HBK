import { submitContactForm } from "@/app/actions";

import { ds, StatusNotice } from "@/components/design-system";

export function ContactForm({
  status,
  returnTo = "/contact",
  headingId,
  fromModal = false,
}: {
  status?: string;
  returnTo?: string;
  headingId?: string;
  fromModal?: boolean;
}) {
  const inputClass = fromModal
    ? "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
    : ds.input;

  return (
    <form
      action={submitContactForm}
      className={
        fromModal
          ? "rounded-xl border border-slate-200 bg-white p-4 shadow-[0px_8px_32px_rgba(15,23,42,0.18)] sm:p-5"
          : `${ds.card} p-6 sm:p-8`
      }
    >
      <div>
        <p className={ds.eyebrow}>Contact form</p>
        <h3
          id={headingId}
          className={`font-bold text-slate-900 ${fromModal ? "mt-1.5 text-xl" : "mt-3 text-xl sm:text-2xl"}`}
        >
          Send a message
        </h3>
      </div>
      <input type="hidden" name="returnTo" value={returnTo} />
      {fromModal ? <input type="hidden" name="fromModal" value="1" /> : null}
      {status ? (
        <div className={fromModal ? "mt-3" : "mt-6"}>
          <StatusNotice status={status} />
        </div>
      ) : null}
      <div className={fromModal ? "mt-3 grid grid-cols-2 gap-2.5" : "mt-5 grid gap-4 sm:grid-cols-2"}>
        <label className="text-sm font-medium text-slate-700 col-span-2">
          Full name
          <input required name="name" className={inputClass} placeholder="Your full name" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Phone
          <input name="phone" className={inputClass} placeholder="+977-98..." />
        </label>
        <label className="text-sm font-medium text-slate-700 col-span-2">
          Company
          <input name="company" className={inputClass} placeholder="Company name" />
        </label>
        <label className="text-sm font-medium text-slate-700 col-span-2">
          Service needed
          <select name="serviceInterest" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option value="Audit & Assurance">Audit & Assurance</option>
            <option value="Tax Planning & Compliance">Tax Planning & Compliance</option>
            <option value="Business Advisory">Business Advisory</option>
            <option value="Risk & Internal Controls">Risk & Internal Controls</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 col-span-2">
          Message
          <textarea
            required
            name="message"
            rows={fromModal ? 2 : 6}
            className={inputClass}
            placeholder="Share your current challenge, timeline, or the type of support you are looking for."
          />
        </label>
      </div>
      <button type="submit" className={`${fromModal ? "mt-3" : "mt-6"} ${ds.btnPrimary} cursor-pointer`}>
        <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-[420ms] ease-out group-hover:scale-x-100" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
          Submit Inquiry
        </span>
      </button>
    </form>
  );
}
