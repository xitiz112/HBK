"use server";

import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import {
  assertAdminCsrfToken,
  clearAdminSession,
  createAdminSession,
  requireAdminSession,
} from "@/lib/auth";
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
  loginSchema,
  processSchema,
  serviceSchema,
  siteSettingsSchema,
  socialLinkSchema,
  statSchema,
  teamMemberSchema,
  testimonialSchema,
} from "@/lib/schemas";
import { revalidateSite } from "@/lib/site-cache";

const PATH = {
  login: "/admin/login",
  dashboard: "/admin",
  inbox: "/admin/inbox",
  hero: "/admin/hero",
  about: "/admin/about",
  contact: "/admin/contact",
  stats: "/admin/stats",
  services: "/admin/services",
  industries: "/admin/industries",
  process: "/admin/process",
  differentiators: "/admin/differentiators",
  testimonials: "/admin/testimonials",
  team: "/admin/team",
  awards: "/admin/awards",
  blog: "/admin/blog",
  faqs: "/admin/faqs",
  settings: "/admin/settings",
  social: "/admin/social",
} as const;

type AdminStatus = "saved" | "deleted" | "invalid" | "invalid-request" | "error" | "duplicate";

function isPublished(formData: FormData) {
  return formData.get("published") === "on";
}

function getId(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  return id || null;
}

function withImage<T extends { image?: string }>(data: T) {
  return { ...data, image: data.image || null };
}

function finish(path: string, status: AdminStatus): never {
  redirect(`${path}?status=${status}`);
}

async function guard(formData: FormData, path: string) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, `${path}?status=invalid-request`);
}

async function commit(path: string, work: () => Promise<void>, status: "saved" | "deleted" = "saved") {
  try {
    await work();
  } catch (error) {
    console.error("Admin save failed", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      finish(path, "duplicate");
    }
    finish(path, "error");
  }
  revalidateSite();
  finish(path, status);
}

export async function loginAdmin(formData: FormData) {
  await assertAdminCsrfToken(formData, `${PATH.login}?status=invalid-request`);

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect(`${PATH.login}?status=invalid`);
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    redirect(`${PATH.login}?status=denied`);
  }

  const matches = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!matches) {
    redirect(`${PATH.login}?status=denied`);
  }

  await createAdminSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  redirect(PATH.dashboard);
}

export async function logoutAdmin(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, `${PATH.login}?status=invalid-request`);
  await clearAdminSession();
  redirect(PATH.login);
}

