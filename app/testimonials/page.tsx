import { CTASection, PageHero, SiteFooter, SiteHeader, TestimonialsSection } from "@/components/site";
import { getContactInfo, getTestimonials } from "@/lib/content";

export const dynamic = "force-dynamic";

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
