import { business } from "./business";
import { services } from "@/content/services";

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Residential", href: "/residential-plumbing/" },
  { label: "Commercial", href: "/commercial-plumbing/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const serviceNav: NavItem[] = services.map((s) => ({ label: s.need, href: `/services/${s.slug}/` }));

export const companyNav: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Projects", href: "/projects/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
  { label: "Get an Estimate", href: "/request-a-quote/" },
  // Promoted only when out-of-hours cover is real.
  ...(business.verified.emergencyService ? [{ label: "Emergency Plumbing", href: "/emergency-plumbing/" }] : []),
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
];
