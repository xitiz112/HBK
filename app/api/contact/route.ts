import { revalidatePath } from "next/cache";

import { apiError, json, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request, contactFormSchema);
  if (parsed.error) {
    return parsed.error;
  }

  const submission = await prisma.contactSubmission.create({
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

  return json(
    {
      id: submission.id,
      message: "Your message has been sent. We will get back to you shortly.",
    },
    201,
  );
}

export async function GET() {
  return apiError("Use POST to submit the contact form, or GET /api/contact-info for office details.", 405);
}
