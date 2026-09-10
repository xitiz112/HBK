import type { Metadata } from "next";

import { CTASection, IndustriesSection, PageHero, SiteFooter, SiteHeader } from "@/components/site";
import { getContactInfo, getIndustries, getSiteSettings } from "@/lib/content";
import { pageMetadata, truncateMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, industries] = await Promise.all([getSiteSettings(), getIndustries()]);
  const names = industries.map((industry) => industry.name).filter(Boolean).slice(0, 5);
  const industryList = names.length
    ? names.join(", ")
    : "construction, manpower, news portal, advertisement, and software";

  return pageMetadata({
    title: "Industries",
    description: truncateMeta(
      `${settings.siteName} supports ${industryList} companies in Nepal with audit, tax, and accounting services.`,
    ),
    path: "/industries",
    siteName: settings.siteName,
    image: industries[0]?.image || settings.logo,
  });
}

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
