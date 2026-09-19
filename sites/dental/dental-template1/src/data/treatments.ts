import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/**
 * PLACEHOLDER CLINICAL CONTENT.
 *
 * The descriptions below are written to be general and non-committal on
 * purpose: no success rates, no guarantees, no "painless", no claims about
 * outcomes. Every string here must be reviewed and replaced by a qualified
 * clinician before the site goes live.
 */
export interface Treatment {
  slug: string;
  name: string;
  category: "General" | "Restorative" | "Cosmetic" | "Orthodontics" | "Children";
  /** One plain-English line for cards. */
  summary: string;
  /** Longer body for the treatment page. */
  intro: string;
  whatItIs: string;
  whoItMayBeFor: string;
  whatToExpect: string[];
  appointmentLength: string;
  aftercare: string;
  image: string;
  alt: string;
  icon: IconName;
  /** Shown in the interactive explorer on the home page. */
  featuredInExplorer?: boolean;
}

export const treatments: Treatment[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    category: "General",
    summary: "Routine checkups, cleaning and everyday care to keep problems small.",
    intro:
      "Regular examinations let small issues be found and discussed before they become complicated.",
    whatItIs:
      "A routine examination of the teeth, gums and soft tissues, usually with a professional clean and, where indicated, imaging.",
    whoItMayBeFor:
      "Anyone due a checkup, new to the practice, or who has noticed a change they would like looked at.",
    whatToExpect: [
      "A conversation about your dental history and anything you have noticed",
      "Examination of teeth, gums and soft tissues",
      "Imaging only where clinically indicated",
      "A written summary of findings and options",
    ],
    appointmentLength: "About 30–45 minutes",
    aftercare: "Your clinician will discuss a recall interval appropriate to your circumstances.",
    image: img.general,
    alt: "A modern dental treatment room",
    icon: "stethoscope",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    category: "Restorative",
    summary: "A fixed option for replacing one or more missing teeth.",
    intro:
      "Implant treatment replaces the root of a missing tooth with a fixture that can support a crown or bridge.",
    whatItIs:
      "A titanium or ceramic fixture placed in the jawbone, which after a period of healing can support a crown, bridge or denture.",
    whoItMayBeFor:
      "People missing one or more teeth. Suitability depends on bone, gum health and general health, and is assessed individually.",
    whatToExpect: [
      "Assessment including imaging and a discussion of alternatives",
      "A written treatment plan with costs and stages before anything begins",
      "Placement appointment under local anaesthetic",
      "A healing period before the final restoration is fitted",
    ],
    appointmentLength: "Consultation about 45 minutes; placement varies by case",
    aftercare:
      "Written aftercare instructions are provided, along with review appointments during healing.",
    image: img.implants,
    alt: "A clinician reviewing dental imaging",
    icon: "bone",
    featuredInExplorer: true,
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    category: "Restorative",
    summary: "Treatment for a tooth whose inner pulp has become inflamed or infected.",
    intro:
      "Root canal treatment aims to keep a natural tooth in place when the pulp inside it is damaged.",
    whatItIs:
      "Removal of inflamed or infected pulp from inside the tooth, followed by cleaning, shaping and filling of the root canal system.",
    whoItMayBeFor:
      "People with a tooth that has been diagnosed as having irreversible pulp damage or infection. Diagnosis requires examination.",
    whatToExpect: [
      "Examination and imaging to confirm the diagnosis",
      "Local anaesthetic before treatment begins",
      "Treatment over one or more visits depending on the tooth",
      "A discussion about restoring the tooth afterwards",
    ],
    appointmentLength: "Usually 60–90 minutes per visit",
    aftercare:
      "Mild tenderness for a few days is common. Your clinician will explain what to expect and when to make contact.",
    image: img.rootCanal,
    alt: "A dental treatment room",
    icon: "syringe",
    featuredInExplorer: true,
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    category: "Orthodontics",
    summary: "Fixed or removable options for straightening teeth over time.",
    intro:
      "Orthodontic treatment moves teeth gradually into a new position using fixed appliances or a series of removable aligners.",
    whatItIs:
      "Either fixed braces bonded to the teeth, or a sequence of custom removable aligners worn for a prescribed number of hours a day.",
    whoItMayBeFor:
      "Adults and children with crowding, spacing or bite concerns. Suitability and likely duration are assessed individually.",
    whatToExpect: [
      "Assessment with photographs, scans and imaging",
      "A plan setting out the approach, likely duration and cost",
      "Regular review appointments through treatment",
      "A retention plan once active treatment finishes",
    ],
    appointmentLength: "Consultation about 45 minutes; reviews are shorter",
    aftercare:
      "Retention is part of treatment, not an optional extra — your clinician will explain the retainer plan.",
    image: img.braces,
    alt: "A dental clinic treatment area",
    icon: "layers",
    featuredInExplorer: true,
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    category: "Cosmetic",
    summary: "Professionally supervised whitening, assessed before it begins.",
    intro:
      "Whitening is carried out under clinical supervision after an examination confirms it is appropriate.",
    whatItIs:
      "A supervised process using professional whitening products, either in the practice, with custom trays at home, or a combination.",
    whoItMayBeFor:
      "People with healthy teeth and gums who would like to discuss the appearance of tooth colour. Results vary between individuals.",
    whatToExpect: [
      "An examination first — whitening is not started on untreated decay or gum disease",
      "A discussion of realistic expectations for your teeth",
      "Custom trays taken where home whitening is chosen",
      "Review to check how things have gone",
    ],
    appointmentLength: "Consultation about 30 minutes",
    aftercare:
      "Short-term sensitivity is common. Your clinician will explain how to manage it and how long results may last.",
    image: img.whitening,
    alt: "A person smiling",
    icon: "sparkles",
    featuredInExplorer: true,
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    category: "Cosmetic",
    summary: "Treatment planned around your natural smile, not a template.",
    intro:
      "Cosmetic treatment begins with a conversation about what you would like to change and what is realistic.",
    whatItIs:
      "A planned combination of treatments — which may include whitening, bonding, veneers or orthodontics — chosen for your circumstances.",
    whoItMayBeFor:
      "People who would like to discuss the appearance of their teeth. A healthy foundation is assessed first.",
    whatToExpect: [
      "A consultation about what you would like to change",
      "Photographs and scans to plan with",
      "A staged plan with costs before any treatment starts",
      "Time to consider the plan before committing",
    ],
    appointmentLength: "Consultation about 45–60 minutes",
    aftercare: "Aftercare depends on the treatments chosen and is set out in your plan.",
    image: img.cosmetic,
    alt: "A portrait of a smiling person",
    icon: "brush",
  },
  {
    slug: "crowns-and-bridges",
    name: "Crowns & Bridges",
    category: "Restorative",
    summary: "Restoring a damaged tooth, or replacing a gap between teeth.",
    intro:
      "Crowns rebuild a single damaged tooth; bridges span a gap using the teeth on either side for support.",
    whatItIs:
      "A custom-made restoration, usually in ceramic, made to fit the prepared tooth and cemented into place.",
    whoItMayBeFor:
      "People with a heavily filled, cracked or root-treated tooth, or a gap where a fixed replacement is being considered.",
    whatToExpect: [
      "Assessment of the tooth and the options for restoring it",
      "Preparation and a digital or conventional impression",
      "A temporary restoration while the final one is made",
      "Fitting and adjustment appointment",
    ],
    appointmentLength: "Usually two visits of about 60 minutes",
    aftercare: "Your clinician will explain how to clean around the restoration and what to watch for.",
    image: img.crowns,
    alt: "Clinicians reviewing imaging together",
    icon: "drill",
    featuredInExplorer: true,
  },
  {
    slug: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    category: "Children",
    summary: "Unhurried first visits and preventive care for children.",
    intro:
      "Early visits are about familiarity as much as examination — the aim is for children to be comfortable in the chair.",
    whatItIs:
      "Age-appropriate examination, preventive advice and, where needed, treatment, at a pace suited to the child.",
    whoItMayBeFor: "Children of any age, including first visits before any problem has appeared.",
    whatToExpect: [
      "Time to look around before anything happens",
      "A gentle examination, with the child and parent involved",
      "Preventive advice on brushing, diet and fluoride",
      "A plan agreed with the parent or carer",
    ],
    appointmentLength: "About 30 minutes",
    aftercare: "Preventive advice is written down so it is easy to follow at home.",
    image: img.paediatric,
    alt: "A clinician talking with a patient",
    icon: "baby",
  },
];

export const findTreatment = (slug: string) => treatments.find((t) => t.slug === slug);

/** The "what brings you here?" entry points — patient intent, not clinic structure. */
export const intents = [
  { label: "I need a checkup", href: "/treatments/general-dentistry", icon: "stethoscope" },
  { label: "My tooth hurts", href: "/treatments/root-canal-treatment", icon: "activity" },
  { label: "I want to improve my smile", href: "/treatments/cosmetic-dentistry", icon: "sparkles" },
  { label: "I need braces or aligners", href: "/treatments/braces-and-aligners", icon: "layers" },
  { label: "I need a missing tooth replaced", href: "/treatments/dental-implants", icon: "bone" },
  { label: "I need children's dental care", href: "/treatments/pediatric-dentistry", icon: "baby" },
  { label: "I have a dental emergency", href: "/#urgent", icon: "phone" },
] as const;
