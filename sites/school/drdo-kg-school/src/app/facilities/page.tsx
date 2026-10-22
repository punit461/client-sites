import { Check } from "lucide-react";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import FacilityCollage from "@/components/sections/FacilityCollage";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { facilities } from "@/content/campus";
import { contact, school } from "@/content/school";
import { icons } from "@/lib/icons";
import { photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Campus",
  description: `Play areas, the open-air stage, courtyard and classrooms at ${school.name}, a green, gated kindergarten campus in C V Raman Nagar.`,
  path: "/facilities/",
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our campus"
        title={
          <>
            Room to run, play <em className="text-gold">and grow.</em>
          </>
        }
        lead="A green, gated campus with play areas among the trees, a wide courtyard, an open-air stage and bright classrooms along shaded corridors."
        crumbs={[{ name: "Campus", href: "/facilities/" }]}
        photo={photos.gate}
      />

      <section aria-labelledby="tour-title" className="section-y bg-ivory">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Around the campus" title={<span id="tour-title">A short tour.</span>} />
          </div>
          <div className="mt-14">
            <FacilityCollage />
          </div>
        </div>
      </section>

      <section aria-labelledby="detail-title" className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="In detail" title={<span id="detail-title">What each space offers.</span>} />
          <Stagger as="ul" className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => {
              const Icon = f.icon ? icons[f.icon] : null;
              return (
                <StaggerItem as="li" key={f.slug} className="border-t border-navy pt-6">
                  <h3 className="t-h3 flex items-center gap-3">
                    {Icon ? <Icon className="h-5 w-5 text-gold-ink" aria-hidden /> : null}
                    {f.name}
                  </h3>
                  {f.details ? (
                    <ul className="mt-5 space-y-2.5 text-[0.94rem]">
                      {f.details.map((d) => (
                        <li key={d} className="flex gap-2.5">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-gold-ink" aria-hidden />
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[0.94rem]">{f.text}</p>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mt-16 max-w-3xl border-l-2 border-gold bg-ivory p-7">
            <h3 className="eyebrow text-gold-ink">Come and look around</h3>
            <p className="mt-3">
              The best way to see the campus is in person. Visit on any weekday between 8 am and 3 pm; a quick call to the office on{" "}
              <a href={contact.phoneHref} className="font-semibold text-navy underline underline-offset-4">
                {contact.phone}
              </a>{" "}
              first helps them make time for you.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="See the play areas for yourself." />
    </>
  );
}
