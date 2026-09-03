import { apiError, handlePrismaError, json, parseJsonBody, requireAdminApi } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { submissionStatusSchema } from "@/lib/schemas";
import { revalidateSite } from "@/lib/site-cache";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { id } = await context.params;
  const submission = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!submission) {
    return apiError("Not found", 404);
  }
  return json(submission);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const parsed = await parseJsonBody(request, submissionStatusSchema);
  if (parsed.error) {
    return parsed.error;
  }

  const { id } = await context.params;

  try {
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    revalidateSite();
    return json(submission);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { id } = await context.params;

  try {
    await prisma.contactSubmission.delete({ where: { id } });
    revalidateSite();
    return json({ ok: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
