import type { Metadata } from "next";

import { AboutPreview, PageHero, SiteFooter, SiteHeader } from "@/components/site";
import { getAboutContent, getContactInfo, getSiteSettings } from "@/lib/content";
import { pageMetadata, truncateMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, about] = await Promise.all([getSiteSettings(), getAboutContent()]);

  return pageMetadata({
    title: "About",
    description: truncateMeta(
      about.story ||
        "Learn about HBK & Associates, a Kathmandu audit, tax, and accounting firm established in 2058 B.S. by Hari Bahadur Karki.",
    ),
    path: "/about",
    siteName: settings.siteName,
    image: about.image || settings.logo,
  });
}

export default async function AboutPage() {
  const [about, contact] = await Promise.all([getAboutContent(), getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="About" />
      <AboutPreview about={about} />
      <SiteFooter contact={contact} />
    </main>
  );
}
