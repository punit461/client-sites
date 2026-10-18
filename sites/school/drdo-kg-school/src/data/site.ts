import { pending } from "./pending";

/**
 * Who the school is and how to reach it. Taken from the school's Google Maps
 * listing on 18 Oct 2026; anything the listing did not show is `pending`.
 */
export const brand = {
  name: "D.R.D.O KG School",
  nameKannada: "ಡಿ.ಆರ್.ಡಿ.ಓ ಕೆಜಿ ಸ್ಕೂಲ್",
  monogram: "KG",
  kind: "Kindergarten",
  area: "C V Raman Nagar, Bengaluru",
  tagline: "A happy first step into school",
  description:
    "A kindergarten in C V Raman Nagar, Bengaluru, known for caring teachers, bright classrooms and a large play area.",
};

const geo = { lat: 12.9873407, lng: 77.6700823 };

export const contact = {
  phone: "080 2524 2042",
  phoneHref: "tel:+918025242042",
  email: pending("School email address"),
  street: "1st A Cross Road, Kaggadasapura Main Road",
  locality: "C V Raman Nagar",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560093",
  plusCode: "XMPC+W2 Bengaluru",
  geo,
  mapEmbed: `https://maps.google.com/maps?q=${geo.lat},${geo.lng}&z=16&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`,
};

/** The listing only showed "opens 8 am Monday". */
export const hours = {
  days: pending("Monday – Friday, or Monday – Saturday?"),
  opens: "8:00 am",
  closes: pending("Closing time"),
};

/** Google rating at capture. Update it, or drop it, when the site goes live. */
export const rating = { value: 4.2, count: 38, source: "Google" };

export const nav = [
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Admissions", href: "#admissions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
