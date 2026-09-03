import { CTASection, PageHero, ServicesSection, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getServices } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, contact] = await Promise.all([getServices(), getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="Our Services" />
      <ServicesSection services={services} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
