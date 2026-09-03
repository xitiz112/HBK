import { json } from "@/lib/api";
import { getHomePageData } from "@/lib/content";

export async function GET() {
  const data = await getHomePageData();
  return json(data);
}
