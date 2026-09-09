export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: "exterior" | "interior" | "detailing" | "protection";
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  serviceId: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
}

export interface BookingState {
  details: BookingDetails;
  status: "idle" | "submitting" | "success" | "error";
  reference: string | null;
  selectedService: string;
}

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export interface UIState {
  activeSection: string;
  toasts: Toast[];
}
