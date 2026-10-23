import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { areas } from "@/content/areas";
import { AreaChecker } from "./AreaChecker";

/**
 * An illustration, not a map: the areas sit along a flowing line in list
 * order. It makes no claim about geography or where the company is based.
 */
function FlowIllustration() {
  const n = areas.length;
  const points = areas.map((a, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const x = 40 + t * 520;
    const y = 120 + Math.sin(t * Math.PI * 2) * 55;
    return { ...a, x, y };
  });
  // Label on the side away from the curve: below a valley, above a peak or slope.
  const below = (i: number) => {
    const prev = points[i - 1]?.y ?? points[i].y;
    const next = points[i + 1]?.y ?? points[i].y;
    return points[i].y >= (prev + next) / 2;
  };
  const d = `M10 120 ${points.map((p) => `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} L590 120`;
  return (
    <svg
      viewBox="0 0 600 240"
      className="h-auto w-full"
      role="img"
      aria-label={`Illustration of the areas we serve: ${areas.map((a) => a.name).join(", ")}`}
    >
      <path d={d} fill="none" stroke="#C5D6C9" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#164E4A" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      {points.map((p, i) => (
        <g key={p.slug}>
          <circle cx={p.x} cy={p.y} r="9" fill={p.coverage === "covered" ? "#164E4A" : "#FFFFFF"} stroke="#164E4A" strokeWidth="2.5" />
          <text
            x={p.x}
            y={below(i) ? p.y + 34 : p.y - 22}
            textAnchor="middle"
            stroke="#F3EBDD"
            strokeWidth="6"
            strokeLinejoin="round"
            paintOrder="stroke"
            className="fill-teal font-sans text-[15px] font-semibold"
          >
            {p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ServiceArea({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="area-title" className="section-y bg-sage">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              as={headingLevel}
              id="area-title"
              eyebrow="Service area"
              title="Where we work."
              lead={`${business.address ? "" : "We come to you — there's no walk-in office. "}Check your postal code, or choose your area for details.`}
            />
            <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
              {areas.map((a) => (
                <li key={a.slug} className="border-b border-sage-deep">
                  <Link href={`/service-areas/${a.slug}/`} className="group flex min-h-13 items-center justify-between gap-3 py-3 font-display font-semibold text-teal">
                    <span className="flex items-center gap-2.5">
                      <Icon name="pin" className="h-4 w-4 text-clay" strokeWidth={1.7} />
                      <span className="underline-draw">{a.name}</span>
                    </span>
                    <span className="text-xs font-medium text-stone">{a.coverage === "covered" ? a.postalCodes.join(", ") : "By arrangement"}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-stone">
              Not sure if we reach you?{" "}
              <a href={telHref} className="font-semibold text-teal underline underline-offset-4">
                Call {business.phone.display}
              </a>{" "}
              and ask.
            </p>
          </div>
          <div className="space-y-6 lg:col-span-7">
            <Reveal className="rounded-[var(--radius-photo)] bg-sand p-4 sm:p-6">
              <FlowIllustration />
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal" /> Covered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-teal bg-white" /> By arrangement
                </span>
              </p>
            </Reveal>
            <AreaChecker />
          </div>
        </div>
      </div>
    </section>
  );
}
