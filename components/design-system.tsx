import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ScrollReveal from "@/components/scroll-reveal";
import type { CompanyStatData, ContactInfoData } from "@/lib/content";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICE_DROPDOWN = [
  { label: "Audit & Assurance", href: "/services" },
  { label: "Tax Planning", href: "/services" },
  { label: "Business Advisory", href: "/services" },
  { label: "Risk & Controls", href: "/services" },
  { label: "Financial Reporting", href: "/services" },
] as const;

export const INDUSTRY_DROPDOWN = [
  { label: "Manufacturing", href: "/industries" },
  { label: "Real Estate", href: "/industries" },
  { label: "Healthcare", href: "/industries" },
  { label: "Financial Services", href: "/industries" },
  { label: "Government & NPO", href: "/industries" },
] as const;

/** Shared class tokens aligned with the reference UI */
export const ds = {
  container: "mx-auto w-full max-w-[1180px] px-5 lg:px-8",
  section: "py-16 sm:py-20",
  sectionMuted: "bg-slate-50 py-16 sm:py-20",
  sectionBrand: "bg-[var(--color-accent-muted)] py-16 sm:py-20",
  card: "rounded-xl border border-slate-200 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_6px_16px_0px_rgba(99,99,99,0.25)]",
  cardPadding: "p-6",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]",
  h1: "text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl",
  h2: "text-3xl font-bold text-slate-900 sm:text-4xl",
  h3: "text-lg font-bold text-slate-900",
  body: "text-base leading-7 text-slate-600",
  bodySm: "text-sm leading-6 text-slate-600",
  btnPrimary:
    "inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] transition hover:bg-[var(--color-primary-dark)]",
  btnSecondary:
    "inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary-dark)] hover:border-[var(--color-secondary-dark)]",
  btnInverse:
    "inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-accent-muted)]",
  link: "inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline",
  input:
    "mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
  iconBox:
    "flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-secondary-muted)] text-[var(--color-primary)]",
  iconCircle:
    "flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-secondary-muted)] text-[var(--color-primary)]",
  footerLabel: "text-xs font-bold uppercase tracking-wider text-slate-500",
} as const;

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${ds.container} ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={ds.eyebrow}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl";
  return (
    <div className={wrap}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-3 ${ds.h2}`}>{title}</h2>
      {description ? <p className={`mt-4 ${ds.body}`}>{description}</p> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
}) {
  const styles = {
    primary: ds.btnPrimary,
    secondary: ds.btnSecondary,
    inverse: ds.btnInverse,
  }[variant];
  return (
    <Link href={href} className={`${styles} ${className}`}>
      {children}
    </Link>
  );
}

export { default as SiteHeader } from "@/components/site-header";

export function SiteFooter({ contact }: { contact: ContactInfoData }) {
  return (
    <footer className="bg-slate-950 py-14 text-slate-300">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-xs font-bold text-white">
              HBK
            </span>
            <span className="text-sm font-bold text-white">HBK &amp; Associates</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Independent audit, tax, and advisory services that help organizations build confidence
            in their reporting and governance.
          </p>
        </div>
        <div>
          <p className={ds.footerLabel}>Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={ds.footerLabel}>Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_DROPDOWN.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={ds.footerLabel}>Get in Touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{contact.address}</li>
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} HBK &amp; Associates. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-slate-300">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-slate-300">
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-[var(--color-accent-muted)] py-14 sm:py-16">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={`mt-3 max-w-4xl ${ds.h1}`}>{title}</h1>
        <p className={`mt-5 max-w-3xl ${ds.body}`}>{description}</p>
      </Container>
    </section>
  );
}

export function StatsBand({ stats }: { stats: CompanyStatData[] }) {
  return (
    <section className="border-y border-slate-200 bg-[var(--color-accent-muted)] py-8">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} variant="fade-up" delay={index * 100}>
              <div className="px-4 text-center lg:px-8">
                <p className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaBanner({
  title = "Ready to Strengthen Your Financial Foundation?",
  description = "Consult with our experts today and discover how HBK can support your next audit, tax, or advisory engagement.",
  buttonLabel = "Get in Touch",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--color-primary)] px-8 py-10 sm:flex-row sm:items-center sm:px-12">
          <ScrollReveal variant="slide-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-secondary-soft)]">{description}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={100}>
            <ButtonLink href={buttonHref} variant="inverse" className="shrink-0">
              {buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export function StatusNotice({ status }: { status?: string }) {
  if (!status) {
    return null;
  }

  const styles =
    status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-amber-200 bg-amber-50 text-amber-700";

  const label =
    status === "success"
      ? "Your message has been sent. We will get back to you shortly."
      : "Please check your inputs and try again.";

  return <div className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>{label}</div>;
}
