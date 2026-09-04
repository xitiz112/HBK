"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <Link
      href="/contact"
      aria-label="Contact Us"
      className={[
        "fixed bottom-6 right-6 z-40 xl:hidden",
        "inline-flex items-center gap-2 rounded-full",
        "bg-[var(--color-primary)] px-4 py-3",
        "text-[15px] font-semibold text-white",
        "shadow-[0px_4px_14px_rgba(37,99,235,0.28)]",
        "transition-transform duration-200 hover:scale-[1.03]",
      ].join(" ")}
    >
      <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      Contact
    </Link>
  );
}
