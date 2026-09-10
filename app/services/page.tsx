import type { Metadata } from "next";

import { CTASection, PageHero, ServicesSection, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getServices, getSiteSettings } from "@/lib/content";
import { pageMetadata, truncateMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const names = services.map((service) => service.title).filter(Boolean).slice(0, 4);
  const serviceList = names.length ? names.join(", ") : "auditing, tax consulting, and accounting";

  return pageMetadata({
    title: "Audit & Tax Services",
    description: truncateMeta(
      `${serviceList} from ${settings.siteName} in Kathmandu, plus banking-purpose reports and accounting support for Nepali businesses.`,
    ),
    path: "/services",
    siteName: settings.siteName,
    image: services[0]?.image || settings.logo,
  });
}

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
