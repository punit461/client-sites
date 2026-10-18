/**
 * Who the school is and how to reach it. Every page, the footer, the
 * structured data and the enquiry form read from here, so a phone number is
 * changed once.
 *
 * Source: lamhs.in and the school's Google Maps listing (October 2026).
 */
export const school = {
  name: "Little Angels Modern High School",
  shortName: "LAMHS",
  kannadaName: "ಲಿಟಲ್ ಏಂಜಲ್ಸ್ ಮಾಡರ್ನ್ ಹೈಸ್ಕೂಲ್",
  tagline: "Knowledge worth spreading",
  founded: 1981,
  description:
    "A not-for-profit, English-medium school in Sadanandanagar, Bengaluru, nurturing young minds from Montessori to Class 10 in an inclusive environment since 1981.",
  recognition: "English medium · Recognised by the Govt. of Karnataka",
  grades: "Nursery – Class 10",
} as const;

export const contact = {
  phone: "+91 94484 90489",
  phoneHref: "tel:+919448490489",
  admissionsPhone: "+91 98455 48416",
  admissionsPhoneHref: "tel:+919845548416",
  whatsapp: "919448490489",
  addressLines: ["#5, 8th Main, 3rd Cross", "NGEF Layout, Sadanandanagar", "Bengaluru, Karnataka 560038"],
  mapsUrl:
    "https://www.google.com/maps/place/LITTLE+ANGELS+MODERN+HIGH+SCHOOL/@12.9986089,77.6611556,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1136c993a97f:0x346b4cac634981ab!8m2!3d12.9986089!4d77.6611556",
  mapsEmbed: "https://maps.google.com/maps?q=12.9986089,77.6611556&z=16&output=embed",
  geo: { lat: 12.9986089, lng: 77.6611556 },
  registrationForm: "https://form.jotform.com/261190728544056",
} as const;

export const hours = [
  { days: "Monday – Friday", time: "9:00 am – 4:00 pm" },
  { days: "Saturday", time: "9:00 am – 1:00 pm" },
  { days: "Sunday", time: "Closed" },
] as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1BBhWJhKKx/" },
  { label: "Instagram", href: "https://www.instagram.com/new_little_angels_official/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCII54oHQ37Ek7Ts1Cx48jDg" },
] as const;

export const nav = [
  { label: "About", href: "/about/" },
  { label: "Academics", href: "/academics/" },
  { label: "Facilities", href: "/facilities/" },
  { label: "Life at LAMHS", href: "/life-at-lamhs/" },
  { label: "Alumni", href: "/alumni/" },
  { label: "Contact", href: "/admissions/#visit" },
] as const;

export const admissions = {
  open: true,
  session: "2026–27",
  label: "Admissions open for 2026–27 · Nursery to Class 10",
} as const;

/** A WhatsApp chat link, optionally pre-filled. Nothing is sent until the parent presses send. */
export function whatsappLink(text?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
