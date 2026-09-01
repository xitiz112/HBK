import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  Factory,
  FileText,
  HeartPulse,
  Landmark,
  Mail,
  Phone,
  Receipt,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  ButtonLink,
  Container,
  CtaBanner,
  ds,
  PageHero,
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StatsBand,
  StatusNotice,
} from "@/components/design-system";
import ScrollReveal from "@/components/scroll-reveal";
import type {
  AboutContentData,
  ContactInfoData,
  DifferentiatorData,
  IndustryData,
  ProcessStepData,
  ServiceData,
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
};

const industryIcons = [Factory, Building2, HeartPulse, Landmark];

export function AboutPreview({ about }: { about: AboutContentData }) {
  return (
    <section className={ds.section}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <ScrollReveal variant="slide-left">
            <SectionHeading
              eyebrow="About Us"
              title="The HBK & Associates Story"
              description={about.story}
            />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <p className={`mt-4 ${ds.body}`}>{about.mission}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={200}>
            <ButtonLink href="/about" className="mt-8">
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ScrollReveal>
        </div>
        <ScrollReveal variant="slide-right" delay={100}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <Image
              src="/images/about-office.png"
              alt="HBK & Associates professional team"
              width={560}
              height={420}
              className="h-auto w-full rounded-xl object-cover"
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
        <ScrollReveal variant="fade-up">
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
              <ScrollReveal key={service.id ?? `${service.title}-${index}`} variant="fade-up" delay={index * 80}>
              <div
                className="group h-[280px] [perspective:1000px]"
              >
                {/* Flip container */}
                <div className="relative h-[280px] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                  {/* Front face */}
                  <div className="absolute inset-0 flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] [backface-visibility:hidden]">
                    <div className={ds.iconBox}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className={`mt-5 ${ds.h3}`}>{service.title}</h3>
                    <p className={`mt-2 ${ds.bodySm}`}>{service.summary}</p>
                    <span className={`mt-auto pt-4 ${ds.link}`}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Back face */}
                  <div className="absolute inset-0 flex flex-col rounded-xl bg-[var(--color-primary)] p-6 pb-10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-blue-100">
                      {service.details || service.summary}
                    </p>
                    {/* Button hangs over the bottom edge */}
                    <Link
                      href="/services"
                      className="absolute bottom-0 left-6 inline-flex translate-y-1/2 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-blue-50"
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
          <ScrollReveal variant="fade-up">
            <SectionHeading
              align="center"
              eyebrow="Industries"
              title="Empowering a Wide Range of Industries"
              description="We tailor our audit and advisory approach to sector-specific risks, reporting expectations, and compliance realities."
            />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {industries.map((industry, index) => {
              const Icon = industryIcons[index % industryIcons.length];
              return (
                <ScrollReveal key={industry.id ?? industry.name} variant="fade-up" delay={index * 50}>
                  <div className={`flex flex-col items-center ${ds.card} px-3 py-6 text-center`}>
                    <div className={ds.iconCircle}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">{industry.name}</p>
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
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Industries Served"
            title="Cross-sector experience grounded in real operational context"
            description="We tailor our work to each industry's reporting expectations, compliance pressure points, and internal control realities."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = industryIcons[index % industryIcons.length];
            return (
              <ScrollReveal key={industry.id ?? industry.name} variant="fade-up" delay={index * 80}>
                <div className={`${ds.card} ${ds.cardPadding}`}>
                  <div className={ds.iconBox}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mt-5 ${ds.h3}`}>{industry.name}</h3>
                  <p className={`mt-2 ${ds.bodySm}`}>{industry.summary}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{industry.examples}</p>
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
          <ScrollReveal variant="fade-up">
            <SectionHeading
              align="center"
              eyebrow="Our Process"
              title="Delivering Excellence, Every Time"
              description="A transparent, milestone-led workflow from discovery through reporting."
            />
          </ScrollReveal>
          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-[12%] right-[12%] top-5 h-0.5 bg-[var(--color-accent-soft)]" />
            <div className="relative grid grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <ScrollReveal key={step.id ?? step.number} variant="fade-up" delay={index * 120}>
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                      {step.number}
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-900">{step.title}</h3>
                    <p className={`mt-2 ${ds.bodySm}`}>{step.summary}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
            {steps.map((step, index) => (
              <ScrollReveal key={step.id ?? step.number} variant="fade-up" delay={index * 100}>
                <div className={`${ds.card} p-5`}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className={`mt-2 ${ds.bodySm}`}>{step.summary}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
          <ScrollReveal variant="slide-left">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Value-added services tailored to your needs"
              description="Clients choose HBK & Associates for independent thinking, clear communication, and recommendations that can be acted on without delay."
            />
          </ScrollReveal>
          <ul className="mt-8 space-y-4">
            {differentiators.slice(0, 4).map((item, index) => (
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
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <ScrollReveal key={item.id ?? item.title} variant="fade-up" delay={index * 80}>
              <div className={`${ds.card} ${ds.cardPadding}`}>
                <span className={ds.iconBox}>
                  <Check className="h-5 w-5" />
                </span>
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

export function TestimonialsSection({
  testimonials,
  compact = false,
}: {
  testimonials: TestimonialData[];
  compact?: boolean;
}) {
  const rows = compact ? testimonials.slice(0, 3) : testimonials;

  return (
    <section className={ds.sectionMuted}>
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Businesses Like Yours"
            description="Our clients value direct communication, structured execution, and recommendations that support better governance and reporting decisions."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {rows.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id ?? testimonial.author} variant="fade-up" delay={index * 120}>
              <div className={`${ds.card} ${ds.cardPadding}`}>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className={`mt-4 ${ds.bodySm}`}>&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary-muted)] text-sm font-bold text-[var(--color-primary)]">
                    {testimonial.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ContactSection({ contact }: { contact: ContactInfoData }) {
  return (
    <div className={`${ds.card} ${ds.cardPadding}`}>
      <SectionHeading
        eyebrow="Contact Information"
        title={contact.officeTitle}
        description="Reach our team directly for audit, tax, or advisory support."
      />
      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
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
        <p className="mt-2 text-sm leading-7 text-slate-300">{contact.hours}</p>
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
