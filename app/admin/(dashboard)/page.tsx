import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Inbox,
  Layers3,
  MessageSquareQuote,
  Newspaper,
  Users,
} from "lucide-react";

import { AdminPageHeader, StatusBadge } from "@/components/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [submissions, services, testimonials, posts, team, faqs] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.service.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.teamMember.count().catch(() => 0),
    prisma.fAQ.count().catch(() => 0),
  ]);

  const newLeads = submissions.filter((item) => item.status === "NEW").length;
  const cards = [
    { label: "New inquiries", value: newLeads, href: "/admin/inbox", icon: Inbox },
    { label: "Services", value: services, href: "/admin/services", icon: Layers3 },
    { label: "Client Feedback", value: testimonials, href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Blog posts", value: posts, href: "/admin/blog", icon: Newspaper },
    { label: "Team members", value: team, href: "/admin/team", icon: Users },
    { label: "FAQs", value: faqs, href: "/admin/faqs", icon: HelpCircle },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Monitor inquiries and jump into the content you manage most often."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.08)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <span className="rounded-lg bg-[var(--color-accent-muted)] p-2 text-[var(--color-primary)]">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.08)] sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900">Recent submissions</h2>
          <Link href="/admin/inbox" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
            View inbox
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {submissions.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.slice(0, 6).map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3 text-slate-600">{item.email}</td>
                    <td className="py-3 text-slate-600">{item.serviceInterest || "General"}</td>
                    <td className="py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 text-slate-500">{item.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No contact submissions yet.</p>
        )}
      </section>
    </div>
  );
}
