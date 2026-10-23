import Image from "next/image";
import { photos, photoUrl, type PhotoKey } from "@/lib/images";

/**
 * Every photograph. Always fills a sized, positioned parent, so its space is
 * reserved before it loads and nothing shifts. `width` is what's requested
 * from the CDN — roughly the largest size the slot is shown at.
 */
export function Photo({
  name,
  width = 1200,
  sizes = "100vw",
  priority = false,
  className = "object-cover",
}: {
  name: PhotoKey;
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const photo = photos[name];
  return (
    <Image
      src={photoUrl(photo, width)}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
