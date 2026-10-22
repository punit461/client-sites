"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ArmillaryStatic from "./ArmillaryStatic";

const ArmillaryScene = dynamic(() => import("./ArmillaryScene"), { ssr: false, loading: () => <ArmillaryStatic /> });

/** True only where 3D is worth its cost: wide screens, enough cores, WebGL, and no reduced-motion or data-saver preference. */
function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px)").matches) return false;
  if ((navigator.hardwareConcurrency ?? 4) < 4) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The decorative 3D object. Everyone first gets the static drawing; capable
 * desktops then swap in the live scene once the browser is idle, so three.js
 * never competes with the hero image or the first interaction.
 */
export default function Sculpture({ className = "" }: { className?: string }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const go = () => setLive(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(go, 1200);
    return () => clearTimeout(t);
  }, []);

  return <div className={className}>{live ? <ArmillaryScene /> : <ArmillaryStatic />}</div>;
}
