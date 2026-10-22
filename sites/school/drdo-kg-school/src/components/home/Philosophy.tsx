import { Quote } from "lucide-react";
import ClipReveal from "@/components/motion/ClipReveal";
import Reveal from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import Img from "@/components/ui/Img";
import SectionHeading from "@/components/ui/SectionHeading";
import { philosophy, trust } from "@/content/campus";
import { school } from "@/content/school";
import { photos } from "@/lib/images";

/** Section C — split editorial layout: photograph left, philosophy and who runs the school right. */
export default function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="section-y bg-ivory">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ClipReveal className="relative aspect-[4/5] overflow-hidden rounded-xs">
              <Img photo={photos.gate} width={560} sizes="(min-width: 1024px) 38vw, 100vw" className="object-top" />
            </ClipReveal>
            <Reveal delay={0.2} className="relative -mt-16 ml-auto mr-0 w-[85%] bg-navy p-7 text-white sm:mr-[-1.5rem] lg:mr-[-3rem]">
              <p className="eyebrow text-gold">Our vision</p>
              <p className="mt-3 font-display text-[1.35rem] leading-snug">{philosophy.vision}</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading
            eyebrow="About our school"
            title={
              <span id="philosophy-title">
                A warm, safe <em className="text-blue">first school</em> for little ones.
              </span>
            }
            lead={philosophy.intro}
          />

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="eyebrow text-gold-ink">Our mission</h3>
              <p className="mt-3">{philosophy.mission}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="eyebrow text-gold-ink">Our approach to learning</h3>
              <p className="mt-3">{philosophy.approach}</p>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <h3 className="eyebrow text-gold-ink">Our values</h3>
            <ul className="mt-5 grid border-t border-line sm:grid-cols-2">
              {philosophy.values.map((v, i) => (
                <li key={v.title} className="flex gap-5 border-b border-line py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <span className="font-display text-lg text-gold-ink">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-xl text-ink">{v.title}</span>
                    <span className="mt-1 block text-[0.94rem]">{v.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14 border-l-2 border-gold pl-6 sm:pl-8">
            <h3 id="trust-title" className="eyebrow text-gold-ink">
              {trust.title}
            </h3>
            <figure className="mt-4">
              <Quote className="h-7 w-7 text-gold" aria-hidden />
              <blockquote className="mt-3 font-display text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] leading-snug text-ink">{school.motto}.</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-ink">The school&apos;s motto</span> · on the seal of the {school.trust}
              </figcaption>
            </figure>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <TextLink href="/about/">More about the school</TextLink>
              <TextLink href="/admissions/">How admission works</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
