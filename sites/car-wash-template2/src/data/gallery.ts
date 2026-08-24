import { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/exterior1.jpg",
    alt: "Luxury car exterior after premium wash",
    category: "exterior",
  },
  {
    id: "g2",
    src: "/images/gallery/interior1.jpg",
    alt: "Premium car interior detailing",
    category: "interior",
  },
  {
    id: "g3",
    src: "/images/gallery/detailing1.jpg",
    alt: "Full car detailing service",
    category: "detailing",
  },
  {
    id: "g4",
    src: "/images/gallery/ceramic1.jpg",
    alt: "Ceramic coating application",
    category: "ceramic",
  },
  {
    id: "g5",
    src: "/images/gallery/exterior2.jpg",
    alt: "SUV exterior wash result",
    category: "exterior",
  },
  {
    id: "g6",
    src: "/images/gallery/interior2.jpg",
    alt: "Deep cleaned car dashboard",
    category: "interior",
  },
  {
    id: "g7",
    src: "/images/gallery/detailing2.jpg",
    alt: "Engine bay detailing",
    category: "detailing",
  },
  {
    id: "g8",
    src: "/images/gallery/ceramic2.jpg",
    alt: "Paint protection film application",
    category: "ceramic",
  },
  {
    id: "g9",
    src: "/images/gallery/exterior3.jpg",
    alt: "Sports car after premium wash",
    category: "exterior",
  },
  {
    id: "g10",
    src: "/images/gallery/interior3.jpg",
    alt: "Leather seat conditioning",
    category: "interior",
  },
  {
    id: "g11",
    src: "/images/gallery/detailing3.jpg",
    alt: "Complete exterior polish",
    category: "detailing",
  },
  {
    id: "g12",
    src: "/images/gallery/ceramic3.jpg",
    alt: "Hydrophobic ceramic coating result",
    category: "ceramic",
  },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "detailing", label: "Detailing" },
  { id: "ceramic", label: "Ceramic Coating" },
] as const;
