import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container, Icon, Label, Reveal } from "@/components/ui";
import { ACCENT } from "@/lib/accents";
import { rupees } from "@/lib/format";
import { findRoom, property, rooms } from "@/data/stay";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
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

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) notFound();

  const accent = ACCENT[room.accent];
  const others = rooms.filter((r) => r.slug !== room.slug);

  return (
    <>
      <section className="pb-10 pt-14 sm:pt-20">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mb-7 text-[0.82rem] text-brown-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brown">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/stay" className="hover:text-brown">
                  Stay
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-brown">
                {room.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Label>{room.tagline}</Label>
              <h1 className="display-xl mt-4 text-brown">{room.name}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-brown-soft">
                {room.blurb}
              </p>
            </div>

            <div>
              <p className="font-display text-[2.4rem] font-bold leading-none text-brown">
                {rupees(room.rate)}
              </p>
              <p className="mt-1 text-[0.84rem] text-brown-faint">per night, all meals included</p>
              <Link
                href={`/booking?room=${room.slug}`}
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.9rem] font-semibold text-cream transition hover:opacity-90 ${accent.bg}`}
              >
                Check these dates
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container wide>
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          {room.images.map((image, i) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-[28px] bg-cream-2 ${
                i === 0 ? "aspect-4/3 sm:row-span-2 sm:aspect-auto sm:min-h-[26rem]" : "aspect-4/3"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(max-width: 640px) 92vw, 54vw" : "(max-width: 640px) 92vw, 38vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      <section className="py-16 sm:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-6">
              {room.description.map((paragraph) => (
                <Reveal key={paragraph}>
                  <p className="max-w-2xl text-[1.05rem] leading-relaxed text-brown-soft">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <h2 className="display-md mt-10 text-brown">What is in it</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-[0.86rem] text-brown-soft"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="divide-y divide-line overflow-hidden rounded-[26px] border border-line bg-surface">
                {[
                  ["users", "Sleeps", `${room.guests} guests`],
                  ["bed", "Bed", room.bed],
                  ["maximize", "Size", room.size],
                ].map(([icon, term, value]) => (
                  <div key={term} className="flex items-center gap-4 px-5 py-4">
                    <dt className="flex items-center gap-2.5 text-[0.84rem] text-brown-faint">
                      <Icon name={icon as "users"} className="h-4 w-4 text-terracotta" />
                      {term}
                    </dt>
                    <dd className="ml-auto text-right text-[0.9rem] font-medium text-brown">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/booking?room=${room.slug}`}
                className={`mt-4 block rounded-full px-6 py-4 text-center text-[0.92rem] font-semibold text-cream transition hover:opacity-90 ${accent.bg}`}
              >
                Enquire about {room.name}
              </Link>
              <p className="hand mt-3 text-center text-[1.15rem] text-brown-faint">
                we reply within a day
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container wide>
          <h2 className="display-md text-brown">The other rooms</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3 [&>*]:min-w-0">
            {others.map((other) => (
              <Link key={other.slug} href={`/stay/${other.slug}`} className="group block min-w-0">
                <div className="relative aspect-4/3 overflow-hidden rounded-[24px] bg-cream-2">
                  <Image
                    src={other.images[0].src}
                    alt={other.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 92vw, 31vw"
                    className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] font-bold tracking-tight text-brown">
                  {other.name}
                </h3>
                <p className="mt-1 text-[0.86rem] text-brown-faint">
                  {rupees(other.rate)} / night · sleeps {other.guests}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
