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
  MessageSquareText,
  Phone,
  ScanSearch,
  ShieldCheck,
  Spline,
  Toilet,
  TriangleAlert,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Content names icons by string so it stays plain data. One weight everywhere. */
const icons = {
  droplets: Droplets,
  waves: Waves,
  flame: Flame,
  toilet: Toilet,
  bath: Bath,
  pipe: Spline,
  scan: ScanSearch,
  clipboard: ClipboardCheck,
  wrench: Wrench,
  house: House,
  building: Building2,
  calendar: CalendarClock,
  message: MessageSquareText,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  pin: MapPin,
  check: Check,
  shield: ShieldCheck,
  file: FileText,
  alert: TriangleAlert,
  arrow: ArrowRight,
  arrowUpRight: ArrowUpRight,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.5 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
