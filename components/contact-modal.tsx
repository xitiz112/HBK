"use client";

import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";

const OPEN_EVENT = "hbk-open-contact";
const FADE_MS = 280;

export function openContactModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function ContactModalHost() {
  return (
    <Suspense fallback={null}>
      <ContactModalDialog />
    </Suspense>
  );
}

function ContactModalDialog() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const status = searchParams.get("status") ?? undefined;
  const requested = searchParams.get("contact") === "1";
  const [mounted, setMounted] = useState(requested);
  const [visible, setVisible] = useState(false);
  const shown = useRef(false);

  const open = useCallback(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    if (requested || status) {
      router.replace(pathname, { scroll: false });
    }
  }, [pathname, requested, router, status]);

  useEffect(() => {
    const onOpen = () => open();
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [open]);

  useEffect(() => {
    if (requested) open();
  }, [open, requested, status]);

  useEffect(() => {
    if (!mounted) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [mounted]);

  useEffect(() => {
    if (visible) shown.current = true;
  }, [visible]);

  useEffect(() => {
    if (!mounted || visible || !shown.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      shown.current = false;
      setMounted(false);
    }, reduceMotion ? 0 : FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) return;
    lockBodyScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, close]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto overflow-x-hidden overscroll-contain p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-10">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close contact form"
        className={`absolute inset-0 bg-slate-950/50 transition-opacity duration-[280ms] ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 my-auto w-full max-h-[min(100%,calc(100dvh-2rem))] max-w-lg overflow-y-auto overscroll-contain transition-[opacity,transform] duration-[280ms] ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-3 top-3 z-20 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="h-5 w-5" />
        </button>
        <ContactForm status={status} returnTo={pathname} headingId={titleId} fromModal />
      </div>
    </div>
  );
}
