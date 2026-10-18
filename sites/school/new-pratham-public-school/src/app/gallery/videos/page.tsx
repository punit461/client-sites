import type { Metadata } from "next";
import GalleryTabs from "@/components/gallery/GalleryTabs";
import VideoGrid from "@/components/gallery/VideoGrid";
import { PageHero } from "@/components/ui/primitives";
import { school, videoChannelNote } from "@/data/school";
import { videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Video gallery",
  description: `${videos.length} videos from ${school.name} — Sports Day, Independence Day, Yoga Day, Farewell Day and more.`,
};

export default function VideosPage() {
  return (
    <>
      <PageHero crumb="Videos" eyebrow="Gallery" title="Celebrations and school days, on video." copy={videoChannelNote}>
        <GalleryTabs active="videos" />
      </PageHero>
      <VideoGrid />
    </>
  );
}
