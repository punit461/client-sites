import { photos } from "@/lib/images";
import type { GalleryCategory, GalleryImage } from "./types";

/**
 * The gallery, in display order. The school's own photographs only, with
 * families' consent for any child who can be identified.
 */

export const galleryCategories: GalleryCategory[] = ["Campus", "Play areas", "Celebrations", "Everyday"];

export const gallery: GalleryImage[] = [
  { ...photos.entrance, category: "Campus", caption: "The entrance porch at drop-off time", orientation: "landscape" },
  { ...photos.slideGarden, category: "Play areas", caption: "Up the ladder to the slide", orientation: "portrait" },
  { ...photos.annualDay, category: "Celebrations", caption: "Annual Day on the open-air stage", orientation: "landscape" },
  { ...photos.playground, category: "Play areas", caption: "Slides and climbing towers beside the lawn", orientation: "landscape" },
  { ...photos.gate, category: "Campus", caption: "The gate and the school's trilingual signboard", orientation: "portrait" },
  { ...photos.slideClimbingFrame, category: "Play areas", caption: "Friends on the climbing frame", orientation: "landscape" },
  { ...photos.courtyard, category: "Campus", caption: "The courtyard, with the stage at the far end", orientation: "landscape" },
  { ...photos.cycling, category: "Everyday", caption: "Pedalling with training wheels", orientation: "portrait" },
  { ...photos.playCourt, category: "Play areas", caption: "The slide and swing under the trees", orientation: "landscape" },
  { ...photos.corridor, category: "Everyday", caption: "A classroom corridor, with artwork on the walls", orientation: "portrait" },
];