export async function saveSiteSettings(formData: FormData) {
  await guard(formData, PATH.settings);

  const parsed = siteSettingsSchema.safeParse({
    siteName: formData.get("siteName"),
    shortName: formData.get("shortName"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    logo: formData.get("logo"),
    favicon: formData.get("favicon"),
    showSiteName: formData.get("showSiteName") === "on",
  });

  if (!parsed.success) {
    finish(PATH.settings, "invalid");
  }

  const data = {
    ...parsed.data,
    logo: parsed.data.logo || null,
    favicon: parsed.data.favicon || null,
  };

  await commit(PATH.settings, async () => {
    await prisma.siteSettings.upsert({
      where: { id: "site" },
      update: data,
      create: { id: "site", ...data },
    });
  });
}

export async function saveHeroContent(formData: FormData) {
  await guard(formData, PATH.hero);

  const parsed = heroSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    primaryCtaText: formData.get("primaryCtaText"),
    primaryCtaHref: formData.get("primaryCtaHref"),
    secondaryCtaText: formData.get("secondaryCtaText"),
    secondaryCtaHref: formData.get("secondaryCtaHref"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    finish(PATH.hero, "invalid");
  }

  const data = withImage(parsed.data);

  await commit(PATH.hero, async () => {
    await prisma.heroContent.upsert({
      where: { id: "hero" },
      update: data,
      create: {
        id: "hero",
        ...data,
        eyebrow: "Trusted Audit, Tax & Accounting",
      },
    });
  });
}

export async function saveAboutContent(formData: FormData) {
  await guard(formData, PATH.about);

  const parsed = aboutSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    story: formData.get("story"),
    mission: formData.get("mission"),
    vision: formData.get("vision"),
    approach: formData.get("approach"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    finish(PATH.about, "invalid");
  }

  const data = withImage(parsed.data);

  await commit(PATH.about, async () => {
    await prisma.aboutContent.upsert({
      where: { id: "about" },
      update: data,
      create: { id: "about", ...data },
    });
  });
}

export async function saveContactInfo(formData: FormData) {
  await guard(formData, PATH.contact);

  const parsed = contactInfoSchema.safeParse({
    officeTitle: formData.get("officeTitle"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    hours: formData.get("hours"),
    mapEmbedUrl: formData.get("mapEmbedUrl"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    finish(PATH.contact, "invalid");
  }

  const data = {
    ...withImage(parsed.data),
    mapEmbedUrl: parsed.data.mapEmbedUrl || null,
  };

  await commit(PATH.contact, async () => {
    await prisma.contactInfo.upsert({
      where: { id: "contact" },
      update: data,
      create: { id: "contact", ...data },
    });
  });
}

export async function saveCompanyStat(formData: FormData) {
  await guard(formData, PATH.stats);

  const parsed = statSchema.safeParse({
    value: formData.get("value"),
    label: formData.get("label"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.stats, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.stats, async () => {
    if (id) {
      await prisma.companyStat.update({ where: { id }, data });
    } else {
      await prisma.companyStat.create({ data });
    }
  });
}

export async function deleteCompanyStat(formData: FormData) {
  await guard(formData, PATH.stats);
  const id = getId(formData);
  if (!id) {
    finish(PATH.stats, "invalid");
  }
  await commit(PATH.stats, async () => {
    await prisma.companyStat.delete({ where: { id } });
  }, "deleted");
}

export async function saveService(formData: FormData) {
  await guard(formData, PATH.services);

  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    details: formData.get("details"),
    icon: formData.get("icon"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.services, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.services, async () => {
    if (id) {
      await prisma.service.update({ where: { id }, data });
    } else {
      await prisma.service.create({ data });
    }
  });
}

export async function deleteService(formData: FormData) {
  await guard(formData, PATH.services);
  const id = getId(formData);
  if (!id) {
    finish(PATH.services, "invalid");
  }
  await commit(PATH.services, async () => {
    await prisma.service.delete({ where: { id } });
  }, "deleted");
}

export async function saveIndustry(formData: FormData) {
  await guard(formData, PATH.industries);

  const parsed = industrySchema.safeParse({
    name: formData.get("name"),
    summary: formData.get("summary"),
    examples: formData.get("examples"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.industries, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.industries, async () => {
    if (id) {
      await prisma.industry.update({ where: { id }, data });
    } else {
      await prisma.industry.create({ data });
    }
  });
}

export async function deleteIndustry(formData: FormData) {
  await guard(formData, PATH.industries);
  const id = getId(formData);
  if (!id) {
    finish(PATH.industries, "invalid");
  }
  await commit(PATH.industries, async () => {
    await prisma.industry.delete({ where: { id } });
  }, "deleted");
}

export async function saveProcessStep(formData: FormData) {
  await guard(formData, PATH.process);

  const parsed = processSchema.safeParse({
    number: formData.get("number"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.process, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.process, async () => {
    if (id) {
      await prisma.processStep.update({ where: { id }, data });
    } else {
      await prisma.processStep.create({ data });
    }
  });
}

export async function deleteProcessStep(formData: FormData) {
  await guard(formData, PATH.process);
  const id = getId(formData);
  if (!id) {
    finish(PATH.process, "invalid");
  }
  await commit(PATH.process, async () => {
    await prisma.processStep.delete({ where: { id } });
  }, "deleted");
}

export async function saveDifferentiator(formData: FormData) {
  await guard(formData, PATH.differentiators);

  const parsed = differentiatorSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.differentiators, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.differentiators, async () => {
    if (id) {
      await prisma.differentiator.update({ where: { id }, data });
    } else {
      await prisma.differentiator.create({ data });
    }
  });
}

export async function deleteDifferentiator(formData: FormData) {
  await guard(formData, PATH.differentiators);
  const id = getId(formData);
  if (!id) {
    finish(PATH.differentiators, "invalid");
  }
  await commit(PATH.differentiators, async () => {
    await prisma.differentiator.delete({ where: { id } });
  }, "deleted");
}

export async function saveTestimonial(formData: FormData) {
  await guard(formData, PATH.testimonials);

  const parsed = testimonialSchema.safeParse({
    quote: formData.get("quote"),
    author: formData.get("author"),
    role: formData.get("role"),
    company: formData.get("company"),
    location: formData.get("location"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.testimonials, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.testimonials, async () => {
    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  });
}

export async function deleteTestimonial(formData: FormData) {
  await guard(formData, PATH.testimonials);
  const id = getId(formData);
  if (!id) {
    finish(PATH.testimonials, "invalid");
  }
  await commit(PATH.testimonials, async () => {
    await prisma.testimonial.delete({ where: { id } });
  }, "deleted");
}

export async function updateSubmissionStatus(formData: FormData) {
  await guard(formData, PATH.inbox);

  const id = getId(formData);
  const status = String(formData.get("status") ?? "");
  if (!id || !["NEW", "REVIEWED", "RESPONDED", "ARCHIVED"].includes(status)) {
    finish(PATH.inbox, "invalid");
  }

  await commit(PATH.inbox, async () => {
    await prisma.contactSubmission.update({
      where: { id },
      data: { status: status as "NEW" | "REVIEWED" | "RESPONDED" | "ARCHIVED" },
    });
  });
}

export async function deleteSubmission(formData: FormData) {
  await guard(formData, PATH.inbox);
  const id = getId(formData);
  if (!id) {
    finish(PATH.inbox, "invalid");
  }
  await commit(PATH.inbox, async () => {
    await prisma.contactSubmission.delete({ where: { id } });
  }, "deleted");
}

export async function saveBlogPost(formData: FormData) {
  await guard(formData, PATH.blog);

  const parsed = blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    coverImage: formData.get("coverImage"),
    author: formData.get("author"),
    publishedAt: formData.get("publishedAt"),
    featured: formData.get("featured") === "on",
    published: isPublished(formData),
    order: formData.get("order"),
  });

  if (!parsed.success) {
    finish(PATH.blog, "invalid");
  }

  const id = getId(formData);
  const data = { ...parsed.data, coverImage: parsed.data.coverImage || null };

  await commit(PATH.blog, async () => {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data });
    } else {
      await prisma.blogPost.create({ data });
    }
  });
}

export async function deleteBlogPost(formData: FormData) {
  await guard(formData, PATH.blog);
  const id = getId(formData);
  if (!id) {
    finish(PATH.blog, "invalid");
  }
  await commit(PATH.blog, async () => {
    await prisma.blogPost.delete({ where: { id } });
  }, "deleted");
}

export async function saveTeamMember(formData: FormData) {
  await guard(formData, PATH.team);

  const parsed = teamMemberSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio"),
    qualifications: formData.get("qualifications"),
    avatar: formData.get("avatar"),
    email: formData.get("email"),
    linkedin: formData.get("linkedin"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.team, "invalid");
  }

  const id = getId(formData);
  const data = {
    ...parsed.data,
    avatar: parsed.data.avatar || null,
    email: parsed.data.email || null,
    linkedin: parsed.data.linkedin || null,
  };

  await commit(PATH.team, async () => {
    if (id) {
      await prisma.teamMember.update({ where: { id }, data });
    } else {
      await prisma.teamMember.create({ data });
    }
  });
}

export async function deleteTeamMember(formData: FormData) {
  await guard(formData, PATH.team);
  const id = getId(formData);
  if (!id) {
    finish(PATH.team, "invalid");
  }
  await commit(PATH.team, async () => {
    await prisma.teamMember.delete({ where: { id } });
  }, "deleted");
}

export async function saveFAQ(formData: FormData) {
  await guard(formData, PATH.faqs);

  const parsed = faqSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.faqs, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.faqs, async () => {
    if (id) {
      await prisma.fAQ.update({ where: { id }, data });
    } else {
      await prisma.fAQ.create({ data });
    }
  });
}

export async function deleteFAQ(formData: FormData) {
  await guard(formData, PATH.faqs);
  const id = getId(formData);
  if (!id) {
    finish(PATH.faqs, "invalid");
  }
  await commit(PATH.faqs, async () => {
    await prisma.fAQ.delete({ where: { id } });
  }, "deleted");
}

export async function saveAward(formData: FormData) {
  await guard(formData, PATH.awards);

  const parsed = awardSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    year: formData.get("year"),
    description: formData.get("description"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.awards, "invalid");
  }

  const id = getId(formData);
  const data = { ...withImage(parsed.data), description: parsed.data.description || null };

  await commit(PATH.awards, async () => {
    if (id) {
      await prisma.award.update({ where: { id }, data });
    } else {
      await prisma.award.create({ data });
    }
  });
}

export async function deleteAward(formData: FormData) {
  await guard(formData, PATH.awards);
  const id = getId(formData);
  if (!id) {
    finish(PATH.awards, "invalid");
  }
  await commit(PATH.awards, async () => {
    await prisma.award.delete({ where: { id } });
  }, "deleted");
}

export async function saveSocialLink(formData: FormData) {
  await guard(formData, PATH.social);

  const parsed = socialLinkSchema.safeParse({
    platform: formData.get("platform"),
    url: formData.get("url"),
    icon: formData.get("icon"),
    image: formData.get("image"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    finish(PATH.social, "invalid");
  }

  const id = getId(formData);
  const data = withImage(parsed.data);
  await commit(PATH.social, async () => {
    if (id) {
      await prisma.socialLink.update({ where: { id }, data });
    } else {
      await prisma.socialLink.create({ data });
    }
  });
}

export async function deleteSocialLink(formData: FormData) {
  await guard(formData, PATH.social);
  const id = getId(formData);
  if (!id) {
    finish(PATH.social, "invalid");
  }
  await commit(PATH.social, async () => {
    await prisma.socialLink.delete({ where: { id } });
  }, "deleted");
}
