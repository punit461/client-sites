/**
 * The membership rate card, and the arithmetic behind it.
 *
 * Prices are whole rupees per month so nothing has to round, and the yearly
 * figure is derived rather than typed — a discount that is typed twice is a
 * discount that will eventually disagree with itself.
 */
export type Cycle = "monthly" | "yearly";

/** Pay yearly and two months are free. The card and the maths read this. */
export const YEARLY_MONTHS_FREE = 2;

export interface Plan {
  id: string;
  name: string;
  /** Rupees per month when billed monthly. */
  monthly: number;
  /** Bags of up to 6 kg included each month. */
  bags: number;
  summary: string;
  turnaround: string;
  includes: string[];
  /** Drawn with more emphasis, and what the recommender falls back to. */
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    monthly: 1499,
    bags: 4,
    summary: "One person, one weekly bag. Everyday clothes, washed and folded.",
    turnaround: "48 hours",
    includes: [
      "4 bags a month, up to 6 kg each",
      "Wash, tumble dry and fold",
      "Free collection and return",
      "Stage-by-stage tracking",
      "Cover up to ₹10,000 a garment",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    monthly: 2999,
    bags: 8,
    summary: "A household, or a wardrobe that is mostly worn to work.",
    turnaround: "24 hours",
    featured: true,
    includes: [
      "8 bags a month, up to 6 kg each",
      "Everything in Essential",
      "Hand-finished pressing on shirts",
      "4 dry-clean items a month",
      "Priority window, next morning",
      "Cover up to ₹40,000 a garment",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    monthly: 5499,
    bags: 14,
    summary: "Tailoring, silk and occasion wear that cannot go in a machine.",
    turnaround: "24 hours",
    includes: [
      "14 bags a month, up to 6 kg each",
      "Everything in Signature",
      "Unlimited dry cleaning",
      "Couture hand-finishing and steaming",
      "Named garment specialist",
      "Minor repairs and button work",
      "Cover up to ₹2,00,000 a garment",
    ],
  },
];

export interface Price {
  /** What is charged, once per cycle. */
  amount: number;
  /** What that works out to a month — the number the card leads with. */
  perMonth: number;
  /** Rupees saved over a year by paying yearly. Zero on the monthly cycle. */
  saved: number;
}

/** One place for the maths, so the cards and the drawer can never disagree. */
export function priceFor(plan: Plan, cycle: Cycle): Price {
  if (cycle === "monthly") {
    return { amount: plan.monthly, perMonth: plan.monthly, saved: 0 };
  }
  const amount = plan.monthly * (12 - YEARLY_MONTHS_FREE);
  return {
    amount,
    perMonth: Math.round(amount / 12),
    saved: plan.monthly * YEARLY_MONTHS_FREE,
  };
}

/**
 * The smallest plan that covers the bags a member says they send. Above the
 * largest plan there is nothing left to suggest, so the largest is the answer
 * — the section then offers the concierge instead of pretending otherwise.
 */
export function recommendFor(bagsPerMonth: number): Plan {
  return (
    plans.find((plan) => plan.bags >= bagsPerMonth) ?? plans[plans.length - 1]
  );
}

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
