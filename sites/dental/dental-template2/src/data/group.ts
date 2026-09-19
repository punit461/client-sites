/**
 * Group-level configuration. A hand-over starts here.
 *
 * Everything in this folder is PLACEHOLDER CONTENT. Nothing describes a real
 * clinic group, and the claims that would need evidence are switched off
 * rather than invented — see `evidence`.
 */
export const group = {
  name: "VIVERA",
  suffix: "Health",
  fullName: "Vivera Health",
  tagline: "Healthcare, Designed Around You.",
  description:
    "Find the right treatment, meet your care team and book your appointment online across our clinics.",
};

export const contact = {
  phone: "+91 80 4100 2200",
  phoneDial: "+918041002200",
  email: "care@viverahealth.example",
};

export const nav = [
  { label: "Find Care", href: "/specialties" },
  { label: "Treatments", href: "/treatments" },
  { label: "Doctors", href: "/doctors" },
  { label: "Locations", href: "/locations" },
  { label: "Patient Resources", href: "/resources" },
] as const;

/**
 * Claims that need evidence, switched off by default so nothing unverifiable
 * is published by accident.
 */
export const evidence = {
  /** Patient reviews. False means the section shows its placeholder layout. */
  reviewsAreReal: false,
  /** Live scheduling. False means booking is a request, not a confirmation. */
  liveScheduling: false,
  /** Insurers accepted. Show a logo only when the group actually accepts it. */
  insurersConfigured: false,
};

/** Quick links under the hero search — the things people search for most. */
export const quickLinks = [
  { label: "Dental Care", href: "/specialties/dental-care" },
  { label: "Skin Care", href: "/specialties/dermatology" },
  { label: "Physiotherapy", href: "/specialties/physiotherapy" },
  { label: "General Medicine", href: "/specialties/general-medicine" },
  { label: "Women's Health", href: "/specialties/womens-health" },
  { label: "Pediatrics", href: "/specialties/pediatrics" },
] as const;

export const footerColumns = [
  {
    heading: "Find care",
    links: [
      { label: "Specialties", href: "/specialties" },
      { label: "Treatments", href: "/treatments" },
      { label: "Doctors", href: "/doctors" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    heading: "Patients",
    links: [
      { label: "Patient resources", href: "/resources" },
      { label: "Book an appointment", href: "/book" },
      { label: "Payment information", href: "/#payment" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/#" },
      { label: "Terms", href: "/#" },
      { label: "Accessibility", href: "/#" },
      { label: "Cookie policy", href: "/#" },
    ],
  },
] as const;
