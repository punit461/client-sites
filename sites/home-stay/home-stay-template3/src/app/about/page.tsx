import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { Chronology, FinalCta } from "@/components/sections/Closing";
import Journey from "@/components/sections/Journey";
import { HouseNotes } from "@/components/sections/Prelude";
import Voices from "@/components/sections/Voices";
import { Container, Icon, Marker, Reveal } from "@/components/ui";
import { houseNotes, property } from "@/data/stay";
import { numeral } from "@/lib/format";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "The House",
  description: `Kayal House was built in ${property.built} by a coir merchant and has taken guests since ${property.since}. Thomas and Elsy live in the back wing.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="The house"
        title="Ninety years of it facing the water."
        copy={`Built in ${property.built}, empty for six of the years after that, and open to guests since ${property.since}. The family live in the back wing and have no plans to stop.`}
      />

      <Container wide className="pt-14">
        <Reveal>
          <div className="relative aspect-16/9 overflow-hidden rounded-sm bg-ink-2 sm:aspect-21/9">
            <Image
              src={img.houseMain}
              alt="Kayal House from the garden"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
          </div>
        </Reveal>
      </Container>

      <section className="py-20 sm:py-28">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Marker index={numeral(2)}>Who runs it</Marker>
              <h2 className="display-lg mt-6 text-bone">Thomas, Elsy and Nithin.</h2>
              <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-bone-soft">
                <p>
                  Thomas Varghese grew up two canals away and spent nineteen years in Dubai working
                  for a shipping line before he came back and bought this house from a cousin who was
                  about to sell it for the plot.
                </p>
                <p>
                  Elsy runs the kitchen and, by extension, the house. She has strong opinions about
                  how long a fish should be on the fire and none at all about what time you get up.
                  Their son Nithin takes the canoes out at six and knows where the birds are.
                </p>
                <p>
                  There are four other people who work here, all from the village along the canal,
                  and one dog called Pepper who believes the garden is hers. Between them the house
                  takes a maximum of thirteen guests, which is deliberate — more than that and it
                  stops being somebody&rsquo;s home.
                </p>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                {houseNotes.slice(0, 2).map((note) => (
                  <li key={note.title} className="rounded-sm border border-line bg-ink-2 p-5">
                    <Icon name={note.icon} className="h-5 w-5 text-brass" />
                    <h3 className="mt-4 font-display text-[1.2rem] text-bone">{note.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-bone-soft">{note.copy}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-ink-2">
                <Image
                  src={img.veranda}
                  alt="The veranda in the late afternoon"
                  fill
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
              </div>
              <p className="mono mt-4 text-[0.74rem] leading-relaxed text-bone-faint">
                The veranda, about four o&rsquo;clock. This is where most of a stay here actually
                happens.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container wide>
          <Marker index={numeral(3)}>The chronology</Marker>
          <h2 className="display-lg mt-6 max-w-2xl text-bone">What happened to the house.</h2>
          <div className="mt-12">
            <Chronology />
          </div>
        </Container>
      </section>

      <HouseNotes />
      <Voices index={numeral(4)} />
      <Journey index={numeral(5)} />
      <FinalCta />
    </>
  );
}
