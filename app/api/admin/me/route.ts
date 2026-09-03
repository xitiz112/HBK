import { json, requireAdminApi } from "@/lib/api";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  return json({ user: auth.session });
}
