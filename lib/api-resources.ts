import type { Prisma } from "@prisma/client";
import type { ZodType } from "zod";

import { prisma } from "@/lib/prisma";
import {
  aboutSchema,
  awardSchema,
  blogPostSchema,
  contactInfoSchema,
  differentiatorSchema,
  faqSchema,
  heroSchema,
  industrySchema,
  processSchema,
  serviceSchema,
  siteSettingsSchema,
  socialLinkSchema,
  statSchema,
  teamMemberSchema,
  testimonialSchema,
} from "@/lib/schemas";
import {
  getAboutContent,
  getAwards,
  getBlogPosts,
  getCompanyStats,
  getContactInfo,
  getDifferentiators,
  getFAQs,
  getHeroContent,
  getIndustries,
  getProcessSteps,
  getServices,
  getSiteSettings,
  getSocialLinks,
  getTeamMembers,
  getTestimonials,
} from "@/lib/content";

export const publicResourceKeys = [
  "hero",
  "about",
  "contact-info",
  "stats",
  "services",
  "industries",
  "process-steps",
  "differentiators",
  "testimonials",
  "blog",
  "team",
  "faqs",
  "awards",
  "social-links",
  "settings",
] as const;

export type PublicResourceKey = (typeof publicResourceKeys)[number];

export function isPublicResource(value: string): value is PublicResourceKey {
  return (publicResourceKeys as readonly string[]).includes(value);
}

export async function readPublicResource(resource: PublicResourceKey, searchParams: URLSearchParams) {
  switch (resource) {
    case "hero":
      return getHeroContent();
    case "about":
      return getAboutContent();
    case "contact-info":
      return getContactInfo();
    case "stats":
      return getCompanyStats();
    case "services":
      return getServices();
    case "industries":
      return getIndustries();
    case "process-steps":
      return getProcessSteps();
    case "differentiators":
      return getDifferentiators();
    case "testimonials":
      return getTestimonials();
    case "blog": {
      const featured = searchParams.get("featured") === "true";
      const limitValue = searchParams.get("limit");
      const limit = limitValue ? Number(limitValue) : undefined;
      return getBlogPosts({
        featuredOnly: featured || undefined,
        limit: Number.isFinite(limit) ? limit : undefined,
      });
    }
    case "team":
      return getTeamMembers();
    case "faqs":
      return getFAQs(searchParams.get("category") ?? undefined);
    case "awards":
      return getAwards();
    case "social-links":
      return getSocialLinks();
    case "settings":
      return getSiteSettings();
  }
}

export async function readPublicItem(resource: PublicResourceKey, id: string) {
  switch (resource) {
    case "hero":
    case "about":
    case "contact-info":
    case "settings":
      return null;
    case "stats":
      return prisma.companyStat.findFirst({ where: { id, published: true } });
    case "services":
      return prisma.service.findFirst({ where: { id, published: true } });
    case "industries":
      return prisma.industry.findFirst({ where: { id, published: true } });
    case "process-steps":
      return prisma.processStep.findFirst({ where: { id, published: true } });
    case "differentiators":
      return prisma.differentiator.findFirst({ where: { id, published: true } });
    case "testimonials":
      return prisma.testimonial.findFirst({ where: { id, published: true } });
    case "blog":
      return prisma.blogPost.findFirst({
        where: { published: true, OR: [{ id }, { slug: id }] },
      });
    case "team":
      return prisma.teamMember.findFirst({ where: { id, published: true } });
    case "faqs":
      return prisma.fAQ.findFirst({ where: { id, published: true } });
    case "awards":
      return prisma.award.findFirst({ where: { id, published: true } });
    case "social-links":
      return prisma.socialLink.findFirst({ where: { id, published: true } });
  }
}

type CollectionResource = {
  kind: "collection";
  schema: ZodType;
  list: () => Promise<unknown>;
  create: (data: Record<string, unknown>) => Promise<unknown>;
  get: (id: string) => Promise<unknown>;
  update: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
};

type SingletonResource = {
  kind: "singleton";
  schema: ZodType;
  get: () => Promise<unknown>;
  upsert: (data: Record<string, unknown>) => Promise<unknown>;
};

export type AdminResource = CollectionResource | SingletonResource;

function emptyToNull(value?: string | null) {
  return value ? value : null;
}

