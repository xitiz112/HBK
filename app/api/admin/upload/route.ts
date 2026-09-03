import { apiError, json, requireAdminApi } from "@/lib/api";
import { getBlobToken, uploadPublicImage } from "@/lib/blob";

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if (auth.error) {
    return auth.error;
  }

  if (!getBlobToken()) {
    return apiError(
      "Vercel Blob is not configured. Add BLOB_READ_WRITE_TOKEN to .env and restart the server.",
      503,
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "uploads").replace(/[^a-z0-9-]/gi, "") || "uploads";

  if (!file || typeof file !== "object" || !("arrayBuffer" in file) || !("size" in file) || Number(file.size) === 0) {
    return apiError("Choose an image file to upload.", 400);
  }

  try {
    const blob = await uploadPublicImage(file as File, folder);
    return json({ url: blob.url, pathname: blob.pathname }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return apiError(message, 400);
  }
}
