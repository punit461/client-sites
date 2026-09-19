import { img } from "@/lib/images";

/** PLACEHOLDER CLINIC DATA. Replace with the group's real sites before launch. */
export interface Location {
  slug: string;
  name: string;
  area: string;
  address: string[];
  phone: string;
  phoneDial: string;
  hours: { days: string; time: string }[];
  specialties: string[];
  facilities: string[];
  parking: string;
  transport: string;
  image: string;
  alt: string;
  mapsQuery: string;
}

export const locations: Location[] = [
  {
    slug: "indiranagar",
    name: "Vivera Indiranagar",
    area: "Indiranagar, Bengaluru",
    address: ["18 100 Feet Road", "Indiranagar", "Bengaluru 560038"],
    phone: "+91 80 4100 2201",
    phoneDial: "+918041002201",
    hours: [
      { days: "Monday – Friday", time: "8:00 AM – 8:00 PM" },
      { days: "Saturday", time: "8:00 AM – 5:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    specialties: ["dental-care", "dermatology", "general-medicine", "womens-health", "physiotherapy"],
    facilities: ["Step-free access", "On-site diagnostics", "Baby changing", "Accessible WC"],
    parking: "Basement parking, first two hours free.",
    transport: "Eight minutes' walk from Indiranagar metro station.",
    image: img.reception,
    alt: "The Indiranagar clinic reception",
    mapsQuery: "18 100 Feet Road, Indiranagar, Bengaluru 560038",
  },
  {
    slug: "koramangala",
    name: "Vivera Koramangala",
    area: "Koramangala, Bengaluru",
    address: ["42 80 Feet Road, 4th Block", "Koramangala", "Bengaluru 560034"],
    phone: "+91 80 4100 2202",
    phoneDial: "+918041002202",
    hours: [
      { days: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
      { days: "Saturday", time: "9:00 AM – 4:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    specialties: ["dental-care", "general-medicine", "physiotherapy", "pediatrics"],
    facilities: ["Step-free access", "Children's waiting area", "Accessible WC"],
    parking: "Street parking and a paid lot next door.",
    transport: "Bus routes along 80 Feet Road; nearest metro is a short auto ride.",
    image: img.corridor,
    alt: "A clinic corridor",
    mapsQuery: "42 80 Feet Road, 4th Block, Koramangala, Bengaluru 560034",
  },
  {
    slug: "whitefield",
    name: "Vivera Whitefield",
    area: "Whitefield, Bengaluru",
    address: ["7 Whitefield Main Road", "Whitefield", "Bengaluru 560066"],
    phone: "+91 80 4100 2203",
    phoneDial: "+918041002203",
    hours: [
      { days: "Monday – Friday", time: "8:30 AM – 7:30 PM" },
      { days: "Saturday", time: "8:30 AM – 5:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    specialties: ["orthopedics", "dental-care", "womens-health", "ent"],
    facilities: ["Step-free access", "On-site imaging", "Accessible WC", "Pharmacy"],
    parking: "Free on-site parking for patients.",
    transport: "Ten minutes from Whitefield railway station.",
    image: img.consultRoom,
    alt: "A consultation room",
    mapsQuery: "7 Whitefield Main Road, Whitefield, Bengaluru 560066",
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
