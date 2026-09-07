"use client";

import { Star } from "lucide-react";

import { CardsCarousel } from "@/components/cards-carousel";
import { ContentImage } from "@/components/content-image";
import { ds } from "@/components/design-system";
import type { TestimonialData } from "@/lib/content";

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col rounded-xl border border-white/20 bg-[var(--color-primary)] text-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_6px_16px_0px_rgba(99,99,99,0.25)] ${ds.cardPadding}`}
    >
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-base leading-6 text-white">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-5">
        {testimonial.image ? (
          <span className="relative h-10 w-10 overflow-hidden rounded-full">
            <ContentImage
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="40px"
              curvy={false}
            />
          </span>
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
            {testimonial.author.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-[15px] font-bold text-white">{testimonial.author}</p>
          <p className="text-xs text-white/70">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <CardsCarousel
      ariaLabel="Client feedback"
      prevLabel="Previous client feedback"
      nextLabel="Next client feedback"
      showDots
      loopWhenMultiple
      getDotLabel={(index) => `Show client feedback ${index + 1}`}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id ?? testimonial.author} testimonial={testimonial} />
      ))}
    </CardsCarousel>
  );
}
