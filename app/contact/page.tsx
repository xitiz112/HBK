import {
  ContactInquirySection,
  PageHero,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { getContactInfo } from "@/lib/content";

export const dynamic = "force-dynamic";

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
