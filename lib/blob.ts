import "server-only";

import { get, put, type PutBlobResult } from "@vercel/blob";

import { isAllowedBlobHost } from "@/lib/media";

const MAX_BYTES = 4.5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

type BlobAccess = "public" | "private";

export function getBlobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim().replace(/^["']|["']$/g, "");
  return token || undefined;
}

export function assertBlobConfigured() {
  if (!getBlobToken()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set. Add it to .env and restart the server.");
  }
}

function preferredAccess(): BlobAccess {
  const value = process.env.BLOB_ACCESS?.trim().replace(/^["']|["']$/g, "");
  return value === "public" ? "public" : "private";
}

function isAccessMismatch(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /public access on a private store|private access on a public store|access on a (private|public) store/i.test(
    message,
  );
}

async function putWithStoreAccess(
  pathname: string,
  file: File,
  contentType: string,
): Promise<PutBlobResult> {
  const token = getBlobToken();
  const first = preferredAccess();
  const attempts: BlobAccess[] = first === "private" ? ["private", "public"] : ["public", "private"];
  let lastError: unknown;

  for (const access of attempts) {
    try {
      return await put(pathname, file, {
        access,
        addRandomSuffix: true,
        contentType,
        token,
      });
    } catch (error) {
      lastError = error;
      if (!isAccessMismatch(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Upload failed because the Blob store access mode could not be determined.");
}

function inferType(file: File) {
  if (file.type && ALLOWED_TYPES.has(file.type)) {
    return file.type === "image/jpg" ? "image/jpeg" : file.type;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  const fromName: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif",
  };
  return extension ? fromName[extension] : undefined;
}

export async function uploadPublicImage(file: File, folder = "uploads") {
  assertBlobConfigured();

  const contentType = inferType(file);
  if (!contentType) {
    throw new Error("Only JPEG, PNG, WebP, GIF, or AVIF images are allowed.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 4.5MB or smaller.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const pathname = `hbk/${folder}/${safeName}`;

  return putWithStoreAccess(pathname, file, contentType);
}

export async function getStoredBlob(url: string) {
  if (!isAllowedBlobHost(url)) {
    return null;
  }

  const token = getBlobToken();
  if (!token) {
    return null;
  }

  const result =
    (await get(url, { access: "private", token })) ??
    (await get(url, { access: "public", token }));

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  return result;
}
