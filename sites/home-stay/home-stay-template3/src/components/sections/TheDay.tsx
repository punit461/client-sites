"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Icon, Marker, Reveal, Stagger, staggerItem } from "@/components/ui";
import { kitchenNotes, theDay } from "@/data/stay";
import { numeral } from "@/lib/format";

/**
 * A day at the house as a timeline rather than a menu, because what a guest is
 * actually buying is the shape of the day. `detailed` adds a photograph per
 * sitting and the kitchen's notes; the home page uses the plain version.
 */
export default function TheDay({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="table" className={detailed ? "" : "border-y border-line bg-ink-2 py-24 sm:py-32"}>
      <Container wide>
        {detailed ? null : (
          <div className="max-w-xl">
            <Marker index={numeral(3)}>The table</Marker>
            <h2 className="display-lg mt-6 text-bone">
              Five times a day, whether you asked or not.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-bone-soft">
              Every meal is in the rate and all of it is cooked in the house. Elsy decides the menu
              after the boat comes in, so this is the shape of a day rather than a promise about a
              particular fish.
            </p>
          </div>
        )}

        <Stagger className="mt-14" as="ol">
          {theDay.map((sitting, i) => (
            <motion.li
              key={sitting.time}
              variants={staggerItem}
              className="group relative grid gap-5 border-t border-line py-8 last:border-b sm:grid-cols-[6rem_1fr] sm:gap-8 lg:grid-cols-[6rem_1fr_auto]"
            >
              <div className="flex items-start gap-3 sm:block">
                <p className="mono text-[1.05rem] text-brass">{sitting.time}</p>
                <p className="mono mt-0 text-[0.7rem] text-bone-faint sm:mt-2">{numeral(i + 1)}</p>
              </div>

              <div className="min-w-0">
                <h3 className="flex items-center gap-3 font-display text-[1.5rem] text-bone">
                  <Icon name={sitting.icon} className="h-5 w-5 flex-none text-bone-faint" />
                  {sitting.name}
                </h3>
                <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-bone-soft">
                  {sitting.copy}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {sitting.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-ink px-3 py-1.5 text-[0.78rem] text-bone-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {detailed ? (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-ink-2 lg:aspect-auto lg:h-36 lg:w-56">
                  <Image
                    src={sitting.image}
                    alt={sitting.name}
                    fill
                    sizes="(max-width: 1024px) 92vw, 14rem"
                    className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                  />
                </div>
              ) : null}
            </motion.li>
          ))}
        </Stagger>

        {detailed ? (
          <Reveal className="mt-14">
            <h2 className="display-md text-bone">What the kitchen wants you to know</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {kitchenNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3.5 rounded-sm border border-line bg-ink-2 p-5 text-[0.93rem] leading-relaxed text-bone-soft"
                >
                  <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brass" />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
