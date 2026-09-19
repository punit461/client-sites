/**
 * Plain formatting helpers — deliberately NOT in components/ui, which is a
 * "use client" module. A server component cannot call a function exported from
 * a client module, and the suite pages are server components that format rates.
 */
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** "01", "02" … the mono numerals the whole layout is indexed by. */
export const numeral = (n: number) => String(n).padStart(2, "0");
