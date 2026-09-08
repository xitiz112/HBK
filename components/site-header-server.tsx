import { defaultSiteSettings, getIndustries, getServices, getSiteSettings } from "@/lib/content";

import SiteHeaderClient from "@/components/site-header";

export async function SiteHeader({ overlapHero = false }: { overlapHero?: boolean } = {}) {
  const [settings, services, industries] = await Promise.all([
    getSiteSettings().catch(() => defaultSiteSettings),
    getServices(),
    getIndustries(),
  ]);

  return (
    <SiteHeaderClient
      settings={settings}
      overlapHero={overlapHero}
      serviceItems={services.map((service) => ({ label: service.title, href: "/services" }))}
      industryItems={industries.map((industry) => ({ label: industry.name, href: "/industries" }))}
    />
  );
}
