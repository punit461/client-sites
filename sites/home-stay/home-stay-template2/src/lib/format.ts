/**
 * Plain formatting helpers — deliberately NOT in a "use client" module, so
 * server components can call them too.
 */
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
