import type { Metadata } from "next";

import {
  ContactInquirySection,
  PageHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { getContactInfo, getSiteSettings } from "@/lib/content";
import { pageMetadata, truncateMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, contact] = await Promise.all([getSiteSettings(), getContactInfo()]);

  return pageMetadata({
    title: "Contact Us",
    description: truncateMeta(
      `Contact ${settings.siteName} in New Baneshwor, Kathmandu for audit, tax, and accounting support.`,
    ),
    path: "/contact",
    siteName: settings.siteName,
    image: contact.image || settings.logo,
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, contact] = await Promise.all([searchParams, getContactInfo()]);

  return (
    <main className="bg-background">
      <SiteHeader />
      <PageHero title="Contact Us" />
      <ContactInquirySection contact={contact} formStatus={status} returnTo="/contact" />
      <SiteFooter contact={contact} />
    </main>
  );
}
