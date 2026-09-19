import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Info } from "lucide-react";
import { Breadcrumbs, Container, Label } from "@/components/ui/primitives";
import { findResource, resources } from "@/data/content";
import { group } from "@/data/group";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.excerpt,
    openGraph: { title: `${resource.title} · ${group.fullName}`, images: [resource.image] },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) notFound();

  const more = resources.filter((r) => r.slug !== resource.slug).slice(0, 3);

  return (
    <article>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container narrow>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: resource.title },
            ]}
          />

          <Label>{resource.category}</Label>
          <h1 className="display-lg mt-4 text-ink">{resource.title}</h1>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{resource.excerpt}</p>

          <p className="mt-5 flex items-center gap-2 text-[0.84rem] text-ink-faint">
            <Clock className="h-4 w-4" strokeWidth={1.8} aria-hidden />
            {resource.readingTime}
          </p>
        </Container>
      </section>

      <Container narrow className="py-12 sm:py-16">
        <div className="relative aspect-16/9 overflow-hidden rounded-[22px] bg-surface-2">
          <Image
            src={resource.image}
            alt={resource.alt}
            fill
            priority
            sizes="(max-width: 880px) 92vw, 880px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-5">
          {resource.body.map((paragraph) => (
            <p key={paragraph} className="text-[1.05rem] leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        {/* The review status is stated on the page, not hidden in a data file. */}
        <div
          className={`mt-10 flex items-start gap-3 rounded-2xl border p-5 ${
            resource.clinicianReviewed
              ? "border-line bg-surface"
              : "border-dashed border-coral/45 bg-coral/[0.07]"
          }`}
        >
          <Info className="mt-0.5 h-4.5 w-4.5 flex-none text-forest" strokeWidth={1.8} aria-hidden />
          <p className="text-[0.86rem] leading-relaxed text-ink-soft">
            {resource.clinicianReviewed ? (
              <>
                <strong className="font-semibold text-ink">Clinically reviewed</strong> by{" "}
                {resource.reviewedBy}. General information only — it is not advice about your own
                situation.
              </>
            ) : (
              <>
                <strong className="font-semibold text-ink">Not yet clinically reviewed.</strong>{" "}
                This page is placeholder content awaiting review by a qualified clinician. It is
                general information, not advice about your own situation, and should not be
                published in this state.
              </>
            )}
          </p>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <h2 className="label text-forest">More resources</h2>
          <ul className="mt-4 space-y-3">
            {more.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/resources/${r.slug}`}
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="text-[1rem] font-semibold text-ink group-hover:text-coral-deep">
                    {r.title}
                  </span>
                  <span className="flex-none text-[0.78rem] text-ink-faint">{r.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
