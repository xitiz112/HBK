"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  serviceInterest: z.string().trim().optional(),
  message: z.string().trim().min(10),
});

function getContactName(formData: FormData) {
  const fullName = String(formData.get("name") ?? "").trim();
  if (fullName) {
    return fullName;
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  return `${firstName} ${lastName}`.trim();
}

export async function submitContactForm(formData: FormData) {
  const returnTo = String(formData.get("returnTo") ?? "/contact").trim() || "/contact";

  const parsed = contactSchema.safeParse({
    name: getContactName(formData),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    serviceInterest: formData.get("serviceInterest"),
    message: formData.get("message"),
  });

  const fromModal = String(formData.get("fromModal") ?? "") === "1";
  const params = new URLSearchParams({
    status: parsed.success ? "success" : "invalid",
  });
  if (fromModal) params.set("contact", "1");
  const next = `${returnTo}?${params.toString()}`;

  if (!parsed.success) {
    redirect(next);
  }

  await prisma.contactSubmission.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      serviceInterest: parsed.data.serviceInterest || null,
      message: parsed.data.message,
    },
  });

  revalidatePath("/admin");
  redirect(next);
}
