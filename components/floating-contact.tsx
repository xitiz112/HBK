"use client";

import { Phone } from "lucide-react";

import { openContactModal } from "@/components/contact-modal";

export default function FloatingContact() {
  return (
    <button
      type="button"
      aria-label="Contact Us"
      onClick={openContactModal}
      className={[
        "fixed z-40 xl:hidden",
        "right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))]",
        "inline-flex cursor-pointer items-center gap-2 rounded-full",
        "bg-[var(--color-primary)] px-4 py-3",
        "text-[15px] font-semibold text-white",
        "shadow-[0px_4px_14px_rgba(37,99,235,0.28)]",
        "transition-transform duration-200 hover:scale-[1.03]",
      ].join(" ")}
    >
      <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      Contact
    </button>
  );
}
