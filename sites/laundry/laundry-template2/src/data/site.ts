/**
 * Brand-level copy. A client hand-over starts here: change the name, the
 * contact block and the service areas, and the whole page follows.
 */
export const brand = {
  name: "LOOP",
  fullName: "LOOP Laundry",
  tagline: "Clean Clothes. Zero Effort.",
  description:
    "Pickup, clean, iron, deliver. LOOP keeps your wardrobe fresh so you get your time back.",
};

export const contact = {
  phone: "+91 90000 12345",
  email: "hey@looplaundry.example",
  address: "Ground Floor, 22 Church Street, Bengaluru 560001",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#journey" },
  { label: "Fabrics", href: "#fabrics" },
  { label: "Pricing", href: "#pricing" },
  { label: "Track", href: "#track" },
  { label: "FAQ", href: "#faq" },
] as const;

export const pickupWindows = [
  "9 AM – 11 AM",
  "11 AM – 1 PM",
  "3 PM – 5 PM",
  "5 PM – 7 PM",
  "7 PM – 9 PM",
] as const;

/**
 * Service areas are a claim about the business, so they are configuration
 * rather than hard-coded marketing copy: an operator edits this list to match
 * where they actually collect, and the section says nothing more than the list.
 */
export const serviceAreas = [
  { city: "Bengaluru", areas: 34, live: true },
  { city: "Chennai", areas: 18, live: true },
  { city: "Hyderabad", areas: 21, live: true },
  { city: "Mumbai", areas: 26, live: false },
  { city: "Pune", areas: 12, live: false },
] as const;

/** PIN codes the demo treats as inside the service area. */
export const servedPincodes = ["560001", "560038", "560076", "600001", "500081"];

export const footerColumns = [
  {
    heading: "Services",
    links: [
      { label: "Laundry", href: "#services" },
      { label: "Dry cleaning", href: "#services" },
      { label: "Steam ironing", href: "#services" },
      { label: "Premium care", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How it works", href: "#journey" },
      { label: "Sustainability", href: "#sustainability" },
      { label: "Service areas", href: "#areas" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Track an order", href: "#track" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Refunds", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
] as const;

export const socials = [
  { label: "Instagram", icon: "instagram", href: "#" },
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "LinkedIn", icon: "linkedin", href: "#" },
] as const;
