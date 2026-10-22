import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/content/school";

/** The closing call to action on interior pages. */
export default function CtaBand({
  title = "Come and see the school for yourself.",
  text = `Visit on any weekday between 8 am and 3 pm, or call the office on ${contact.phone} to ask about seats in Nursery, LKG and UKG.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-ivory">
      <div className="container-x py-20 lg:py-28">
        <Reveal className="grid gap-10 border-t border-navy pt-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="t-h2">
              {title}
            </h2>
            <p className="t-lead mt-5 max-w-2xl">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink href="/admissions/#enquire">Make an Enquiry</ButtonLink>
            <ButtonLink href="/contact/#visit" variant="outline">
              Plan Your Visit
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
