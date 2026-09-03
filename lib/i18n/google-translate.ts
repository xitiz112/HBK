export type SiteLanguage = "en" | "ne";

export const DEFAULT_SITE_LANGUAGE: SiteLanguage = "ne";
export const TRANSLATING_CLASS = "hbk-translating";

const COOKIE = "googtrans";
const STORAGE_KEY = "googtrans";

function readStoredLanguage(): SiteLanguage | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ne" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

export function readGoogTransLanguage(): SiteLanguage {
  if (typeof document === "undefined") {
    return DEFAULT_SITE_LANGUAGE;
  }
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  const value = match ? decodeURIComponent(match[1]) : "";
  if (value.includes("/en/en")) {
    return "en";
  }
  if (value.includes("/ne")) {
    return "ne";
  }
  return readStoredLanguage() ?? DEFAULT_SITE_LANGUAGE;
}

export function writeGoogTransLanguage(language: SiteLanguage) {
  const value = language === "ne" ? "/en/ne" : "/en/en";
  const maxAge = 60 * 60 * 24 * 365;
  const pieces = [`${COOKIE}=${value}`, "path=/", `max-age=${maxAge}`, "SameSite=Lax"];
  document.cookie = pieces.join(";");
  // Google's widget also reads a session cookie without extra attributes.
  document.cookie = `${COOKIE}=${value};path=/`;

  const host = window.location.hostname;
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    document.cookie = [...pieces, `domain=.${host}`].join(";");
    document.cookie = `${COOKIE}=${value};path=/;domain=.${host}`;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Ignore private-mode storage failures; the cookie still drives the widget.
  }
}

export function restoreGoogTransCookie() {
  const language = readGoogTransLanguage();
  writeGoogTransLanguage(language);
  return language;
}

export function coverPageForTranslation() {
  document.documentElement.classList.add(TRANSLATING_CLASS);
  document.documentElement.setAttribute("aria-busy", "true");
}

export function revealTranslatedPage() {
  document.documentElement.classList.remove(TRANSLATING_CLASS);
  document.documentElement.removeAttribute("aria-busy");
}

export function isNepaliTranslationReady() {
  if (readGoogTransLanguage() !== "ne") {
    return true;
  }

  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo || combo.value !== "ne") {
    return false;
  }
  if (!document.documentElement.classList.contains("translated-ltr")) {
    return false;
  }

  const heading = document.querySelector("h1, h2");
  const headingText = heading?.textContent?.trim() ?? "";
  if (headingText && /[\u0900-\u097F]/.test(headingText)) {
    return true;
  }

  const mainText = (document.querySelector("main")?.innerText ?? "").slice(0, 1500);
  return /[\u0900-\u097F]/.test(mainText);
}

export const TRANSLATE_BOOTSTRAP_SCRIPT = `(function(){try{if(location.pathname.indexOf("/admin")===0)return;var c=document.cookie.match(/(?:^|;\\s*)googtrans=([^;]*)/);var v=c?decodeURIComponent(c[1]):"";var s="";try{s=localStorage.getItem("googtrans")||""}catch(e){}if(v.indexOf("/en/en")!==-1||s==="en")return;document.documentElement.classList.add("${TRANSLATING_CLASS}");document.documentElement.setAttribute("aria-busy","true")}catch(e){document.documentElement.classList.add("${TRANSLATING_CLASS}")}})();`;
