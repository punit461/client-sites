import { portrait } from "@/lib/images";

/**
 * PLACEHOLDER CLINICIAN PROFILES.
 *
 * Every name, role, qualification, membership and biography below is invented
 * scaffolding to show the layout. None of it describes a real person.
 *
 * Before launch, replace each entry with the practice's own clinicians and
 * their actual registration details. `qualifications` and `memberships` are
 * registrable claims: publish only what the clinician can evidence, and include
 * the registration number where your jurisdiction expects it.
 */
export interface Clinician {
  slug: string;
  name: string;
  role: string;
  /** e.g. "BDS, MDS" — must match the clinician's actual awards. */
  qualifications: string;
  /** Registration body and number, where your jurisdiction requires display. */
  registration: string | null;
  areasOfPractice: string[];
  languages: string[];
  bio: string;
  approach: string;
  clinicalInterests: string[];
  education: { qualification: string; institution: string; year: string }[];
  memberships: string[];
  portrait: string;
  /** Treatment slugs this clinician can be booked for. */
  bookableFor: string[];
}

export const team: Clinician[] = [
  {
    slug: "aparna-rao",
    name: "Dr. Aparna Rao",
    role: "Principal Dentist",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    areasOfPractice: ["General dentistry", "Restorative dentistry", "Cosmetic dentistry"],
    languages: ["English", "Kannada", "Hindi"],
    bio: "Placeholder biography. Replace with the clinician's own description of their background, the kind of dentistry they focus on and how long they have been in practice.",
    approach:
      "Placeholder. A short paragraph in the clinician's own words about how they work with patients — pacing, explaining options, and what a first visit is like.",
    clinicalInterests: ["Minimally invasive restorative work", "Long-term preventive planning"],
    education: [
      { qualification: "Placeholder qualification", institution: "Placeholder institution", year: "—" },
    ],
    memberships: ["Placeholder — list only memberships the clinician holds"],
    portrait: portrait.aparna,
    bookableFor: ["general-dentistry", "cosmetic-dentistry", "teeth-whitening", "crowns-and-bridges"],
  },
  {
    slug: "daniel-fernandes",
    name: "Dr. Daniel Fernandes",
    role: "Implant & Restorative Dentist",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    areasOfPractice: ["Dental implants", "Crowns and bridges", "Root canal treatment"],
    languages: ["English", "Konkani", "Hindi"],
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    approach:
      "Placeholder. How this clinician talks through surgical options, risks and alternatives before treatment.",
    clinicalInterests: ["Single-tooth replacement", "Restoring root-treated teeth"],
    education: [
      { qualification: "Placeholder qualification", institution: "Placeholder institution", year: "—" },
    ],
    memberships: ["Placeholder — list only memberships the clinician holds"],
    portrait: portrait.daniel,
    bookableFor: ["dental-implants", "crowns-and-bridges", "root-canal-treatment"],
  },
  {
    slug: "mira-shetty",
    name: "Dr. Mira Shetty",
    role: "Orthodontist",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    areasOfPractice: ["Braces", "Clear aligners", "Growth assessment"],
    languages: ["English", "Tulu", "Kannada"],
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    approach:
      "Placeholder. How this clinician sets expectations about treatment duration, retention and compliance.",
    clinicalInterests: ["Adult orthodontics", "Early intervention in children"],
    education: [
      { qualification: "Placeholder qualification", institution: "Placeholder institution", year: "—" },
    ],
    memberships: ["Placeholder — list only memberships the clinician holds"],
    portrait: portrait.mira,
    bookableFor: ["braces-and-aligners", "general-dentistry"],
  },
  {
    slug: "samuel-george",
    name: "Dr. Samuel George",
    role: "Paediatric Dentist",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    areasOfPractice: ["Children's dentistry", "Preventive care", "Dental anxiety"],
    languages: ["English", "Malayalam", "Hindi"],
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    approach:
      "Placeholder. How this clinician introduces young children to the practice and works with anxious patients.",
    clinicalInterests: ["First dental visits", "Preventive care in children"],
    education: [
      { qualification: "Placeholder qualification", institution: "Placeholder institution", year: "—" },
    ],
    memberships: ["Placeholder — list only memberships the clinician holds"],
    portrait: portrait.samuel,
    bookableFor: ["pediatric-dentistry", "general-dentistry"],
  },
];

export const findClinician = (slug: string) => team.find((c) => c.slug === slug);

export const cliniciansFor = (treatmentSlug: string) =>
  team.filter((c) => c.bookableFor.includes(treatmentSlug));
