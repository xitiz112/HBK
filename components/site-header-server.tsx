import { defaultSiteSettings, getSiteSettings } from "@/lib/content";

import SiteHeaderClient from "@/components/site-header";

export async function SiteHeader() {
  const settings = await getSiteSettings().catch(() => defaultSiteSettings);
  return <SiteHeaderClient settings={settings} />;
}
