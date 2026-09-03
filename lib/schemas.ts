import { z } from "zod";

function emptyToUndefined(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

const optionalText = z.preprocess(emptyToUndefined, z.string().optional());

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  serviceInterest: z.string().trim().optional(),
  message: z.string().trim().min(10),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(2),
  shortName: z.string().trim().min(1).max(12),
  tagline: z.string().trim().min(10),
  description: z.string().trim().min(20),
  logo: optionalText,
  favicon: optionalText,
  showSiteName: z.boolean().optional().default(true),
});

export const heroSchema = z.object({
  eyebrow: z.string().trim().min(2),
  title: z.string().trim().min(10),
  subtitle: z.string().trim().min(20),
  primaryCtaText: z.string().trim().min(2),
  primaryCtaHref: z.string().trim().min(1),
  secondaryCtaText: z.string().trim().min(2),
  secondaryCtaHref: z.string().trim().min(1),
  image: optionalText,
});

export const aboutSchema = z.object({
  heroTitle: z.string().trim().min(2),
  story: z.string().trim().min(20),
  mission: z.string().trim().min(20),
  vision: z.string().trim().min(20),
  approach: z.string().trim().min(20),
  image: optionalText,
});

export const contactInfoSchema = z.object({
  officeTitle: z.string().trim().min(2),
  address: z.string().trim().min(5),
  phone: z.string().trim().min(5),
  email: z.string().trim().email(),
  hours: z.string().trim().min(5),
  mapEmbedUrl: optionalText,
  image: optionalText,
});

export const statSchema = z.object({
  value: z.string().trim().min(1),
  label: z.string().trim().min(2),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  details: z.string().trim().min(20),
  icon: z.string().trim().min(2),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const industrySchema = z.object({
  name: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  examples: z.string().trim().min(10),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const processSchema = z.object({
  number: z.string().trim().min(1),
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const differentiatorSchema = z.object({
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const testimonialSchema = z.object({
  quote: z.string().trim().min(20),
  author: z.string().trim().min(2),
  role: z.string().trim().min(2),
  company: z.string().trim().min(2),
  location: z.string().trim().min(2),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().trim().min(10),
  content: z.string().trim().min(20),
  category: z.string().trim().min(2),
  coverImage: optionalText,
  author: z.string().trim().min(2),
  publishedAt: z.coerce.date(),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
  order: z.coerce.number().int().min(0),
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().min(2),
  bio: z.string().trim().min(10),
  qualifications: z.string().trim().min(2),
  avatar: optionalText,
  email: z.preprocess(emptyToUndefined, z.string().email().optional()),
  linkedin: z.preprocess(emptyToUndefined, z.string().url().optional()),
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const faqSchema = z.object({
  question: z.string().trim().min(5),
  answer: z.string().trim().min(10),
  category: z.string().trim().min(2),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const awardSchema = z.object({
  title: z.string().trim().min(2),
  issuer: z.string().trim().min(2),
  year: z.string().trim().min(4),
  description: optionalText,
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const socialLinkSchema = z.object({
  platform: z.string().trim().min(2),
  url: z.string().trim().url(),
  icon: z.string().trim().min(2),
  image: optionalText,
  order: z.coerce.number().int().min(0),
  published: z.boolean().optional().default(true),
});

export const submissionStatusSchema = z.object({
  status: z.enum(["NEW", "REVIEWED", "RESPONDED", "ARCHIVED"]),
});
