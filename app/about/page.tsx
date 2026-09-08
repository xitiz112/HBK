import { AboutPreview, PageHero, SiteFooter, SiteHeader } from "@/components/site";
import { getAboutContent, getContactInfo } from "@/lib/content";

export const dynamic = "force-dynamic";

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
