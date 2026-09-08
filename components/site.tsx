import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Factory,
  HardHat,
  HeartPulse,
  Landmark,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  Phone,
  Users,
} from "lucide-react";

import { CardsCarousel } from "@/components/cards-carousel";
import { ContactForm } from "@/components/contact-form";
import { ContentImage } from "@/components/content-image";
import { IndustryCards } from "@/components/industry-card";
import { LocationMap } from "@/components/location-map";
import { ProcessSteps } from "@/components/process-steps";
import { ServiceCards } from "@/components/service-card";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

import {
  ButtonLink,
  Container,
  CtaBanner,
  ds,
  PageHero,
  SectionHeading,
  StatsBand,
  StatusNotice,
} from "@/components/design-system";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header-server";
import ScrollReveal from "@/components/scroll-reveal";
import type {
  AboutContentData,
  ContactInfoData,
  DifferentiatorData,
  IndustryData,
  ProcessStepData,
  ServiceData,
  TeamMemberData,
  TestimonialData,
} from "@/lib/content";

export {
  CtaBanner as CTASection,
  PageHero,
  SiteFooter,
  SiteHeader,
  StatsBand as StatsStrip,
  StatusNotice,
};

type IconComponent = typeof Briefcase;

const SERVICE_IMAGE_FALLBACKS: Record<string, string> = {
  "service-audit": "/images/service-audit.png",
  "service-tax": "/images/service-tax.png",
  "service-banking-report": "/images/service-banking.png",
  "service-accounting": "/images/service-accounting.png",
  ShieldCheck: "/images/service-audit.png",
  Receipt: "/images/service-tax.png",
  FileText: "/images/service-banking.png",
  Calculator: "/images/service-accounting.png",
};

const INDUSTRY_IMAGE_FALLBACKS: Record<string, string> = {
  "industry-construction": "/images/industry-construction.png",
  "industry-manpower": "/images/industry-manpower.png",
  "industry-newsportal": "/images/industry-newsportal.png",
  "industry-advertisement": "/images/industry-advertisement.png",
  "industry-software": "/images/industry-software.png",
};

function serviceCardImage(service: ServiceData) {
  return (
    service.image ||
    (service.id ? SERVICE_IMAGE_FALLBACKS[service.id] : undefined) ||
    SERVICE_IMAGE_FALLBACKS[service.icon]
  );
}

function industryCardImage(industry: IndustryData) {
  if (industry.image) {
    return industry.image;
  }
  if (industry.id && INDUSTRY_IMAGE_FALLBACKS[industry.id]) {
    return INDUSTRY_IMAGE_FALLBACKS[industry.id];
  }
  const key = industry.name.toLowerCase();
  if (/construct|contractor|builder|civil/.test(key)) return INDUSTRY_IMAGE_FALLBACKS["industry-construction"];
  if (/manpower|staff|recruit|labour|labor/.test(key)) return INDUSTRY_IMAGE_FALLBACKS["industry-manpower"];
  if (/news|media|portal|press/.test(key)) return INDUSTRY_IMAGE_FALLBACKS["industry-newsportal"];
  if (/advert|marketing|agency/.test(key)) return INDUSTRY_IMAGE_FALLBACKS["industry-advertisement"];
  if (/software|tech|it\b|digital|saas/.test(key)) return INDUSTRY_IMAGE_FALLBACKS["industry-software"];
  return undefined;
}

function getIndustryIcon(industry: Pick<IndustryData, "id" | "name">): IconComponent {
  const key = `${industry.id ?? ""} ${industry.name}`.toLowerCase();
  if (/construct|contractor|builder|civil/.test(key)) return HardHat;
  if (/manpower|staff|recruit|labour|labor|payroll|human/.test(key)) return Users;
  if (/news|media|portal|press|journal/.test(key)) return Newspaper;
  if (/advert|marketing|agency|campaign|brand/.test(key)) return Megaphone;
  if (/software|tech|it\b|digital|saas/.test(key)) return MonitorSmartphone;
  if (/manufactur|factory|product/.test(key)) return Factory;
  if (/real estate|property|housing/.test(key)) return Building2;
  if (/health|hospital|medical/.test(key)) return HeartPulse;
  if (/bank|financ|insurance/.test(key)) return Landmark;
  if (/government|npo|ngo|public/.test(key)) return Landmark;
  return Briefcase;
}

function MediaThumb({
  src,
  alt,
  circle = false,
  children,
}: {
  src?: string | null;
  alt: string;
  circle?: boolean;
  children: React.ReactNode;
}) {
  if (src) {
    return (
      <span className={`relative block h-11 w-11 overflow-hidden ${circle ? "rounded-full" : "rounded-lg"}`}>
        <ContentImage src={src} alt={alt} fill className="object-cover" sizes="44px" curvy={false} />
      </span>
    );
  }
  return children;
}

