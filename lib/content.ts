import "server-only";

import { prisma } from "@/lib/prisma";

export type SiteSettingsData = {
  siteName: string;
  shortName: string;
  tagline: string;
  description: string;
  logo?: string | null;
  favicon?: string | null;
  showSiteName: boolean;
};

export const defaultSiteSettings: SiteSettingsData = {
  siteName: "HBK & Associates",
  shortName: "HBK",
  tagline:
    "Independent audit, tax, and accounting services that help organizations build confidence in their reporting and governance.",
  description:
    "HBK & Associates is an audit, tax, and accounting firm helping businesses build confidence through clear reporting, stronger controls, and practical financial guidance.",
  logo: null,
  favicon: null,
  showSiteName: true,
};

export type HeroContentData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  image?: string | null;
};

export type AboutContentData = {
  heroTitle: string;
  story: string;
  mission: string;
  vision: string;
  approach: string;
  image?: string | null;
};

export type ContactInfoData = {
  officeTitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl?: string | null;
  image?: string | null;
};

export type CompanyStatData = {
  id?: string;
  value: string;
  label: string;
  image?: string | null;
};

export type ServiceData = {
  id?: string;
  title: string;
  summary: string;
  details: string;
  icon: string;
  image?: string | null;
};

export type IndustryData = {
  id?: string;
  name: string;
  summary: string;
  examples: string;
  image?: string | null;
};

export type ProcessStepData = {
  id?: string;
  number: string;
  title: string;
  summary: string;
  image?: string | null;
};

export type DifferentiatorData = {
  id?: string;
  title: string;
  summary: string;
  image?: string | null;
};

export type TestimonialData = {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  image?: string | null;
};

export const defaultHeroContent: HeroContentData = {
  eyebrow: "Trusted Audit, Tax & Accounting",
  title: "Clarity, compliance, and confidence for growing businesses.",
  subtitle:
    "Established in 2058 B.S. by Hari Bahadur Karki, HBK & Associates provides auditing, tax consulting, banking-purpose financial reports, and accounting outsourcing from New Baneshwor, Kathmandu.",
  primaryCtaText: "Book a Consultation",
  primaryCtaHref: "/contact",
  secondaryCtaText: "Explore Services",
  secondaryCtaHref: "/services",
};

export const defaultAboutContent: AboutContentData = {
  heroTitle: "About us",
  story:
    "HBK & Associates was established in 2058 B.S. by Hari Bahadur Karki, a registered auditor. From Durga Marga in Buddhanagar, New Baneshwor, the firm has supported Nepali businesses with practical audit, tax, and accounting services.",
  mission:
    "To deliver rigorous audit, tax, and accounting services with integrity, independence, and practical business insight.",
  vision:
    "To be the trusted professional partner organizations rely on for transparent reporting, strong controls, and sustainable growth.",
  approach:
    "We work closely with construction, manpower, news portal, advertisement, and software companies, tailoring every engagement to the client's reporting and compliance needs.",
};

export const defaultContactInfo: ContactInfoData = {
  officeTitle: "Speak with HBK & Associates",
  address: "Durga Marga-10, Buddhanagar, New Baneshwor, Kathmandu, Nepal",
  phone: "9841615703, 9851325931",
  email: "info@hbkassociates.com",
  hours: "Sunday to Friday, 9:00 AM to 6:00 PM",
  mapEmbedUrl: "https://maps.google.com/?q=Durga+Marga-10+Buddhanagar+New+Baneshwor+Kathmandu",
};

export const defaultCompanyStats: CompanyStatData[] = [
  { id: "stat-1", value: "25+", label: "Years since establishment (2058 B.S.)" },
  { id: "stat-2", value: "300+", label: "Engagements completed" },
  { id: "stat-3", value: "98%", label: "Client retention rate" },
  { id: "stat-4", value: "5+", label: "Industries supported" },
];

export const defaultServices: ServiceData[] = [
  {
    id: "service-audit",
    title: "Auditing",
    summary: "Independent audits that strengthen trust in your financial reporting.",
    details:
      "We perform statutory audits, internal reviews, and assurance engagements with a disciplined methodology focused on risk, controls, and reporting accuracy.",
    icon: "ShieldCheck",
    image: "/images/service-audit.png",
  },
  {
    id: "service-tax",
    title: "Tax consulting",
    summary: "Practical tax support that keeps your business compliant and efficient.",
    details:
      "From periodic filings to tax planning and advisory, we help organizations manage obligations while identifying practical efficiencies.",
    icon: "Receipt",
    image: "/images/service-tax.png",
  },
  {
    id: "service-banking-report",
    title: "Financial report for banking purpose",
    summary: "Bank-ready financial statements and supporting schedules for loans and credit reviews.",
    details:
      "We prepare financial reports and supporting documentation required by banks and financial institutions for credit assessment, loan processing, and periodic review.",
    icon: "FileText",
    image: "/images/service-banking.png",
  },
  {
    id: "service-accounting",
    title: "Accounting outsourcing",
    summary: "Bookkeeping and accounting support so your records stay accurate and up to date.",
    details:
      "We handle day-to-day accounting, reconciliations, and month-end close on an outsourced basis, giving management reliable numbers without building a full in-house finance team.",
    icon: "Calculator",
    image: "/images/service-accounting.png",
  },
];

