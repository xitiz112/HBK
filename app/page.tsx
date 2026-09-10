import type { Metadata } from "next";

import { ReferenceHomePage } from "@/components/homepage";
import { getHeroContent, getHomePageData, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, hero] = await Promise.all([getSiteSettings(), getHeroContent()]);

  return pageMetadata({
    title: settings.siteName,
    description: settings.description,
    path: "/",
    siteName: settings.siteName,
    image: hero.image || settings.logo,
    absoluteTitle: true,
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [data, { status }] = await Promise.all([getHomePageData(), searchParams]);

  return <ReferenceHomePage {...data} formStatus={status} />;
}
