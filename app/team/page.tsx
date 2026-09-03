import { CTASection, PageHero, SiteFooter, SiteHeader, TeamSection } from "@/components/site";
import { getContactInfo, getTeamMembers } from "@/lib/content";

export const dynamic = "force-dynamic";

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
