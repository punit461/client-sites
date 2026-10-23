import Image from "next/image";
import { photos, photoUrl, type PhotoKey } from "@/lib/images";

/**
 * Every photograph on the site. Always fills a sized, positioned parent, so the
 * space is reserved before the image arrives and nothing shifts.
 *
 * `width` is the pixel width requested from the CDN — pick roughly the largest
 * size the slot is shown at (2x for retina is already generous at 70% quality).
 */
export function Photo({
  name,
  width = 1200,
  sizes = "100vw",
  priority = false,
  className = "object-cover",
  alt,
}: {
  name: PhotoKey;
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Override when the context needs a different description. */
  alt?: string;
}) {
  const photo = photos[name];
  return (
    <Image
      src={photoUrl(photo, width)}
      alt={alt ?? photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
