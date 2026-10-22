import { photos } from "@/lib/images";
import type { Programme } from "./types";

/**
 * The classes, in order. Each becomes a card on the home page and the classes
 * page, and a page of its own at /academics/<slug>/. Delete a class the school
 * does not offer and its page disappears with it.
 *
 * CONFIRM with the school: which classes run, the ages they take, and the
 * shape of the day. Times are left out until the school gives them.
 */
export const programmes: Programme[] = [
  {
    slug: "nursery",
    name: "Nursery",
    range: "Age 3+ · First year of school",
    summary: "A gentle first year away from home: settling in, making friends and learning through play.",
    photo: photos.slideClimbingFrame,
    intro:
      "Nursery is many children's first time in a classroom. The days are unhurried and built around play, songs, stories and time outdoors, so that children learn to feel safe and happy at school.",
    focus: [
      { title: "Settling in", text: "Learning the rhythm of the day, saying goodbye at the gate with confidence, and trusting the adults in the room." },
      { title: "Talking and listening", text: "Rhymes, songs, picture books and plenty of conversation to grow vocabulary." },
      { title: "Busy hands and bodies", text: "Slides, swings and climbing frames for big muscles; crayons, clay and blocks for little fingers." },
      { title: "Getting along", text: "Sharing toys, taking turns and making first friends." },
    ],
    subjects: ["Rhymes & songs", "Stories & picture books", "Colours & shapes", "Clay & crayons", "Outdoor play", "Music & movement"],
    dayInTheLife: [
      { time: "Arrival", activity: "A warm welcome at the classroom door" },
      { time: "Circle time", activity: "Songs, rhymes and a chat about the day" },
      { time: "Play", activity: "Blocks, puzzles, clay and colouring in small groups" },
      { time: "Snack", activity: "Snack time together" },
      { time: "Outdoors", activity: "Slides, swings and running about in the play area" },
      { time: "Home time", activity: "A story, then home" },
    ],
    assessment:
      "There are no tests in Nursery. The class teacher watches how each child settles and grows; ask the office how and when this is shared with parents.",
  },
  {
    slug: "lkg",
    name: "LKG",
    range: "Age 4+ · Lower kindergarten",
    summary: "Letters, numbers and lots of play: early reading and counting built through games, stories and songs.",
    photo: photos.slideGarden,
    intro:
      "In LKG children begin to recognise letters and numbers, hold a pencil with growing control, and join in group activities. Learning stays playful, and much of it happens through rhymes, games, drawing and the play area.",
    focus: [
      { title: "Early literacy", text: "Letter sounds and shapes, picture reading and first words, through songs and games." },
      { title: "Number sense", text: "Counting, sorting, matching and comparing with real objects before writing numerals." },
      { title: "Hands ready to write", text: "Colouring, tracing, cutting and clay to build the control writing needs." },
      { title: "Confidence", text: "Speaking in front of the class, joining in songs and helping keep the classroom tidy." },
    ],
    subjects: ["Letters & sounds", "Numbers & counting", "Drawing & colouring", "Rhymes & action songs", "The world around us", "Outdoor play"],
    dayInTheLife: [
      { time: "Arrival", activity: "Morning greeting and circle time" },
      { time: "Letters", activity: "Letters or numbers in small groups" },
      { time: "Snack", activity: "Snack time together" },
      { time: "Outdoors", activity: "Play outside in the play area" },
      { time: "Create", activity: "Art, craft or music" },
      { time: "Home time", activity: "A story, then home" },
    ],
    assessment:
      "Progress is shared with parents through the class teacher. Ask the office how reports and parent–teacher meetings work for LKG.",
  },
  {
    slug: "ukg",
    name: "UKG",
    range: "Age 5+ · Upper kindergarten",
    summary: "The last year of kindergarten: reading, writing and number work that get children ready for Class 1.",
    photo: photos.cycling,
    intro:
      "UKG brings everything together. Children read simple words and sentences, write letters and numbers neatly, and build the independence they need for primary school, with plenty of time to play.",
    focus: [
      { title: "Reading and writing", text: "Blending sounds into words, reading short sentences, and writing letters and simple words." },
      { title: "Numbers", text: "Counting and writing numerals, simple addition with objects, shapes and patterns." },
      { title: "The world around us", text: "Family, seasons, animals, plants and festivals, through talk, pictures and time outdoors." },
      { title: "Ready for Class 1", text: "Following instructions, looking after their own things, and working on their own for longer." },
    ],
    subjects: ["Reading & writing", "Numbers & simple sums", "Shapes & patterns", "The world around us", "Art & craft", "Music, movement & play"],
    dayInTheLife: [
      { time: "Arrival", activity: "Morning greeting and circle time" },
      { time: "Reading", activity: "Reading and writing practice" },
      { time: "Snack", activity: "Snack time together" },
      { time: "Numbers", activity: "Number work with objects and worksheets" },
      { time: "Outdoors", activity: "Play outside in the play area" },
      { time: "Home time", activity: "Songs, a story, then home" },
    ],
    assessment:
      "Progress is shared with parents through the class teacher. Ask the office how reports, parent–teacher meetings and the move to Class 1 work for UKG.",
  },
];

export function getProgramme(slug: string) {
  return programmes.find((p) => p.slug === slug);
}
