"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  ButtonLink,
  Container,
  INDUSTRY_DROPDOWN,
  SERVICE_DROPDOWN,
} from "@/components/design-system";

function NavDropdown({
  items,
}: {
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div
      className={[
        "absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3",
        "pointer-events-none -translate-y-2 opacity-0",
        "transition-all duration-200 ease-out",
        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
      ].join(" ")}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-[0px_8px_24px_rgba(15,23,42,0.12)]">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[var(--color-primary)]"
          >
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

const Chevron = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 120) {
        // past 120 px: hide on scroll-down, reveal on scroll-up
        if (y > lastY.current + 4) {
          setVisible(false);          // scrolling down — hide
        } else if (y < lastY.current - 4) {
          setVisible(true);           // scrolling up — slide back down
        }
      } else {
        setVisible(true);             // near top — always show
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] backdrop-blur-sm"
          : "border-b border-transparent bg-white/80 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] backdrop-blur-sm",
      ].join(" ")}
    >
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-xs font-bold text-white">
            HBK
          </span>
          <span className="text-sm font-bold tracking-wide text-slate-900 sm:text-base">
            HBK &amp; Associates
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          <Link href="/" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
            Home
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
            About Us
          </Link>

          <div className="group relative">
            <Link href="/services" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
              Services
              <Chevron className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            <NavDropdown items={SERVICE_DROPDOWN} />
          </div>

          <div className="group relative">
            <Link href="/industries" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
              Industries
              <Chevron className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            <NavDropdown items={INDUSTRY_DROPDOWN} />
          </div>

          <Link href="/testimonials" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
            Testimonials
          </Link>
          <Link href="/contact" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
            Contact
          </Link>
        </nav>

        <ButtonLink href="/contact" className="hidden px-5 py-2.5 xl:inline-flex">
          Contact Us
        </ButtonLink>
      </Container>
    </header>
  );
}
