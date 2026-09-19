"use client";

import Image from "next/image";
import { Container, Icon, Label, Reveal, Stars } from "@/components/ui";
import { journal, menu, seasons, stories } from "@/data/stay";

/** ---------------------------------------------------------- food */
export function Food() {
  return (
    <section className="py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <Label>The food</Label>
            <h2 className="display-lg mt-5 text-brown">
              Made local. <span className="hand text-terracotta">Served fresh.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-brown-soft">
              Three meals a day, cooked by Latha, mostly from the garden and the weekly market in
              Madikeri. If you do not eat something, say so when you book and it simply will not
              appear.
            </p>

            <dl className="mt-9 space-y-6">
              {menu.map((course) => (
                <div key={course.course} className="border-t border-line pt-5">
                  <dt className="flex items-center gap-2.5 text-[0.95rem] font-bold text-brown">
                    <Icon name={course.icon} className="h-4.5 w-4.5 text-terracotta" />
                    {course.course}
                  </dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-brown-soft">
                    {course.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-16/10 overflow-hidden rounded-[28px] bg-cream-2">
                <Image
                  src={menu[0].image}
                  alt="Breakfast on the veranda"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[24px] bg-cream-2">
                <Image
                  src={menu[2].image}
                  alt="Dinner at the long table"
                  fill
                  sizes="(max-width: 1024px) 46vw, 23vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[24px] bg-cream-2">
                <Image
                  src={menu[3].image}
                  alt="Estate coffee"
                  fill
                  sizes="(max-width: 1024px) 46vw, 23vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- stories */
export function GuestStories() {
  return (
    <section className="bg-cream-2/50 py-24 sm:py-32">
      <Container wide>
        <div className="max-w-xl">
          <Label>Guest stories</Label>
          <h2 className="display-lg mt-5 text-brown">Postcards, basically.</h2>
        </div>

        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {stories.map((story, i) => (
            <Reveal
              key={story.name}
              delay={i * 0.08}
              className="w-[84vw] flex-none snap-start sm:w-[24rem] lg:w-auto"
            >
              {/* A travel-journal card: taped photo, handwritten date, quote. */}
              <article className="relative h-full rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <span
                  className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-[2px] bg-yellow/45"
                  aria-hidden
                />

                <div className="flex items-center gap-3.5">
                  <Image
                    src={story.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-none rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.98rem] font-bold text-brown">{story.name}</p>
                    <p className="truncate text-[0.8rem] text-brown-faint">{story.from}</p>
                  </div>
                  <span className="hand ml-auto flex-none text-[1.05rem] text-terracotta">
                    {story.date}
                  </span>
                </div>

                <Stars rating={story.rating} className="mt-5" />

                <blockquote className="mt-3 text-[1rem] leading-relaxed text-brown-soft">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <p className="mt-5 border-t border-line pt-4 text-[0.8rem] text-brown-faint">
                  {story.stay}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-[0.78rem] text-brown-faint">
          Illustrative stories. Replace with the property&rsquo;s own before launch.
        </p>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- photo journal */
export function PhotoJournal() {
  return (
    <section id="gallery" className="py-24 sm:py-32">
      <Container wide>
        <div className="max-w-xl">
          <Label>Photo journal</Label>
          <h2 className="display-lg mt-5 text-brown">Bits and pieces.</h2>
        </div>

        {/* CSS columns give a true masonry flow without measuring anything. */}
        <div className="mt-14 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {journal.map((item, i) => {
            if (item.kind === "quote") {
              return (
                <div
                  key={i}
                  className="break-inside-avoid rounded-[24px] bg-terracotta p-7 text-cream"
                >
                  <p className="hand text-[1.6rem] leading-snug">{item.text}</p>
                </div>
              );
            }
            if (item.kind === "text") {
              return (
                <div
                  key={i}
                  className="break-inside-avoid rounded-[24px] border border-line bg-surface p-7"
                >
                  <p className="text-[1rem] leading-relaxed text-brown-soft">{item.text}</p>
                </div>
              );
            }
            if (item.kind === "polaroid") {
              return (
                <div key={i} className="break-inside-avoid">
                  <div className="polaroid rotate-2 hover:rotate-0">
                    <div className="relative aspect-square overflow-hidden rounded-[2px]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 46vw, 31vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="hand absolute bottom-3 left-0 right-0 text-center text-[1.1rem] text-brown-soft">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <figure key={i} className="group break-inside-avoid overflow-hidden rounded-[22px]">
                <div
                  className={`relative overflow-hidden bg-cream-2 ${item.tall ? "aspect-3/4" : "aspect-4/3"}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 46vw, 31vw"
                    className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                  />
                </div>
                {item.caption ? (
                  <figcaption className="hand mt-2 text-[1.05rem] text-brown-faint">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- seasons */
export function Seasons() {
  return (
    <section className="bg-cream-2/50 py-24 sm:py-32">
      <Container wide>
        <div className="max-w-xl">
          <Label>Through the year</Label>
          <h2 className="display-lg mt-5 text-brown">
            Every season is <span className="hand text-terracotta">a different place</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
          {seasons.map((season, i) => (
            <Reveal key={season.name} delay={i * 0.07}>
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-line bg-surface">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={season.image}
                    alt={season.name}
                    fill
                    sizes="(max-width: 1024px) 46vw, 23vw"
                    className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-terracotta backdrop-blur">
                    <Icon name={season.icon} className="h-4.5 w-4.5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.35rem] font-bold tracking-tight text-brown">
                    {season.name}
                  </h3>
                  <p className="mt-1 text-[0.8rem] text-brown-faint">{season.months}</p>
                  <p className="mt-3 text-[0.86rem] text-brown-soft">{season.weather}</p>

                  <ul className="mt-4 flex flex-1 flex-wrap gap-1.5">
                    {season.activities.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-cream-2 px-2.5 py-1 text-[0.74rem] text-brown-soft"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 border-t border-line pt-4 text-[0.82rem] text-brown-faint">
                    Pick of the season:{" "}
                    <span className="hand text-[1.05rem] text-terracotta">{season.pick}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
