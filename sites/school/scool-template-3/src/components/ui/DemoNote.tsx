import { demo } from "@/content/school";

/**
 * A small label on placeholder content ("Sample figures", "Sample article").
 * Renders nothing once `demo` is false in src/content/school.ts.
 */
export default function DemoNote({ children = "Sample content", tone = "dark", className = "" }: { children?: string; tone?: "dark" | "light"; className?: string }) {
  if (!demo) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xs border border-dashed px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
        tone === "light" ? "border-white/40 text-white/80" : "border-gold-ink/50 text-gold-ink"
      } ${className}`}
    >
      {children}
    </span>
  );
}
