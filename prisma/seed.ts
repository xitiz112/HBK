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

  await prisma.heroContent.upsert({
    where: { id: "hero" },
    update: {},
    create: {
      id: "hero",
      eyebrow: "Trusted Audit, Tax & Advisory",
      title: "Clarity, compliance, and confidence for growing businesses.",
      subtitle:
        "HBK & Associates helps organizations strengthen controls, stay compliant, and make informed financial decisions with dependable audit and advisory support.",
      primaryCtaText: "Book a Consultation",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Explore Services",
      secondaryCtaHref: "/services",
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: "about" },
    update: {},
    create: {
      id: "about",
      heroTitle: "About HBK & Associates",
      story:
        "HBK & Associates is a client-focused audit and advisory firm committed to helping businesses navigate regulatory expectations, improve governance, and build lasting financial resilience.",
      mission:
        "To deliver rigorous audit, tax, and advisory services with integrity, independence, and practical business insight.",
      vision:
        "To be the trusted professional partner organizations rely on for transparent reporting, strong controls, and sustainable growth.",
      approach:
        "We combine technical depth with responsive communication, tailoring every engagement to the client’s industry, risk profile, and decision-making needs.",
    },
  });

  await prisma.contactInfo.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      officeTitle: "Speak with HBK & Associates",
      address: "Bagbazar, Kathmandu, Nepal",
      phone: "+977-9800000000",
      email: "info@hbkassociates.com",
      hours: "Sunday to Friday, 9:00 AM to 6:00 PM",
      mapEmbedUrl: "https://maps.google.com",
    },
  });

  const stats = [
    { value: "12+", label: "Years of professional experience", order: 1 },
    { value: "300+", label: "Engagements completed", order: 2 },
    { value: "98%", label: "Client retention rate", order: 3 },
    { value: "15+", label: "Industries supported", order: 4 },
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
      title: "Audit & Assurance",
      summary: "Independent audits that strengthen trust in your financial reporting.",
      details:
        "We perform statutory audits, internal reviews, and assurance engagements with a disciplined methodology focused on risk, controls, and reporting accuracy.",
      icon: "ShieldCheck",
      order: 1,
    },
    {
      id: "service-tax",
      title: "Tax Planning & Compliance",
      summary: "Practical tax support that keeps your business compliant and efficient.",
      details:
        "From periodic filings to tax planning and advisory, we help organizations manage obligations while identifying practical efficiencies.",
      icon: "Receipt",
      order: 2,
    },
    {
      id: "service-advisory",
      title: "Business Advisory",
      summary: "Decision-ready financial and operational guidance for management teams.",
      details:
        "Our advisory work covers financial reviews, process improvement, governance support, and strategic recommendations aligned to business goals.",
      icon: "Briefcase",
      order: 3,
    },
    {
      id: "service-risk",
      title: "Risk & Internal Controls",
      summary: "Control assessments that reduce exposure and improve confidence.",
      details:
        "We evaluate process risks, internal controls, and compliance frameworks so management can act on clear, prioritized recommendations.",
      icon: "BarChart3",
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
      id: "industry-manufacturing",
      name: "Manufacturing",
      summary: "Inventory-intensive operations, cost controls, and production reporting.",
      examples: "Inventory systems, costing processes, procurement controls, compliance reporting.",
      order: 1,
    },
    {
      id: "industry-hospitality",
      name: "Hospitality",
      summary: "Financial oversight for hotels, restaurants, and travel-focused businesses.",
      examples: "Revenue controls, cash handling, payroll review, operational risk assessments.",
      order: 2,
    },
    {
      id: "industry-healthcare",
      name: "Healthcare",
      summary: "Reliable reporting and process assurance for service-driven organizations.",
      examples: "Billing reviews, policy compliance, internal controls, management reporting.",
      order: 3,
    },
    {
      id: "industry-nonprofit",
      name: "NGOs & Nonprofits",
      summary: "Transparent reporting and donor-accountability support.",
      examples: "Grant reporting, fund tracking, internal controls, governance reviews.",
      order: 4,
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
