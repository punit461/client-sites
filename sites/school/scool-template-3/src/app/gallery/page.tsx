import Gallery from "@/components/sections/Gallery";
import PageHero from "@/components/ui/PageHero";
import { school } from "@/content/school";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: `Photographs of the campus, play areas and Annual Day at ${school.name}, C V Raman Nagar, Bengaluru.`,
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The school in pictures."
        lead="The campus, the play areas and Annual Day on the stage. Choose a category, then select any photograph to see it larger."
        crumbs={[
          { name: "Activities", href: "/student-life/" },
          { name: "Gallery", href: "/gallery/" },
        ]}
      />
      <section aria-label="Photographs" className="section-y bg-ivory">
        <div className="container-x">
          <Gallery />
        </div>
      </section>
    </>
  );
}
