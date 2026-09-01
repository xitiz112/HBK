import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/back-to-top";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HBK & Associates",
  description:
    "HBK & Associates is an audit, tax, and advisory firm helping businesses build confidence through clear reporting, stronger controls, and practical financial guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-slate-900">
        <div className="pt-[65px]">{children}</div>
        <BackToTop />
      </body>
    </html>
  );
}
