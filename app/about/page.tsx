import {
  AboutPreview,
  ContactSection,
  PageHero,
  SiteFooter,
  SiteHeader,
  StatsStrip,
  WhyChooseUsSection,
} from "@/components/site";
import { Container } from "@/components/design-system";
import {
  getAboutContent,
  getCompanyStats,
  getContactInfo,
  getDifferentiators,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [about, stats, differentiators, contact] = await Promise.all([
    getAboutContent(),
    getCompanyStats(),
    getDifferentiators(),
    getContactInfo(),
  ]);

  return (
    <main className="bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="About HBK"
        title={about.heroTitle}
        description={about.story}
      />
      <AboutPreview about={about} />
      <StatsStrip stats={stats} />
      <WhyChooseUsSection differentiators={differentiators} />
      <section className="pb-16 sm:pb-20">
        <Container>
          <ContactSection contact={contact} />
        </Container>
      </section>
      <SiteFooter contact={contact} />
    </main>
  );
}
