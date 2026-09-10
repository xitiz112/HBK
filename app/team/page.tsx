import type { Metadata } from "next";

import { CTASection, PageHero, SiteFooter, SiteHeader, TeamSection } from "@/components/site";
import { getContactInfo, getSiteSettings, getTeamMembers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata({
    title: "Our Team",
    description: `Meet the auditors and professionals at ${settings.siteName} who deliver audit, tax, and accounting services in Kathmandu.`,
    path: "/team",
    siteName: settings.siteName,
    image: settings.logo,
  });
}

export default async function TeamPage() {
  const [members, contact] = await Promise.all([getTeamMembers(), getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="Our Team" />
      <TeamSection members={members} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
