import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Landmark,
  Leaf,
  Monitor,
  ShoppingBag,
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import LiquidButton from "@/components/liquid-button";
import {
  Container,
  CtaBanner,
  ds,
  SiteFooter,
  SiteHeader,
  StatsBand,
} from "@/components/design-system";
import ScrollReveal from "@/components/scroll-reveal";
import {
  AboutPreview,
  IndustriesSection,
  ProcessSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/site";
import type {
  AboutContentData,
  CompanyStatData,
  ContactInfoData,
  DifferentiatorData,
  HeroContentData,
  IndustryData,
  ProcessStepData,
  ServiceData,
  TestimonialData,
} from "@/lib/content";

const extraServices = [
  {
    title: "Corporate Finance",
    summary: "Structured financial guidance for growth, funding, and strategic transactions.",
    icon: "BarChart3",
  },
  {
    title: "Secretarial Services",
    summary: "Company secretarial support, governance filings, and compliance documentation.",
    icon: "FileText",
  },
];

const extraIndustries = [
  { name: "Technology", icon: Monitor },
  { name: "Financial Services", icon: Landmark },
  { name: "Education", icon: GraduationCap },
  { name: "Retail", icon: ShoppingBag },
  { name: "Real Estate", icon: Building2 },
  { name: "Energy", icon: Leaf },
];

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
    <section className="bg-white pb-10 pt-10 sm:pt-14">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <ScrollReveal variant="fade-up" threshold={0} delay={0} duration={600}>
            <h1 className={`max-w-xl ${ds.h1}`}>
              Building Trust Through{" "}
              <span className="text-[var(--color-primary)]">Professional Excellence</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={150} duration={600}>
            <p className={`mt-5 max-w-lg ${ds.body}`}>{hero.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" threshold={0} delay={300} duration={600}>
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
        <ScrollReveal variant="slide-right" threshold={0} delay={200} duration={800}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
              <Image
                src="/images/hero-audit-team.png"
                alt="HBK audit professionals reviewing engagement materials"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:-left-6">
              <p className="text-xs font-medium text-slate-500">Client Satisfaction</p>
              <p className="text-lg font-bold text-[var(--color-primary)]">
                {stats[2]?.value ?? "98%"}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function BlogSection() {
  return (
    <section className={ds.section}>
      <Container>
        <ScrollReveal variant="fade-up">
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
            <ScrollReveal key={post.title} variant="fade-up" delay={index * 120}>
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
                  <h3 className="mt-2 text-base font-bold leading-snug text-slate-900">
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

function BannerImage() {
  return (
    <section className="bg-white">
      <Container>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/images/contact-banner.png"
            alt="Professional planning and financial review"
            width={1180}
            height={320}
            className="h-48 w-full object-cover sm:h-64 lg:h-72"
          />
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
  differentiators: DifferentiatorData[];
  processSteps: ProcessStepData[];
  testimonials: TestimonialData[];
  contact: ContactInfoData;
  formStatus?: string;
};

export function ReferenceHomePage(props: HomePageProps) {
  const extendedServices: ServiceData[] = [
    ...props.services,
    ...extraServices.map((service, index) => ({
      id: `extra-${index}`,
      title: service.title,
      summary: service.summary,
      details: "",
      icon: service.icon,
    })),
  ].slice(0, 6);

  const extendedIndustries: IndustryData[] = [
    ...props.industries,
    ...extraIndustries.map((industry, index) => ({
      id: `extra-industry-${index}`,
      name: industry.name,
      summary: "",
      examples: "",
    })),
  ].slice(0, 10);

  return (
    <main className="bg-white">
      <SiteHeader />
      <HomeHero hero={props.hero} stats={props.stats} />
      <StatsBand stats={props.stats} />
      <ServicesSection services={extendedServices} compact />
      <IndustriesSection industries={extendedIndustries} variant="tiles" />
      <AboutPreview about={props.about} />
      <ProcessSection steps={props.processSteps} />
      <TestimonialsSection testimonials={props.testimonials} compact />
      <BlogSection />
      <CtaBanner />
      <section className={ds.sectionMuted}>
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <ScrollReveal variant="fade-up">
              <p className={ds.eyebrow}>Contact</p>
              <h2 className={`mt-3 ${ds.h2}`}>Value-added services tailored to your needs</h2>
            </ScrollReveal>
            <ul className="mt-8 space-y-4">
              {props.differentiators.slice(0, 4).map((item, index) => (
                <ScrollReveal key={item.id ?? item.title} variant="slide-left" delay={index * 80}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-muted)] text-[var(--color-primary)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className={`mt-1 ${ds.bodySm}`}>{item.summary}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold">Visit Our Headquarters</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>{props.contact.address}</p>
                  <p>{props.contact.phone}</p>
                  <p>{props.contact.email}</p>
                  <p>{props.contact.hours}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="slide-right">
            <ContactForm variant="reference" status={props.formStatus} />
          </ScrollReveal>
        </Container>
      </section>
      <ScrollReveal variant="fade-in"><BannerImage /></ScrollReveal>
      <SiteFooter contact={props.contact} />
    </main>
  );
}
