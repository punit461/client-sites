"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { Group } from "three";

/**
 * An armillary sphere — the old astronomers' instrument, here as the school's
 * emblem of inquiry. A handful of meshes and four lights; no textures, no
 * models to download. Loaded only by Sculpture.tsx, never on the server.
 */

const GOLD = "#e2b54a";
const NAVY = "#244d78";

function Rings({ pointer }: { pointer: RefObject<{ x: number; y: number }> }) {
  const root = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const orbit = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      // Ease towards the pointer, gently: it should feel alive, not steerable.
      root.current.rotation.x += (pointer.current.y * 0.25 - root.current.rotation.x) * 0.04;
      root.current.rotation.z += (pointer.current.x * -0.2 - root.current.rotation.z) * 0.04;
      root.current.position.y = Math.sin(t * 0.6) * 0.06;
    }
    if (inner.current) inner.current.rotation.y += delta * 0.18;
    if (orbit.current) orbit.current.rotation.y -= delta * 0.45;
  });

  return (
    <group ref={root}>
      {/* Horizon ring, fixed. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.035, 24, 160]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.28} />
      </mesh>
      <group ref={inner}>
        <mesh>
          <torusGeometry args={[1.42, 0.03, 24, 160]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.42, 0.022, 24, 160]} />
          <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.35} />
        </mesh>
        {/* The ecliptic, tilted as it is in the sky. */}
        <mesh rotation={[Math.PI / 2 - 0.41, 0, 0]}>
          <torusGeometry args={[1.3, 0.06, 24, 160]} />
          <meshStandardMaterial color={GOLD} metalness={0.75} roughness={0.4} />
        </mesh>
      </group>
      {/* Globe at the centre. */}
      <mesh>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshStandardMaterial color={NAVY} metalness={0.2} roughness={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.63, 0.006, 8, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Axis. */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 3.7, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* A small moon on its own orbit. */}
      <group ref={orbit} rotation={[0.35, 0, 0]}>
        <mesh position={[1.3, 0, 0]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#f8f6f0" metalness={0.1} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function ArmillaryScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  // Stop rendering when scrolled out of view, so it costs nothing off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full" aria-hidden>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 4.6], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#fff6e6" />
        <directionalLight position={[-4, -2, -3]} intensity={0.9} color="#9db8d9" />
        <pointLight position={[0, 0, 2.5]} intensity={4} distance={6} color="#ffe2b0" />
        <group rotation={[0.25, -0.5, 0.18]}>
          <Rings pointer={pointer} />
        </group>
      </Canvas>
    </div>
  );
}
