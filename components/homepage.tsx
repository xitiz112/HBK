import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { CardsCarousel } from "@/components/cards-carousel";
import LiquidButton from "@/components/liquid-button";
import { mediaSrc } from "@/lib/media";
import {
  Container,
  CtaBanner,
  ds,
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

function HomeHero({ hero }: { hero: HeroContentData }) {
  const background = mediaSrc(hero.image) || "/images/hero-office.png";
  const titleWords = hero.title.trim().split(/\s+/).filter(Boolean);
  const lastWord = titleWords.at(-1) ?? "";
  const leadingWords = titleWords.slice(0, -1).join(" ");

  return (
    <section
      className="relative isolate min-h-[520px] overflow-hidden bg-cover bg-center bg-fixed sm:min-h-[600px]"
      style={{ backgroundImage: `url("${background}")` }}
    >
      <div className="absolute inset-0 bg-slate-950/60" />
      <Container className="relative z-10 flex min-h-[520px] items-center justify-center py-16 text-center sm:min-h-[600px] sm:py-24">
        <div className="relative max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-48px] -z-10 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.58)_0%,rgba(2,6,23,0.22)_52%,transparent_76%)]"
          />
          <ScrollReveal variant="fade-up" threshold={0} delay={0} duration={650}>
            <h1 className="text-[40px] font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.7)] sm:text-[52px]">
              {leadingWords ? `${leadingWords} ` : null}
              {lastWord ? <span className="text-[var(--color-primary)]">{lastWord}</span> : null}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={220} duration={650}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[28px] text-white">{hero.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={420} duration={650}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LiquidButton href={hero.primaryCtaHref} variant="primary" className="!border-0 hover:!border-0">
                {hero.primaryCtaText}
                <ArrowUpRight className="h-4 w-4" />
              </LiquidButton>
              <LiquidButton href={hero.secondaryCtaHref} variant="secondary" className="!border-0 hover:!border-0">
                {hero.secondaryCtaText}
              </LiquidButton>
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
              <p className={ds.eyebrow}>Blog</p>
              <h2 className={`mt-3 ${ds.h2}`}>Blog</h2>
            </div>
            <Link href="/contact" className={`${ds.link} hover:underline`}>
              View All
            </Link>
          </div>
        </ScrollReveal>
        <CardsCarousel
          ariaLabel="Blog"
          prevLabel="Previous posts"
          nextLabel="Next posts"
        >
          {blogPosts.map((post) => (
            <article key={post.title} className={`flex h-full flex-col overflow-hidden ${ds.card}`}>
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
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
          ))}
        </CardsCarousel>
      </Container>
    </section>
  );
}

type HomePageProps = {
  hero: HeroContentData;
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
      <HomeHero hero={props.hero} />
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