function withNullableImage(data: Record<string, unknown>) {
  return { ...data, image: emptyToNull(data.image as string | undefined) };
}

export const adminResources: Record<string, AdminResource> = {
  hero: {
    kind: "singleton",
    schema: heroSchema,
    get: () => prisma.heroContent.findUnique({ where: { id: "hero" } }),
    upsert: (data) => {
      const payload = withNullableImage(data);
      return prisma.heroContent.upsert({
        where: { id: "hero" },
        update: payload as Prisma.HeroContentUpdateInput,
        create: {
          id: "hero",
          ...(payload as Prisma.HeroContentCreateInput),
          eyebrow: "Trusted Audit, Tax & Accounting",
        },
      });
    },
  },
  about: {
    kind: "singleton",
    schema: aboutSchema,
    get: () => prisma.aboutContent.findUnique({ where: { id: "about" } }),
    upsert: (data) => {
      const payload = withNullableImage(data);
      return prisma.aboutContent.upsert({
        where: { id: "about" },
        update: payload as Prisma.AboutContentUpdateInput,
        create: { id: "about", ...(payload as Prisma.AboutContentCreateInput) },
      });
    },
  },
  "contact-info": {
    kind: "singleton",
    schema: contactInfoSchema,
    get: () => prisma.contactInfo.findUnique({ where: { id: "contact" } }),
    upsert: (data) => {
      const payload = {
        ...withNullableImage(data),
        mapEmbedUrl: emptyToNull(data.mapEmbedUrl as string | undefined),
      };
      return prisma.contactInfo.upsert({
        where: { id: "contact" },
        update: payload as Prisma.ContactInfoUpdateInput,
        create: { id: "contact", ...(payload as Prisma.ContactInfoCreateInput) },
      });
    },
  },
  settings: {
    kind: "singleton",
    schema: siteSettingsSchema,
    get: () => prisma.siteSettings.findUnique({ where: { id: "site" } }),
    upsert: (data) => {
      const payload = {
        ...data,
        logo: emptyToNull(data.logo as string | undefined),
        favicon: emptyToNull(data.favicon as string | undefined),
      };
      return prisma.siteSettings.upsert({
        where: { id: "site" },
        update: payload as Prisma.SiteSettingsUpdateInput,
        create: { id: "site", ...(payload as Prisma.SiteSettingsCreateInput) },
      });
    },
  },
  stats: {
    kind: "collection",
    schema: statSchema,
    list: () => prisma.companyStat.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.companyStat.create({ data: withNullableImage(data) as Prisma.CompanyStatCreateInput }),
    get: (id) => prisma.companyStat.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.companyStat.update({
        where: { id },
        data: withNullableImage(data) as Prisma.CompanyStatUpdateInput,
      }),
    remove: (id) => prisma.companyStat.delete({ where: { id } }),
  },
  services: {
    kind: "collection",
    schema: serviceSchema,
    list: () => prisma.service.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.service.create({ data: withNullableImage(data) as Prisma.ServiceCreateInput }),
    get: (id) => prisma.service.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.service.update({
        where: { id },
        data: withNullableImage(data) as Prisma.ServiceUpdateInput,
      }),
    remove: (id) => prisma.service.delete({ where: { id } }),
  },
  industries: {
    kind: "collection",
    schema: industrySchema,
    list: () => prisma.industry.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.industry.create({ data: withNullableImage(data) as Prisma.IndustryCreateInput }),
    get: (id) => prisma.industry.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.industry.update({
        where: { id },
        data: withNullableImage(data) as Prisma.IndustryUpdateInput,
      }),
    remove: (id) => prisma.industry.delete({ where: { id } }),
  },
  "process-steps": {
    kind: "collection",
    schema: processSchema,
    list: () => prisma.processStep.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.processStep.create({ data: withNullableImage(data) as Prisma.ProcessStepCreateInput }),
    get: (id) => prisma.processStep.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.processStep.update({
        where: { id },
        data: withNullableImage(data) as Prisma.ProcessStepUpdateInput,
      }),
    remove: (id) => prisma.processStep.delete({ where: { id } }),
  },
  differentiators: {
    kind: "collection",
    schema: differentiatorSchema,
    list: () => prisma.differentiator.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.differentiator.create({
        data: withNullableImage(data) as Prisma.DifferentiatorCreateInput,
      }),
    get: (id) => prisma.differentiator.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.differentiator.update({
        where: { id },
        data: withNullableImage(data) as Prisma.DifferentiatorUpdateInput,
      }),
    remove: (id) => prisma.differentiator.delete({ where: { id } }),
  },
  testimonials: {
    kind: "collection",
    schema: testimonialSchema,
    list: () => prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.testimonial.create({ data: withNullableImage(data) as Prisma.TestimonialCreateInput }),
    get: (id) => prisma.testimonial.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.testimonial.update({
        where: { id },
        data: withNullableImage(data) as Prisma.TestimonialUpdateInput,
      }),
    remove: (id) => prisma.testimonial.delete({ where: { id } }),
  },
  blog: {
    kind: "collection",
    schema: blogPostSchema,
    list: () => prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } }),
    create: (data) => {
      const payload = { ...data, coverImage: emptyToNull(data.coverImage as string | undefined) };
      return prisma.blogPost.create({ data: payload as Prisma.BlogPostCreateInput });
    },
    get: (id) =>
      prisma.blogPost.findFirst({ where: { OR: [{ id }, { slug: id }] } }),
    update: (id, data) => {
      const payload = { ...data, coverImage: emptyToNull(data.coverImage as string | undefined) };
      return prisma.blogPost.update({
        where: { id },
        data: payload as Prisma.BlogPostUpdateInput,
      });
    },
    remove: (id) => prisma.blogPost.delete({ where: { id } }),
  },
  team: {
    kind: "collection",
    schema: teamMemberSchema,
    list: () => prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    create: (data) => {
      const payload = {
        ...data,
        avatar: emptyToNull(data.avatar as string | undefined),
        email: emptyToNull(data.email as string | undefined),
        linkedin: emptyToNull(data.linkedin as string | undefined),
      };
      return prisma.teamMember.create({ data: payload as Prisma.TeamMemberCreateInput });
    },
    get: (id) => prisma.teamMember.findUnique({ where: { id } }),
    update: (id, data) => {
      const payload = {
        ...data,
        avatar: emptyToNull(data.avatar as string | undefined),
        email: emptyToNull(data.email as string | undefined),
        linkedin: emptyToNull(data.linkedin as string | undefined),
      };
      return prisma.teamMember.update({
        where: { id },
        data: payload as Prisma.TeamMemberUpdateInput,
      });
    },
    remove: (id) => prisma.teamMember.delete({ where: { id } }),
  },
  faqs: {
    kind: "collection",
    schema: faqSchema,
    list: () => prisma.fAQ.findMany({ orderBy: { order: "asc" } }),
    create: (data) => prisma.fAQ.create({ data: withNullableImage(data) as Prisma.FAQCreateInput }),
    get: (id) => prisma.fAQ.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.fAQ.update({ where: { id }, data: withNullableImage(data) as Prisma.FAQUpdateInput }),
    remove: (id) => prisma.fAQ.delete({ where: { id } }),
  },
  awards: {
    kind: "collection",
    schema: awardSchema,
    list: () => prisma.award.findMany({ orderBy: { order: "asc" } }),
    create: (data) => {
      const payload = {
        ...withNullableImage(data),
        description: emptyToNull(data.description as string | undefined),
      };
      return prisma.award.create({ data: payload as Prisma.AwardCreateInput });
    },
    get: (id) => prisma.award.findUnique({ where: { id } }),
    update: (id, data) => {
      const payload = {
        ...withNullableImage(data),
        description: emptyToNull(data.description as string | undefined),
      };
      return prisma.award.update({ where: { id }, data: payload as Prisma.AwardUpdateInput });
    },
    remove: (id) => prisma.award.delete({ where: { id } }),
  },
  "social-links": {
    kind: "collection",
    schema: socialLinkSchema,
    list: () => prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    create: (data) =>
      prisma.socialLink.create({ data: withNullableImage(data) as Prisma.SocialLinkCreateInput }),
    get: (id) => prisma.socialLink.findUnique({ where: { id } }),
    update: (id, data) =>
      prisma.socialLink.update({
        where: { id },
        data: withNullableImage(data) as Prisma.SocialLinkUpdateInput,
      }),
    remove: (id) => prisma.socialLink.delete({ where: { id } }),
  },
};
