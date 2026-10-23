import type { Review } from "./types";

/**
 * Verified reviews, word for word, linked to where they were posted.
 *
 * Empty on purpose: while it is, the site shows "What to expect from our
 * service" instead. It never shows invented quotes, ratings or review counts.
 * Use a customer's name only if it's public on the original or they agreed.
 */
export const reviews: Review[] = [];
