import { apiError } from "@/lib/api";
import { getBlobToken, getStoredBlob } from "@/lib/blob";
import { isAllowedBlobHost } from "@/lib/media";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");
  if (!url || !isAllowedBlobHost(url)) {
    return apiError("Invalid media URL.", 400);
  }

  if (!getBlobToken()) {
    return apiError("Vercel Blob is not configured.", 503);
  }

  try {
    const result = await getStoredBlob(url);
    if (!result) {
      return apiError("Image not found.", 404);
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load image.";
    return apiError(message, 400);
  }
}
