import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "basic-wash",
    name: "Basic Car Wash",
    description:
      "Exterior wash, foam cleaning and drying. Perfect for regular maintenance.",
    price: 299,
    duration: "30 min",
    category: "exterior",
    image: "/images/services/basic-wash.jpg",
    icon: "LocalCarWash",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description:
      "Exterior + interior cleaning. A thorough clean inside and out.",
    price: 599,
    duration: "45 min",
    category: "exterior",
    image: "/images/services/premium-wash.jpg",
    icon: "WaterDrop",
  },
  {
    id: "interior-deep-clean",
    name: "Interior Deep Clean",
    description:
      "Seats, dashboard, mats and complete interior cleaning for a fresh cabin.",
    price: 799,
    duration: "1 hr",
    category: "interior",
    image: "/images/services/interior-clean.jpg",
    icon: "Chair",
  },
  {
    id: "full-detailing",
    name: "Full Detailing",
    description:
      "Complete interior + exterior detailing for a showroom finish.",
    price: 1499,
    duration: "2-3 hrs",
    category: "detailing",
    image: "/images/services/full-detailing.jpg",
    icon: "AutoAwesome",
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description:
      "Premium protection and long-lasting shine that lasts for years.",
    price: 4999,
    duration: "4-5 hrs",
    category: "protection",
    image: "/images/services/ceramic-coating.jpg",
    icon: "Shield",
  },
  {
    id: "paint-protection",
    name: "Paint Protection",
    description:
      "Protect your vehicle's paint from scratches and environmental damage.",
    price: 3499,
    duration: "3-4 hrs",
    category: "protection",
    image: "/images/services/paint-protection.jpg",
    icon: "Security",
  },
];

export const serviceCategories = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "detailing", label: "Detailing" },
  { id: "protection", label: "Protection" },
] as const;
