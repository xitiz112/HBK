"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={[
        "group fixed bottom-6 right-6 z-50",
        "flex items-center justify-center overflow-hidden",
        "h-11 w-11 rounded-full cursor-pointer",
        /* white base, thin primary border */
        "border border-[var(--color-primary)] bg-white text-[var(--color-primary)]",
        "shadow-[0px_4px_14px_rgba(37,99,235,0.25)]",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      {/* left-to-right liquid fill */}
      <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-[420ms] ease-out group-hover:scale-x-100" />
      {/* icon stays above fill, flips white */}
      <ArrowUp
        className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-white"
        strokeWidth={2.5}
      />
    </button>
  );
}
