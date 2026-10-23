import { business } from "./business";
import { services } from "@/content/services";

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Residential", href: "/residential-plumbing/" },
  { label: "Commercial", href: "/commercial-plumbing/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "About Us", href: "/about/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Contact", href: "/contact/" },
];

export const serviceNav: NavItem[] = services.map((s) => ({ label: s.short, href: `/services/${s.slug}/` }));

export const companyNav: NavItem[] = [
  { label: "About Us", href: "/about/" },
  { label: "Our Work", href: "/projects/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
  { label: "Request a Quote", href: "/request-a-quote/" },
  // Promoted only when the company really answers the phone out of hours.
  ...(business.verified.emergencyService ? [{ label: "Emergency Plumbing", href: "/emergency-plumbing/" }] : []),
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
];
