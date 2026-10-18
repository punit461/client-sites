import type { Metadata } from "next";
import GalleryTabs from "@/components/gallery/GalleryTabs";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import { PageHero } from "@/components/ui/primitives";
import { school } from "@/data/school";
import { albums, allGalleryImages } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Photo gallery",
  description: `${allGalleryImages.length} photographs from ${albums.length} albums of life at ${school.name} — celebrations, trips, activities and assemblies.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Gallery"
        title="School life, album by album."
        copy={`${albums.length} albums the school has published — from Annual Day and Investiture to field trips, clay modelling and Kannada Rajyotsava. Click any photo to view it full size.`}
      >
        <GalleryTabs active="photos" />
      </PageHero>
      <PhotoGallery />
    </>
  );
}
