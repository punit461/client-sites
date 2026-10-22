import type { Testimonial } from "./types";

/**
 * Only quotes the speaker has approved in writing, with their name. While
 * this list is empty the home page shows what reviewers say most often
 * instead — never an invented quote.
 */
export const testimonials: Testimonial[] = [];

/**
 * The themes that run through the school's public Google reviews (38 at
 * capture), summarised in our words rather than quoted: a review belongs to
 * its writer.
 */
export const reviewThemes = [
  {
    title: "Caring teachers and staff",
    text: "What parents mention most: teachers and support staff who are kind, patient and good with little children.",
  },
  {
    title: "A superb play area",
    text: "Reviewers call it the best playing space among the schools around, with slides, swings and room to run.",
  },
  {
    title: "Good classrooms",
    text: "Clean, bright classrooms and a friendly, welcoming atmosphere from the gate onwards.",
  },
  {
    title: "A strong foundation",
    text: "Former pupils, some from as far back as 2003, remember it as the best possible start to their schooling.",
  },
];
