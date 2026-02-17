"use client";

import { useEffect, useRef } from "react";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY.current += e.deltaY;
      
      // Clamp the target scroll position
      const maxScroll = container.scrollHeight - container.clientHeight;
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll));
      
      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const animate = () => {
      const speed = 0.08; // Lower = smoother but slower
      const diff = targetScrollY.current - currentScrollY.current;
      
      if (Math.abs(diff) > 0.5) {
        currentScrollY.current += diff * speed;
        container.scrollTop = currentScrollY.current;
        requestRef.current = requestAnimationFrame(animate);
      } else {
        currentScrollY.current = targetScrollY.current;
        container.scrollTop = currentScrollY.current;
        isScrolling = false;
      }
    };

    // Initialize scroll position
    currentScrollY.current = container.scrollTop;
    targetScrollY.current = container.scrollTop;

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: "100vh",
        overflow: "auto",
        willChange: "scroll-position",
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
