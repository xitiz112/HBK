import Link from "next/link";

type Variant = "primary" | "secondary";

const border: Record<Variant, string> = {
  primary: "border-[var(--color-primary)] text-[var(--color-primary)]",
  secondary: "border-[var(--color-secondary)] text-[var(--color-secondary)]",
};

const fill: Record<Variant, string> = {
  primary: "bg-[var(--color-primary)]",
  secondary: "bg-[var(--color-secondary)]",
};

export default function LiquidButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden",
        "inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-6 py-3 text-[15px] font-semibold sm:w-auto",
        border[variant],
        className,
      ].join(" ")}
    >
      {/* left-to-right liquid fill */}
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-[420ms] ease-out group-hover:scale-x-100 ${fill[variant]}`}
      />
      {/* content stays above the fill, text flips white */}
      <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </Link>
  );
}
