import { CTASection, PageHero, ServicesSection, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getServices } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, contact] = await Promise.all([getServices(), getContactInfo()]);

  return (
    <main className="bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="Services"
        title="Independent audit, tax, and advisory support for organizations that need confidence."
        description="Our service model combines technical rigor with practical business context so management teams, boards, and owners receive recommendations they can actually use."
      />
      <ServicesSection services={services} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
