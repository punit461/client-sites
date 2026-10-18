import type { Metadata } from "next";
import NoticeBoard from "@/components/sections/NoticeBoard";
import { PageHero } from "@/components/ui/primitives";
import { school } from "@/data/school";

export const metadata: Metadata = {
  title: "Notice board",
  description: `Notices and circulars from ${school.name}.`,
};

export default function NoticesPage() {
  return (
    <>
      <PageHero
        crumb="Notice board"
        eyebrow="Notice board"
        title="Notices and circulars"
        copy="Announcements from the school office, newest first."
      />
      <NoticeBoard />
    </>
  );
}
