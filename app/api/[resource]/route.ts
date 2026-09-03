import { apiError, json } from "@/lib/api";
import { isPublicResource, readPublicResource } from "@/lib/api-resources";

export async function GET(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const { resource } = await context.params;

  if (!isPublicResource(resource)) {
    return apiError("Unknown resource", 404);
  }

  const data = await readPublicResource(resource, new URL(request.url).searchParams);
  return json(data);
}
