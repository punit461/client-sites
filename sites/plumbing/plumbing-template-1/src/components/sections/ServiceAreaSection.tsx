import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { areas } from "@/content/areas";

/**
 * An illustration, not a map: areas sit on rings around the centre in list
 * order. It makes no claim about geography or about an office location — the
 * centre is deliberately unlabelled.
 */
function CoverageDiagram() {
  const cx = 200;
  const cy = 200;
  const points = areas.map((a, i) => {
    const ring = i % 2 === 0 ? 112 : 160;
    const angle = (i / areas.length) * Math.PI * 2 - Math.PI / 2 + 0.35;
    return { name: a.name, x: cx + Math.cos(angle) * ring, y: cy + Math.sin(angle) * ring };
  });

  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-label={`Illustration of the areas we cover: ${areas.map((a) => a.name).join(", ")}`}>
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="#101D32" opacity="0.12" />
        </pattern>
      </defs>
      <circle cx={cx} cy={cy} r="190" fill="url(#dots)" />
      {[60, 112, 160].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#101D32" strokeOpacity="0.14" strokeDasharray="3 5" />
      ))}
      <circle cx={cx} cy={cy} r="18" fill="#101D32" />
      <path d="M195 207v-6a4 4 0 0 1 4-4h6" stroke="#C87948" strokeWidth="2" fill="none" strokeLinecap="round" />
      {points.map((p) => (
        <g key={p.name}>
          <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#C87948" strokeOpacity="0.35" />
          <circle cx={p.x} cy={p.y} r="7" fill="#F5F3EE" stroke="#C87948" strokeWidth="2" />
          <text
            x={p.x}
            y={p.y + (p.y > cy ? 24 : -14)}
            textAnchor="middle"
            className="fill-navy font-sans text-[13px] font-semibold"
          >
            {p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ServiceAreaSection() {
  return (
    <section aria-labelledby="areas-title" className="section-y bg-ivory-2/60">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="areas-title"
            eyebrow="Service area"
            title="Where we work."
            lead="We cover the areas below. If you are close by but not listed, ask — we will tell you honestly whether we can reach you."
          />
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link
                  href={`/service-areas/${a.slug}/`}
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 font-display font-semibold text-navy"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="pin" className="h-4 w-4 text-copper-ink" />
                    <span className="link-underline">{a.name}</span>
                  </span>
                  <span className="text-sm font-normal text-slate">{a.postalCodes.join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/service-areas/" variant="outline">
              About our service area
            </ButtonLink>
          </div>
        </div>
        <Reveal className="mx-auto w-full max-w-md lg:col-span-6 lg:max-w-lg">
          <CoverageDiagram />
        </Reveal>
      </div>
    </section>
  );
}