export const defaultIndustries: IndustryData[] = [
  {
    id: "industry-construction",
    name: "Construction companies",
    summary: "Project accounting, costing, and compliance support for contractors and developers.",
    examples: "Project costing, work-in-progress, tax filings, bank reporting.",
    image: "/images/industry-construction.png",
  },
  {
    id: "industry-manpower",
    name: "Manpower companies",
    summary: "Payroll, statutory compliance, and financial reporting for staffing and recruitment firms.",
    examples: "Payroll controls, labour-related filings, management accounts, audit support.",
    image: "/images/industry-manpower.png",
  },
  {
    id: "industry-newsportal",
    name: "News portal",
    summary: "Accounting and tax support for media and digital news businesses.",
    examples: "Revenue tracking, advertising income, expense controls, statutory audit.",
    image: "/images/industry-newsportal.png",
  },
  {
    id: "industry-advertisement",
    name: "Advertisement agencies",
    summary: "Financial reporting and tax consulting for advertising and communications agencies.",
    examples: "Client billing, campaign costing, VAT/TDS, year-end reporting.",
    image: "/images/industry-advertisement.png",
  },
  {
    id: "industry-software",
    name: "Software companies",
    summary: "Audit, tax, and accounting outsourcing for software and technology firms.",
    examples: "Recurring revenue, payroll, tax consulting, banking-purpose reports.",
    image: "/images/industry-software.png",
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

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return safeQuery(async () => {
    const row = await prisma.siteSettings.findUnique({ where: { id: "site" } });
    return row ?? defaultSiteSettings;
  }, defaultSiteSettings);
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

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogPostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string | null;
  author: string;
  publishedAt: Date;
  featured: boolean;
  published: boolean;
};

export const defaultBlogPosts: BlogPostData[] = [
  {
    id: "post-1",
    title: "What to Expect from a Statutory Audit in Nepal",
    slug: "what-to-expect-statutory-audit-nepal",
    excerpt: "A clear breakdown of the audit process — from engagement letter to final report — so your team knows exactly what's coming.",
    content: "A statutory audit is more than a compliance checkbox. It is an independent assessment of whether your financial statements present a true and fair view...",
    category: "Audit",
    coverImage: "/images/blog-controls.png",
    author: "HBK & Associates",
    publishedAt: new Date("2026-01-15"),
    featured: true,
    published: true,
  },
  {
    id: "post-2",
    title: "Five Tax Planning Moves Before the Fiscal Year Ends",
    slug: "five-tax-planning-moves-fiscal-year-end",
    excerpt: "Practical steps businesses can take in the final quarter to reduce exposure and close the year in good shape.",
    content: "Year-end tax planning is not just about minimising liability. It is about ensuring you have the documentation, reconciliations, and processes in place...",
    category: "Tax",
    coverImage: "/images/blog-tax.png",
    author: "HBK & Associates",
    publishedAt: new Date("2026-02-20"),
    featured: false,
    published: true,
  },
  {
    id: "post-3",
    title: "What Boards Should Expect from Assurance Partners",
    slug: "what-boards-expect-assurance-partners",
    excerpt: "The right engagement should provide insight, not just compliance paperwork. Here is how to evaluate the relationship.",
    content: "An assurance engagement should do more than satisfy a regulatory requirement. It should give management and the board practical insight into risk...",
    category: "Advisory",
    coverImage: "/images/blog-analytics.png",
    author: "HBK & Associates",
    publishedAt: new Date("2026-03-10"),
    featured: false,
    published: true,
  },
];

export async function getBlogPosts(options?: { featuredOnly?: boolean; limit?: number }): Promise<BlogPostData[]> {
  return safeQuery(async () => {
    const where = {
      published: true,
      ...(options?.featuredOnly ? { featured: true } : {}),
    };
    const rows = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: options?.limit,
    });
    return rows.length ? rows : defaultBlogPosts;
  }, defaultBlogPosts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  return safeQuery(async () => {
    return prisma.blogPost.findUnique({ where: { slug } });
  }, null);
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export type TeamMemberData = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  qualifications: string;
  avatar?: string | null;
  email?: string | null;
  linkedin?: string | null;
};

