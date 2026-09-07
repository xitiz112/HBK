import {
  AboutPreview,
  PageHero,
  SiteFooter,
  SiteHeader,
  StatsStrip,
} from "@/components/site";
import {
  getAboutContent,
  getCompanyStats,
  getContactInfo,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [about, stats, contact] = await Promise.all([
    getAboutContent(),
    getCompanyStats(),
    getContactInfo(),
  ]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="About" />
      <AboutPreview about={about} />
      <StatsStrip stats={stats} />
      <SiteFooter contact={contact} />
    </main>
  );
}
