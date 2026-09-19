import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoomGallery from "@/components/sections/RoomGallery";
import { Container, Icon, Label, Reveal } from "@/components/ui";
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

  const others = rooms.filter((r) => r.slug !== room.slug);

  return (
    <>
      <section className="pb-14 pt-32 sm:pt-36">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.82rem] text-charcoal-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-charcoal">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/rooms" className="hover:text-charcoal">
                  Rooms
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-charcoal">
                {room.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Label>Rooms</Label>
              <h1 className="display-xl mt-5 text-charcoal">{room.name}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal-soft">
                {room.blurb}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-display text-[2.2rem] leading-none text-charcoal">
                {rupees(room.rate)}
              </p>
              <p className="mt-1 text-[0.84rem] text-charcoal-faint">per night, all meals included</p>
              <Link
                href={`/booking?room=${room.slug}`}
                className="mt-4 inline-flex rounded-full bg-forest px-7 py-3.5 text-[0.88rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep"
              >
                Check availability
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container wide>
        <RoomGallery images={room.images} name={room.name} />
      </Container>

      <section className="py-16 sm:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-6">
              {room.description.map((paragraph) => (
                <Reveal key={paragraph}>
                  <p className="max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <h2 className="display-md mt-10 text-charcoal">In this room</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-3 text-[0.95rem] text-charcoal-soft">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-olive" aria-hidden />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-surface">
                {[
                  ["users", "Sleeps", `${room.guests} guests`],
                  ["bed", "Bed", room.bed],
                  ["maximize", "Size", room.size],
                  ["eye", "View", room.view],
                ].map(([icon, term, value]) => (
                  <div key={term} className="flex items-center gap-4 px-5 py-4">
                    <dt className="flex items-center gap-2.5 text-[0.84rem] text-charcoal-faint">
                      <Icon name={icon as "users"} className="h-4 w-4 text-olive" />
                      {term}
                    </dt>
                    <dd className="ml-auto text-right text-[0.9rem] text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/booking?room=${room.slug}`}
                className="mt-4 block rounded-full bg-forest px-6 py-4 text-center text-[0.9rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep"
              >
                Enquire about this room
              </Link>
              <p className="mt-3 text-center text-[0.78rem] text-charcoal-faint">
                We reply to every enquiry within a day.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container wide>
          <h2 className="display-md text-charcoal">Other rooms</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {others.map((other) => (
              <Link key={other.slug} href={`/rooms/${other.slug}`} className="group block min-w-0">
                <div className="relative aspect-4/3 overflow-hidden rounded-[22px] bg-ivory-2">
                  <Image
                    src={other.images[0].src}
                    alt={other.images[0].alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-[1.35rem] text-charcoal">{other.name}</h3>
                <p className="mt-1 text-[0.86rem] text-charcoal-faint">
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
