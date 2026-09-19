import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/** ------------------------------------------------------ patient journey */
export const journey = [
  {
    stage: "Before your visit",
    copy: "Simple booking and clear information — what the appointment covers, how long it takes and what it costs.",
    image: img.before,
    alt: "A consultation at a desk",
  },
  {
    stage: "During your visit",
    copy: "Comfortable, transparent and personalised care. Options are explained before anything begins.",
    image: img.during,
    alt: "A clinician talking with a patient in the chair",
  },
  {
    stage: "After your visit",
    copy: "Clear aftercare in writing, and a straightforward way to get in touch if something does not feel right.",
    image: img.after,
    alt: "A clinician reviewing notes",
  },
] as const;

/** ------------------------------------------------------ clinic tour */
export interface TourImage {
  label: string;
  image: string;
  alt: string;
  /** "wide" takes two columns and two rows in the masonry grid. */
  span?: "wide";
}

export const tour: TourImage[] = [
  { label: "Reception", image: img.reception, alt: "The practice reception area", span: "wide" },
  { label: "Treatment room", image: img.treatmentRoom, alt: "A dental treatment room" },
  { label: "Waiting area", image: img.waiting, alt: "The waiting area" },
  { label: "Sterilisation", image: img.sterilisation, alt: "The sterilisation area" },
  { label: "Technology", image: img.technology, alt: "Clinical equipment" },
  { label: "Team area", image: img.teamArea, alt: "The clinical team at work" },
];

/** ------------------------------------------------------ technology */
/**
 * Described as what the equipment does, not what it achieves. Equipment does
 * not guarantee outcomes and this copy must not imply that it does.
 */
export const technology: { name: string; copy: string; icon: IconName }[] = [
  {
    name: "Digital scanning",
    copy: "A chairside scanner records the shape of your teeth without conventional impression material.",
    icon: "scanLine",
  },
  {
    name: "Digital X-ray",
    copy: "Digital sensors produce images that can be reviewed immediately and stored with your records.",
    icon: "monitor",
  },
  {
    name: "Intraoral imaging",
    copy: "A small camera lets you see what your clinician sees while options are discussed.",
    icon: "camera",
  },
  {
    name: "Treatment planning",
    copy: "Scans and images are used to plan and to show you the stages before treatment begins.",
    icon: "layers",
  },
  {
    name: "Sterilisation",
    copy: "Instruments are processed through a documented decontamination cycle between patients.",
    icon: "shieldCheck",
  },
];

/** ------------------------------------------------------ reviews */
/**
 * PLACEHOLDERS ONLY. These are not testimonials — they are empty slots showing
 * where verified reviews would sit. Replace them with reviews from the
 * practice's own verified profile and set `evidence.reviewsAreReal` to true.
 * Writing plausible-sounding patient quotes here would be fabricating them.
 */
export const reviewPlaceholders = [
  { quote: "Patient review goes here.", name: "Patient name", visit: "Visit type" },
  { quote: "Patient review goes here.", name: "Patient name", visit: "Visit type" },
  { quote: "Patient review goes here.", name: "Patient name", visit: "Visit type" },
] as const;

/** ------------------------------------------------------ faq */
export const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Use the appointment request form on this site, or call the practice during opening hours. Requests are confirmed by a member of the team — a submitted request is not a confirmed appointment until you hear back.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Photo identification, details of any medicines you take, and any recent dental records or images if you have them. If you are using insurance, bring your policy details.",
  },
  {
    q: "Do you accept new patients?",
    a: "Yes. New patient appointments are usually a longer first visit so there is time to talk through your history and what you would like to address.",
  },
  {
    q: "How long does a consultation take?",
    a: "A routine examination is usually 30 to 45 minutes. Consultations for implant, orthodontic or cosmetic treatment are longer, typically 45 to 60 minutes.",
  },
  {
    q: "What payment options are available?",
    a: "Payment methods and any financing arrangements are confirmed by the practice. Ask when you book so that costs are clear before treatment is agreed.",
  },
  {
    q: "Do you treat children?",
    a: "Yes. First visits are deliberately unhurried, and a parent or carer stays with the child throughout.",
  },
  {
    q: "How do I reschedule?",
    a: "Call the practice as early as you can. Giving notice lets the appointment be offered to someone else who needs it.",
  },
  {
    q: "What should I do if I have an urgent dental problem?",
    a: "Call the practice and describe what is happening, so the team can advise on the appropriate next step. This website cannot assess a dental problem. If you have facial swelling affecting your breathing, swallowing or vision, treat it as a medical emergency and use your local emergency service.",
  },
];

/** ------------------------------------------------------ booking */
export const appointmentSlots = [
  "9:00 AM",
  "10:30 AM",
  "11:45 AM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
  "6:15 PM",
] as const;
