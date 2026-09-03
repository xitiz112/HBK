"use client";

import { useState, type ChangeEvent } from "react";

import { mediaSrc } from "@/lib/media";

export function AdminImageUpload({
  name,
  label,
  defaultValue,
  folder = "uploads",
  fit = "cover",
  allowClear = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder?: string;
  fit?: "cover" | "contain";
  allowClear?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setBusy(true);
    setError("");

    const body = new FormData();
    body.set("file", file);
    body.set("folder", folder);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "include",
        body,
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        if (response.status === 401) {
          setError("Your admin session is not valid for uploads. Sign out, sign back in, then try again.");
          return;
        }
        setError(payload.error ?? "Upload failed.");
        return;
      }
      setUrl(payload.url);
    } catch {
      setError("Upload failed. Check your Blob token and try again.");
    } finally {
      setBusy(false);
    }
  }

  const filename = url ? decodeURIComponent(url.split("/").pop() ?? "Uploaded image") : "";

  return (
    <div className="min-w-0 overflow-hidden">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        form=""
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={onFileChange}
        className="mt-1.5 block w-full max-w-full min-w-0 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-accent-muted)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary)]"
      />
      {busy ? <p className="mt-2 text-sm text-slate-500">Uploading to Vercel Blob…</p> : null}
      {error ? <p className="mt-2 break-words text-sm text-rose-600">{error}</p> : null}
      {url ? (
        <div className="mt-3 min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaSrc(url)}
            alt=""
            className={fit === "contain" ? "mx-auto h-28 w-auto max-w-full object-contain p-3" : "h-36 w-full object-cover"}
          />
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <p className="min-w-0 truncate text-xs text-slate-500" title={url}>
              {filename}
            </p>
            {allowClear ? (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="shrink-0 text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-slate-500">Optional. Leave empty to keep no image.</p>
      )}
    </div>
  );
}
