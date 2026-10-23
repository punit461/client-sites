import type { Review } from "./types";

/**
 * Verified customer reviews, copied word for word from where they were posted
 * (Google Business Profile, Yelp, etc.), with a link back to the original.
 *
 * Empty on purpose. While it is empty, the site shows the company's service
 * standards instead of a review section — it never shows invented quotes,
 * star ratings or review counts.
 *
 * Use a customer's name only if it is public on the original review or they
 * have agreed to it.
 */
export const reviews: Review[] = [];
