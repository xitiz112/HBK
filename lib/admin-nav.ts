import type { LucideIcon } from "lucide-react";
import {
  Award,
  Building2,
  FileText,
  FolderKanban,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Layers3,
  ListOrdered,
  MessageSquareQuote,
  Newspaper,
  Phone,
  Share2,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Inbox",
    items: [{ href: "/admin/inbox", label: "Submissions", icon: Inbox }],
  },
  {
    title: "Website",
    items: [
      { href: "/admin/hero", label: "Hero", icon: Sparkles },
      { href: "/admin/about", label: "About", icon: FileText },
      { href: "/admin/contact", label: "Contact details", icon: Phone },
      { href: "/admin/stats", label: "Stats", icon: Star },
    ],
  },
  {
    title: "Offerings",
    items: [
      { href: "/admin/services", label: "Services", icon: Layers3 },
      { href: "/admin/industries", label: "Industries", icon: Building2 },
      { href: "/admin/process", label: "Process", icon: ListOrdered },
      { href: "/admin/differentiators", label: "Why choose us", icon: FolderKanban },
    ],
  },
  {
    title: "Trust",
    items: [
      { href: "/admin/testimonials", label: "Client Feedback", icon: MessageSquareQuote },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/awards", label: "Awards", icon: Award },
    ],
  },
  {
    title: "Insights",
    items: [
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    ],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/settings", label: "General", icon: Settings },
      { href: "/admin/social", label: "Social links", icon: Share2 },
    ],
  },
];
