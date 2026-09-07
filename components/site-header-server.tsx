import { defaultSiteSettings, getSiteSettings } from "@/lib/content";

import SiteHeaderClient from "@/components/site-header";

export async function SiteHeader({ overlapHero = false }: { overlapHero?: boolean } = {}) {
  const settings = await getSiteSettings().catch(() => defaultSiteSettings);
  return <SiteHeaderClient settings={settings} overlapHero={overlapHero} />;
}
