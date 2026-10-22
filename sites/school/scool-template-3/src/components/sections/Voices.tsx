import { Quote } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviewThemes, testimonials } from "@/content/people";
import { contact, school } from "@/content/school";

/**
 * Section J. Shows approved testimonials when there are any; until then, what
 * the school's Google reviews say most often — never an invented quote.
 */
export default function Voices() {
  if (testimonials.length)
    return (
      <section aria-labelledby="voices-title" className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="In their words" title={<span id="voices-title">Families, students and alumni</span>} />
          <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem as="li" key={t.name}>
                <figure className="flex h-full flex-col border-t-2 border-gold bg-ivory p-8">
                  <Quote className="h-7 w-7 text-gold" aria-hidden />
                  <blockquote className="mt-4 flex-1 font-display text-[1.3rem] leading-snug text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold text-ink">{t.name}</span> · {t.relation}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    );

  return (
    <section aria-labelledby="voices-title" className="section-y bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="What families say"
            title={<span id="voices-title">Rated {school.rating.value} by families on Google.</span>}
            lead={`${school.rating.count} parents and former pupils have reviewed the school. These are the things they mention most.`}
          />
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex text-sm font-semibold text-navy underline decoration-gold-ink/40 underline-offset-4 hover:decoration-navy"
          >
            Read the reviews on Google
          </a>
        </div>
        <Stagger as="ol" className="grid gap-px overflow-hidden rounded-xs bg-line sm:grid-cols-2 lg:col-span-8">
          {reviewThemes.map((c, i) => (
            <StaggerItem as="li" key={c.title} className="bg-white p-8 sm:p-10">
              <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-6">{c.title}</h3>
              <p className="mt-3 text-[0.97rem]">{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
