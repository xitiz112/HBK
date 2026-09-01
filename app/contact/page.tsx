import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/design-system";
import {
  ContactSection,
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
    <main className="bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="Contact"
        title="Start a conversation with HBK & Associates."
        description="Whether you need statutory audit support, tax guidance, or advice on internal controls, we can help you scope the right next step."
      />
      <section className="pb-16 sm:pb-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactSection contact={contact} />
          <ContactForm status={status} />
        </Container>
      </section>
      <SiteFooter contact={contact} />
    </main>
  );
}
