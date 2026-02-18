"use client";

import { useEffect, useRef, createContext, useContext } from "react";

interface SmoothScrollContextType {
  scrollTo: (position: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScroll");
  }
  return context;
};

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const isAnimating = useRef(false);

  const scrollTo = (position: number) => {
    targetScrollY.current = position;
    if (!isAnimating.current) {
      isAnimating.current = true;
      animate();
    }
  };

  const animate = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const speed = 0.08;
    const diff = targetScrollY.current - currentScrollY.current;
    
    if (Math.abs(diff) > 0.5) {
      currentScrollY.current += diff * speed;
      container.scrollTop = currentScrollY.current;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      currentScrollY.current = targetScrollY.current;
      container.scrollTop = currentScrollY.current;
      isAnimating.current = false;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY.current += e.deltaY;
      
      // Clamp the target scroll position
      const maxScroll = container.scrollHeight - container.clientHeight;
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll));
      
      if (!isAnimating.current) {
        isAnimating.current = true;
        animate();
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
    <SmoothScrollContext.Provider value={{ scrollTo }}>
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
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
