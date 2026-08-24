import { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: 499,
    period: "per wash",
    features: [
      "Exterior wash",
      "Foam cleaning",
      "Drying",
      "Basic tire shine",
      "Window cleaning",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    period: "per wash",
    features: [
      "Exterior wash",
      "Interior cleaning",
      "Vacuum cleaning",
      "Dashboard cleaning",
      "Premium tire shine",
      "Window cleaning",
      "Air freshener",
    ],
    highlighted: true,
    popular: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 1999,
    period: "per wash",
    features: [
      "Full detailing",
      "Interior deep clean",
      "Exterior polish",
      "Paint protection",
      "Ceramic spray",
      "Engine bay cleaning",
      "Premium tire dressing",
      "Leather conditioning",
    ],
    highlighted: false,
  },
];
