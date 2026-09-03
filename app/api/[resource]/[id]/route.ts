import { apiError, json } from "@/lib/api";
import { isPublicResource, readPublicItem } from "@/lib/api-resources";

export async function GET(
  _request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await context.params;

  if (!isPublicResource(resource)) {
    return apiError("Unknown resource", 404);
  }

  const item = await readPublicItem(resource, id);
  if (!item) {
    return apiError("Not found", 404);
  }

  return json(item);
}
