"use client";

import { useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { ContentImage } from "@/components/content-image";
import { ds } from "@/components/design-system";
import type { TestimonialData } from "@/lib/content";

function subscribePerPage(onChange: () => void) {
  const tablet = window.matchMedia("(min-width: 768px)");
  const desktop = window.matchMedia("(min-width: 1024px)");
  tablet.addEventListener("change", onChange);
  desktop.addEventListener("change", onChange);
  return () => {
    tablet.removeEventListener("change", onChange);
    desktop.removeEventListener("change", onChange);
  };
}

function getPerPage() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 3;
  }
  if (window.matchMedia("(min-width: 768px)").matches) {
    return 2;
  }
  return 1;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <article className={`${ds.card} ${ds.cardPadding} h-full min-w-0 flex-1`}>
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className={`mt-4 ${ds.bodySm}`}>&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary-muted)] text-sm font-bold text-[var(--color-primary)]">
            {testimonial.author.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-[15px] font-bold text-slate-900">{testimonial.author}</p>
          <p className="text-xs text-slate-500">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}

const navButtonClass =
  "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  const perPage = useSyncExternalStore(subscribePerPage, getPerPage, () => 3);
  const pageCount = Math.max(1, Math.ceil(testimonials.length / perPage));
  const [page, setPage] = useState(0);
  const currentPage = ((page % pageCount) + pageCount) % pageCount;
  const showNav = pageCount > 1;
  const visible = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage);

  const go = (direction: -1 | 1) => {
    setPage((current) => (current + direction + pageCount) % pageCount);
  };

  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="mt-10" role="region" aria-roledescription="carousel" aria-label="Client feedback">
      <div className="flex items-center gap-3 sm:gap-5">
        {showNav ? (
          <button
            type="button"
            aria-label="Previous client feedback"
            onClick={() => go(-1)}
            className={`${navButtonClass} hidden sm:inline-flex`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}

        <div key={currentPage} className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id ?? testimonial.author}
              testimonial={testimonial}
            />
          ))}
        </div>

        {showNav ? (
          <button
            type="button"
            aria-label="Next client feedback"
            onClick={() => go(1)}
            className={`${navButtonClass} hidden sm:inline-flex`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {showNav ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous client feedback"
            onClick={() => go(-1)}
            className={`${navButtonClass} sm:hidden`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show client feedback group ${index + 1}`}
                aria-current={index === currentPage ? "true" : undefined}
                onClick={() => setPage(index)}
                className={`h-2.5 cursor-pointer rounded-full transition ${
                  index === currentPage
                    ? "w-6 bg-[var(--color-primary)]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next client feedback"
            onClick={() => go(1)}
            className={`${navButtonClass} sm:hidden`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
