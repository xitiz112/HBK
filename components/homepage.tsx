import { ArrowUpRight } from "lucide-react";

import LiquidButton from "@/components/liquid-button";
import { mediaSrc } from "@/lib/media";
import {
  Container,
  CtaBanner,
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

function HomeHero({ hero }: { hero: HeroContentData }) {
  const background = mediaSrc(hero.image) || "/images/hero-office.png";
  const titleWords = hero.title.trim().split(/\s+/).filter(Boolean);
  const lastWord = titleWords.at(-1) ?? "";
  const leadingWords = titleWords.slice(0, -1).join(" ");

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center bg-scroll sm:min-h-[600px] lg:bg-fixed"
      style={{ backgroundImage: `url("${background}")` }}
    >
      <div className="absolute inset-0 bg-slate-950/60" />
      <Container className="relative z-10 flex items-center justify-center py-16 text-center sm:min-h-[600px] sm:py-24">
        <div className="relative w-full max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.58)_0%,rgba(2,6,23,0.22)_52%,transparent_76%)]"
          />
          <ScrollReveal variant="fade-up" threshold={0} delay={0} duration={650}>
            <h1 className="break-words text-[clamp(1.75rem,7.5vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.7)]">
              {leadingWords ? `${leadingWords} ` : null}
              {lastWord ? <span className="text-[var(--color-primary)]">{lastWord}</span> : null}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={220} duration={650}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[28px] text-white">{hero.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={420} duration={650}>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
      <CtaBanner />
      <ContactInquirySection contact={props.contact} formStatus={props.formStatus} returnTo="/" />
      <SiteFooter contact={props.contact} />
    </main>
  );
}
