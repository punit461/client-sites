/**
 * Practice-level configuration. A hand-over starts here.
 *
 * Everything in this folder is PLACEHOLDER CONTENT. Nothing here describes a
 * real practice, and several fields are deliberately switched off rather than
 * filled with invented material — see `evidence` below.
 */
export const clinic = {
  name: "ORA",
  suffix: "Dental Studio",
  fullName: "ORA Dental Studio",
  tagline: "Modern Dentistry. A More Comfortable Experience.",
  description:
    "Personalised dental care for healthier smiles, from routine checkups to advanced restorative and cosmetic treatments.",
  city: "Bengaluru",
  acceptingNewPatients: true,
};

export const contact = {
  phone: "+91 80 4567 8900",
  /** Digits only, for tel: links. */
  phoneDial: "+918045678900",
  email: "hello@oradental.example",
  address: {
    line1: "24 Lavelle Road",
    line2: "Ashok Nagar",
    city: "Bengaluru",
    postcode: "560001",
  },
  parking: "Two-hour free parking in the building basement, entrance on Ashok Nagar Road.",
  transport: "Five minutes' walk from Cubbon Park metro station.",
  mapsQuery: "24 Lavelle Road, Ashok Nagar, Bengaluru 560001",
};

export const hours = [
  { days: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { days: "Saturday", time: "9:00 AM – 4:00 PM" },
  { days: "Sunday", time: "Closed" },
];

/** The compact form shown in the top information bar. */
export const hoursSummary = "Mon–Sat · 9:00 AM – 7:00 PM";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Treatments", href: "/treatments" },
  { label: "Our Team", href: "/team" },
  { label: "Patient Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Claims a practice must be able to evidence. They are switched off by default
 * so that nothing unverifiable is published by accident — turn each on only
 * when the practice has the underlying evidence.
 */
export const evidence = {
  /** Aggregate rating. Populate only from a verified review platform. */
  rating: null as null | { score: number; count: number; source: string; url: string },
  /** Patient reviews. Empty means the section renders its placeholder layout. */
  reviewsAreReal: false,
  /** Before/after imagery requires consented clinical photography. */
  beforeAfterEnabled: false,
  /** Live scheduling. Off means the booking flow is a request, not a booking. */
  liveScheduling: false,
};

/**
 * Trust indicators, worded as descriptions of how the practice works rather
 * than as numerical claims — no "20,000 patients treated", no success rates.
 */
export const trust = [
  { title: "Experienced clinical team", copy: "Clinicians with a declared scope of practice.", icon: "users" },
  { title: "Modern equipment", copy: "Digital imaging and chairside scanning.", icon: "cpu" },
  { title: "Patient-centred care", copy: "Options explained before anything begins.", icon: "heartHandshake" },
  { title: "Convenient appointments", copy: "Evening and Saturday slots available.", icon: "calendarCheck" },
] as const;

export const socials = [
  { label: "Instagram", icon: "instagram", href: "#" },
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "LinkedIn", icon: "linkedin", href: "#" },
] as const;
