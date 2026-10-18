import generated from "@/data/generated/images.json";

/**
 * Every image on the site is a local file under public/images, produced by
 * scripts/build-images.mjs from the originals in source/. Static export does
 * not prefix `basePath` onto a plain "/images/..." string, so every path goes
 * through asset() — that single line is what lets the same folder be served
 * under the dashboard's sub-path and at a client's domain root.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export type Picture = {
  src: string;
  width: number;
  height: number;
};

export type GalleryImage = Picture & {
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
};

export type Album = { title: string; slug: string; images: GalleryImage[] };

type Generated = {
  gallery: Album[];
  achievements: Record<string, Picture>;
  people: Record<string, Picture>;
  campus: Record<string, Picture>;
  videos: Record<string, Picture>;
};

const data = generated as Generated;

export const albums: Album[] = data.gallery;
export const achievementImage = (key: string): Picture | undefined => data.achievements[key];
export const personImage = (key: string): Picture | undefined => data.people[key];
export const campus = data.campus;
export const videoThumb = (id: string): Picture | undefined => data.videos[id];

/** Every gallery photo as a flat list, newest album first (the order the school published them). */
export const allGalleryImages = albums.flatMap((album) =>
  album.images.map((image) => ({ ...image, album: album.title, albumSlug: album.slug })),
);
