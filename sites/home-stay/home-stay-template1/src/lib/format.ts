/**
 * Plain formatting helpers — deliberately NOT in components/ui, which is a
 * "use client" module. A server component cannot call a function exported from
 * a client module, so shared pure helpers live here instead.
 */
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
