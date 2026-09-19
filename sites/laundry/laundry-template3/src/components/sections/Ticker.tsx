import { promises } from "@/data/content";

const itemClass =
  "flex shrink-0 items-center gap-10 whitespace-nowrap text-[0.92rem] font-medium text-mist-soft";

function Run({ echo = false }: { echo?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={echo || undefined}>
      {promises.map((promise) => (
        <li key={promise} className={itemClass}>
          {promise}
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

/**
 * The promise ticker. The track holds the list twice, each copy identical down
 * to its trailing gap, and CSS slides the track half its own width — so the
 * second copy lands exactly where the first began. A seamless loop with no
 * JavaScript and nothing to measure.
 *
 * The duplicate is `aria-hidden`: a screen reader should hear the list once.
 */
export default function Ticker() {
  return (
    <section
      className="relative border-y border-line bg-deep py-5"
      aria-label="What every collection includes"
    >
      <div className="flex overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          <Run />
          <Run echo />
        </div>
      </div>
    </section>
  );
}
