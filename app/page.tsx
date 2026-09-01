import { ReferenceHomePage } from "@/components/homepage";
import { getHomePageData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [data, { status }] = await Promise.all([getHomePageData(), searchParams]);

  return <ReferenceHomePage {...data} formStatus={status} />;
}
