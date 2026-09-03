"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  coverPageForTranslation,
  isNepaliTranslationReady,
  readGoogTransLanguage,
  restoreGoogTransCookie,
  revealTranslatedPage,
} from "@/lib/i18n/google-translate";

const SCRIPT_ID = "google-translate-script";
const TRANSLATE_TIMEOUT_MS = 8000;

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (options: Record<string, unknown>, elementId: string): unknown;
          InlineLayout?: { SIMPLE: unknown };
        };
      };
    };
  }
}

let widgetStarted = false;
let lastPathname: string | null = null;

function isAdminPath(pathname: string | null) {
  return Boolean(pathname?.startsWith("/admin"));
}

function applyComboLanguage() {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) {
    return false;
  }

  const language = readGoogTransLanguage();
  const nextValue = language === "ne" ? "ne" : "";
  if (combo.value !== nextValue) {
    combo.value = nextValue;
    combo.dispatchEvent(new Event("change"));
  }
  return true;
}

function waitForTranslatedPage() {
  const started = Date.now();
  const tick = () => {
    if (isNepaliTranslationReady() || Date.now() - started > TRANSLATE_TIMEOUT_MS) {
      revealTranslatedPage();
      return;
    }
    window.setTimeout(tick, 100);
  };
  tick();
}

function startWidget() {
  if (!window.google?.translate?.TranslateElement) {
    return;
  }

  if (!document.querySelector(".goog-te-combo")) {
    widgetStarted = false;
  }

  if (!widgetStarted) {
    widgetStarted = true;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,ne",
        autoDisplay: false,
      },
      "google_translate_element",
    );
  }

  scheduleComboApply();
}

function scheduleComboApply() {
  const started = Date.now();
  const tick = () => {
    if (applyComboLanguage()) {
      waitForTranslatedPage();
      return;
    }
    if (Date.now() - started > TRANSLATE_TIMEOUT_MS) {
      revealTranslatedPage();
      return;
    }
    window.setTimeout(tick, 250);
  };
  tick();
}

export function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    if (isAdminPath(pathname)) {
      revealTranslatedPage();
      return;
    }

    restoreGoogTransCookie();

    if (readGoogTransLanguage() !== "ne") {
      revealTranslatedPage();
      return;
    }

    coverPageForTranslation();
    window.googleTranslateElementInit = startWidget;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => revealTranslatedPage();
      document.body.appendChild(script);
    } else {
      startWidget();
    }

    const isRouteChange = lastPathname !== null && lastPathname !== pathname;
    lastPathname = pathname;

    if (!isRouteChange) {
      return;
    }

    const timeout = window.setTimeout(scheduleComboApply, 400);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  if (isAdminPath(pathname)) {
    return null;
  }

  return <div id="google_translate_element" aria-hidden />;
}
