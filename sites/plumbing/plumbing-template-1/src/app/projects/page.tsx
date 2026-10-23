import { FinalCta } from "@/components/sections/FinalCta";
import { GalleryFilter } from "@/components/sections/GalleryFilter";
import { PageHero } from "@/components/templates/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, galleryCategories } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Bathroom remodels, fixture repairs, drain lines and underground line replacement — photos of our own work around Fort Worth.",
  path: "/projects/",
  photo: "showerPanRoughIn",
});

export default function ProjectsPage() {
  const caseStudies = gallery.filter((g) => g.caseStudy);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Work", href: "/projects/" }]}
        eyebrow="Our work"
        title="Repairs, installations and the work behind the walls."
        lead="Browse by type of work. Each photo links to the service it shows, so you can read how we handle that kind of job."
      />

      <section aria-labelledby="gallery-title" className="section-y">
        <div className="shell">
          <h2 id="gallery-title" className="sr-only">
            Gallery
          </h2>
          <GalleryFilter items={gallery} categories={galleryCategories} />
          <p className="mt-8 max-w-2xl text-sm text-slate">
            {gallery.some((g) => g.stock)
              ? "Some photographs show representative plumbing work and are not specific customer projects."
              : "Photographs of our own work, from our Google Business Profile."}{" "}
            Detailed case studies are published only for real jobs, with the customer&apos;s agreement.
          </p>
        </div>
      </section>

      {caseStudies.length ? (
        <section aria-labelledby="cases-title" className="section-y bg-white">
          <div className="shell">
            <SectionHeading id="cases-title" eyebrow="Case studies" title="Selected jobs, start to finish." />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {caseStudies.map((g) => (
                <article key={g.title} className="rounded-2xl border border-line bg-ivory p-7">
                  <h3 className="t-h3 text-navy">{g.title}</h3>
                  <dl className="mt-5 space-y-4 text-[0.95rem]">
                    {(["problem", "work", "outcome"] as const).map((k) => (
                      <div key={k}>
                        <dt className="t-eyebrow text-copper-ink">{k === "work" ? "Work carried out" : k}</dt>
                        <dd className="mt-1 text-slate">{g.caseStudy?.[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta title="Have a job like these in mind?" />
    </>
  );
}
