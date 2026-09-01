import { CTASection, PageHero, SiteFooter, SiteHeader, TestimonialsSection } from "@/components/site";
import { getContactInfo, getTestimonials } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [testimonials, contact] = await Promise.all([getTestimonials(), getContactInfo()]);

  return (
    <main className="bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="Client Feedback"
        title="What organizations say about working with HBK & Associates."
        description="Our engagements are designed to be clear, responsive, and useful from start to finish. These testimonials reflect the trust clients place in our team."
      />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      <SiteFooter contact={contact} />
    </main>
  );
}
