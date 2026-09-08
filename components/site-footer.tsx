import Link from "next/link";
import { Building2, Mail, Phone } from "lucide-react";

import { Container, ds, NAV_LINKS } from "@/components/design-system";
import { SiteBrand } from "@/components/site-brand";
import { getServices, getSiteSettings } from "@/lib/content";
import type { ContactInfoData } from "@/lib/content";

function footerAddressLines(address: string) {
  const explicit = address
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (explicit.length >= 2) {
    return explicit.join("\n");
  }

  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 3) {
    return address;
  }

  const first = Math.ceil(parts.length / 3);
  const second = Math.ceil((parts.length - first) / 2);
  return [
    parts.slice(0, first).join(", "),
    parts.slice(first, first + second).join(", "),
    parts.slice(first + second).join(", "),
  ].join("\n");
}

export async function SiteFooter({ contact }: { contact: ContactInfoData }) {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <footer className="bg-slate-950 py-14 text-[15px] text-slate-300">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1fr_1.45fr] lg:gap-x-12">
        <div>
          <SiteBrand
            siteName={settings.siteName}
            shortName={settings.shortName}
            logo={settings.logo}
            showSiteName={settings.showSiteName}
            inverted
          />
          <p className="mt-4 leading-6 text-slate-400">{settings.tagline}</p>
        </div>
        <div>
          <p className={ds.footerLabel}>Quick Links</p>
          <ul className="mt-4 space-y-2.5">
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
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.id ?? service.title}>
                <Link href="/services" className="transition hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={ds.footerLabel}>Get in Touch</p>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
              <div>
                <p className="font-semibold text-white">Office</p>
                <p className="mt-0.5 whitespace-pre-line leading-6 text-slate-400">{footerAddressLines(contact.address)}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p className="mt-0.5 leading-6 text-slate-400">{contact.phone}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-secondary)]" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${contact.email}`} className="mt-0.5 block leading-6 text-slate-400 transition hover:text-white">
                  {contact.email}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
