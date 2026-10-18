import Image from "next/image";
import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { gallery } from "@/data/content";
import { brand } from "@/data/site";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-24">
      <Container>
        <SectionHeading align="center" eyebrow="Gallery" title={`Life at ${brand.name}`} />

        <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {gallery.map((photo) => (
            <StaggerItem as="li" key={photo.caption}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-3 pb-2.5 pt-8 text-[0.85rem] font-bold text-white sm:px-4 sm:text-[0.95rem]">
                  {photo.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
