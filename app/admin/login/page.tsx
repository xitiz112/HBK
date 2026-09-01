import { redirect } from "next/navigation";

import { loginAdmin } from "@/app/admin/actions";
import { AdminCsrfField } from "@/components/admin";
import { getAdminSession, getOrCreateAdminCsrfToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [session, csrfToken, { status }] = await Promise.all([
    getAdminSession(),
    getOrCreateAdminCsrfToken(),
    searchParams,
  ]);

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto grid w-full max-w-5xl gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <section className="rounded-[1.75rem] bg-slate-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">HBK Admin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Manage your website content</h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Sign in to update homepage messaging, services, industries, testimonials, and review contact submissions from one place.
          </p>
        </section>
        <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Secure Login
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">Welcome back</h2>
          {status ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {status === "invalid-request"
                ? "Your session request could not be verified. Please try again."
                : "Invalid credentials. Please try again."}
            </div>
          ) : null}
          <form action={loginAdmin} className="mt-8 space-y-5">
            <AdminCsrfField token={csrfToken} />
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="admin@hbkassociates.com"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Enter your password"
              />
            </label>
            <button
              type="submit"
              className="inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              Sign In
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
