import { apiError, handlePrismaError, json, parseJsonBody, requireAdminApi } from "@/lib/api";
import { adminResources } from "@/lib/api-resources";
import { revalidateSite } from "@/lib/site-cache";

export async function GET(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource } = await context.params;
  const config = adminResources[resource];
  if (!config) {
    return apiError("Unknown resource", 404);
  }

  try {
    if (config.kind === "singleton") {
      return json(await config.get());
    }
    return json(await config.list());
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource } = await context.params;
  const config = adminResources[resource];
  if (!config) {
    return apiError("Unknown resource", 404);
  }
  if (config.kind !== "collection") {
    return apiError("This resource does not support POST. Use PUT to update it.", 405);
  }

  const parsed = await parseJsonBody(request, config.schema);
  if (parsed.error) {
    return parsed.error;
  }

  try {
    const created = await config.create(parsed.data as Record<string, unknown>);
    revalidateSite();
    return json(created, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  const { resource } = await context.params;
  const config = adminResources[resource];
  if (!config) {
    return apiError("Unknown resource", 404);
  }
  if (config.kind !== "singleton") {
    return apiError("Use PUT /api/admin/{resource}/{id} to update this item.", 405);
  }

  const parsed = await parseJsonBody(request, config.schema);
  if (parsed.error) {
    return parsed.error;
  }

  try {
    const updated = await config.upsert(parsed.data as Record<string, unknown>);
    revalidateSite();
    return json(updated);
  } catch (error) {
    return handlePrismaError(error);
  }
}
