import { localBusinessJsonLd } from "@/lib/seo";
import type { ContactInfoData, SiteSettingsData } from "@/lib/content";

export function JsonLd({
  settings,
  contact,
}: {
  settings: SiteSettingsData;
  contact: ContactInfoData;
}) {
  const json = JSON.stringify(localBusinessJsonLd(settings, contact)).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
