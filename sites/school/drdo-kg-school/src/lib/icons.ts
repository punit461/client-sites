import {
  Accessibility,
  ArrowRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Smile,
  Star,
  Trees,
  type LucideIcon,
} from "lucide-react";

/**
 * Data files name an icon as a string; this map turns it into a component.
 * Keeping the union derived from the map means a typo in a data file is a
 * compile error rather than a blank space on the page.
 */
export const icons = {
  accessibility: Accessibility,
  arrowRight: ArrowRight,
  clock: Clock,
  heart: Heart,
  mail: Mail,
  mapPin: MapPin,
  navigation: Navigation,
  phone: Phone,
  plus: Plus,
  smile: Smile,
  star: Star,
  trees: Trees,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
