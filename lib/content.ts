import "server-only";

import { prisma } from "@/lib/prisma";

export type HeroContentData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
};

export type AboutContentData = {
  heroTitle: string;
  story: string;
  mission: string;
  vision: string;
  approach: string;
};

export type ContactInfoData = {
  officeTitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl?: string | null;
};

export type CompanyStatData = {
  id?: string;
  value: string;
  label: string;
};

export type ServiceData = {
  id?: string;
  title: string;
  summary: string;
  details: string;
  icon: string;
};

export type IndustryData = {
  id?: string;
  name: string;
  summary: string;
  examples: string;
};

export type ProcessStepData = {
  id?: string;
  number: string;
  title: string;
  summary: string;
};

export type DifferentiatorData = {
  id?: string;
  title: string;
  summary: string;
};

export type TestimonialData = {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
};

export const defaultHeroContent: HeroContentData = {
  eyebrow: "Trusted Audit, Tax & Advisory",
  title: "Clarity, compliance, and confidence for growing businesses.",
  subtitle:
    "HBK & Associates helps organizations strengthen controls, stay compliant, and make informed financial decisions with dependable audit and advisory support.",
  primaryCtaText: "Book a Consultation",
  primaryCtaHref: "/contact",
  secondaryCtaText: "Explore Services",
  secondaryCtaHref: "/services",
};

export const defaultAboutContent: AboutContentData = {
  heroTitle: "About HBK & Associates",
  story:
    "HBK & Associates is a client-focused audit and advisory firm committed to helping businesses navigate regulatory expectations, improve governance, and build lasting financial resilience.",
  mission:
    "To deliver rigorous audit, tax, and advisory services with integrity, independence, and practical business insight.",
  vision:
    "To be the trusted professional partner organizations rely on for transparent reporting, strong controls, and sustainable growth.",
  approach:
    "We combine technical depth with responsive communication, tailoring every engagement to the client's industry, risk profile, and decision-making needs.",
};

export const defaultContactInfo: ContactInfoData = {
  officeTitle: "Speak with HBK & Associates",
  address: "Bagbazar, Kathmandu, Nepal",
  phone: "+977-9800000000",
  email: "info@hbkassociates.com",
  hours: "Sunday to Friday, 9:00 AM to 6:00 PM",
  mapEmbedUrl: "https://maps.google.com",
};

export const defaultCompanyStats: CompanyStatData[] = [
  { id: "stat-1", value: "12+", label: "Years of professional experience" },
  { id: "stat-2", value: "300+", label: "Engagements completed" },
  { id: "stat-3", value: "98%", label: "Client retention rate" },
  { id: "stat-4", value: "15+", label: "Industries supported" },
];

export const defaultServices: ServiceData[] = [
  {
    id: "service-audit",
    title: "Audit & Assurance",
    summary: "Independent audits that strengthen trust in your financial reporting.",
    details:
      "We perform statutory audits, internal reviews, and assurance engagements with a disciplined methodology focused on risk, controls, and reporting accuracy.",
    icon: "ShieldCheck",
  },
  {
    id: "service-tax",
    title: "Tax Planning & Compliance",
    summary: "Practical tax support that keeps your business compliant and efficient.",
    details:
      "From periodic filings to tax planning and advisory, we help organizations manage obligations while identifying practical efficiencies.",
    icon: "Receipt",
  },
  {
    id: "service-advisory",
    title: "Business Advisory",
    summary: "Decision-ready financial and operational guidance for management teams.",
    details:
      "Our advisory work covers financial reviews, process improvement, governance support, and strategic recommendations aligned to business goals.",
    icon: "Briefcase",
  },
  {
    id: "service-risk",
    title: "Risk & Internal Controls",
    summary: "Control assessments that reduce exposure and improve confidence.",
    details:
      "We evaluate process risks, internal controls, and compliance frameworks so management can act on clear, prioritized recommendations.",
    icon: "BarChart3",
  },
];

export const defaultIndustries: IndustryData[] = [
  {
    id: "industry-manufacturing",
    name: "Manufacturing",
    summary: "Inventory-intensive operations, cost controls, and production reporting.",
    examples: "Inventory systems, costing processes, procurement controls, compliance reporting.",
  },
  {
    id: "industry-hospitality",
    name: "Hospitality",
    summary: "Financial oversight for hotels, restaurants, and travel-focused businesses.",
    examples: "Revenue controls, cash handling, payroll review, operational risk assessments.",
  },
  {
    id: "industry-healthcare",
    name: "Healthcare",
    summary: "Reliable reporting and process assurance for service-driven organizations.",
    examples: "Billing reviews, policy compliance, internal controls, management reporting.",
  },
  {
    id: "industry-nonprofit",
    name: "NGOs & Nonprofits",
    summary: "Transparent reporting and donor-accountability support.",
    examples: "Grant reporting, fund tracking, internal controls, governance reviews.",
  },
];

