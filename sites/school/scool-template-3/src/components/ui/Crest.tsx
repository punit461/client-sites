import { useId } from "react";

/**
 * The school's mark, drawn from the seal on the signboard at the gate: a
 * yellow lotus outlined in red on a navy-and-gold roundel. The official DRDO
 * emblem at the seal's centre is replaced by an open book — swap in the
 * school's own artwork here if they supply it.
 */
function Lotus() {
  return (
    <>
      <g fill="#f4c542" stroke="#c0392b" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M32 25.5c3.4 4.3 3.7 9.6 0 16.5-3.7-6.9-3.4-12.2 0-16.5Z" transform="rotate(-62 32 44)" />
        <path d="M32 25.5c3.4 4.3 3.7 9.6 0 16.5-3.7-6.9-3.4-12.2 0-16.5Z" transform="rotate(62 32 44)" />
        <path d="M32 21c3.9 4.9 4.3 11 0 21-4.3-10-3.9-16.1 0-21Z" transform="rotate(-31 32 44)" />
        <path d="M32 21c3.9 4.9 4.3 11 0 21-4.3-10-3.9-16.1 0-21Z" transform="rotate(31 32 44)" />
        <path d="M32 15.5c4.6 5.6 5 13.4 0 26.5-5-13.1-4.6-20.9 0-26.5Z" />
      </g>
      <path d="M23.8 36.2c2.9-1.1 5.6-.8 8.2.9v6.6c-2.6-1.7-5.3-2-8.2-.9Z" fill="#1a2a5e" />
      <path d="M40.2 36.2c-2.9-1.1-5.6-.8-8.2.9v6.6c2.6-1.7 5.3-2 8.2-.9Z" fill="#1a2a5e" />
      <path
        d="M25.4 37.6c2-.6 3.9-.4 5.6.5M25.4 39.6c2-.6 3.9-.4 5.6.5M38.6 37.6c-2-.6-3.9-.4-5.6.5M38.6 39.6c-2-.6-3.9-.4-5.6.5"
        stroke="#fbf8ef"
        strokeWidth=".55"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

/** The compact mark for the header, footer and favicon. */
export default function Crest({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <circle cx="32" cy="32" r="30.6" fill="#1a2a5e" stroke="#e2b54a" strokeWidth="1.6" />
      <circle cx="32" cy="32" r="24.5" fill="#fbf8ef" stroke="#e2b54a" strokeWidth=".8" />
      <Lotus />
    </svg>
  );
}

/** The full seal, with the school's name and motto around the ring. For large sizes only. */
export function Seal({ className = "h-40 w-40", title }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false">
      <defs>
        {/* Top: clockwise over the top, 160° to 20°. Bottom: anticlockwise under the bottom, so it reads upright. */}
        <path id={`${id}-top`} d="M19.6 74.7A43 43 0 1 1 100.4 74.7" />
        <path id={`${id}-bottom`} d="M12.55 77.27A50.5 50.5 0 0 0 107.45 77.27" />
      </defs>
      <circle cx="60" cy="60" r="58.5" fill="#1a2a5e" stroke="#e2b54a" strokeWidth="2" />
      <circle cx="60" cy="60" r="54.5" fill="none" stroke="#e2b54a" strokeOpacity=".5" strokeWidth=".6" />
      {/* textLength pins each line to its arc, whatever font the browser ends up using. */}
      <g fontFamily="var(--font-sans), Arial, sans-serif" fontWeight="800" fill="#f6e7b8">
        <text fontSize="7.8">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle" textLength="132" lengthAdjust="spacingAndGlyphs">
            DRDO KINDERGARTEN SCHOOL
          </textPath>
        </text>
        <text fontSize="7.2">
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle" textLength="98" lengthAdjust="spacingAndGlyphs">
            KNOWLEDGE IS POWER
          </textPath>
        </text>
      </g>
      <circle cx="15.3" cy="74.5" r="1.6" fill="#e2b54a" />
      <circle cx="104.7" cy="74.5" r="1.6" fill="#e2b54a" />
      <circle cx="60" cy="60" r="38.5" fill="#fbf8ef" stroke="#e2b54a" strokeWidth="1" />
      <g transform="translate(60 61) scale(1.45) translate(-32 -32)">
        <Lotus />
      </g>
    </svg>
  );
}
