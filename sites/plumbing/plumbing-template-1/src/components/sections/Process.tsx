import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Tell us about the problem",
    body: "Call or send a quote request with what is happening, where, and how urgent it feels. Photos help.",
    icon: "message",
  },
  {
    title: "Arrange a service visit",
    body: "We get back to you to talk it through and agree a visit time with you. Your appointment is confirmed only when we confirm it directly.",
    icon: "calendar",
  },
  {
    title: "Assessment and estimate",
    body: "We find the cause, explain what we found and what we recommend, and give you the price upfront.",
    icon: "file",
  },
  {
    title: "Approve, and we get to work",
    body: "Nothing starts until you say yes. We complete the work, test it, and leave the area clean.",
    icon: "check",
  },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="Four clear steps, no surprises."
          lead={
            <>
              A quote request starts a conversation — it is <strong className="font-semibold text-navy">not</strong> a
              booked appointment. We always confirm visit times with you personally.
            </>
          }
        />

        <Stagger as="ol" className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* The connecting line between step markers on wide screens. */}
          <span aria-hidden="true" className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-line lg:block" />
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="relative flex gap-5 lg:block">
              <div className="relative z-10 flex shrink-0 items-center gap-3 lg:justify-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-navy bg-ivory font-display font-bold text-navy">
                  {i + 1}
                </span>
              </div>
              <div className="lg:mt-6 lg:text-center">
                <Icon name={s.icon} className="hidden h-6 w-6 text-copper-ink lg:mx-auto lg:block" />
                <h3 className="t-h3 text-navy lg:mt-4">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate lg:mx-auto lg:max-w-[16rem]">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
