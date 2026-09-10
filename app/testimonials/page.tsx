import type { Metadata } from "next";

import { CTASection, PageHero, SiteFooter, SiteHeader, TestimonialsSection } from "@/components/site";
import { getContactInfo, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return pageMetadata({
    title: "Client Feedback",
    description: `Read client feedback for ${settings.siteName} and how organizations in Nepal rely on our audit, tax, and accounting work.`,
    path: "/testimonials",
    siteName: settings.siteName,
    image: settings.logo,
  });
}

export default async function TestimonialsPage() {
  const [testimonials, contact] = await Promise.all([getTestimonials(), getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="Client Feedback" />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
