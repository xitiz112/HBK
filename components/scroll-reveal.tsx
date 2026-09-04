"use client";

import { useEffect, useRef } from "react";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right";

const initialStyles: Record<Variant, string> = {
  "fade-up":     "opacity-0 translate-y-8",
  "fade-in":     "opacity-0",
  "slide-left":  "opacity-0 -translate-x-8",
  "slide-right": "opacity-0 translate-x-8",
};

const animatedStyles: Record<Variant, string> = {
  "fade-up":     "opacity-100 translate-y-0",
  "fade-in":     "opacity-100",
  "slide-left":  "opacity-100 translate-x-0",
  "slide-right": "opacity-100 translate-x-0",
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0,
  duration = 700,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  threshold?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) {
        return;
      }
      revealed = true;
      window.setTimeout(() => {
        initialStyles[variant].split(" ").forEach((c) => el.classList.remove(c));
        animatedStyles[variant].split(" ").forEach((c) => el.classList.add(c));
      }, delay);
    };

    const isInView = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.bottom > 40 && rect.top < viewportHeight - 40;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "80px 0px" },
    );
    observer.observe(el);

    if (isInView()) {
      reveal();
      observer.disconnect();
    }

    const onScroll = () => {
      if (isInView()) {
        reveal();
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [variant, delay, threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${duration}ms` }}
      className={`transition-all ease-out ${initialStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
