/**
 * The per-garment rate card behind the calculator. Prices are in whole rupees
 * so the arithmetic stays exact — no floating-point cents to round.
 */
export interface Garment {
  id: string;
  name: string;
  price: number;
  note: string;
}

export const garments: Garment[] = [
  { id: "shirt", name: "Shirts", price: 49, note: "Washed & pressed" },
  { id: "tshirt", name: "T-Shirts", price: 39, note: "Washed & folded" },
  { id: "trousers", name: "Trousers", price: 69, note: "Washed & pressed" },
  { id: "jeans", name: "Jeans", price: 79, note: "Cold wash, inside out" },
  { id: "dress", name: "Dress", price: 149, note: "Hand finished" },
  { id: "suit", name: "Suit", price: 299, note: "Dry clean, 2 piece" },
  { id: "bedsheet", name: "Bedsheet", price: 129, note: "Washed & pressed" },
];

export const PICKUP_FEE = 49;
/** Pickup is waived above this, which is also what the announcement promises. */
export const FREE_PICKUP_OVER = 499;
/** A flat percentage off the garment subtotal once it passes the threshold. */
export const BULK_DISCOUNT = { over: 999, percent: 10 };

export interface Quote {
  subtotal: number;
  pickupFee: number;
  discount: number;
  total: number;
  items: number;
}

/** One place for the maths, so the summary and the CTA can never disagree. */
export function quote(counts: Record<string, number>): Quote {
  const subtotal = garments.reduce(
    (sum, g) => sum + g.price * (counts[g.id] ?? 0),
    0,
  );
  const items = Object.values(counts).reduce((n, c) => n + c, 0);
  const discount =
    subtotal >= BULK_DISCOUNT.over
      ? Math.round((subtotal * BULK_DISCOUNT.percent) / 100)
      : 0;
  const pickupFee = subtotal === 0 || subtotal >= FREE_PICKUP_OVER ? 0 : PICKUP_FEE;

  return { subtotal, pickupFee, discount, total: subtotal - discount + pickupFee, items };
}

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
