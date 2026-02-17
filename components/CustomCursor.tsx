"use client";

import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [elementBounds, setElementBounds] = useState<DOMRect | null>(null);
  const requestRef = useRef<number>();
  const currentElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const target = e.target as HTMLElement;
      
      // Check if element or any parent is clickable
      const findClickableElement = (element: HTMLElement | null): HTMLElement | null => {
        if (!element || element === document.body) return null;
        
        const tagName = element.tagName;
        const computedStyle = window.getComputedStyle(element);
        
        if (
          tagName === "A" ||
          tagName === "BUTTON" ||
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT" ||
          element.onclick !== null ||
          computedStyle.cursor === "pointer" ||
          element.getAttribute("role") === "button"
        ) {
          return element;
        }
        
        return findClickableElement(element.parentElement);
      };
      
      const clickableElement = findClickableElement(target);
      
      if (clickableElement) {
        setIsPointer(true);
        currentElementRef.current = clickableElement;
        setElementBounds(clickableElement.getBoundingClientRect());
      } else {
        setIsPointer(false);
        currentElementRef.current = null;
        setElementBounds(null);
      }
    };

    const animate = () => {
      // Smooth lerp animation
      const speed = 0.15;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      
      setPosition({ x: currentX, y: currentY });
      
      // Update element bounds if hovering
      if (currentElementRef.current) {
        setElementBounds(currentElementRef.current.getBoundingClientRect());
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main crosshair cursor */}
      <div
        className={`custom-cursor-crosshair ${isPointer ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Center dot */}
        <div className="cursor-center" />
        
        {/* Crosshair lines */}
        <div className="cursor-line cursor-line-h" />
        <div className="cursor-line cursor-line-v" />
      </div>
      
      {/* Element bounding brackets */}
      {isPointer && elementBounds && (
        <div
          className="cursor-element-bounds"
          style={{
            left: `${elementBounds.left}px`,
            top: `${elementBounds.top}px`,
            width: `${elementBounds.width}px`,
            height: `${elementBounds.height}px`,
          }}
        >
          <div className="cursor-bracket cursor-bracket-tl" />
          <div className="cursor-bracket cursor-bracket-tr" />
          <div className="cursor-bracket cursor-bracket-bl" />
          <div className="cursor-bracket cursor-bracket-br" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
