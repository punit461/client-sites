export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: "exterior" | "interior" | "detailing" | "protection";
  image: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "exterior" | "interior" | "detailing" | "ceramic" | "all";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  service: string;
  date: string;
  time: string;
  additionalNotes: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
