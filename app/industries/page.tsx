import { CTASection, IndustriesSection, PageHero, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getIndustries } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const [industries, contact] = await Promise.all([getIndustries(), getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="Industries worked" />
      <IndustriesSection industries={industries} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
