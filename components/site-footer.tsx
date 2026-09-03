import Link from "next/link";

import { Container, ds, NAV_LINKS, SERVICE_DROPDOWN } from "@/components/design-system";
import { SiteBrand } from "@/components/site-brand";
import { getSiteSettings } from "@/lib/content";
import type { ContactInfoData } from "@/lib/content";

export async function SiteFooter({ contact }: { contact: ContactInfoData }) {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-slate-950 py-14 text-slate-300">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <SiteBrand
            siteName={settings.siteName}
            shortName={settings.shortName}
            logo={settings.logo}
            showSiteName={settings.showSiteName}
            inverted
          />
          <p className="mt-4 text-[15px] leading-6 text-slate-400">{settings.tagline}</p>
        </div>
        <div>
          <p className={ds.footerLabel}>Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-base">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={ds.footerLabel}>Services</p>
          <ul className="mt-4 space-y-2.5 text-base">
            {SERVICE_DROPDOWN.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={ds.footerLabel}>Get in Touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{contact.address}</li>
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-slate-300">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-slate-300">
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
}
