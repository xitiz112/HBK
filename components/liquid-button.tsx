"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Variant = "primary" | "secondary";

const base: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
  secondary:
    "border border-[var(--color-secondary)] bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]",
};

const rippleColor: Record<Variant, string> = {
  primary: "rgba(255,255,255,0.20)",
  secondary: "rgba(255,255,255,0.22)",
};

type Pos = { x: number; y: number };

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
  const ref = useRef<HTMLAnchorElement>(null);
  const [ripple, setRipple] = useState<{ pos: Pos; active: boolean }>({
    pos: { x: 0, y: 0 },
    active: false,
  });

  const capture = (e: React.MouseEvent<HTMLAnchorElement>): Pos => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={(e) => setRipple({ pos: capture(e), active: true })}
      onMouseLeave={(e) => setRipple({ pos: capture(e), active: false })}
      className={[
        "relative overflow-hidden",
        "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
        "transition-colors duration-300",
        base[variant],
        className,
      ].join(" ")}
    >
      {/* liquid blob */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: ripple.pos.x,
          top: ripple.pos.y,
          width: 320,
          height: 320,
          marginLeft: -160,
          marginTop: -160,
          borderRadius: "50%",
          background: rippleColor[variant],
          transform: ripple.active ? "scale(1)" : "scale(0)",
          opacity: ripple.active ? 1 : 0,
          transition:
            "transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />
      {/* content sits above the blob */}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}