export const defaultProcessSteps: ProcessStepData[] = [
  {
    id: "step-discovery",
    number: "01",
    title: "Understand the engagement",
    summary: "We clarify your objectives, reporting needs, risks, and timelines before fieldwork begins.",
  },
  {
    id: "step-assessment",
    number: "02",
    title: "Assess records and controls",
    summary: "Our team reviews financial data, key processes, and internal controls to identify the right scope.",
  },
  {
    id: "step-fieldwork",
    number: "03",
    title: "Execute and validate",
    summary: "We perform testing, reconcile evidence, and validate findings using a structured methodology.",
  },
  {
    id: "step-reporting",
    number: "04",
    title: "Report with clarity",
    summary: "You receive concise findings, actionable recommendations, and follow-up guidance for implementation.",
  },
];

export const defaultDifferentiators: DifferentiatorData[] = [
  {
    id: "why-integrity",
    title: "Independent and ethical approach",
    summary: "We prioritize integrity, objectivity, and professional standards in every engagement.",
  },
  {
    id: "why-practical",
    title: "Practical recommendations",
    summary: "Our advice is grounded in real operational needs, not just technical theory.",
  },
  {
    id: "why-responsive",
    title: "Responsive communication",
    summary: "Clients stay informed through clear milestones, timely updates, and direct access to our team.",
  },
  {
    id: "why-industry",
    title: "Industry-aware insight",
    summary: "We tailor our work to sector-specific risks, regulations, and reporting expectations.",
  },
];

export const defaultTestimonials: TestimonialData[] = [
  {
    id: "testimonial-1",
    quote:
      "HBK & Associates gave us a clear picture of our financial controls and helped us improve reporting discipline across the organization.",
    author: "Ramesh Thapa",
    role: "Finance Director",
    company: "Evergreen Manufacturing",
    location: "Kathmandu",
  },
  {
    id: "testimonial-2",
    quote:
      "Their team was professional, responsive, and practical. The audit process was organized and the final recommendations were immediately useful.",
    author: "Sonal Gurung",
    role: "Managing Partner",
    company: "Himalayan Hospitality Group",
    location: "Pokhara",
  },
  {
    id: "testimonial-3",
    quote:
      "We value the clarity HBK brings to compliance and financial review work. They communicate issues early and explain them in business terms.",
    author: "Anisha Koirala",
    role: "Executive Director",
    company: "CareReach Nepal",
    location: "Lalitpur",
  },
];

async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function getHeroContent(): Promise<HeroContentData> {
  return safeQuery(async () => {
    const row = await prisma.heroContent.findUnique({ where: { id: "hero" } });
    return row ?? defaultHeroContent;
  }, defaultHeroContent);
}

export async function getAboutContent(): Promise<AboutContentData> {
  return safeQuery(async () => {
    const row = await prisma.aboutContent.findUnique({ where: { id: "about" } });
    return row ?? defaultAboutContent;
  }, defaultAboutContent);
}

export async function getContactInfo(): Promise<ContactInfoData> {
  return safeQuery(async () => {
    const row = await prisma.contactInfo.findUnique({ where: { id: "contact" } });
    return row ?? defaultContactInfo;
  }, defaultContactInfo);
}

export async function getCompanyStats(): Promise<CompanyStatData[]> {
  return safeQuery(async () => {
    const rows = await prisma.companyStat.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultCompanyStats;
  }, defaultCompanyStats);
}

export async function getServices(): Promise<ServiceData[]> {
  return safeQuery(async () => {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultServices;
  }, defaultServices);
}

export async function getIndustries(): Promise<IndustryData[]> {
  return safeQuery(async () => {
    const rows = await prisma.industry.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultIndustries;
  }, defaultIndustries);
}

export async function getProcessSteps(): Promise<ProcessStepData[]> {
  return safeQuery(async () => {
    const rows = await prisma.processStep.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultProcessSteps;
  }, defaultProcessSteps);
}

export async function getDifferentiators(): Promise<DifferentiatorData[]> {
  return safeQuery(async () => {
    const rows = await prisma.differentiator.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultDifferentiators;
  }, defaultDifferentiators);
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  return safeQuery(async () => {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultTestimonials;
  }, defaultTestimonials);
}

export async function getHomePageData() {
  const [hero, about, contact, stats, services, industries, processSteps, differentiators, testimonials] =
    await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getContactInfo(),
      getCompanyStats(),
      getServices(),
      getIndustries(),
      getProcessSteps(),
      getDifferentiators(),
      getTestimonials(),
    ]);

  return {
    hero,
    about,
    contact,
    stats,
    services,
    industries,
    processSteps,
    differentiators,
    testimonials,
  };
}
