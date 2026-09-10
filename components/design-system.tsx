import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContentImage } from "@/components/content-image";
import ScrollReveal from "@/components/scroll-reveal";
import type { CompanyStatData } from "@/lib/content";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/industries", label: "Industries worked " },
  { href: "/services", label: "Our Services" },
  { href: "/contact", label: "Contact Us" },
  { href: "/team", label: "Our Team" },
] as const;

export type MenuLink = {
  label: string;
  href: string;
};

/** Shared class tokens aligned with the reference UI */
export const ds = {
  container: "mx-auto w-full max-w-[1180px] px-4 sm:px-5 lg:px-8",
  section: "py-16 sm:py-20",
  sectionMuted: "bg-white py-16 sm:py-20",
  sectionBrand: "bg-[var(--color-accent-muted)] py-16 sm:py-20",
  card: "rounded-xl border border-slate-200 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_6px_16px_0px_rgba(99,99,99,0.25)]",
  cardPadding: "p-6",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]",
  h1: "text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl",
  h2: "text-3xl font-bold text-slate-900 sm:text-4xl",
  h3: "text-xl font-bold text-slate-900",
  body: "text-[16px] leading-[1.5] text-slate-600",
  bodySm: "text-base leading-6 text-slate-600",
  btnPrimary:
    "group relative overflow-hidden inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)] bg-white px-6 py-3 text-[15px] font-semibold text-[var(--color-primary)]",
  btnSecondary:
    "group relative overflow-hidden inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary)] bg-white px-6 py-3 text-[15px] font-semibold text-[var(--color-secondary)]",
  btnSolid:
    "group relative overflow-hidden inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-[15px] font-semibold text-white",
  btnInverse:
    "group relative overflow-hidden inline-flex items-center gap-2 rounded-lg border border-white bg-transparent px-6 py-3 text-[15px] font-semibold text-white",
  link: "inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline",
  input:
    "mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
  iconBox:
    "flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-secondary-muted)] text-[var(--color-primary)]",
  iconCircle:
    "flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-secondary-muted)] text-[var(--color-primary)]",
  footerLabel: "text-[18px] font-bold capitalize text-slate-400",
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
  descriptionClassName = "text-[16px] leading-[1.5] text-slate-600",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  descriptionClassName?: string;
  align?: "left" | "center";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl";
  return (
    <div className={wrap}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-3 ${ds.h2}`}>{title}</h2>
      {description ? (
        <p className={`mt-3 ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

const fillClass = {
  primary:   "bg-[var(--color-primary)]",
  secondary: "bg-[var(--color-secondary)]",
  solid:     "bg-white",
  inverse:   "bg-white/25",
} as const;

const hoverTextClass = {
  primary:   "group-hover:text-white",
  secondary: "group-hover:text-white",
  solid:     "group-hover:text-[var(--color-primary)]",
  inverse:   "group-hover:text-white",
} as const;

export function ButtonLink({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  "aria-label": ariaLabel,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "solid" | "inverse";
  className?: string;
  "aria-label"?: string;
}) {
  const styles = {
    primary: ds.btnPrimary,
    secondary: ds.btnSecondary,
    solid: ds.btnSolid,
    inverse: ds.btnInverse,
  }[variant];
  const inner = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-[420ms] ease-out group-hover:scale-x-100 ${fillClass[variant]}`}
      />
      <span className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${hoverTextClass[variant]}`}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles} ${className}`} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${styles} ${className} cursor-pointer`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}

export function PageHero({ title }: { title: string }) {
  return (
    <section className="bg-[#2663ec] py-10 sm:py-12">
      <Container>
        <h1 className="break-words text-center text-3xl font-bold leading-[1.12] tracking-tight text-[#ffffff] sm:text-4xl md:text-5xl">
          {title}
        </h1>
      </Container>
    </section>
  );
}

export function StatsBand({
  stats,
  delay = 0,
}: {
  stats: CompanyStatData[];
  delay?: number;
}) {
  return (
    <section className="border-y border-slate-200 bg-[var(--color-accent-muted)] py-8">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} variant="fade-up" delay={delay + index * 180} duration={650}>
              <div className="px-4 text-center lg:px-8">
                {stat.image ? (
                  <span className="relative mx-auto mb-3 block h-10 w-10 overflow-hidden rounded-full">
                    <ContentImage src={stat.image} alt={stat.label} fill className="object-cover" sizes="40px" curvy={false} />
                  </span>
                ) : null}
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
  title = "Need help?",
  description = "Send us a message and we will get back to you.",
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
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--color-primary)] px-5 py-8 sm:flex-row sm:items-center sm:px-12 sm:py-10">
          <ScrollReveal variant="slide-left" delay={200}>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
              <p className="mt-1.5 max-w-xl text-[16px] leading-[1.5] text-[var(--color-secondary-soft)]">{description}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={360}>
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
