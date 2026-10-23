import type { Review } from "./types";

/**
 * Verified reviews, word for word, linked to where they were posted.
 *
 * These are customer reviews from Tx-Star Plumbing's Google Business Profile
 * (October 2026), unedited. The older ones name Beacon Plumbing — the
 * company's earlier name — so the Feedback section explains that beside them.
 * Use a customer's name only if it's public on the original or they agreed.
 */
const google = "https://maps.app.goo.gl/rnhZ86juSRGFhfVm6";

export const reviews: Review[] = [
  {
    text: "Such a good experience. They were prompt, diagnosed the problem, and fixed it. Evan was so polite. He walked us thru everything he was doing and got our plumbing issues resolved. So thankful!!",
    author: "Kim Golafshan",
    source: "Google",
    href: google,
  },
  {
    text: "We could not have been happier with the customer service and quality of work. The water main between the street meter and our house needed to be replaced due to a leak. Beacon went out of their way to make sure we stayed informed during the entire process from quote to completion even working over the weekend to make sure we were happy. Everything was explained to us before any work was done. It’s so nice to know there are still companies that really care about their customers. We will definitely use Beacon Plumbing for as long as we own our home!",
    author: "Karen Stofanik",
    source: "Google",
    href: google,
  },
  {
    text: "I had been having stoppage problems with my drains for nearly a year. I had had multiple plumbers come out and have a look, but none of them were able to address the root cause of the problem. Eventually, after running a camera we determined the root cause was roots perforating my concrete pipe. I had two plumbers quote a replacement for the concrete pipe. Wedgeworth quoted $3250 w/ 5yr warranty and Beacon quoted $2560 w/ 10yr warranty. Beacon completed the job quickly and for the agreed upon price--while also identifying errors Wedgeworth had made when they ran the camera. After dealing with several plumbers in the Spring Branch area over the last year, I would highly recommend Beacon Plumbing. Their prices were lower, and their quality of work was greater. Five stars.",
    author: "Robert Graham",
    source: "Google",
    href: google,
  },
  {
    text: "In January 2022, I had an appointment with Vance to check out a half bathroom toilet that hadn't been flushing properly since we purchased the house in 2019. What he found on that visit was a shock. This toilet drain wasn't even connected to a 1-1/2\" vent to the roof located just a few feet away. This unconnected vent was for a bathtub on the other side of the wall in a full bathroom that was apparently demoed around 2017. So Vance had a crew trench in to the slab so that the toilet drain could be connected to this vent. That's when another problem was discovered: The 3\" toilet drain swaged down to 2\" in order to use an existing drain line that used to belong to the same mentioned demoed tub. As a result, more trenching took place across the floor of the adjacent full bathroom to run the 3\" toilet drain all the way over to an equivalent or larger sized drain line. These findings and this work hit our pocketbook hard. But now at least we have piece of mind knowing that it's done right. Overall, I think Vance and company did a great job. We've had no issues since. Would recommend.",
    author: "Robert Brown",
    source: "Google",
    href: google,
  },
  {
    text: "Had a very good experience with Beacon Plumbing. Omar was great at unclogging my bathtub!  Only took a short time. A special thank you to Josh for helping me out with this problem & for running such a great company.  He adds an understanding to your needs. Thanks again!",
    author: "Fran Peacock",
    source: "Google",
    href: google,
  },
];
