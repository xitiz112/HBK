import Link from "next/link";

export function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export function AdminSection({
  children,
  title,
  description,
  action,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.08)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AdminSplit({
  form,
  list,
}: {
  form: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-2">
      <div className="min-w-0">{form}</div>
      <div className="min-w-0">{list}</div>
    </div>
  );
}

export function AdminList({
  title,
  count,
  empty,
  children,
}: {
  title: string;
  count: number;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{count}</span>
      </div>
      {count ? <ul className="divide-y divide-slate-100">{children}</ul> : <p className="px-5 py-10 text-center text-sm text-slate-500">{empty}</p>}
    </section>
  );
}

export function AdminListItem({
  title,
  subtitle,
  published,
  active,
  editHref,
  editLabel = "Edit",
  deleteAction,
  csrfToken,
  id,
}: {
  title: string;
  subtitle?: string;
  published?: boolean;
  active?: boolean;
  editHref: string;
  editLabel?: string;
  deleteAction: (formData: FormData) => void | Promise<void>;
  csrfToken: string;
  id: string;
}) {
  return (
    <li className={`flex items-start justify-between gap-3 px-5 py-4 ${active ? "bg-[var(--color-accent-muted)]" : ""}`}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-slate-900">{title}</p>
          {published != null ? (
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {published ? "Published" : "Draft"}
            </span>
          ) : null}
        </div>
        {subtitle ? <p className="mt-1 line-clamp-2 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={editHref}
          className="inline-flex rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white"
        >
          {editLabel}
        </Link>
        <form action={deleteAction}>
          <AdminCsrfField token={csrfToken} />
          <input type="hidden" name="id" value={id} />
          <AdminDelete label="Delete" compact />
        </form>
      </div>
    </li>
  );
}

export function AdminRecord({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">{children}</div>;
}

export function AdminInput({
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block min-w-0 text-sm font-medium text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
      />
    </label>
  );
}

export function AdminTextArea({
  label,
  name,
  defaultValue,
  rows = 4,
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block min-w-0 text-sm font-medium text-slate-700">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
      />
    </label>
  );
}

export function AdminCheckbox({
  label,
  name,
  defaultChecked = true,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-slate-300" />
      {label}
    </label>
  );
}

export function AdminCsrfField({ token }: { token: string }) {
  return <input type="hidden" name="csrfToken" value={token} />;
}

export function AdminSubmit({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="inline-flex cursor-pointer rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
    >
      {label}
    </button>
  );
}

export function AdminDelete({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <button
      type="submit"
      className={
        compact
          ? "inline-flex cursor-pointer rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
          : "inline-flex cursor-pointer rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
      }
    >
      {label}
    </button>
  );
}

export function AdminStatusNotice({ status }: { status?: string }) {
  if (!status) {
    return null;
  }

  if (status === "saved" || status === "deleted") {
    return (
      <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        {status === "deleted" ? "Record deleted." : "Changes saved."}
      </div>
    );
  }

  const message =
    status === "duplicate"
      ? "A record with that unique value already exists. Change the slug or name and try again."
      : status === "invalid-request"
        ? "Your session request could not be verified. Refresh the page and try again."
        : status === "error"
          ? "The record could not be saved. Refresh the page and try again."
        : "That change could not be saved. Check the required fields and try again.";

  return (
    <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {message}
    </div>
  );
}

export function AdminEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: "bg-blue-50 text-blue-700",
    REVIEWED: "bg-amber-50 text-amber-700",
    RESPONDED: "bg-emerald-50 text-emerald-700",
    ARCHIVED: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? styles.ARCHIVED}`}>
      {status.toLowerCase()}
    </span>
  );
}
