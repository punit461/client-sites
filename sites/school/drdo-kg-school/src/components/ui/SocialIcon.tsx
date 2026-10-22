/** Lucide dropped brand marks in 1.0, so these are drawn here in the same 24px, 1.75-stroke style. */
export default function SocialIcon({ name, className = "h-4 w-4" }: { name: "instagram" | "facebook" | "youtube" | "linkedin"; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10 9.5 4.5 2.5-4.5 2.5Z" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13a2.5 2.5 0 0 1 5 0v3" />
        </svg>
      );
  }
}
