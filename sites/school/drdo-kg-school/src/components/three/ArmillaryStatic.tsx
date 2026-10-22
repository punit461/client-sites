/**
 * The armillary sphere as a flat drawing: the server-rendered placeholder, and
 * what phones, low-powered devices and reduced-motion users see instead of 3D.
 */
export default function ArmillaryStatic({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id="arm-globe" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#3b6a9b" />
          <stop offset="1" stopColor="#1a2a5e" />
        </radialGradient>
        <linearGradient id="arm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3cb98" />
          <stop offset=".5" stopColor="#e2b54a" />
          <stop offset="1" stopColor="#8f7240" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#arm-gold)" strokeLinecap="round">
        <line x1="100" y1="16" x2="100" y2="184" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="74" ry="74" strokeWidth="3" />
        <ellipse cx="100" cy="100" rx="74" ry="22" strokeWidth="2.4" />
        <ellipse cx="100" cy="100" rx="26" ry="68" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="66" ry="30" strokeWidth="5" transform="rotate(-23 100 100)" />
      </g>
      <circle cx="100" cy="100" r="31" fill="url(#arm-globe)" />
      <ellipse cx="100" cy="100" rx="31" ry="8" fill="none" stroke="#e2b54a" strokeOpacity=".6" strokeWidth=".8" />
      <circle cx="160" cy="80" r="5" fill="#f8f6f0" />
    </svg>
  );
}
