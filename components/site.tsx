import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  Check,
  Factory,
  FileText,
  HardHat,
  HeartPulse,
  Landmark,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  Phone,
  Receipt,
  ShieldCheck,
  Users,
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { ContentImage } from "@/components/content-image";
import { LocationMap } from "@/components/location-map";
import { ProcessSteps } from "@/components/process-steps";
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

type IconComponent = typeof ShieldCheck;

const serviceIcons: Record<string, IconComponent> = {
  ShieldCheck,
  Receipt,
  Briefcase,
  BarChart3,
  FileText,
  Calculator,
};

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
              title="The HBK & Associates Story"
              description={about.story}
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
          <div className="relative aspect-square w-full max-w-lg [filter:drop-shadow(0_18px_36px_rgba(15,23,42,0.12))] lg:max-w-none">
            <ContentImage
              src={about.image}
              fallback="/images/about-office.png"
              alt="HBK & Associates professional team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              curvy
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
            title="Comprehensive Solutions for Your Business"
            description="From independent assurance to tax and advisory support, we help organizations build confidence in their reporting and decision-making."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? ShieldCheck;
            return (
              <ScrollReveal key={service.id ?? `${service.title}-${index}`} variant="fade-up" delay={200 + index * 120}>
              <div
                className="group h-[280px] [perspective:1000px]"
              >
                {/* Flip container */}
                <div className="relative h-[280px] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* Front face */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] [backface-visibility:hidden]">
                    <MediaThumb src={service.image} alt={service.title}>
                      <div className={ds.iconBox}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </MediaThumb>
                    <h3 className={`mt-5 ${ds.h3}`}>{service.title}</h3>
                    <p className={`mt-2 ${ds.bodySm}`}>{service.summary}</p>
                  </div>

                  {/* Back face */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-[var(--color-primary)] p-6 pb-10 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <MediaThumb src={service.image} alt={service.title}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </MediaThumb>
                    <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-[15px] leading-6 text-blue-100">
                      {service.details || service.summary}
                    </p>
                    <Link
                      href="/services"
                      className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-lg border border-white bg-white px-5 py-2.5 text-base font-semibold text-[var(--color-primary)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-blue-50"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                </div>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
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
              title="Empowering a Wide Range of Industries"
              description="We tailor our audit and advisory approach to sector-specific risks, reporting expectations, and compliance realities."
            />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {industries.map((industry, index) => {
              const Icon = getIndustryIcon(industry);
              return (
                <ScrollReveal key={industry.id ?? industry.name} variant="fade-up" delay={200 + index * 90}>
                  <div className={`flex flex-col items-center ${ds.card} px-3 py-6 text-center`}>
                    <div className={ds.iconCircle}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-800">{industry.name}</p>
                  </div>
                </ScrollReveal>
              );
            })}
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
            title="Cross-sector experience grounded in real operational context"
            description="We tailor our work to each industry's reporting expectations, compliance pressure points, and internal control realities."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = getIndustryIcon(industry);
            return (
              <ScrollReveal key={industry.id ?? industry.name} variant="fade-up" delay={200 + index * 120}>
                <div className={`${ds.card} ${ds.cardPadding}`}>
                  <div className={ds.iconBox}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[22px] font-bold text-slate-900">{industry.name}</h3>
                  <p className={`mt-2 ${ds.bodySm}`}>{industry.summary}</p>
                  <p className="mt-3 text-base leading-6 text-slate-500">{industry.examples}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
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
              title="Delivering Excellence, Every Time"
              description="A transparent, milestone-led workflow from discovery through reporting."
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
              title="Value-added services tailored to your needs"
              description="Clients choose HBK & Associates for independent thinking, clear communication, and recommendations that can be acted on without delay."
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
            title="The people behind HBK & Associates"
            description="Our partners and managers bring audit, tax, and advisory experience across Nepal’s key industries."
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
            eyebrow="Client Feedback"
            title="Trusted by Businesses Like Yours"
            description="Our clients value direct communication, structured execution, and recommendations that support better governance and reporting decisions."
          />
        </ScrollReveal>
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}

export function ContactSection({ contact }: { contact: ContactInfoData }) {
  return (
    <div className={`${ds.card} ${ds.cardPadding}`}>
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
      <SectionHeading
        eyebrow="Contact Information"
        title={contact.officeTitle}
        description="Reach our team directly for audit, tax, or advisory support."
      />
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-slate-600">
        <div className="flex gap-4">
          <Phone className="mt-1 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <p className="font-semibold text-slate-900">Phone</p>
            <p>{contact.phone}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Mail className="mt-1 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <p className="font-semibold text-slate-900">Email</p>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Building2 className="mt-1 h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <p className="font-semibold text-slate-900">Office</p>
            <p>{contact.address}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white">
        <p className="text-sm font-semibold">Business Hours</p>
        <p className="mt-2 text-[15px] leading-7 text-slate-300">{contact.hours}</p>
      </div>
      {contact.mapEmbedUrl ? (
        <Link href={contact.mapEmbedUrl} target="_blank" rel="noreferrer" className={`mt-6 ${ds.link}`}>
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
              title="Start a Conversation With Our Team"
              description="Call, email, or send a consultation request. We will follow up with the right audit, tax, or advisory support for your organization."
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
            title="Visit Our Office"
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
