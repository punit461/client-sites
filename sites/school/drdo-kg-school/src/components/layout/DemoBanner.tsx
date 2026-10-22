import { demo } from "@/content/school";

/** Thin notice at the very bottom of every page while the site still holds template content. */
export default function DemoBanner() {
  if (!demo) return null;
  return (
    <div className="bg-gold-soft px-4 py-3 text-center text-[0.8rem] text-navy">
      <strong className="font-semibold">Preview.</strong> This site is a draft for D.R.D.O KG School and is waiting for the school&apos;s
      approval.
    </div>
  );
}
