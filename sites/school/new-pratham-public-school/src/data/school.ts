/**
 * School-level facts. Everything here was taken from the school's previous
 * website (www.newprathampublicschool.in) and its Google Maps listing on
 * 2026-10-18 — see source/SCRAPE-REPORT.md. Nothing is invented; where the two
 * sources disagreed (the phone number) both are kept and labelled.
 */
export const school = {
  name: "New Pratham Public School",
  short: "NPPS",
  nameKannada: "ನ್ಯೂ ಪ್ರಥಮ್ ಪಬ್ಲಿಕ್ ಸ್ಕೂಲ್",
  tagline: "Where education meets inspiration",
  affiliation: "Affiliated to CBSE, New Delhi",
  affiliationNumber: "830770",
  established: 2010,
  classes: "Nursery to Class X",
  city: "Bengaluru",
  trust: "Sree Venkateshwara Charitable Trust",
  group: "Sree Venkateshwara Group of Companies",
  description:
    "A CBSE-affiliated school in Dooravani Nagar, Bengaluru, teaching Nursery to Class X since 2010 — concept-based learning, strong values and plenty of room to play.",
};

export const contact = {
  /** Shown on the previous website's footer. */
  phone: "080 4095 4645",
  phoneDial: "+918040954645",
  /** Shown on the Google Maps listing. Confirm with the school which is current. */
  phoneAlt: "080 2272 5593",
  phoneAltDial: "+918022725593",
  whatsapp: "+91 72043 47528",
  whatsappDigits: "917204347528",
  email: "newpratham@gmail.com",
  address: {
    line1: "2nd Main Road, Pai Layout",
    line2: "Dooravani Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    postcode: "560093",
  },
  plusCode: "XMR8+VJ Bengaluru, Karnataka",
  coordinates: { lat: 12.9921823, lng: 77.6665202 },
  mapsUrl:
    "https://www.google.com/maps/place/New+Pratham+Public+School/@12.9921823,77.6665202,17z/data=!4m6!3m5!1s0x3bae114794a98065:0xc908ecc094aa8e55!8m2!3d12.9921823!4d77.6665202!16s%2Fg%2F1q6j83bnv",
  mapsQuery: "New Pratham Public School, 2nd Main Rd, Pai Layout, Dooravani Nagar, Bengaluru 560093",
  /** The admission enquiry app the school already uses. */
  admissionApp: "https://play.google.com/store/apps/details?id=com.vskol.newpratham",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const hours = [
  { days: "Monday – Saturday", time: "7:30 AM – 3:30 PM" },
  { days: "Sunday", time: "Closed" },
];

export const hoursSummary = "Mon–Sat · 7:30 AM – 3:30 PM";

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = [
  { label: "Notice board", href: "/notices" },
  { label: "Video gallery", href: "/gallery/videos" },
  { label: "Mandatory disclosure", href: "/mandatory-disclosure" },
  { label: "Admission enquiry app", href: contact.admissionApp },
] as const;

export const socials = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/profile.php?id=61574280760755" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/newprathampublicschool" },
  { label: "WhatsApp", icon: "whatsapp", href: whatsappLink("Hello New Pratham Public School, I need some information. Please reply to me.") },
] as const;

export const videoChannelNote =
  "Videos are hosted on the school's YouTube uploads and load only when you press play.";
