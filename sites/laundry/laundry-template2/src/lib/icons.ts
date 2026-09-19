import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock,
  Droplets,
  Flame,
  Footprints,
  Gem,
  Leaf,
  MapPin,
  Package,
  PackageCheck,
  Recycle,
  Search,
  Shirt,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Thermometer,
  Truck,
  WashingMachine,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * Data files name an icon as a string; this map turns it into a component.
 * Deriving the union from the map means a typo in a data file is a compile
 * error rather than a blank space on the page.
 */
export const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  badgeCheck: BadgeCheck,
  check: Check,
  clock: Clock,
  droplets: Droplets,
  flame: Flame,
  footprints: Footprints,
  gem: Gem,
  leaf: Leaf,
  mapPin: MapPin,
  package: Package,
  packageCheck: PackageCheck,
  recycle: Recycle,
  search: Search,
  shirt: Shirt,
  shieldCheck: ShieldCheck,
  snowflake: Snowflake,
  sparkles: Sparkles,
  sun: Sun,
  thermometer: Thermometer,
  truck: Truck,
  washingMachine: WashingMachine,
  wind: Wind,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
