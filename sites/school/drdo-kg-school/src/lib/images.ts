import type { Photo } from "@/content/types";

/**
 * Every photograph goes through `photoUrl`. The static export cannot resize
 * images (images.unoptimized), so remote photos are requested from the CDN at
 * the width they are shown, in AVIF/WebP where the browser supports it. Local
 * files in public/ get the base path, which next/image does not add itself.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function photoUrl(photo: Photo | string, width = 1200) {
  const src = typeof photo === "string" ? photo : photo.src;
  if (src.startsWith("/")) return asset(src);
  if (src.startsWith("http")) return src;
  return `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${width}&q=72`;
}

/**
 * The school's photographs, by subject, from its public Google Maps listing
 * where parents and visitors posted them. Before launch, get the school's
 * permission for each (or swap in their own), and families' consent for any
 * child who can be recognised.
 */
export const photos = {
  entrance: { src: "/images/entrance.jpg", alt: "Parents and children at the entrance porch under the DRDO KG School sign" },
  gate: { src: "/images/gate-signboard.jpg", alt: "The school gate under the blue DRDO Kindergarten School signboard, with palm trees behind" },
  courtyard: { src: "/images/courtyard.jpg", alt: "The wide paved courtyard, with classrooms around it and the covered stage at the far end" },
  corridor: { src: "/images/corridor.jpg", alt: "A bright tiled corridor with children's artwork on the walls and chairs for waiting parents" },
  annualDay: {
    src: "/images/annual-day.jpg",
    alt: "Children in white uniforms on the open-air stage at Annual Day, with teachers and a painted mural behind",
  },
  playground: { src: "/images/playground.jpg", alt: "The play area with slides, climbing towers and swings beside a green lawn" },
  playCourt: { src: "/images/play-court.jpg", alt: "A slide and swing under tall trees at the edge of a paved play court" },
  slideClimbingFrame: { src: "/images/slide-climbing-frame.jpg", alt: "Two children on an orange slide and climbing frame on the lawn" },
  slideGarden: { src: "/images/slide-garden.jpg", alt: "A smiling boy in school uniform climbing the ladder of a slide in the garden" },
  cycling: { src: "/images/cycling.jpg", alt: "A child riding a small red bicycle with training wheels" },
} satisfies Record<string, Photo>;
