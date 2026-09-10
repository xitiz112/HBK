"use client";

import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

function getBreakpointPerPage() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 3;
  }
  if (window.matchMedia("(min-width: 768px)").matches) {
    return 2;
  }
  return 1;
}

const navButtonClass =
  "h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

type CardsCarouselProps = {
  children: ReactNode;
  ariaLabel: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  clipClassName?: string;
  showDots?: boolean;
  getDotLabel?: (index: number) => string;
  onNavigate?: () => void;
  /** When true, show arrows whenever there is more than one card (testimonials). */
  loopWhenMultiple?: boolean;
  autoPlay?: boolean;
  autoPlayMs?: number;
};

export function CardsCarousel({
  children,
  ariaLabel,
  prevLabel = "Previous",
  nextLabel = "Next",
  className = "mt-10",
  clipClassName = "",
  showDots = false,
  getDotLabel,
  onNavigate,
  loopWhenMultiple = false,
  autoPlay = true,
  autoPlayMs = 4500,
}: CardsCarouselProps) {
  const items = Children.toArray(children);
  const count = items.length;
  const breakpointPerPage = useSyncExternalStore(subscribePerPage, getBreakpointPerPage, () => 3);
  const perPage = Math.min(breakpointPerPage, Math.max(count, 1));
  const showNav = loopWhenMultiple ? count > 1 : count > perPage;
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const [pageSize, setPageSize] = useState(perPage);
  const [paused, setPaused] = useState(false);
  const locked = useRef(false);
  const onNavigateRef = useRef(onNavigate);
  const clipRef = useRef<HTMLDivElement>(null);
  const slides = showNav && count > 0 ? [...items, ...items] : items;
  const gap = 20;

  if (pageSize !== perPage) {
    setPageSize(perPage);
    setOffset(0);
    setAnimate(false);
  }

  useLayoutEffect(() => {
    locked.current = false;
  }, [perPage, count]);

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
    onNavigate?.();
    window.setTimeout(() => {
      locked.current = false;
    }, 550);

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

  useLayoutEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    if (!showNav || !autoPlay || paused) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      if (document.hidden || locked.current) {
        return;
      }
      locked.current = true;
      onNavigateRef.current?.();
      setAnimate(true);
      setOffset((current) => current + 1);
      window.setTimeout(() => {
        locked.current = false;
      }, 550);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [showNav, autoPlay, paused, autoPlayMs]);

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

  if (!count) {
    return null;
  }

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      data-autoplay={showNav && autoPlay && !paused ? "true" : "false"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3">
        {showNav ? (
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => go(-1)}
            className={`${navButtonClass} hidden sm:inline-flex`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}

        <div
          ref={clipRef}
          className={`min-w-0 flex-1 overflow-hidden ${clipClassName}`}
        >
          <div
            className={`flex items-stretch gap-5 ${animate ? "transition-transform duration-500 ease-out" : ""}`}
            style={{
              transform: step ? `translateX(-${offset * step}px)` : undefined,
            }}
            onTransitionEnd={finishSlide}
          >
            {slides.map((child, index) => (
              <div
                key={index}
                className="flex min-w-0 shrink-0 flex-col [&_>_*]:h-full"
                style={{
                  width: step ? `${step - gap}px` : `calc((100% - ${(perPage - 1) * 1.25}rem) / ${perPage})`,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {showNav ? (
          <button
            type="button"
            aria-label={nextLabel}
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
            aria-label={prevLabel}
            onClick={() => go(-1)}
            className={`${navButtonClass} inline-flex sm:hidden`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {showDots ? (
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={getDotLabel?.(index) ?? `Show item ${index + 1}`}
                  aria-current={index === offset % count ? "true" : undefined}
                  onClick={() => {
                    if (locked.current) {
                      return;
                    }
                    onNavigate?.();
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
          ) : null}
          <button
            type="button"
            aria-label={nextLabel}
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
