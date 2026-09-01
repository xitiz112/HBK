"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  assertAdminCsrfToken,
  clearAdminSession,
  createAdminSession,
  requireAdminSession,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

const heroSchema = z.object({
  eyebrow: z.string().trim().min(2),
  title: z.string().trim().min(10),
  subtitle: z.string().trim().min(20),
  primaryCtaText: z.string().trim().min(2),
  primaryCtaHref: z.string().trim().min(1),
  secondaryCtaText: z.string().trim().min(2),
  secondaryCtaHref: z.string().trim().min(1),
});

const aboutSchema = z.object({
  heroTitle: z.string().trim().min(2),
  story: z.string().trim().min(20),
  mission: z.string().trim().min(20),
  vision: z.string().trim().min(20),
  approach: z.string().trim().min(20),
});

const contactSchema = z.object({
  officeTitle: z.string().trim().min(2),
  address: z.string().trim().min(5),
  phone: z.string().trim().min(5),
  email: z.string().trim().email(),
  hours: z.string().trim().min(5),
  mapEmbedUrl: z.string().trim().optional(),
});

const statSchema = z.object({
  value: z.string().trim().min(1),
  label: z.string().trim().min(2),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

const serviceSchema = z.object({
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  details: z.string().trim().min(20),
  icon: z.string().trim().min(2),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

const industrySchema = z.object({
  name: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  examples: z.string().trim().min(10),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

const processSchema = z.object({
  number: z.string().trim().min(1),
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

const differentiatorSchema = z.object({
  title: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

const testimonialSchema = z.object({
  quote: z.string().trim().min(20),
  author: z.string().trim().min(2),
  role: z.string().trim().min(2),
  company: z.string().trim().min(2),
  location: z.string().trim().min(2),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

function isPublished(formData: FormData) {
  return formData.get("published") === "on";
}

function getId(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  return id || null;
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/industries");
  revalidatePath("/testimonials");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

export async function loginAdmin(formData: FormData) {
  await assertAdminCsrfToken(formData, "/admin/login?status=invalid-request");

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/admin/login?status=invalid");
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    redirect("/admin/login?status=denied");
  }

  const matches = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!matches) {
    redirect("/admin/login?status=denied");
  }

  await createAdminSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  redirect("/admin");
}

export async function logoutAdmin(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin/login?status=invalid-request");
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveHeroContent(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = heroSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    primaryCtaText: formData.get("primaryCtaText"),
    primaryCtaHref: formData.get("primaryCtaHref"),
    secondaryCtaText: formData.get("secondaryCtaText"),
    secondaryCtaHref: formData.get("secondaryCtaHref"),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-hero");
  }

  await prisma.heroContent.upsert({
    where: { id: "hero" },
    update: parsed.data,
    create: { id: "hero", ...parsed.data },
  });

  revalidateAll();
}

export async function saveAboutContent(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = aboutSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    story: formData.get("story"),
    mission: formData.get("mission"),
    vision: formData.get("vision"),
    approach: formData.get("approach"),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-about");
  }

  await prisma.aboutContent.upsert({
    where: { id: "about" },
    update: parsed.data,
    create: { id: "about", ...parsed.data },
  });

  revalidateAll();
}

export async function saveContactInfo(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = contactSchema.safeParse({
    officeTitle: formData.get("officeTitle"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    hours: formData.get("hours"),
    mapEmbedUrl: formData.get("mapEmbedUrl"),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-contact");
  }

  await prisma.contactInfo.upsert({
    where: { id: "contact" },
    update: {
      ...parsed.data,
      mapEmbedUrl: parsed.data.mapEmbedUrl || null,
    },
    create: {
      id: "contact",
      ...parsed.data,
      mapEmbedUrl: parsed.data.mapEmbedUrl || null,
    },
  });

  revalidateAll();
}

export async function saveCompanyStat(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = statSchema.safeParse({
    value: formData.get("value"),
    label: formData.get("label"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-stat");
  }

  const id = getId(formData);

  if (id) {
    await prisma.companyStat.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.companyStat.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteCompanyStat(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.companyStat.delete({ where: { id } });
    revalidateAll();
  }
}

export async function saveService(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = serviceSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    details: formData.get("details"),
    icon: formData.get("icon"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-service");
  }

  const id = getId(formData);

  if (id) {
    await prisma.service.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.service.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteService(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.service.delete({ where: { id } });
    revalidateAll();
  }
}

export async function saveIndustry(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = industrySchema.safeParse({
    name: formData.get("name"),
    summary: formData.get("summary"),
    examples: formData.get("examples"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-industry");
  }

  const id = getId(formData);

  if (id) {
    await prisma.industry.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.industry.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteIndustry(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.industry.delete({ where: { id } });
    revalidateAll();
  }
}

export async function saveProcessStep(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = processSchema.safeParse({
    number: formData.get("number"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-step");
  }

  const id = getId(formData);

  if (id) {
    await prisma.processStep.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.processStep.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteProcessStep(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.processStep.delete({ where: { id } });
    revalidateAll();
  }
}

export async function saveDifferentiator(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = differentiatorSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-differentiator");
  }

  const id = getId(formData);

  if (id) {
    await prisma.differentiator.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.differentiator.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteDifferentiator(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.differentiator.delete({ where: { id } });
    revalidateAll();
  }
}

export async function saveTestimonial(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const parsed = testimonialSchema.safeParse({
    quote: formData.get("quote"),
    author: formData.get("author"),
    role: formData.get("role"),
    company: formData.get("company"),
    location: formData.get("location"),
    order: formData.get("order"),
    published: isPublished(formData),
  });

  if (!parsed.success) {
    redirect("/admin?status=invalid-testimonial");
  }

  const id = getId(formData);

  if (id) {
    await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });
  } else {
    await prisma.testimonial.create({ data: parsed.data });
  }

  revalidateAll();
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");
  const id = getId(formData);
  if (id) {
    await prisma.testimonial.delete({ where: { id } });
    revalidateAll();
  }
}

export async function updateSubmissionStatus(formData: FormData) {
  await requireAdminSession();
  await assertAdminCsrfToken(formData, "/admin?status=invalid-request");

  const id = getId(formData);
  const status = z
    .enum(["NEW", "REVIEWED", "RESPONDED", "ARCHIVED"])
    .parse(formData.get("status"));

  if (id) {
    await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin");
  }
}
