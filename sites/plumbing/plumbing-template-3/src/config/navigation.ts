import { business } from "./business";
import { services } from "@/content/services";

export type NavItem = { label: string; href: string };

/** Header order follows the brief; Home is the logo plus this first link. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Residential", href: "/residential-plumbing/" },
  { label: "Commercial", href: "/commercial-plumbing/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "About Us", href: "/about/" },
  { label: "Projects", href: "/projects/" },
  { label: "Contact", href: "/contact/" },
];

export const serviceNav: NavItem[] = services.map((s) => ({ label: s.short, href: `/services/${s.slug}/` }));

export const companyNav: NavItem[] = [
  { label: "About Us", href: "/about/" },
  { label: "Projects", href: "/projects/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
  { label: "Request a Quote", href: "/request-a-quote/" },
  ...(business.verified.emergencyService ? [{ label: "Emergency Plumbing", href: "/emergency-plumbing/" }] : []),
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms/" },
];
