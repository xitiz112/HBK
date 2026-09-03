export function isPrivateBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(".private.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function isAllowedBlobHost(url: string) {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function mediaSrc(url?: string | null) {
  if (!url) {
    return "";
  }
  if (url.startsWith("/") || !isPrivateBlobUrl(url)) {
    return url;
  }
  return `/api/media?url=${encodeURIComponent(url)}`;
}
