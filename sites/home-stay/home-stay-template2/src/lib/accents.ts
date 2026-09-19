/**
 * Per-room accent classes. A plain module, NOT components/ui — that one is
 * "use client", and a server component cannot read a value exported from a
 * client module (it comes back undefined at build time).
 */
export const ACCENT: Record<string, { bg: string; text: string; ring: string }> = {
  terracotta: { bg: "bg-terracotta", text: "text-terracotta", ring: "ring-terracotta" },
  sage: { bg: "bg-sage", text: "text-sage", ring: "ring-sage" },
  yellow: { bg: "bg-yellow", text: "text-yellow", ring: "ring-yellow" },
  sky: { bg: "bg-sky", text: "text-sky", ring: "ring-sky" },
};
