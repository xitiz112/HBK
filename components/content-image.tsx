import Image from "next/image";

import { mediaSrc } from "@/lib/media";

export function ContentImage({
  src,
  alt,
  fallback,
  className = "h-auto w-full object-cover",
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  curvy = false,
}: {
  src?: string | null;
  alt: string;
  fallback?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  curvy?: boolean;
}) {
  const url = mediaSrc(src) || fallback;
  if (!url) {
    return null;
  }

  const proxied = url.startsWith("/api/");
  const isSvg = url.endsWith(".svg");
  const shapeClass = curvy ? "img-curvy" : "";
  const classes = [className, shapeClass].filter(Boolean).join(" ");

  if (fill) {
    if (proxied || isSvg) {
      return (
        // Private Blob files are streamed through /api/media.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${classes}`} />
      );
    }
    return <Image src={url} alt={alt} fill className={classes} sizes={sizes} priority={priority} />;
  }

  if (proxied) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt} className={classes} />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width ?? 640}
      height={height ?? 480}
      className={classes}
      sizes={sizes}
      priority={priority}
    />
  );
}
