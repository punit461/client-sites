import { brand } from "@/data/site";

/**
 * Stand-in for the school's logo: a sunny "KG" badge plus the name in English
 * and Kannada. Replace the badge with the real logo once the school sends it.
 */
export default function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#top" className="inline-flex items-center gap-3" aria-label={`${brand.name} — home`}>
      <span
        className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-sun font-display text-lg font-extrabold text-ink"
        aria-hidden
      >
        {brand.monogram}
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-[1.2rem] font-bold ${onDark ? "text-white" : "text-ink"}`}>
          {brand.name}
        </span>
        <span lang="kn" className={`text-[0.78rem] ${onDark ? "text-white/70" : "text-ink-soft"}`}>
          {brand.nameKannada}
        </span>
      </span>
    </a>
  );
}
