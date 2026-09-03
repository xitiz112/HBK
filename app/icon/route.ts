import { getStoredBlob } from "@/lib/blob";
import { getSiteSettings } from "@/lib/content";
import { isAllowedBlobHost } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  const url = settings.favicon || settings.logo;

  if (!url) {
    return new Response(null, { status: 404 });
  }

  try {
    if (isAllowedBlobHost(url)) {
      const result = await getStoredBlob(url);
      if (!result) {
        return new Response(null, { status: 404 });
      }

      return new Response(result.stream, {
        headers: {
          "Content-Type": result.blob.contentType ?? "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok || !response.body) {
      return new Response(null, { status: 404 });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
