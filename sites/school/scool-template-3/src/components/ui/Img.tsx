import Image from "next/image";
import type { Photo } from "@/content/types";
import { photoUrl } from "@/lib/images";

/**
 * A photograph that fills its (relatively positioned) parent. `width` is the
 * widest it is ever shown, in CSS pixels; the CDN is asked for 1.5x that so it
 * stays sharp on high-density screens without shipping a 4K file to a phone.
 */
export default function Img({
  photo,
  width = 1000,
  sizes = "100vw",
  className = "",
  preload = false,
}: {
  photo: Photo;
  width?: number;
  sizes?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={photoUrl(photo, Math.round(width * 1.5))}
      alt={photo.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}
