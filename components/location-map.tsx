type LocationMapProps = {
  mapUrl?: string | null;
  address?: string | null;
  title?: string;
  className?: string;
};

function embedSrc(mapUrl?: string | null, address?: string | null) {
  const source = mapUrl?.trim() ?? "";
  if (source.includes("/maps/embed") || source.includes("output=embed")) {
    return source;
  }

  let query = address?.trim() ?? "";
  try {
    if (source) {
      query = new URL(source).searchParams.get("q") || query;
    }
  } catch {
    query = query || source;
  }

  if (!query) {
    return null;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function LocationMap({
  mapUrl,
  address,
  title = "Office location",
  className = "h-[380px] w-full border-0 sm:h-[460px]",
}: LocationMapProps) {
  const src = embedSrc(mapUrl, address);
  if (!src) {
    return null;
  }

  return (
    <iframe
      title={title}
      src={src}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
