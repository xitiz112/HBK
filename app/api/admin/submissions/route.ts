import { apiError, json, requireAdminApi } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const statuses = ["NEW", "REVIEWED", "RESPONDED", "ARCHIVED"] as const;

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const status = new URL(request.url).searchParams.get("status");
  if (status && !statuses.includes(status as (typeof statuses)[number])) {
    return apiError("Invalid status filter", 400);
  }

  const submissions = await prisma.contactSubmission.findMany({
    where: status ? { status: status as (typeof statuses)[number] } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return json(submissions);
}
