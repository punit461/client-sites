import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/Closing";
import { SuiteMini } from "@/components/sections/SuiteRail";
import { Container, Icon, Marker, Reveal } from "@/components/ui";
import { findRoom, property, rooms } from "@/data/stay";
import { numeral, rupees } from "@/lib/format";

/** Every room is pre-rendered at build time — there is no server to render one. */
export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.blurb,
    openGraph: {
      title: `${room.name} · ${property.fullName}`,
      description: room.blurb,
      images: [room.images[0].src],
    },
  };
}

export default async function SuitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) notFound();

  const index = rooms.findIndex((r) => r.slug === room.slug) + 1;

  return (
    <>
      <section className="pb-12 pt-36 sm:pt-44">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mono mb-8 text-[0.74rem] text-bone-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/suites" className="transition-colors hover:text-bone">
                  Suites
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-bone">
                {room.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-2xl">
              <Marker index={numeral(index)}>{room.kicker}</Marker>
              <h1 className="display-xl mt-6 text-bone">{room.name}</h1>
              <p className="mt-6 max-w-xl text-[1.04rem] leading-relaxed text-bone-soft">{room.blurb}</p>
            </div>

            <div>
              <p className="font-display text-[2.6rem] leading-none text-bone">{rupees(room.rate)}</p>
              <p className="mono mt-2 text-[0.76rem] text-bone-faint">per night · all meals included</p>
              <Link
                href={`/booking?room=${room.slug}`}
                className="mt-5 inline-flex items-center gap-2.5 rounded-sm bg-brass px-7 py-3.5 text-[0.88rem] font-medium text-ink transition-colors hover:bg-brass-deep"
              >
                Check these dates
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container wide>
        <div className="grid gap-3 sm:grid-cols-[1.45fr_1fr]">
          {room.images.map((image, i) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-sm bg-ink-2 ${
                i === 0
                  ? "aspect-4/3 sm:row-span-2 sm:aspect-auto sm:min-h-[28rem]"
                  : "aspect-4/3"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(max-width: 640px) 92vw, 56vw" : "(max-width: 640px) 92vw, 37vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      <section className="py-20 sm:py-28">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <div className="space-y-5">
                {room.description.map((paragraph) => (
                  <Reveal key={paragraph}>
                    <p className="max-w-2xl text-[1.04rem] leading-relaxed text-bone-soft">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <h2 className="display-md mt-14 text-bone">What is in the room</h2>
                <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 border-b border-line pb-3 text-[0.93rem] text-bone-soft"
                    >
                      <Icon name="check" className="h-4 w-4 flex-none text-brass" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="mono overflow-hidden rounded-sm border border-line bg-ink-2 text-[0.84rem]">
                {[
                  ["users", "Sleeps", `${room.guests} guests`],
                  ["bed", "Bed", room.bed],
                  ["maximize", "Size", room.size],
                  ["waves", "View", room.view],
                  ["compass", "Where", room.floor],
                ].map(([icon, term, value]) => (
                  <div key={term} className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0">
                    <dt className="flex items-center gap-2.5 text-bone-faint">
                      <Icon name={icon as "users"} className="h-4 w-4 text-brass" />
                      {term}
                    </dt>
                    <dd className="ml-auto text-right text-bone">{value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/booking?room=${room.slug}`}
                className="mt-4 block rounded-sm bg-brass px-6 py-4 text-center text-[0.9rem] font-medium text-ink transition-colors hover:bg-brass-deep"
              >
                Enquire about {room.name}
              </Link>
              <p className="mono mt-3 text-center text-[0.72rem] text-bone-faint">
                A person replies within a day
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container wide>
          <h2 className="display-md text-bone">The other rooms</h2>
          <div className="mt-10">
            <SuiteMini slug={room.slug} />
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
