/**
 * Brand-level copy and numbers. A client hand-over starts here: change the
 * name, the contact details and the stats, and the whole page follows.
 */
export const brand = {
  name: "FreshFold",
  tagline: "Laundry, simplified.",
  description:
    "Professional laundry, dry cleaning and ironing collected from your door and returned within 24–48 hours.",
  /** Shown in the top strip; set to null to hide the strip entirely. */
  announcement: "Free pickup & delivery on orders above ₹499",
};

export const contact = {
  phone: "+91 98765 43210",
  /** Digits only, country code, no "+" — what wa.me expects. */
  whatsapp: "919876543210",
  email: "hello@freshfold.example",
  address: "14 Linen Lane, Indiranagar, Bengaluru 560038",
  hours: "Mon–Sat, 7:00 AM – 9:00 PM",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Counted up when the strip scrolls into view. */
export const stats = [
  { value: 10, suffix: "K+", label: "Happy customers" },
  { value: 50, suffix: "K+", label: "Orders delivered" },
  { value: 99, suffix: "%", label: "On-time delivery" },
  { value: 4.9, suffix: "/5", label: "Customer rating", decimals: 1 },
] as const;

export const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Careers", href: "#contact" },
      { label: "Press", href: "#contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Wash & fold", href: "#services" },
      { label: "Dry cleaning", href: "#services" },
      { label: "Steam ironing", href: "#services" },
      { label: "Premium care", href: "#services" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Track your order", href: "#tracking" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;

export const socials = [
  { label: "Instagram", icon: "instagram", href: "#" },
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "LinkedIn", icon: "linkedin", href: "#" },
] as const;
