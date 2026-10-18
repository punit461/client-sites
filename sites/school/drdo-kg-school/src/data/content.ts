import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";
import { pending, type Text } from "./pending";

/**
 * The page's copy, section by section. What parents praise comes from the
 * themes in the school's public Google reviews (summarised, not quoted); every
 * fact the reviews and listing do not establish is `pending`.
 */

export const about = {
  eyebrow: "About us",
  title: "Where little learners feel at home",
  body: [
    "D.R.D.O KG School is a kindergarten on Kaggadasapura Main Road in C V Raman Nagar, Bengaluru. Parents tell us what they value most: friendly, dedicated teachers and support staff, a warm atmosphere, and plenty of room to play.",
    pending(
      "A short history: the year the school was founded, who runs it, the age groups taught and the teaching approach.",
    ),
  ] satisfies Text[],
  image: { src: img.about, alt: "Entrance of D.R.D.O KG School" },
};

export const highlights = [
  {
    title: "Caring teachers",
    copy: "Our teachers and support staff are what parents mention most: patient, kind and attentive to every child.",
    image: { src: img.teachers, alt: "Teachers at D.R.D.O KG School" },
  },
  {
    title: "A superb play area",
    copy: "A large, safe outdoor space where children run, climb and play every day, one of the best among nearby schools.",
    image: { src: img.playArea, alt: "The school's outdoor play area" },
  },
  {
    title: "Bright classrooms",
    copy: "Clean, cheerful classrooms set up for learning through play, stories, art and music.",
    image: { src: img.classroom, alt: "A classroom at the school" },
  },
];

export const features: { icon: IconName; label: Text }[] = [
  { icon: "accessibility", label: "Wheelchair-accessible entrance" },
  { icon: "plus", label: pending("More facilities: transport, CCTV, day-care…") },
];

export const admissions = {
  eyebrow: "Admissions",
  title: "Join our school family",
  // From a single public review. Keep it pending until the school confirms it.
  policy: "Admission priority is given to children of DRDO employees, after which seats are open to other families.",
  policyCheck: pending("Confirm this admission policy with the school."),
  steps: [
    {
      title: "Call or visit",
      copy: "Ask the school office about seat availability for the coming year.",
      detail: null,
    },
    {
      title: "Collect the form",
      copy: "Pick up the admission form and the list of documents needed.",
      detail: pending("Documents needed: birth certificate, photos, address proof…"),
    },
    {
      title: "Submit",
      copy: "Hand in the completed form and documents at the office.",
      detail: pending("Admission dates and age criteria."),
    },
  ] satisfies { title: string; copy: string; detail: Text | null }[],
  classes: [
    { name: "Nursery", age: pending("Age") },
    { name: "LKG", age: pending("Age") },
    { name: "UKG", age: pending("Age") },
  ] satisfies { name: string; age: Text }[],
};

/**
 * What families say, as themes rather than quotes: a reviewer's words belong
 * to them. Swap each `quote` for a parent's own words, used with permission.
 */
export const parentVoices: { icon: IconName; theme: string; quote: Text }[] = [
  {
    icon: "heart",
    theme: "Teachers and staff are consistently praised for being kind and supportive.",
    quote: pending("A parent's quote and name, used with permission"),
  },
  {
    icon: "trees",
    theme: "The play area is often called the best among schools in the area.",
    quote: pending("A parent's quote and name, used with permission"),
  },
  {
    icon: "smile",
    theme: "Families describe good classrooms and a friendly, welcoming environment.",
    quote: pending("A parent's quote and name, used with permission"),
  },
];

export const gallery = [
  { src: img.gallery1, alt: "Annual day", caption: "Annual day" },
  { src: img.gallery2, alt: "Sports day", caption: "Sports day" },
  { src: img.gallery3, alt: "A festival celebration", caption: "Festivals" },
  { src: img.gallery4, alt: "Children at an art and craft activity", caption: "Art & craft" },
  { src: img.gallery5, alt: "Children in the play area", caption: "Play time" },
  { src: img.gallery6, alt: "A classroom activity", caption: "In the classroom" },
];
