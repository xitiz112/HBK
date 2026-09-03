import { AdminDashboardShell } from "@/components/admin-dashboard-shell";
import { getOrCreateAdminCsrfToken, requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, csrfToken] = await Promise.all([
    requireAdminSession(),
    getOrCreateAdminCsrfToken(),
  ]);

  return (
    <AdminDashboardShell userName={session.name} userEmail={session.email} csrfToken={csrfToken}>
      {children}
    </AdminDashboardShell>
  );
}
