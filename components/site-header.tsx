"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import FloatingContact from "@/components/floating-contact";
import { ContactModalHost, openContactModal } from "@/components/contact-modal";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteBrand } from "@/components/site-brand";
import { ButtonLink, NAV_LINKS, type MenuLink } from "@/components/design-system";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";

function NavDropdown({
  items,
}: {
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div
      className={[
        "absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3",
        "pointer-events-none -translate-y-2 opacity-0",
        "transition-all duration-200 ease-out",
        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
      ].join(" ")}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-[0px_8px_24px_rgba(15,23,42,0.12)]">
        {items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            className="block px-4 py-2.5 text-[15px] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[var(--color-primary)]"
          >
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

export default function SiteHeader({
  settings = {
    siteName: "HBK & Associates",
    shortName: "HBK",
    logo: null,
    showSiteName: true,
  },
  overlapHero = false,
  serviceItems = [],
  industryItems = [],
}: {
  settings?: {
    siteName: string;
    shortName: string;
    logo?: string | null;
    showSiteName: boolean;
  };
  overlapHero?: boolean;
  serviceItems?: MenuLink[];
  industryItems?: MenuLink[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<"services" | "industries" | null>(null);
  const [headerHeight, setHeaderHeight] = useState(72);
  const lastY = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSection(null);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (menuOpen) {
        setVisible(true);
        lastY.current = y;
        return;
      }
      if (y > 120) {
        if (y > lastY.current + 4) {
          setVisible(false);
        } else if (y < lastY.current - 4) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    lockBodyScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const el = barRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      return;
    }
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {overlapHero ? null : (
        <div style={{ height: headerHeight }} aria-hidden />
      )}
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled || menuOpen
          ? "border-b border-slate-200 bg-white/95 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] backdrop-blur-sm"
          : "border-b border-transparent bg-white/80 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] backdrop-blur-sm",
      ].join(" ")}
    >
      <div
        ref={barRef}
        className="mx-auto flex w-full min-w-0 items-center justify-between gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pb-4 lg:px-8"
      >
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={settings.siteName} onClick={closeMenu}>
          <SiteBrand
            siteName={settings.siteName}
            shortName={settings.shortName}
            logo={settings.logo}
            showSiteName={false}
            size="lg"
          />
        </Link>

        <nav className="hidden items-center gap-3 xl:flex">
          {NAV_LINKS.map((item) => {
            if (item.href === "/services") {
              return (
                <div key={item.href} className="group relative">
                  <Link href="/services" className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
                    {item.label}
                    <Chevron className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  {serviceItems.length ? <NavDropdown items={serviceItems} /> : null}
                </div>
              );
            }
            if (item.href === "/industries") {
              return (
                <div key={item.href} className="group relative">
                  <Link href="/industries" className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-slate-600 transition hover:text-[var(--color-primary)]">
                    {item.label}
                    <Chevron className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  {industryItems.length ? <NavDropdown items={industryItems} /> : null}
                </div>
              );
            }
            if (item.href === "/contact") {
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={openContactModal}
                  className="cursor-pointer px-3 py-2 text-[15px] font-medium text-slate-600 transition hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </button>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[15px] font-medium text-slate-600 transition hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline-flex">
            <LanguageSwitcher />
          </span>
          <span className="hidden xl:inline-flex">
            <ButtonLink variant="solid" className="px-5 py-2.5" onClick={openContactModal}>
              Contact Us
            </ButtonLink>
          </span>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "xl:hidden overflow-hidden border-t border-slate-200 bg-white",
          "transition-all duration-300 ease-out",
          menuOpen ? "max-h-[min(80dvh,720px)] opacity-100" : "max-h-0 border-t-0 opacity-0",
        ].join(" ")}
      >
        <nav className="mx-auto max-h-[min(80dvh,720px)] w-full overflow-y-auto overscroll-contain px-5 py-4 lg:px-8">
          <div className="mb-3 sm:hidden">
            <LanguageSwitcher />
          </div>
          <ul className="space-y-1">
            {NAV_LINKS.map((item) => {
              if (item.href === "/services" || item.href === "/industries") {
                const key = item.href === "/services" ? "services" : "industries";
                const items = key === "services" ? serviceItems : industryItems;
                const expanded = openSection === key;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setOpenSection(expanded ? null : key)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-semibold text-slate-800"
                    >
                      {item.label}
                      <Chevron className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    {expanded ? (
                      <ul className="mb-2 ml-3 space-y-1 border-l border-slate-200 pl-3">
                        <li>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="block rounded-lg px-3 py-2 text-[15px] font-medium text-[var(--color-primary)]"
                          >
                            View all {item.label}
                          </Link>
                        </li>
                        {items.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={closeMenu}
                              className="block rounded-lg px-3 py-2 text-[15px] text-slate-600"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              }

              if (item.href === "/contact") {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        openContactModal();
                      }}
                      className="block w-full cursor-pointer rounded-lg px-3 py-3 text-left text-[15px] font-semibold text-slate-800"
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-slate-800"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
    <FloatingContact />
    <ContactModalHost />
    </>
  );
}
