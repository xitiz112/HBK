import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@hbkassociates.com";
const adminName = process.env.ADMIN_NAME ?? "HBK Admin";
const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

async function main() {
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { name: adminName, passwordHash },
    create: { email: adminEmail, name: adminName, passwordHash },
  });

  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: {
      siteName: "HBK & Associates",
      shortName: "HBK",
      tagline:
        "Independent audit, tax, and accounting services that help organizations build confidence in their reporting and governance.",
      description:
        "HBK & Associates is an audit, tax, and accounting firm helping businesses build confidence through clear reporting, stronger controls, and practical financial guidance.",
      showSiteName: true,
    },
    create: {
      id: "site",
      siteName: "HBK & Associates",
      shortName: "HBK",
      tagline:
        "Independent audit, tax, and accounting services that help organizations build confidence in their reporting and governance.",
      description:
        "HBK & Associates is an audit, tax, and accounting firm helping businesses build confidence through clear reporting, stronger controls, and practical financial guidance.",
      showSiteName: true,
    },
  });

  await prisma.heroContent.upsert({
    where: { id: "hero" },
    update: {
      eyebrow: "Trusted Audit, Tax & Accounting",
      title: "Clarity, compliance, and confidence for growing businesses.",
      subtitle:
        "Established in 2058 B.S. by Hari Bahadur Karki, HBK & Associates provides auditing, tax consulting, banking-purpose financial reports, and accounting outsourcing from New Baneshwor, Kathmandu.",
      primaryCtaText: "Book a Consultation",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Explore Services",
      secondaryCtaHref: "/services",
      image: "/images/hero-office.png",
    },
    create: {
      id: "hero",
      eyebrow: "Trusted Audit, Tax & Accounting",
      title: "Clarity, compliance, and confidence for growing businesses.",
      subtitle:
        "Established in 2058 B.S. by Hari Bahadur Karki, HBK & Associates provides auditing, tax consulting, banking-purpose financial reports, and accounting outsourcing from New Baneshwor, Kathmandu.",
      primaryCtaText: "Book a Consultation",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Explore Services",
      secondaryCtaHref: "/services",
      image: "/images/hero-office.png",
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: "about" },
    update: {
      heroTitle: "About us",
      story:
        "HBK & Associates was established in 2058 B.S. by Hari Bahadur Karki, a registered auditor. From Durga Marga in Buddhanagar, New Baneshwor, the firm has supported Nepali businesses with practical audit, tax, and accounting services.",
      mission:
        "To deliver rigorous audit, tax, and accounting services with integrity, independence, and practical business insight.",
      vision:
        "To be the trusted professional partner organizations rely on for transparent reporting, strong controls, and sustainable growth.",
      approach:
        "We work closely with construction, manpower, news portal, advertisement, and software companies, tailoring every engagement to the client's reporting and compliance needs.",
    },
    create: {
      id: "about",
      heroTitle: "About us",
      story:
        "HBK & Associates was established in 2058 B.S. by Hari Bahadur Karki, a registered auditor. From Durga Marga in Buddhanagar, New Baneshwor, the firm has supported Nepali businesses with practical audit, tax, and accounting services.",
      mission:
        "To deliver rigorous audit, tax, and accounting services with integrity, independence, and practical business insight.",
      vision:
        "To be the trusted professional partner organizations rely on for transparent reporting, strong controls, and sustainable growth.",
      approach:
        "We work closely with construction, manpower, news portal, advertisement, and software companies, tailoring every engagement to the client's reporting and compliance needs.",
    },
  });

  await prisma.contactInfo.upsert({
    where: { id: "contact" },
    update: {
      officeTitle: "Speak with HBK & Associates",
      address: "Durga Marga-10, Buddhanagar, New Baneshwor, Kathmandu, Nepal",
      phone: "9841615703, 9851325931",
      email: "info@hbkassociates.com",
      hours: "Sunday to Friday, 9:00 AM to 6:00 PM",
      mapEmbedUrl: "https://maps.google.com/?q=Durga+Marga-10+Buddhanagar+New+Baneshwor+Kathmandu",
    },
    create: {
      id: "contact",
      officeTitle: "Speak with HBK & Associates",
      address: "Durga Marga-10, Buddhanagar, New Baneshwor, Kathmandu, Nepal",
      phone: "9841615703, 9851325931",
      email: "info@hbkassociates.com",
      hours: "Sunday to Friday, 9:00 AM to 6:00 PM",
      mapEmbedUrl: "https://maps.google.com/?q=Durga+Marga-10+Buddhanagar+New+Baneshwor+Kathmandu",
    },
  });

  const stats = [
    { value: "25+", label: "Years since establishment (2058 B.S.)", order: 1 },
    { value: "300+", label: "Engagements completed", order: 2 },
    { value: "98%", label: "Client retention rate", order: 3 },
    { value: "5+", label: "Industries supported", order: 4 },
  ];

  for (const stat of stats) {
    await prisma.companyStat.upsert({
      where: { id: `stat-${stat.order}` },
      update: stat,
      create: { id: `stat-${stat.order}`, ...stat },
    });
  }

  const services = [
    {
      id: "service-audit",
      title: "Auditing",
      summary: "Independent audits that strengthen trust in your financial reporting.",
      details:
        "We perform statutory audits, internal reviews, and assurance engagements with a disciplined methodology focused on risk, controls, and reporting accuracy.",
      icon: "ShieldCheck",
      image: "/images/service-audit.png",
      order: 1,
    },
    {
      id: "service-tax",
      title: "Tax consulting",
      summary: "Practical tax support that keeps your business compliant and efficient.",
      details:
        "From periodic filings to tax planning and advisory, we help organizations manage obligations while identifying practical efficiencies.",
      icon: "Receipt",
      image: "/images/service-tax.png",
      order: 2,
    },
    {
      id: "service-banking-report",
      title: "Financial report for banking purpose",
      summary: "Bank-ready financial statements and supporting schedules for loans and credit reviews.",
      details:
        "We prepare financial reports and supporting documentation required by banks and financial institutions for credit assessment, loan processing, and periodic review.",
      icon: "FileText",
      image: "/images/service-banking.png",
      order: 3,
    },
    {
      id: "service-accounting",
      title: "Accounting outsourcing",
      summary: "Bookkeeping and accounting support so your records stay accurate and up to date.",
      details:
        "We handle day-to-day accounting, reconciliations, and month-end close on an outsourced basis, giving management reliable numbers without building a full in-house finance team.",
      icon: "Calculator",
      image: "/images/service-accounting.png",
      order: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service,
    });
  }

  const industries = [
    {
      id: "industry-construction",
      name: "Construction companies",
      summary: "Project accounting, costing, and compliance support for contractors and developers.",
      examples: "Project costing, work-in-progress, tax filings, bank reporting.",
      image: "/images/industry-construction.png",
      order: 1,
    },
    {
      id: "industry-manpower",
      name: "Manpower companies",
      summary: "Payroll, statutory compliance, and financial reporting for staffing and recruitment firms.",
      examples: "Payroll controls, labour-related filings, management accounts, audit support.",
      image: "/images/industry-manpower.png",
      order: 2,
    },
    {
      id: "industry-newsportal",
      name: "News portal",
      summary: "Accounting and tax support for media and digital news businesses.",
      examples: "Revenue tracking, advertising income, expense controls, statutory audit.",
      image: "/images/industry-newsportal.png",
      order: 3,
    },
    {
      id: "industry-advertisement",
      name: "Advertisement agencies",
      summary: "Financial reporting and tax consulting for advertising and communications agencies.",
      examples: "Client billing, campaign costing, VAT/TDS, year-end reporting.",
      image: "/images/industry-advertisement.png",
      order: 4,
    },
    {
      id: "industry-software",
      name: "Software companies",
      summary: "Audit, tax, and accounting outsourcing for software and technology firms.",
      examples: "Recurring revenue, payroll, tax consulting, banking-purpose reports.",
      image: "/images/industry-software.png",
      order: 5,
    },
  ];

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { id: industry.id },
      update: industry,
      create: industry,
    });
  }

  const steps = [
    {
      id: "step-discovery",
      number: "01",
      title: "Understand the engagement",
      summary: "We clarify your objectives, reporting needs, risks, and timelines before fieldwork begins.",
      order: 1,
    },
    {
      id: "step-assessment",
      number: "02",
      title: "Assess records and controls",
      summary: "Our team reviews financial data, key processes, and internal controls to identify the right scope.",
      order: 2,
    },
    {
      id: "step-fieldwork",
      number: "03",
      title: "Execute and validate",
      summary: "We perform testing, reconcile evidence, and validate findings using a structured methodology.",
      order: 3,
    },
    {
      id: "step-reporting",
      number: "04",
      title: "Report with clarity",
      summary: "You receive concise findings, actionable recommendations, and follow-up guidance for implementation.",
      order: 4,
    },
  ];

  for (const step of steps) {
    await prisma.processStep.upsert({
      where: { id: step.id },
      update: step,
      create: step,
    });
  }

  const differentiators = [
    {
      id: "why-integrity",
      title: "Independent and ethical approach",
      summary: "We prioritize integrity, objectivity, and professional standards in every engagement.",
      order: 1,
    },
    {
      id: "why-practical",
      title: "Practical recommendations",
      summary: "Our advice is grounded in real operational needs, not just technical theory.",
      order: 2,
    },
    {
      id: "why-responsive",
      title: "Responsive communication",
      summary: "Clients stay informed through clear milestones, timely updates, and direct access to our team.",
      order: 3,
    },
    {
      id: "why-industry",
      title: "Industry-aware insight",
      summary: "We tailor our work to sector-specific risks, regulations, and reporting expectations.",
      order: 4,
    },
  ];

  for (const differentiator of differentiators) {
    await prisma.differentiator.upsert({
      where: { id: differentiator.id },
      update: differentiator,
      create: differentiator,
    });
  }

  const testimonials = [
    {
      id: "testimonial-1",
      quote:
        "HBK & Associates gave us a clear picture of our financial controls and helped us improve reporting discipline across the organization.",
      author: "Ramesh Thapa",
      role: "Finance Director",
      company: "Evergreen Manufacturing",
      location: "Kathmandu",
      order: 1,
    },
    {
      id: "testimonial-2",
      quote:
        "Their team was professional, responsive, and practical. The audit process was organized and the final recommendations were immediately useful.",
      author: "Sonal Gurung",
      role: "Managing Partner",
      company: "Himalayan Hospitality Group",
      location: "Pokhara",
      order: 2,
    },
    {
      id: "testimonial-3",
      quote:
        "We value the clarity HBK brings to compliance and financial review work. They communicate issues early and explain them in business terms.",
      author: "Anisha Koirala",
      role: "Executive Director",
      company: "CareReach Nepal",
      location: "Lalitpur",
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: testimonial,
      create: testimonial,
    });
  }

  // ── Blog Posts ──────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      id: "post-1",
      title: "What to Expect from a Statutory Audit in Nepal",
      slug: "what-to-expect-statutory-audit-nepal",
      excerpt: "A clear breakdown of the audit process — from engagement letter to final report — so your team knows exactly what's coming.",
      content: `A statutory audit is more than a compliance checkbox. It is an independent assessment of whether your financial statements present a true and fair view of the organisation's financial position.

**Before fieldwork begins**, HBK will issue an engagement letter outlining scope, timelines, responsibilities, and fees. This ensures both parties understand what is expected.

**During fieldwork**, our team reviews supporting documentation, tests internal controls, and reconciles key balances. We communicate early if we identify anything material.

**At the close**, you receive a draft report for management review before the final opinion is issued. Our findings come with practical recommendations — not just observations.

Understanding this process helps your finance team prepare effectively, reducing delays and ensuring a smooth engagement.`,
      category: "Audit",
      coverImage: "/images/blog-controls.png",
      author: "HBK & Associates",
      publishedAt: new Date("2026-01-15"),
      featured: true,
      published: true,
      order: 1,
    },
    {
      id: "post-2",
      title: "Five Tax Planning Moves Before the Fiscal Year Ends",
      slug: "five-tax-planning-moves-fiscal-year-end",
      excerpt: "Practical steps businesses can take in the final quarter to reduce exposure and close the year in good shape.",
      content: `Year-end tax planning is not just about minimising liability. It is about ensuring you have the documentation, reconciliations, and processes in place to file accurately and on time.

**1. Reconcile your TDS ledger.** Unreconciled TDS deductions are a common source of notices. Confirm all certificates are collected and matched to your books.

**2. Review your advance tax payments.** If your profitability has changed, your advance tax position may need adjustment to avoid interest charges.

**3. Document related-party transactions.** Transfer pricing documentation requirements continue to expand. Ensure intra-group transactions are properly documented and at arm's length.

**4. Review deferred revenue and accruals.** Timing differences between accounting and tax recognition can create unexpected exposures if not managed proactively.

**5. Speak with your advisor before the year closes.** Reactive tax planning after the year ends is significantly more limited. Early consultation gives you options.`,
      category: "Tax",
      coverImage: "/images/blog-tax.png",
      author: "HBK & Associates",
      publishedAt: new Date("2026-02-20"),
      featured: false,
      published: true,
      order: 2,
    },
    {
      id: "post-3",
      title: "What Boards Should Expect from Assurance Partners",
      slug: "what-boards-expect-assurance-partners",
      excerpt: "The right engagement should provide insight, not just compliance paperwork. Here is how to evaluate the relationship.",
      content: `An assurance engagement should do more than satisfy a regulatory requirement. It should give management and the board practical insight into the organisation's risk environment, control effectiveness, and financial reporting quality.

**Boards should expect:**

- Clear communication throughout the engagement, not just at the end
- Early escalation of significant findings or control weaknesses
- A management letter that goes beyond the audit opinion
- Recommendations that are actionable and prioritised
- Independence that is genuine, not just formal

**Red flags to watch for:**

- Auditors who only communicate at year-end
- Reports that restate management's own disclosures without independent assessment
- Findings that are consistently immaterial year after year without explanation

At HBK, we treat the board relationship as a professional partnership. Our objective is to strengthen your governance and reporting — not to simply issue an opinion.`,
      category: "Advisory",
      coverImage: "/images/blog-analytics.png",
      author: "HBK & Associates",
      publishedAt: new Date("2026-03-10"),
      featured: false,
      published: true,
      order: 3,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }

  // ── Team Members ─────────────────────────────────────────────────────────────
  const teamMembers = [
    {
      id: "team-1",
      name: "Hari Bahadur Karki",
      role: "Founder",
      bio: "Hari Bahadur Karki founded HBK & Associates in 2058 B.S. As a registered auditor, he leads the firm's audit, tax, and accounting work for clients in Kathmandu and beyond.",
      qualifications: "Registered Auditor",
      email: null,
      order: 1,
    },
    {
      id: "team-2",
      name: "Bishnu Phuyal",
      role: "Director",
      bio: "Bishnu Phuyal is a director at HBK & Associates, supporting client delivery and the firm's day-to-day professional practice.",
      qualifications: "Director, HBK & Associates",
      email: null,
      order: 2,
    },
    {
      id: "team-3",
      name: "Ganesh Karki",
      role: "Accountant",
      bio: "Ganesh Karki is the firm's accountant, supporting bookkeeping, reporting, and accounting outsourcing for HBK clients.",
      qualifications: "Accountant, HBK & Associates",
      email: null,
      order: 3,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }

  // ── FAQs ─────────────────────────────────────────────────────────────────────
  const faqs = [
    {
      id: "faq-1",
      question: "What types of audit engagements does HBK handle?",
      answer: "We conduct statutory audits, internal audits, compliance audits, and special-purpose assurance engagements for companies, NGOs, and financial institutions across Nepal.",
      category: "Audit",
      order: 1,
    },
    {
      id: "faq-2",
      question: "How long does a typical statutory audit take?",
      answer: "Most statutory audits are completed within 3 to 6 weeks from the date fieldwork begins, depending on the size of the entity and the quality of records. We confirm timelines clearly in the engagement letter.",
      category: "Audit",
      order: 2,
    },
    {
      id: "faq-3",
      question: "Can you assist with tax registration and filing in Nepal?",
      answer: "Yes. We support PAN/VAT registration, periodic tax return preparation, TDS reconciliation, and annual income tax filings for companies and individuals operating in Nepal.",
      category: "Tax",
      order: 3,
    },
    {
      id: "faq-4",
      question: "Do you work with NGOs and donor-funded organisations?",
      answer: "Absolutely. We have significant experience with NGO financial management, donor reporting requirements, and fund utilisation reviews under development sector frameworks.",
      category: "Advisory",
      order: 4,
    },
    {
      id: "faq-5",
      question: "What is the difference between an internal audit and a statutory audit?",
      answer: "A statutory audit is an independent examination required by law, focused on whether financial statements give a true and fair view. An internal audit is an advisory function that evaluates controls, processes, and risks to help management improve operations.",
      category: "Audit",
      order: 5,
    },
    {
      id: "faq-6",
      question: "How do I get started with HBK & Associates?",
      answer: "Simply use the contact form on our website or call our office directly. We will schedule an initial consultation to understand your needs and provide a clear proposal with scope, timeline, and fees.",
      category: "General",
      order: 6,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq,
    });
  }

  // ── Awards & Certifications ───────────────────────────────────────────────────
  const awards = [
    {
      id: "award-1",
      title: "Member Firm",
      issuer: "Institute of Chartered Accountants of Nepal (ICAN)",
      year: "2012",
      description: "Registered audit firm operating under ICAN standards and professional code of ethics.",
      order: 1,
    },
    {
      id: "award-2",
      title: "Registered Auditor",
      issuer: "Office of the Auditor General, Nepal",
      year: "2014",
      description: "Authorised to conduct audits of public entities, development projects, and donor-funded programmes.",
      order: 2,
    },
    {
      id: "award-3",
      title: "VAT & Tax Registered Firm",
      issuer: "Inland Revenue Department, Nepal",
      year: "2012",
      description: "Compliant with all tax registration and reporting obligations under the Nepal tax framework.",
      order: 3,
    },
  ];

  for (const award of awards) {
    await prisma.award.upsert({
      where: { id: award.id },
      update: award,
      create: award,
    });
  }

  // ── Social Links ──────────────────────────────────────────────────────────────
  const socialLinks = [
    { id: "social-1", platform: "LinkedIn", url: "https://linkedin.com/company/hbk-associates", icon: "Linkedin", order: 1 },
    { id: "social-2", platform: "Facebook", url: "https://facebook.com/hbkassociates", icon: "Facebook", order: 2 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: link.id },
      update: link,
      create: link,
    });
  }

  await prisma.service.deleteMany({
    where: { id: { notIn: services.map((service) => service.id) } },
  });
  await prisma.industry.deleteMany({
    where: { id: { notIn: industries.map((industry) => industry.id) } },
  });
  await prisma.teamMember.deleteMany({
    where: { id: { notIn: teamMembers.map((member) => member.id) } },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
