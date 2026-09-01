import { CTASection, IndustriesSection, PageHero, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getIndustries } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const [industries, contact] = await Promise.all([getIndustries(), getContactInfo()]);

  return (
    <main className="bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="Industries"
        title="Industry-specific insight that reflects how organizations actually operate."
        description="We support clients across operationally diverse sectors by adjusting our approach to the control environment, reporting expectations, and compliance realities of each industry."
      />
      <IndustriesSection industries={industries} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
