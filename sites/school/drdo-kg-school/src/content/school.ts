import type { NavItem, Stat } from "./types";

/**
 * The school's identity and contact details. Taken from the school's Google
 * Maps listing and the signboard at its gate (captured 22 Oct 2026). Items
 * marked CONFIRM came from a single source and need the school's go-ahead.
 */

/**
 * While true, the site labels placeholder content ("Sample figures"), shows a
 * template notice, and asks search engines not to index it. Everything on the
 * site is now the school's own information, so it is off.
 */
export const demo = false;

export const school = {
  /** As it appears on Google Maps. */
  name: "D.R.D.O KG School",
  shortName: "DRDO KG School",
  /** As it appears on the signboard at the gate. */
  fullName: "DRDO Kindergarten School, C.V. Raman Nagar",
  nameKannada: "ಡಿ.ಆರ್.ಡಿ.ಓ ಕೆಜಿ ಸ್ಕೂಲ್",
  /** Shown under the name in the header and footer. */
  descriptor: "Kindergarten · C V Raman Nagar",
  /** CONFIRM: the listing shows a kindergarten; the class names are assumed. */
  classes: "Nursery, LKG & UKG",
  trust: "DRDO Employees Educational Trust (DEET)",
  motto: "Knowledge is Power",
  description:
    "D.R.D.O KG School is a kindergarten in C V Raman Nagar, Bengaluru, run by the DRDO Employees Educational Trust. Families know it for caring teachers, bright classrooms and one of the best play areas in the neighbourhood.",
  /** Footer line beside the copyright. */
  affiliation: "Run by the DRDO Employees Educational Trust (DEET)",
  academicYear: "2027–28",
  /** The domain on the Google Maps listing. It did not resolve on 22 Oct 2026; also set NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.drdokgblr.com",
  /** A PDF in public/ ("/prospectus.pdf") or a full URL. null hides the download. */
  prospectusUrl: null as string | null,
  /** Google rating when captured. Update it, or remove the stats that use it, before launch. */
  rating: { value: 4.2, count: 38 },
};

export const contact = {
  phone: "080 2524 2042",
  phoneHref: "tel:+918025242042",
  /** International format, digits only. null hides every WhatsApp link. */
  whatsapp: null as string | null,
  /** Not on the listing. Add the school's address and it appears everywhere. */
  email: null as string | null,
  address: {
    street: "1st A Cross Road, Kaggadasapura Main Road",
    locality: "C V Raman Nagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560093",
    country: "IN",
    countryName: "India",
  },
  plusCode: "XMPC+W2 Bengaluru",
  geo: { lat: 12.9873407, lng: 77.6700823 },
  /** A Google Maps link to the school's pin. */
  mapsUrl: "https://maps.app.goo.gl/p5nMM6NV36uq6svAA",
  /** The `src` of a Google Maps embed. null shows a directions card instead. */
  mapEmbed: "https://maps.google.com/maps?q=12.9873407,77.6700823&z=16&output=embed" as string | null,
  directions: [
    "The school is on 1st A Cross Road, just off Kaggadasapura Main Road in C V Raman Nagar.",
    "Look for the blue DRDO Kindergarten School signboard over the gate.",
    "The entrance and car park are wheelchair accessible.",
    "Please check in at the school office when you arrive.",
  ],
  hours: [
    { days: "Monday – Friday", time: "8:00 am – 3:00 pm" },
    { days: "Saturday & Sunday", time: "Closed" },
  ],
  /** One line for the utility bar. */
  schoolTimings: "Office open Mon – Fri, 8 am – 3 pm",
  /** null hides the portal link everywhere. */
  parentPortal: null as string | null,
};

/** None found. Add the school's pages here and they appear in the footer. */
export const socials: { label: string; href: string; icon: "instagram" | "facebook" | "youtube" | "linkedin" }[] = [];

export function whatsappLink(text?: string) {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export const fullAddress = `${contact.address.street}, ${contact.address.locality}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}`;

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  {
    label: "Classes",
    href: "/academics/",
    children: [
      { label: "Overview", href: "/academics/", description: "How little ones learn here" },
      { label: "Nursery", href: "/academics/nursery/", description: "The first year of school" },
      { label: "LKG", href: "/academics/lkg/", description: "Lower kindergarten" },
      { label: "UKG", href: "/academics/ukg/", description: "Upper kindergarten, ready for Class 1" },
    ],
  },
  { label: "Campus", href: "/facilities/" },
  {
    label: "Activities",
    href: "/student-life/",
    children: [
      { label: "Play & Activities", href: "/student-life/", description: "Play, stories, music and celebrations" },
      { label: "Gallery", href: "/gallery/", description: "Photographs of the school" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions/",
    children: [
      { label: "How to Apply", href: "/admissions/", description: "Steps, ages and documents" },
      { label: "Fees", href: "/admissions/#fees", description: "How to get the fee details" },
      { label: "Admissions FAQ", href: "/admissions/#faq", description: "Answers for families" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];

/**
 * Figures the public record supports: a former pupil's review recalls the
 * school in 2003, and the rating is Google's at capture.
 */
export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Years of first steps in C V Raman Nagar" },
  { value: 3, label: "Classes: Nursery, LKG and UKG" },
  { value: school.rating.value, decimals: 1, suffix: " ★", label: "Rating from families on Google" },
  { value: school.rating.count, label: "Google reviews from parents and former pupils" },
];
