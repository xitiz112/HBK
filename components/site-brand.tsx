import { mediaSrc } from "@/lib/media";

export type SiteBrandProps = {
  siteName: string;
  shortName: string;
  logo?: string | null;
  showSiteName?: boolean;
  inverted?: boolean;
  size?: "md" | "lg";
};

const sizeClasses = {
  md: {
    img: "h-12 w-auto max-w-[180px] object-contain",
    badge: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
  },
  lg: {
    img: "h-10 w-auto max-w-[min(10rem,calc(100vw-7.5rem))] object-contain object-left sm:h-14 sm:max-w-[13.75rem] lg:h-[4rem] lg:max-w-[16.25rem]",
    badge: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
  },
};

export function SiteBrand({
  siteName,
  shortName,
  logo,
  showSiteName = true,
  inverted = false,
  size = "md",
}: SiteBrandProps) {
  const src = mediaSrc(logo);
  const nameClass = inverted ? "text-white" : "text-slate-900";
  const badgeClass = inverted
    ? "bg-white text-[var(--color-primary)]"
    : "bg-[var(--color-primary)] text-white";
  const classes = sizeClasses[size];

  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={showSiteName ? "" : siteName} className={classes.img} />
      ) : (
        <span className={`${classes.badge} ${badgeClass}`}>{shortName}</span>
      )}
      {showSiteName ? (
        <span className={`truncate text-sm font-bold tracking-wide sm:text-base ${nameClass}`}>{siteName}</span>
      ) : null}
    </span>
  );
}
