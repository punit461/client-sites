import { Camera, Play } from "lucide-react";
import Link from "next/link";
import { videos } from "@/data/videos";
import { allGalleryImages } from "@/lib/assets";

/** Photos / Videos switch shown under the gallery page banners. */
export default function GalleryTabs({ active }: { active: "photos" | "videos" }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.88rem] font-semibold transition";
  const on = "bg-ink text-cream";
  const off = "border border-line bg-surface text-ink hover:bg-surface-2";
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      <Link href="/gallery" aria-current={active === "photos" ? "page" : undefined} className={`${base} ${active === "photos" ? on : off}`}>
        <Camera className="h-4 w-4" strokeWidth={1.9} aria-hidden />
        Photos · {allGalleryImages.length}
      </Link>
      <Link href="/gallery/videos" aria-current={active === "videos" ? "page" : undefined} className={`${base} ${active === "videos" ? on : off}`}>
        <Play className="h-4 w-4" strokeWidth={1.9} aria-hidden />
        Videos · {videos.length}
      </Link>
    </div>
  );
}
