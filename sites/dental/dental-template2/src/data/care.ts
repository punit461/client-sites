import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/**
 * PLACEHOLDER CLINICAL CONTENT.
 *
 * Descriptions are general and non-committal on purpose: no outcomes, no
 * success rates, no guarantees. Every string here must be reviewed and
 * replaced by qualified clinicians before the site goes live.
 */

/** ------------------------------------------------------- specialties */
export interface Specialty {
  slug: string;
  name: string;
  blurb: string;
  intro: string;
  icon: IconName;
  image: string;
  alt: string;
  popular: string[];
  /** Footprint in the bento grid at lg and up. */
  span: "lg" | "md" | "sm";
}

export const specialties: Specialty[] = [
  {
    slug: "dental-care",
    name: "Dental Care",
    blurb: "Checkups, restorative work, orthodontics and cosmetic dentistry.",
    intro:
      "Routine and advanced dental care, from examinations through to implants and aligners.",
    icon: "smile",
    image: img.dental,
    alt: "A modern dental treatment room",
    popular: ["Dental implants", "Braces & aligners", "Root canal treatment"],
    span: "lg",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    blurb: "Skin, hair and nail concerns assessed by a specialist.",
    intro: "Assessment and management of skin conditions, with treatment planned individually.",
    icon: "sparkles",
    image: img.dermatology,
    alt: "A person's face in natural light",
    popular: ["Acne management", "Skin checks", "Eczema and dermatitis"],
    span: "md",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    blurb: "Movement assessment and rehabilitation programmes.",
    intro:
      "Hands-on assessment followed by an exercise programme you can actually keep up with.",
    icon: "handHeart",
    image: img.physiotherapy,
    alt: "A therapist supporting a patient's hand",
    popular: ["Back and neck pain", "Post-operative rehab", "Sports injuries"],
    span: "sm",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    blurb: "Bones, joints and soft tissue, assessed and managed.",
    intro: "Assessment of joint and musculoskeletal problems, with imaging where indicated.",
    icon: "bone",
    image: img.orthopedics,
    alt: "A clinical team in an operating theatre",
    popular: ["Joint pain", "Fracture follow-up", "Sports medicine"],
    span: "sm",
  },
  {
    slug: "ent",
    name: "ENT",
    blurb: "Ear, nose and throat assessment for adults and children.",
    intro: "Examination and management of common ear, nose and throat concerns.",
    icon: "ear",
    image: img.ent,
    alt: "A stethoscope beside a laptop",
    popular: ["Hearing concerns", "Sinus problems", "Tonsil assessment"],
    span: "md",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    blurb: "First point of contact for most health concerns.",
    intro: "Consultation, diagnosis and onward referral where a specialist opinion is needed.",
    icon: "stethoscope",
    image: img.generalMedicine,
    alt: "A consultation in progress",
    popular: ["Health checks", "Long-term conditions", "Vaccinations"],
    span: "md",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    blurb: "Care for infants, children and adolescents.",
    intro: "Unhurried appointments with clinicians used to working with children and parents.",
    icon: "baby",
    image: img.pediatrics,
    alt: "A clinician with a young patient",
    popular: ["Childhood illness", "Growth and development", "Immunisations"],
    span: "sm",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    blurb: "Consultations across every stage of life.",
    intro: "A dedicated service for gynaecological, reproductive and menopausal health.",
    icon: "heartPulse",
    image: img.womensHealth,
    alt: "A clinician outdoors",
    popular: ["Well-woman checks", "Menopause support", "Family planning"],
    span: "sm",
  },
];

export const findSpecialty = (slug: string) => specialties.find((s) => s.slug === slug);