export const defaultTeamMembers: TeamMemberData[] = [
  {
    id: "team-1",
    name: "Hari Bahadur Karki",
    role: "Founder",
    bio: "Hari Bahadur Karki founded HBK & Associates in 2058 B.S. As a registered auditor, he leads the firm's audit, tax, and accounting work for clients in Kathmandu and beyond.",
    qualifications: "Registered Auditor",
    avatar: null,
    email: null,
    linkedin: null,
  },
  {
    id: "team-2",
    name: "Bishnu Phuyal",
    role: "Director",
    bio: "Bishnu Phuyal is a director at HBK & Associates, supporting client delivery and the firm's day-to-day professional practice.",
    qualifications: "Director, HBK & Associates",
    avatar: null,
    email: null,
    linkedin: null,
  },
  {
    id: "team-3",
    name: "Ganesh Karki",
    role: "Accountant",
    bio: "Ganesh Karki is the firm's accountant, supporting bookkeeping, reporting, and accounting outsourcing for HBK clients.",
    qualifications: "Accountant, HBK & Associates",
    avatar: null,
    email: null,
    linkedin: null,
  },
];

export async function getTeamMembers(): Promise<TeamMemberData[]> {
  return safeQuery(async () => {
    const rows = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultTeamMembers;
  }, defaultTeamMembers);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export type FAQData = {
  id?: string;
  question: string;
  answer: string;
  category: string;
  image?: string | null;
};

export const defaultFAQs: FAQData[] = [
  {
    id: "faq-1",
    question: "What types of audit engagements does HBK handle?",
    answer: "We conduct statutory audits, internal audits, compliance audits, and special-purpose assurance engagements for companies, NGOs, and financial institutions across Nepal.",
    category: "Audit",
  },
  {
    id: "faq-2",
    question: "How long does a typical statutory audit take?",
    answer: "Most statutory audits are completed within 3 to 6 weeks from the date fieldwork begins, depending on the size of the entity and the quality of records. We confirm timelines clearly in the engagement letter.",
    category: "Audit",
  },
  {
    id: "faq-3",
    question: "Can you assist with tax registration and filing in Nepal?",
    answer: "Yes. We support PAN/VAT registration, periodic tax return preparation, TDS reconciliation, and annual income tax filings for companies and individuals operating in Nepal.",
    category: "Tax",
  },
  {
    id: "faq-4",
    question: "Do you work with NGOs and donor-funded organisations?",
    answer: "Absolutely. We have significant experience with NGO financial management, donor reporting requirements, and fund utilisation reviews under development sector frameworks.",
    category: "Advisory",
  },
  {
    id: "faq-5",
    question: "What is the difference between an internal audit and a statutory audit?",
    answer: "A statutory audit is an independent examination required by law, focused on whether financial statements give a true and fair view. An internal audit is an advisory function that evaluates controls, processes, and risks to help management improve operations.",
    category: "Audit",
  },
  {
    id: "faq-6",
    question: "How do I get started with HBK & Associates?",
    answer: "Simply use the contact form on our website or call our office directly. We will schedule an initial consultation to understand your needs and provide a clear proposal with scope, timeline, and fees.",
    category: "General",
  },
];

export async function getFAQs(category?: string): Promise<FAQData[]> {
  return safeQuery(async () => {
    const rows = await prisma.fAQ.findMany({
      where: { published: true, ...(category ? { category } : {}) },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultFAQs;
  }, defaultFAQs);
}

// ─── Awards & Certifications ──────────────────────────────────────────────────

export type AwardData = {
  id?: string;
  title: string;
  issuer: string;
  year: string;
  description?: string | null;
  image?: string | null;
};

export const defaultAwards: AwardData[] = [
  {
    id: "award-1",
    title: "Member Firm",
    issuer: "Institute of Chartered Accountants of Nepal (ICAN)",
    year: "2012",
    description: "Registered audit firm operating under ICAN standards and professional code of ethics.",
  },
  {
    id: "award-2",
    title: "Registered Auditor",
    issuer: "Office of the Auditor General, Nepal",
    year: "2014",
    description: "Authorised to conduct audits of public entities, development projects, and donor-funded programmes.",
  },
  {
    id: "award-3",
    title: "VAT & Tax Registered Firm",
    issuer: "Inland Revenue Department, Nepal",
    year: "2012",
    description: "Compliant with all tax registration and reporting obligations under the Nepal tax framework.",
  },
];

export async function getAwards(): Promise<AwardData[]> {
  return safeQuery(async () => {
    const rows = await prisma.award.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultAwards;
  }, defaultAwards);
}

// ─── Social Links ──────────────────────────────────────────────────────────────

export type SocialLinkData = {
  id?: string;
  platform: string;
  url: string;
  icon: string;
  image?: string | null;
};

export const defaultSocialLinks: SocialLinkData[] = [
  { id: "social-1", platform: "LinkedIn", url: "https://linkedin.com/company/hbk-associates", icon: "Linkedin" },
  { id: "social-2", platform: "Facebook", url: "https://facebook.com/hbkassociates", icon: "Facebook" },
];

export async function getSocialLinks(): Promise<SocialLinkData[]> {
  return safeQuery(async () => {
    const rows = await prisma.socialLink.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.length ? rows : defaultSocialLinks;
  }, defaultSocialLinks);
}
