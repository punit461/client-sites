"use client";

import Image from "next/image";
import { Container, Icon, Label, Reveal, Stars } from "@/components/ui";
import { avatar, img } from "@/lib/images";
import { property } from "@/data/stay";

/** Magazine-style: a large plate, a tilted polaroid over it, and a host card. */
export default function Story() {
  return (
    <section id="story" className="py-24 sm:py-32">
      <Container wide>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-[32px] bg-cream-2">
                <Image
                  src={img.storyMain}
                  alt="The house from the garden"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>

              {/* a tilted polaroid over the corner */}
              <div className="absolute -bottom-6 -right-2 w-40 rotate-6 transition-transform duration-500 hover:rotate-0 sm:w-52 lg:-right-8">
                <div className="polaroid">
                  <div className="relative aspect-square overflow-hidden rounded-[2px]">
                    <Image src={img.storyInset} alt="Estate coffee" fill sizes="208px" className="object-cover" />
                  </div>
                  <p className="hand absolute bottom-3 left-0 right-0 text-center text-[1.05rem] text-brown-soft">
                    first harvest
                  </p>
                </div>
              </div>

              {/* since badge */}
              <span className="absolute -left-3 top-6 flex h-20 w-20 -rotate-12 flex-col items-center justify-center rounded-full bg-yellow text-brown sm:-left-6 sm:h-24 sm:w-24">
                <span className="hand text-[0.95rem] leading-none">since</span>
                <span className="font-display text-[1.4rem] font-bold leading-none">{property.since}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Label>Our story</Label>
            <h2 className="display-lg mt-5 max-w-lg text-brown">
              We came for a week in {property.since} and never left.
            </h2>

            <div className="mt-7 max-w-lg space-y-5 text-[1.02rem] leading-relaxed text-brown-soft">
              <p>
                Ravi was an architect in Bengaluru and Latha taught. They came up for a long weekend,
                found a falling-down estate bungalow, and did the obvious stupid thing.
              </p>
              <p>
                Seven years later there are four rooms, a cabin built out of a fallen tree, and a
                long table that seats eleven when everyone shows up for dinner.
              </p>
              <p>
                They still do most of it themselves, which is why check-in is a conversation rather
                than a form.
              </p>
            </div>

            {/* meet your host */}
            <div className="mt-9 max-w-md rounded-[26px] border border-line bg-surface p-5">
              <p className="label text-brown-faint">Meet your hosts</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <Image
                    src={avatar("ravi-host")}
                    alt=""
                    width={52}
                    height={52}
                    className="h-13 w-13 rounded-full border-2 border-surface object-cover"
                  />
                  <Image
                    src={avatar("latha-host")}
                    alt=""
                    width={52}
                    height={52}
                    className="h-13 w-13 rounded-full border-2 border-surface object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.98rem] font-bold text-brown">Ravi &amp; Latha</p>
                  <p className="text-[0.84rem] text-brown-faint">Hosts, cooks, occasional guides</p>
                </div>
                <span className="ml-auto flex-none text-right">
                  <Stars rating={5} />
                  <span className="mt-1 block text-[0.74rem] text-brown-faint">
                    {property.rating.count} reviews
                  </span>
                </span>
              </div>

              <p className="mt-4 flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-brown-soft">
                <Icon name="heart" className="mt-0.5 h-4 w-4 flex-none text-terracotta" />
                &ldquo;If you want a plan we will make you one. If you want to sit on the veranda for
                four days, that is also a plan.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
