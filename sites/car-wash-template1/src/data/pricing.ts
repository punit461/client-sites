import { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: 499,
    description: "Basic exterior wash to keep your car looking fresh.",
    features: [
      "Exterior foam wash",
      "Hand drying",
      "Tire shine",
      "Window cleaning",
      "Basic vacuum",
    ],
    serviceId: "basic-wash",
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    description: "Complete interior and exterior cleaning package.",
    features: [
      "Everything in Essential",
      "Interior vacuuming",
      "Dashboard cleaning",
      "Air freshener",
      "Door panel wipe",
      "Floor mat shampoo",
    ],
    popular: true,
    serviceId: "premium-wash",
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 1999,
    description: "Full detailing package for the ultimate car care experience.",
    features: [
      "Everything in Premium",
      "Clay bar treatment",
      "Machine polish",
      "Leather conditioning",
      "Engine bay cleaning",
      "Ceramic spray sealant",
      "30-day shine guarantee",
    ],
    serviceId: "full-detailing",
  },
];
