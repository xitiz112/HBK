export function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-slate-950 px-8 py-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            HBK Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{subtitle}</p>
        </div>
        <div className="space-y-8">{children}</div>
      </div>
    </main>
  );
}

export function AdminSection({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function AdminInput({
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-medium text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
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
    <label className="text-sm font-medium text-slate-700">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-2 w-full rounded-[1.5rem] border border-slate-300 px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
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
    <label className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
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
      className="inline-flex rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
    >
      {label}
    </button>
  );
}

export function AdminDelete({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="inline-flex rounded-full border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
    >
      {label}
    </button>
  );
}

export function AdminStatusNotice({ status }: { status?: string }) {
  if (!status) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
      A form submission could not be saved. Please review the required fields and try again.
    </div>
  );
}
