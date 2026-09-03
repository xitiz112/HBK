"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_SITE_LANGUAGE,
  readGoogTransLanguage,
  writeGoogTransLanguage,
  type SiteLanguage,
} from "@/lib/i18n/google-translate";

const OPTIONS: Array<{ code: SiteLanguage; label: string }> = [
  { code: "en", label: "EN" },
  { code: "ne", label: "नेपाली" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [language, setLanguage] = useState<SiteLanguage>(DEFAULT_SITE_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLanguage(readGoogTransLanguage());
    setReady(true);
  }, []);

  const select = (next: SiteLanguage) => {
    const current = ready ? language : readGoogTransLanguage();
    if (next === current) {
      return;
    }
    writeGoogTransLanguage(next);
    window.location.reload();
  };

  return (
    <div
      className={`notranslate inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language"
      translate="no"
    >
      {OPTIONS.map((option) => {
        const active = ready && option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => select(option.code)}
            aria-pressed={active}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition ${
              active
                ? "bg-[var(--color-primary)] text-white"
                : "text-slate-600 hover:text-[var(--color-primary)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
