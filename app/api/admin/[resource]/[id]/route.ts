import { apiError, handlePrismaError, json, parseJsonBody, requireAdminApi } from "@/lib/api";
import { adminResources } from "@/lib/api-resources";
import { revalidateSite } from "@/lib/site-cache";

export async function GET(
  request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource, id } = await context.params;
  const config = adminResources[resource];
  if (!config || config.kind !== "collection") {
    return apiError("Unknown resource", 404);
  }

  try {
    const item = await config.get(id);
    if (!item) {
      return apiError("Not found", 404);
    }
    return json(item);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource, id } = await context.params;
  const config = adminResources[resource];
  if (!config || config.kind !== "collection") {
    return apiError("Unknown resource", 404);
  }

  const parsed = await parseJsonBody(request, config.schema);
  if (parsed.error) {
    return parsed.error;
  }

  try {
    const existing = await config.get(id);
    if (!existing || typeof existing !== "object" || !("id" in existing) || typeof existing.id !== "string") {
      return apiError("Not found", 404);
    }
    const updated = await config.update(existing.id, parsed.data as Record<string, unknown>);
    revalidateSite();
    return json(updated);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource, id } = await context.params;
  const config = adminResources[resource];
  if (!config || config.kind !== "collection") {
    return apiError("Unknown resource", 404);
  }

  try {
    const existing = await config.get(id);
    if (!existing || typeof existing !== "object" || !("id" in existing) || typeof existing.id !== "string") {
      return apiError("Not found", 404);
    }
    await config.remove(existing.id);
    revalidateSite();
    return json({ ok: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
