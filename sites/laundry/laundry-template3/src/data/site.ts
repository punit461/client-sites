/**
 * Brand-level copy and numbers. A client hand-over starts here: change the
 * name, the contact block and the service areas, and the whole page follows.
 */
export const brand = {
  name: "Crisp",
  fullName: "Crisp & Co.",
  tagline: "Your wardrobe, handled.",
  description:
    "A members' laundry, dry-cleaning and pressing service. We collect on a schedule you set, care for each garment by its own label, and return it hung, pressed and tracked.",
  /** Shown in the header rail; set to null to hide it entirely. */
  announcement: "Collections run seven days a week, 7 AM to 10 PM",
};

export const contact = {
  phone: "+91 80 4567 8910",
  /** Digits only, country code, no "+" — what wa.me expects. */
  whatsapp: "918045678910",
  email: "concierge@crispandco.example",
  address: "3rd Floor, 8 Residency Road, Bengaluru 560025",
  hours: "Collections 7 AM – 10 PM, every day",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "The standard", href: "#standard" },
  { label: "Membership", href: "#membership" },
  { label: "Stains", href: "#stains" },
  { label: "Track", href: "#track" },
  { label: "FAQ", href: "#faq" },
] as const;

export const pickupWindows = [
  "7 – 9 AM",
  "9 – 11 AM",
  "12 – 2 PM",
  "4 – 6 PM",
  "6 – 8 PM",
  "8 – 10 PM",
] as const;

/** How often a member wants collecting. Seeds the booking drawer's first step. */
export const frequencies = [
  { id: "once", label: "One-off", note: "A single collection" },
  { id: "weekly", label: "Weekly", note: "Same day, same window" },
  { id: "fortnightly", label: "Fortnightly", note: "Every other week" },
] as const;

/** Counted up when the band scrolls into view. */
export const stats = [
  { value: 18, suffix: "K", label: "Garments cared for each month" },
  { value: 24, suffix: " hr", label: "Standard turnaround" },
  { value: 99.4, suffix: "%", label: "Returned on the promised day", decimals: 1 },
  { value: 4.9, suffix: "/5", label: "Member rating", decimals: 1 },
] as const;

/**
 * Where collections actually run. This is a claim about the business rather
 * than decoration, so it is configuration: the footer lists exactly what is
 * here and nothing more.
 */
export const serviceAreas = [
  "Indiranagar",
  "Koramangala",
  "HSR Layout",
  "Jayanagar",
  "Whitefield",
  "Richmond Town",
  "Sadashivanagar",
  "Domlur",
] as const;

export const footerColumns = [
  {
    heading: "Services",
    links: [
      { label: "Laundry & fold", href: "#services" },
      { label: "Dry cleaning", href: "#services" },
      { label: "Pressing", href: "#services" },
      { label: "Couture care", href: "#services" },
    ],
  },
  {
    heading: "Membership",
    links: [
      { label: "Plans & pricing", href: "#membership" },
      { label: "The standard", href: "#standard" },
      { label: "Inside the wash house", href: "#wash-house" },
      { label: "Refer a member", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Track a collection", href: "#track" },
      { label: "Stain guide", href: "#stains" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact the concierge", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Garment cover", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
] as const;

export const socials = [
  { label: "Instagram", icon: "instagram", href: "#" },
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "LinkedIn", icon: "linkedin", href: "#" },
] as const;
