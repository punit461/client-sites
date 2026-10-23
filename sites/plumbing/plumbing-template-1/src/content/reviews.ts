import type { Review } from "./types";

/**
 * Verified customer reviews, copied word for word from where they were posted
 * (Google Business Profile, Yelp, etc.), with a link back to the original.
 *
 * These are the five reviews shown publicly on Blue Diamond Plumbing's Google
 * Business Profile (October 2026), unedited. Names are as the customers
 * published them on Google.
 *
 * Use a customer's name only if it is public on the original review or they
 * have agreed to it.
 */
const google = "https://maps.app.goo.gl/a99nfdgpsXcT7mNv8";

export const reviews: Review[] = [
  {
    text: "The pipe froze on Christmas Eve (of course) and Cameron was here within 20 minutes of my call for help! He very efficiently fixed the problem and got my water back up and running about 40 minutes after he got here! Super nice and efficient. Definitely in my \"saved in case of need\" list!! Highly recommended!",
    author: "Deb Payne",
    source: "Google",
    href: google,
  },
  {
    text: "Blue Diamond Plumbing was an amazing a service provider. The owner, Cameron, came out to do the repair with his colleague and was flexible with my work schedule to ensure customer satisfaction. Cameron was always sure to communicate with me about changes and made sure I fully understood every detail of the service provided. I will definitely be referring friends to this company and be using them again. So thankful for their hard work and determination to get the job done! 💎",
    author: "Bethany Brown",
    source: "Google",
    href: google,
  },
  {
    text: "Cameron came last min today to fix a faucet I broke and got my water back on today. He did a great job and kept in touch till he got to my house. Top notch guy and company in my book. Give them a call for all your plumbing needs.",
    author: "Bryan Humphrey",
    source: "Google",
    href: google,
  },
  {
    text: "Cameron and his team went above and beyond working to get my plumbing problem taken care of quickly! They are very professional, respectful and provided exceptional service to me. I highly recommend them.",
    author: "Lance Morris",
    source: "Google",
    href: google,
  },
  {
    text: "Fair. Honest. Kind.  They did what they said they would do. It’s hard to find people like Cameron!",
    author: "Ryan Patterson",
    source: "Google",
    href: google,
  },
];
