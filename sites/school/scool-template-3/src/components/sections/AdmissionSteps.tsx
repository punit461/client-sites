import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { admissionSteps } from "@/content/admissions";

/** The numbered admission journey. A horizontal track on large screens, a vertical one below. */
export default function AdmissionSteps({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const onDark = tone === "dark";
  return (
    <Stagger as="ol" className="relative grid gap-0 lg:grid-cols-4 lg:gap-6">
      {admissionSteps.map((s, i) => (
        <StaggerItem as="li" key={s.title} className="relative flex gap-6 pb-10 last:pb-0 lg:block lg:pb-0">
          {/* The connecting rule: down the left on small screens, across the top on large. */}
          <span
            aria-hidden
            className={`absolute left-[1.35rem] top-12 bottom-0 w-px lg:left-14 lg:right-[-1.5rem] lg:top-[1.4rem] lg:bottom-auto lg:h-px lg:w-auto ${
              i === admissionSteps.length - 1 ? "hidden" : ""
            } ${onDark ? "bg-white/20" : "bg-line"}`}
          />
          <span
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-display text-[1.05rem] ${
              onDark ? "border-gold text-gold" : "border-gold-ink text-gold-ink"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-7">
            <h3 className={`t-h3 ${onDark ? "text-white" : ""}`}>{s.title}</h3>
            <p className={`mt-2 text-[0.94rem] ${onDark ? "text-white/70" : ""}`}>{s.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