/** ------------------------------------------------------- treatments */
export interface Treatment {
  slug: string;
  name: string;
  specialty: string;
  summary: string;
  whatItIs: string;
  whatToExpect: string[];
  consultationType: string;
  image: string;
  alt: string;
}

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    specialty: "dental-care",
    summary: "A fixed option for replacing one or more missing teeth.",
    whatItIs:
      "A fixture placed in the jawbone which, after healing, can support a crown, bridge or denture.",
    whatToExpect: [
      "Assessment including imaging and a discussion of alternatives",
      "A written plan with stages and costs before anything begins",
      "Placement under local anaesthetic",
      "A healing period before the final restoration",
    ],
    consultationType: "In-person consultation, about 45 minutes",
    image: img.implants,
    alt: "A clinician reviewing dental imaging",
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    specialty: "dental-care",
    summary: "Fixed or removable options for straightening teeth over time.",
    whatItIs:
      "Fixed braces bonded to the teeth, or a sequence of custom removable aligners.",
    whatToExpect: [
      "Assessment with photographs, scans and imaging",
      "A plan setting out approach, duration and cost",
      "Regular reviews through treatment",
      "A retention plan afterwards",
    ],
    consultationType: "In-person consultation, about 45 minutes",
    image: img.aligners,
    alt: "A dental treatment room",
  },
  {
    slug: "skin-treatments",
    name: "Skin Treatments",
    specialty: "dermatology",
    summary: "Assessment first, then a plan suited to your skin.",
    whatItIs:
      "A dermatology consultation, with any treatment chosen after the skin has been examined.",
    whatToExpect: [
      "A conversation about history and what you have tried",
      "Examination of the affected areas",
      "A written plan, which may include topical or oral treatment",
      "A review to check how it is going",
    ],
    consultationType: "In-person or video consultation, about 30 minutes",
    image: img.skin,
    alt: "A portrait in natural light",
  },
  {
    slug: "physiotherapy-programmes",
    name: "Physiotherapy",
    specialty: "physiotherapy",
    summary: "Assessment and a rehabilitation programme you can keep up with.",
    whatItIs:
      "Hands-on assessment of movement, strength and pain, followed by a structured exercise plan.",
    whatToExpect: [
      "A movement and strength assessment",
      "Discussion of what you want to get back to",
      "An exercise programme written down",
      "Review appointments to progress it",
    ],
    consultationType: "In-person, about 45 minutes for a first session",
    image: img.physio,
    alt: "A clinical treatment setting",
  },
  {
    slug: "preventive-health-checks",
    name: "Preventive Health Checks",
    specialty: "general-medicine",
    summary: "A structured check-in, with results explained properly.",
    whatItIs:
      "A consultation with an agreed set of tests, chosen for your age, history and risk factors.",
    whatToExpect: [
      "A conversation about history and lifestyle",
      "Agreed tests — not a fixed panel for everyone",
      "A follow-up appointment to go through results",
      "A written summary and any next steps",
    ],
    consultationType: "In-person, about 40 minutes plus a results review",
    image: img.preventive,
    alt: "Laboratory sample vials",
  },
  {
    slug: "pediatric-care",
    name: "Pediatric Care",
    specialty: "pediatrics",
    summary: "Unhurried appointments for infants, children and adolescents.",
    whatItIs:
      "Consultation with a clinician used to working with children and with the adults who bring them.",
    whatToExpect: [
      "Time for the child to settle before anything happens",
      "Examination at a pace that suits them",
      "A plan explained to both child and parent",
      "Written advice to take home",
    ],
    consultationType: "In-person, about 30 minutes",
    image: img.paediatric,
    alt: "A consultation in progress",
  },
];

export const findTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const treatmentsFor = (specialtySlug: string) =>
  treatments.filter((t) => t.specialty === specialtySlug);

/** ------------------------------------------------------- how care works */
export const careSteps = [
  { n: "01", title: "Tell us what you need", copy: "Search by symptom, treatment or specialty." },
  { n: "02", title: "Choose your doctor", copy: "Filter by specialty, location, language and availability." },
  { n: "03", title: "Book your visit", copy: "Pick a clinic and a time that works, in a few taps." },
  { n: "04", title: "Get personalised care", copy: "A plan explained to you, in writing, with a follow-up." },
] as const;
