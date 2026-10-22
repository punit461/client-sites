import { photos } from "@/lib/images";
import type { Facility, LearningStep, LifeItem } from "./types";

/**
 * The campus, activities and the school's approach. Facilities are only what
 * the photographs and the Google listing show; add more once the school
 * confirms them (transport, CCTV, day-care and so on).
 */

export const facilities: Facility[] = [
  {
    slug: "play-areas",
    name: "Play areas",
    text: "Slides, swings and climbing towers set among lawns and tall trees. Parents call it the best play space of any school nearby.",
    photo: photos.playground,
    details: ["Slides, swings and climbing frames", "Lawn and paved play spaces", "Shade from tall trees"],
  },
  {
    slug: "stage",
    name: "Open-air stage",
    text: "A covered stage with a painted mural, where children perform for their families at Annual Day.",
    photo: photos.annualDay,
    details: ["Covered stage with a painted backdrop", "Annual Day performances", "Room in front for families to watch"],
  },
  {
    slug: "courtyard",
    name: "Courtyard",
    text: "A wide, open courtyard at the heart of the school, with classrooms all around it.",
    photo: photos.courtyard,
    details: ["Space to run, line up and play games", "Classrooms open onto it", "The stage at the far end"],
  },
  {
    slug: "classrooms",
    name: "Classrooms",
    text: "Bright, airy classrooms along shaded corridors, with children's artwork on the walls.",
    photo: photos.corridor,
    details: ["Bright, well-ventilated rooms", "Children's work on display", "Seating for parents at pick-up time"],
  },
  {
    slug: "green-campus",
    name: "Green, gated campus",
    text: "Lawns, hedges and palms inside a gated campus under the school's signboard.",
    icon: "leaf",
    details: ["Gated entrance under the school signboard", "Lawns and hedges around the play areas", "Trees for shade"],
  },
  {
    slug: "access",
    name: "Step-free access",
    text: "A wheelchair-accessible entrance and car park, as listed on the school's Google profile.",
    icon: "accessibility",
    details: ["Wheelchair-accessible entrance", "Wheelchair-accessible car park"],
  },
];

/** CONFIRM: the activities beyond play and Annual Day are typical of a kindergarten; check the list with the school. */
export const lifeItems: LifeItem[] = [
  {
    title: "Play every day",
    text: "Time outdoors on the slides, swings and lawns is part of every school day, building strength, balance and friendships.",
    photo: photos.playCourt,
  },
  { title: "Stories & rhymes", text: "Picture books, rhymes and songs that grow vocabulary and a love of reading.", icon: "book" },
  { title: "Art & craft", text: "Colouring, clay, cutting and sticking, with children's work proudly up on the walls.", icon: "palette" },
  { title: "Music & movement", text: "Action songs, dance and games that get little ones moving.", icon: "music" },
  { title: "Annual Day & festivals", text: "Children take the stage for their families at Annual Day, and the school marks festivals together.", icon: "sparkles" },
];

/** The tabbed "How children learn" section. Each example is something visible in the school's own photographs. */
export const learningSteps: LearningStep[] = [
  {
    id: "play",
    label: "01",
    title: "Play",
    text: "Young children learn most through play. Slides and swings build strength and balance; blocks, puzzles and pretend play build thinking and talk.",
    example: "The play areas, with slides, swings and climbing towers on the lawn, are what parents mention most in their reviews.",
    photo: photos.playground,
  },
  {
    id: "friends",
    label: "02",
    title: "Getting along",
    text: "Kindergarten is where children learn to share, take turns, wait, and help one another, the habits every later classroom depends on.",
    example: "Sharing the climbing frame, waiting for a turn on the slide, and helping a friend up the ladder.",
    photo: photos.slideClimbingFrame,
  },
  {
    id: "making",
    label: "03",
    title: "Making things",
    text: "Drawing, colouring, clay and craft strengthen small hands for writing and give children something to be proud of.",
    example: "Children's drawings and craft work brighten the walls of the classroom corridors.",
    photo: photos.corridor,
  },
  {
    id: "celebrating",
    label: "04",
    title: "Celebrating",
    text: "Performing for an audience, even a song on stage, builds the confidence to speak up in class.",
    example: "At Annual Day, children in their white uniforms perform on the open-air stage for their families.",
    photo: photos.annualDay,
  },
];

/** CONFIRM: the vision, mission and values are drafted for the school to approve. The motto is from the school's seal. */
export const philosophy = {
  intro:
    "A child's first school should feel like a second home. For more than twenty years, D.R.D.O KG School has given children in C V Raman Nagar a warm, safe and happy start: caring teachers, bright classrooms and plenty of room to play.",
  vision: "Every child leaves kindergarten confident, curious and happy to learn, ready for Class 1.",
  mission:
    "To give young children a caring, safe and playful start to school, where they build early reading, number and social skills at their own pace.",
  values: [
    { title: "Care", text: "Teachers and staff who are kind, patient and attentive." },
    { title: "Play", text: "Learning through play, outdoors and in the classroom." },
    { title: "Curiosity", text: "Questions, stories and the world around us." },
    { title: "Knowledge", text: "Our motto: Knowledge is Power." },
  ],
  approach: "Small steps and lots of play, so that children grow in confidence as well as in skills.",
};

/** Who runs the school, from the signboard at the gate. */
export const trust = {
  title: "Run by the DRDO Employees Educational Trust",
  body: [
    "D.R.D.O KG School, named DRDO Kindergarten School, C.V. Raman Nagar on its signboard, is run by the DRDO Employees Educational Trust (DEET).",
    "The school's seal carries its motto, “Knowledge is Power”, and the signboard over the gate gives its name in Kannada, Hindi and English.",
  ],
  /** CONFIRM: from a single parent review. */
  priority: "Children of DRDO employees are given priority for admission; remaining seats are open to other families.",
};
