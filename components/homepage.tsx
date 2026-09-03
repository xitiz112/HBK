import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";

import { ContentImage } from "@/components/content-image";
import LiquidButton from "@/components/liquid-button";
import {
  Container,
  CtaBanner,
  ds,
  StatsBand,
} from "@/components/design-system";
import ScrollReveal from "@/components/scroll-reveal";
import {
  AboutPreview,
  ContactInquirySection,
  IndustriesSection,
  ProcessSection,
  ServicesSection,
  SiteFooter,
  SiteHeader,
  TestimonialsSection,
} from "@/components/site";
import type {
  AboutContentData,
  CompanyStatData,
  ContactInfoData,
  HeroContentData,
  IndustryData,
  ProcessStepData,
  ServiceData,
  TestimonialData,
} from "@/lib/content";

const blogPosts = [
  {
    image: "/images/blog-controls.png",
    category: "Internal Controls",
    title: "How internal controls reduce audit risk",
    excerpt:
      "Simple control improvements can shorten review cycles and improve reporting confidence.",
  },
  {
    image: "/images/blog-tax.png",
    category: "Tax Planning",
    title: "Preparing financial records before year-end",
    excerpt:
      "A practical checklist for management teams that want a smoother close and cleaner audit trail.",
  },
  {
    image: "/images/blog-analytics.png",
    category: "Advisory",
    title: "What boards should expect from assurance partners",
    excerpt:
      "The right engagement should provide insight, not just compliance paperwork.",
  },
];

function HomeHero({ hero, stats }: { hero: HeroContentData; stats: CompanyStatData[] }) {
  return (
    <section className="pb-10 pt-3 sm:pt-5">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <ScrollReveal variant="fade-up" threshold={0} delay={0} duration={650}>
            <h1 className="max-w-xl text-[40px] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[52px]">
              Building Trust Through{" "}
              <span className="text-[var(--color-primary)]">Professional Excellence</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={220} duration={650}>
            <p className={`mt-5 max-w-lg ${ds.body}`}>{hero.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={420} duration={650}>
            <div className="mt-8 flex flex-wrap gap-3">
              <LiquidButton href={hero.primaryCtaHref} variant="primary">
                {hero.primaryCtaText}
              </LiquidButton>
              <LiquidButton href={hero.secondaryCtaHref} variant="secondary">
                {hero.secondaryCtaText}
              </LiquidButton>
            </div>
          </ScrollReveal>
        </div>
        <div className="relative">
          <ScrollReveal variant="slide-right" threshold={0} delay={700} duration={850}>
            <div className="hbk-float relative aspect-square w-full [filter:drop-shadow(0_20px_50px_rgba(15,23,42,0.12))]">
              <ContentImage
                src={hero.image}
                fallback="/images/hero-audit-team.png"
                alt="HBK audit professionals reviewing engagement materials"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                curvy
                priority
              />
            </div>
          </ScrollReveal>
          <ScrollReveal
            variant="fade-up"
            threshold={0}
            delay={980}
            duration={600}
            className="absolute bottom-6 left-4 z-20 sm:bottom-8 sm:left-6"
          >
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
              <p className="text-xs font-medium text-slate-500">Client Satisfaction</p>
              <p className="text-lg font-bold text-[var(--color-primary)]">
                {stats[2]?.value ?? "98%"}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function BlogSection() {
  return (
    <section className={ds.section}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={ds.eyebrow}>Insights</p>
              <h2 className={`mt-3 ${ds.h2}`}>Stay Updated with Latest Insights</h2>
            </div>
            <Link href="/contact" className={`${ds.link} hover:underline`}>
              View All
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.title} variant="fade-up" delay={200 + index * 160}>
              <article className={`overflow-hidden ${ds.card}`}>
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900">
                    {post.title}
                  </h3>
                  <p className={`mt-2 ${ds.bodySm}`}>{post.excerpt}</p>
                  <Link href="/contact" className={`mt-4 ${ds.link}`}>
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

type HomePageProps = {
  hero: HeroContentData;
  stats: CompanyStatData[];
  services: ServiceData[];
  industries: IndustryData[];
  about: AboutContentData;
  processSteps: ProcessStepData[];
  testimonials: TestimonialData[];
  contact: ContactInfoData;
  formStatus?: string;
};

export function ReferenceHomePage(props: HomePageProps) {
  return (
    <main className="bg-background">
      <SiteHeader />
      <HomeHero hero={props.hero} stats={props.stats} />
      <StatsBand stats={props.stats} delay={1450} />
      <ServicesSection services={props.services} compact />
      <IndustriesSection industries={props.industries} variant="tiles" />
      <AboutPreview about={props.about} />
      <ProcessSection steps={props.processSteps} />
      <TestimonialsSection testimonials={props.testimonials} />
      <BlogSection />
      <CtaBanner />
      <ContactInquirySection contact={props.contact} formStatus={props.formStatus} returnTo="/" />
      <SiteFooter contact={props.contact} />
    </main>
  );
}
