/** Absolute public origin for sitemap, canonical URLs, and Open Graph. */
export function getSiteUrl() {
  const explicit = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return trimTrailingSlash(explicit);
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) {
    return `https://${trimTrailingSlash(production)}`;
  }

  const deployment = process.env.VERCEL_URL;
  if (deployment) {
    return `https://${trimTrailingSlash(deployment)}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const origin = getSiteUrl();
  if (!path || path === "/") {
    return origin;
  }

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}
