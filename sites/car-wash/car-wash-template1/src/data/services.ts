import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "basic-wash",
    name: "Basic Car Wash",
    description:
      "Exterior wash with foam cleaning and hand drying. Perfect for a quick refresh.",
    price: 299,
    duration: "30 min",
    category: "exterior",
    icon: "soap",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description:
      "Full exterior wash plus interior vacuuming, dashboard wipe-down, and window cleaning.",
    price: 599,
    duration: "1 hr",
    category: "exterior",
    icon: "auto_awesome",
  },
  {
    id: "interior-deep-clean",
    name: "Interior Deep Clean",
    description:
      "Deep cleaning of seats, dashboard, mats, door panels, and complete interior sanitization.",
    price: 799,
    duration: "1.5 hrs",
    category: "interior",
    icon: "cleaning_services",
  },
  {
    id: "full-detailing",
    name: "Full Detailing",
    description:
      "Complete interior and exterior detailing with clay bar treatment, polish, and protectant.",
    price: 1499,
    duration: "3 hrs",
    category: "detailing",
    icon: "workspace_premium",
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description:
      "Premium ceramic coating for long-lasting hydrophobic protection and mirror-like shine.",
    price: 3999,
    duration: "4 hrs",
    category: "protection",
    icon: "shield",
  },
  {
    id: "paint-protection",
    name: "Paint Protection",
    description:
      "Paint sealant application to protect against UV rays, scratches, and environmental damage.",
    price: 1999,
    duration: "2.5 hrs",
    category: "protection",
    icon: "protect",
  },
];
