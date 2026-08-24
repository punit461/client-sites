"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      const handleResize = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section id="before-after" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          subtitle="Results"
          title="See the Transformation"
          description="Drag the slider to compare before and after our detailing service."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden cursor-col-resize select-none aspect-video"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* After image (full width background) */}
            <Image
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=675&fit=crop"
              alt="After car detailing - shiny clean car"
              width={1200}
              height={675}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1200&h=675&fit=crop"
                alt="Before car detailing - dirty car"
                width={1200}
                height={675}
                className="absolute inset-0 h-full object-cover"
                style={{ width: containerWidth || "100vw" }}
                draggable={false}
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-background text-sm font-bold">↔</span>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 glass-card rounded-full px-4 py-1.5 z-10">
              <span className="text-xs font-semibold text-secondary">Before</span>
            </div>
            <div className="absolute top-4 right-4 glass-card rounded-full px-4 py-1.5 z-10">
              <span className="text-xs font-semibold text-primary">After</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
