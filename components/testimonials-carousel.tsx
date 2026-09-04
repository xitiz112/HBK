"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type TransitionEvent } from "react";
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

function TestimonialCard({
  testimonial,
  className = "",
  style,
}: {
  testimonial: TestimonialData;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article className={`${ds.card} ${ds.cardPadding} flex min-w-0 flex-col ${className}`} style={style}>
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className={`mt-4 flex-1 ${ds.bodySm}`}>&ldquo;{testimonial.quote}&rdquo;</p>
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
  "h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  const perPage = useSyncExternalStore(subscribePerPage, getPerPage, () => 3);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const locked = useRef(false);
  const clipRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;
  const showNav = count > 1;
  const slides = count > 0 ? [...testimonials, ...testimonials] : [];
  const gap = 20;

  useLayoutEffect(() => {
    const el = clipRef.current;
    if (!el) {
      return;
    }
    const update = () => setStep((el.clientWidth + gap) / perPage);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [perPage]);

  const go = (direction: -1 | 1) => {
    if (!showNav || locked.current) {
      return;
    }
    locked.current = true;

    if (direction < 0 && offset === 0) {
      setAnimate(false);
      setOffset(count);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setAnimate(true);
          setOffset(count - 1);
        });
      });
      return;
    }

    setAnimate(true);
    setOffset((current) => current + direction);
  };

  const finishSlide = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    locked.current = false;
    if (offset >= count) {
      setAnimate(false);
      setOffset(offset - count);
    }
  };

  if (!testimonials.length) {
    return null;
  }

  return (
    <div
      className="mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client feedback"
    >
      <div className="flex items-center gap-3">
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

        <div ref={clipRef} className="min-w-0 flex-1 overflow-x-clip overflow-y-visible">
          <div
            className={`flex items-stretch gap-5 ${animate ? "transition-transform duration-500 ease-out" : ""}`}
            style={{
              transform: step ? `translateX(-${offset * step}px)` : undefined,
            }}
            onTransitionEnd={finishSlide}
          >
            {slides.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id ?? testimonial.author}-${index}`}
                testimonial={testimonial}
                className="shrink-0"
                style={{
                  width: step ? `${step - gap}px` : `calc((100% - ${(perPage - 1) * 1.25}rem) / ${perPage})`,
                }}
              />
            ))}
          </div>
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
            className={`${navButtonClass} inline-flex sm:hidden`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id ?? `${testimonial.author}-${index}`}
                type="button"
                aria-label={`Show client feedback ${index + 1}`}
                aria-current={index === offset % count ? "true" : undefined}
                onClick={() => {
                  if (locked.current) {
                    return;
                  }
                  setAnimate(true);
                  setOffset(index);
                }}
                className={`h-2.5 cursor-pointer rounded-full transition ${
                  index === offset % count
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
            className={`${navButtonClass} inline-flex sm:hidden`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