export function AboutPreview({ about }: { about: AboutContentData }) {
  return (
    <section className={ds.section}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <ScrollReveal variant="slide-left" delay={200}>
            <SectionHeading
              eyebrow="About Us"
              title="Our Story"
              description={about.story}
              descriptionClassName="text-[17px] leading-[28px] text-slate-600"
            />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={280}>
            <p className={`mt-4 ${ds.body}`}>{about.mission}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={380}>
            <ButtonLink href="/about" className="mt-8">
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ScrollReveal>
        </div>
        <ScrollReveal variant="slide-right" delay={280}>
          <div className="group img-curvy relative aspect-square w-full max-w-lg overflow-hidden [filter:drop-shadow(0_18px_36px_rgba(15,23,42,0.12))] lg:max-w-none">
            <ContentImage
              src={about.image}
              fallback="/images/about-office.png"
              alt="HBK & Associates professional team"
              width={800}
              height={800}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="block h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110 group-hover:scale-110"
              curvy={false}
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function ServicesSection({
  services,
  compact = false,
}: {
  services: ServiceData[];
  compact?: boolean;
}) {
  const rows = compact ? services.slice(0, 6) : services;

  return (
    <section className={ds.sectionMuted}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <SectionHeading
            align="center"
            eyebrow="Our Services"
            title="What we do"
            description="Audit, tax, and accounting services."
          />
        </ScrollReveal>
        <ServiceCards
          cards={rows.map((service, index) => ({
            id: service.id ?? `${service.title}-${index}`,
            title: service.title,
            description: service.details || service.summary,
            image: serviceCardImage(service),
            icon: service.icon,
          }))}
        />
        {compact ? (
          <div className="relative z-20 mt-10 flex justify-center">
            <ButtonLink href="/services" aria-label="View all services">
              View All
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function IndustriesSection({
  industries,
  variant = "cards",
}: {
  industries: IndustryData[];
  variant?: "cards" | "tiles";
}) {
  if (variant === "tiles") {
    return (
      <section className={ds.sectionBrand}>
        <Container>
          <ScrollReveal variant="fade-up" delay={200}>
            <SectionHeading
              align="center"
              eyebrow="Industries"
              title="Who we work with"
              description="Businesses we support across different sectors."
            />
          </ScrollReveal>
          <CardsCarousel
            ariaLabel="Industries"
            prevLabel="Previous industries"
            nextLabel="Next industries"
            className="mt-12"
          >
            {industries.map((industry) => {
              const Icon = getIndustryIcon(industry);
              const image = industryCardImage(industry);
              return (
                <div
                  key={industry.id ?? industry.name}
                  className={`relative flex h-full min-h-[210px] flex-col items-center justify-end overflow-hidden ${ds.card} p-0`}
                >
                  {image ? (
                    <ContentImage src={image} alt={industry.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" curvy={false} />
                  ) : (
                    <div className="absolute inset-0 bg-[var(--color-secondary-muted)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                  <div className="relative z-10 flex w-full flex-col items-center px-3 py-5 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-[18px] font-semibold text-white">{industry.name}</p>
                  </div>
                </div>
              );
            })}
          </CardsCarousel>
          <div className="relative z-20 mt-10 flex justify-center">
            <ButtonLink href="/industries" aria-label="View all industries">
              View All
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={ds.section}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <SectionHeading
            align="center"
            eyebrow="Industries Served"
            title="Who we work with"
            description="Businesses we support across different sectors."
          />
        </ScrollReveal>
        <IndustryCards
          cards={industries.map((industry, index) => ({
            id: industry.id ?? `${industry.name}-${index}`,
            name: industry.name,
            summary: industry.summary,
            examples: industry.examples,
            image: industryCardImage(industry),
          }))}
        />
      </Container>
    </section>
  );
}

export function ProcessSection({ steps }: { steps: ProcessStepData[] }) {
  return (
    <section className={ds.section}>
      <Container>
        <div className="rounded-2xl bg-[var(--color-accent-muted)] px-6 py-12 sm:px-10 sm:py-14">
          <ScrollReveal variant="fade-up" delay={200}>
            <SectionHeading
              align="center"
              eyebrow="Our Process"
              title="How we work"
              description="A simple process from start to finish."
            />
          </ScrollReveal>
          <ProcessSteps steps={steps} />
        </div>
      </Container>
    </section>
  );
}

export function WhyChooseUsSection({
  differentiators,
}: {
  differentiators: DifferentiatorData[];
}) {
  return (
    <section className={ds.sectionMuted}>
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <ScrollReveal variant="slide-left" delay={200}>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Why work with us"
              description="Clear work, clear advice, and practical next steps."
            />
          </ScrollReveal>
          <ul className="mt-8 space-y-4">
            {differentiators.slice(0, 4).map((item, index) => (
              <ScrollReveal key={item.id ?? item.title} variant="slide-left" delay={200 + index * 120}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-secondary-muted)] text-[var(--color-primary)]">
                    {item.image ? (
                      <ContentImage src={item.image} alt={item.title} width={28} height={28} className="h-full w-full object-cover" curvy={false} />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className={`mt-1 ${ds.bodySm}`}>{item.summary}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <ScrollReveal key={item.id ?? item.title} variant="fade-up" delay={200 + index * 120}>
              <div className={`${ds.card} ${ds.cardPadding}`}>
                <MediaThumb src={item.image} alt={item.title}>
                  <span className={ds.iconBox}>
                    <Check className="h-5 w-5" />
                  </span>
                </MediaThumb>
                <h3 className={`mt-5 ${ds.h3}`}>{item.title}</h3>
                <p className={`mt-2 ${ds.bodySm}`}>{item.summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TeamSection({ members }: { members: TeamMemberData[] }) {
  return (
    <section className={ds.section}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <SectionHeading
            align="center"
            eyebrow="Team"
            title="Our team"
            description="The people who work on your files."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <ScrollReveal key={member.id ?? member.name} variant="fade-up" delay={200 + index * 120}>
              <article className={`${ds.card} overflow-hidden`}>
                <div className="relative h-56 w-full bg-[var(--color-secondary-muted)]">
                  <ContentImage
                    src={member.avatar}
                    fallback="/images/team-placeholder.svg"
                    alt={member.avatar ? member.name : ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={ds.cardPadding}>
                  <h3 className={ds.h3}>{member.name}</h3>
                  <p className="mt-1 text-[15px] font-semibold text-[var(--color-primary)]">{member.role}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {member.qualifications}
                  </p>
                  {member.email ? (
                    <p className="mt-3 text-sm text-slate-600">{member.email}</p>
                  ) : null}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: TestimonialData[];
}) {
  return (
    <section className={ds.sectionMuted}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <SectionHeading
            align="center"
            eyebrow="Client Feedback"
            title="What clients say"
            description="Feedback from the people we work with."
          />
        </ScrollReveal>
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}

export function ContactSection({ contact }: { contact: ContactInfoData }) {
  return (
    <div className={`rounded-xl border border-white/20 bg-[var(--color-primary)] text-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_6px_16px_0px_rgba(99,99,99,0.25)] ${ds.cardPadding}`}>
      {contact.image ? (
        <div className="relative mb-6 h-40 [filter:drop-shadow(0_12px_24px_rgba(15,23,42,0.1))]">
          <ContentImage
            src={contact.image}
            alt={contact.officeTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      ) : null}
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Contact Information</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{contact.officeTitle}</h2>
        <p className="mt-3 text-[16px] leading-[1.5] text-white/80">
          Call or email us.
        </p>
      </div>
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-white/80">
        <div className="flex gap-4">
          <Phone className="mt-1 h-5 w-5 text-white" />
          <div>
            <p className="font-semibold text-white">Phone</p>
            <p>{contact.phone}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Mail className="mt-1 h-5 w-5 text-white" />
          <div>
            <p className="font-semibold text-white">Email</p>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Building2 className="mt-1 h-5 w-5 text-white" />
          <div>
            <p className="font-semibold text-white">Office</p>
            <p>{contact.address}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-white/10 p-6 text-white">
        <p className="text-sm font-semibold">Business Hours</p>
        <p className="mt-2 text-[15px] leading-7 text-white/80">{contact.hours}</p>
      </div>
      {contact.mapEmbedUrl ? (
        <Link
          href={contact.mapEmbedUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline"
        >
          View map location
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

export function ContactInquirySection({
  contact,
  formStatus,
  returnTo = "/contact",
}: {
  contact: ContactInfoData;
  formStatus?: string;
  returnTo?: string;
}) {
  return (
    <>
      <section className={ds.sectionMuted}>
        <Container>
          <ScrollReveal variant="fade-up" delay={200}>
            <SectionHeading
              align="center"
              eyebrow="Contact Us"
              title="Get in touch"
              description="Call, email, or send a message."
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <ScrollReveal variant="fade-up" delay={200}>
              <ContactSection contact={contact} />
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={220}>
              <ContactForm status={formStatus} returnTo={returnTo} />
            </ScrollReveal>
          </div>
        </Container>
      </section>
      <LocationMapSection contact={contact} />
    </>
  );
}

export function LocationMapSection({ contact }: { contact: ContactInfoData }) {
  if (!contact.mapEmbedUrl && !contact.address) {
    return null;
  }

  return (
    <section className={ds.section}>
      <Container>
        <ScrollReveal variant="fade-up" delay={200}>
          <SectionHeading
            align="center"
            eyebrow="Our Location"
            title="Our office"
            description={contact.address}
          />
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={280}>
          <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <LocationMap mapUrl={contact.mapEmbedUrl} address={contact.address} title={contact.officeTitle} />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
