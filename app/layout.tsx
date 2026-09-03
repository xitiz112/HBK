import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/back-to-top";
import { GoogleTranslate } from "@/components/google-translate";
import { TranslateLoader } from "@/components/translate-loader";
import { getSiteSettings } from "@/lib/content";
import { TRANSLATE_BOOTSTRAP_SCRIPT } from "@/lib/i18n/google-translate";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const hasIcon = Boolean(settings.favicon || settings.logo);

  return {
    title: settings.siteName,
    description: settings.description,
    icons: hasIcon
      ? {
          icon: [{ url: "/icon", type: "image/png" }],
          shortcut: "/icon",
          apple: "/icon",
        }
      : undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <head>
        <script
          id="hbk-translate-bootstrap"
          dangerouslySetInnerHTML={{ __html: TRANSLATE_BOOTSTRAP_SCRIPT }}
        />
      </head>
      <body className="min-h-full bg-background font-sans text-slate-900">
        <TranslateLoader />
        {children}
        <GoogleTranslate />
        <BackToTop />
      </body>
    </html>
  );
}
