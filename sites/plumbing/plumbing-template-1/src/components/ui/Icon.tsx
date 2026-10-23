import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  Building2,
  CalendarClock,
  Check,
  ClipboardCheck,
  Clock,
  Droplets,
  FileText,
  Flame,
  House,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ScanSearch,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Star,
  Toilet,
  TriangleAlert,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files name icons by string so they stay plain data. Lines are kept
 * thin (1.4) to match the editorial type.
 */
const icons = {
  droplets: Droplets,
  waves: Waves,
  flame: Flame,
  showerHead: ShowerHead,
  toilet: Toilet,
  bath: Bath,
  scan: ScanSearch,
  clipboard: ClipboardCheck,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  pin: MapPin,
  check: Check,
  shield: ShieldCheck,
  file: FileText,
  message: MessageSquare,
  house: House,
  building: Building2,
  wrench: Wrench,
  calendar: CalendarClock,
  alert: TriangleAlert,
  sparkles: Sparkles,
  star: Star,
  arrow: ArrowRight,
  arrowUpRight: ArrowUpRight,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.4,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
