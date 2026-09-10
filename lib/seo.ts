import type { Metadata } from "next";

import type { ContactInfoData, SiteSettingsData } from "@/lib/content";
import { mediaSrc } from "@/lib/media";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/contact",
  "/team",
  "/testimonials",
] as const;

export const DEFAULT_OG_IMAGE = "/images/hero-office.png";

export function seoImageUrl(url?: string | null) {
  const src = mediaSrc(url) || DEFAULT_OG_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return absoluteUrl(src);
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  siteName: string;
  image?: string | null;
  absoluteTitle?: boolean;
};

export function truncateMeta(text: string, max = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  const sliced = normalized.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).trim()}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  siteName,
  image,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const canonicalPath = path || "/";
  const url = absoluteUrl(canonicalPath);
  const ogImage = seoImageUrl(image);
  const ogTitle = absoluteTitle ? title : `${title} | ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export function localBusinessJsonLd(settings: SiteSettingsData, contact: ContactInfoData) {
  const siteUrl = getSiteUrl();
  const telephones = contact.phone
    .split(/[,/]/)
    .map((value) => toNepalTel(value))
    .filter((value): value is string => Boolean(value));

  return {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
    name: settings.siteName,
    description: settings.description,
    url: siteUrl,
    email: contact.email,
    telephone: telephones.length <= 1 ? telephones[0] : telephones,
    image: seoImageUrl(settings.logo),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    openingHours: "Su-Fr 09:00-18:00",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

function toNepalTel(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) {
    return undefined;
  }
  if (digits.startsWith("977")) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+977${digits}`;
  }
  return `+${digits}`;
}
