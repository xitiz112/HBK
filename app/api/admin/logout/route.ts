import { json, requireAdminApi } from "@/lib/api";
import { clearAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  await clearAdminSession();
  return json({ ok: true });
}
