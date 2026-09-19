import { portrait } from "@/lib/images";

/**
 * PLACEHOLDER CLINICIAN PROFILES.
 *
 * Every name, specialty, qualification and biography below is scaffolding to
 * show the directory and filtering working. None of it describes a real
 * person, and no clinician here holds the qualifications listed.
 *
 * Before launch, replace each entry with the group's own clinicians and their
 * actual registration details. Published qualifications are a registrable
 * claim — publish only what can be evidenced.
 */
export interface Doctor {
  slug: string;
  name: string;
  specialty: string;
  specialtyName: string;
  /** Must match the clinician's actual awards. */
  qualifications: string;
  /** Registration body and number, where your jurisdiction requires display. */
  registration: string | null;
  locations: string[];
  languages: string[];
  gender: "female" | "male" | "other";
  /** Placeholder availability — wire to a real scheduling system. */
  nextAvailable: string;
  bio: string;
  clinicalInterests: string[];
  education: { qualification: string; institution: string; year: string }[];
  experience: string[];
  memberships: string[];
  portrait: string;
}

export const doctors: Doctor[] = [
  {
    slug: "nikhil-menon",
    name: "Dr. Nikhil Menon",
    specialty: "general-medicine",
    specialtyName: "General Medicine",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["indiranagar", "koramangala"],
    languages: ["English", "Malayalam", "Hindi"],
    gender: "male",
    nextAvailable: "Today · 4:30 PM",
    bio: "Placeholder biography. Replace with the clinician's own background, scope of practice and years in practice.",
    clinicalInterests: ["Preventive health", "Long-term condition management"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.nikhil,
  },
  {
    slug: "sara-dsouza",
    name: "Dr. Sara D'Souza",
    specialty: "dermatology",
    specialtyName: "Dermatology",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["indiranagar"],
    languages: ["English", "Konkani", "Hindi"],
    gender: "female",
    nextAvailable: "Tomorrow · 11:00 AM",
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    clinicalInterests: ["Acne and rosacea", "Paediatric dermatology"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.sara,
  },
  {
    slug: "arun-pillai",
    name: "Dr. Arun Pillai",
    specialty: "dental-care",
    specialtyName: "Dental Care",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["koramangala", "whitefield"],
    languages: ["English", "Tamil", "Kannada"],
    gender: "male",
    nextAvailable: "Thursday · 9:30 AM",
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    clinicalInterests: ["Implant dentistry", "Restorative work"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.arun,
  },
  {
    slug: "leena-rao",
    name: "Dr. Leena Rao",
    specialty: "womens-health",
    specialtyName: "Women's Health",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["indiranagar", "whitefield"],
    languages: ["English", "Kannada", "Hindi"],
    gender: "female",
    nextAvailable: "Today · 6:00 PM",
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    clinicalInterests: ["Menopause care", "Preventive screening"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.leena,
  },
  {
    slug: "imran-qureshi",
    name: "Dr. Imran Qureshi",
    specialty: "orthopedics",
    specialtyName: "Orthopedics",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["whitefield"],
    languages: ["English", "Urdu", "Hindi"],
    gender: "male",
    nextAvailable: "Friday · 2:15 PM",
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    clinicalInterests: ["Knee and shoulder", "Post-operative rehabilitation"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.imran,
  },
  {
    slug: "divya-shetty",
    name: "Dr. Divya Shetty",
    specialty: "physiotherapy",
    specialtyName: "Physiotherapy",
    qualifications: "PLACEHOLDER — add actual qualifications",
    registration: null,
    locations: ["koramangala", "indiranagar"],
    languages: ["English", "Tulu", "Kannada"],
    gender: "female",
    nextAvailable: "Tomorrow · 8:45 AM",
    bio: "Placeholder biography. Replace with the clinician's own background and scope of practice.",
    clinicalInterests: ["Spinal rehabilitation", "Return to sport"],
    education: [{ qualification: "Placeholder", institution: "Placeholder institution", year: "—" }],
    experience: ["Placeholder role, placeholder organisation"],
    memberships: ["Placeholder — list only memberships held"],
    portrait: portrait.divya,
  },
];

export const findDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
export const doctorsFor = (specialtySlug: string) =>
  doctors.filter((d) => d.specialty === specialtySlug);

/** Every language any clinician speaks, for the directory filter. */
export const allLanguages = [...new Set(doctors.flatMap((d) => d.languages))].sort();
