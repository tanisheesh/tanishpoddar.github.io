"use client";

import { useState, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollActive from "@/hooks/useScrollActive";

interface NavigationBarProps {
  sections: {
    [key: string]: RefObject<HTMLElement>;
  };
}

const NavigationBar = ({ sections }: NavigationBarProps) => {
  const activeSection = useScrollActive(sections);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Only control visibility on mobile
        if (window.innerWidth < 768) {
          // Show navbar when scrolling
          setVisible(true);
          setIsScrolling(true);

          // Clear existing timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          // Hide navbar after 2 seconds of no scrolling
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
            if (window.scrollY > 100) {
              setVisible(false);
            }
          }, 2000);
        } else {
          // Always visible on desktop
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    // Initial check
    controlNavbar();

    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('resize', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('resize', controlNavbar);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const navItems = [
    { id: "home", icon: "ri-home-line", label: "Home" },
    { id: "about", icon: "ri-user-line", label: "About" },
    { id: "skills", icon: "ri-code-s-slash-line", label: "Skills" },
    { id: "projects", icon: "ri-folder-line", label: "Projects" },
    { id: "education", icon: "ri-book-open-line", label: "Education" },
    { id: "experience", icon: "ri-briefcase-line", label: "Experience" },
    { id: "resume", icon: "ri-file-list-line", label: "Resume" },
    { id: "contact", icon: "ri-chat-1-line", label: "Contact" }
  ];

  const scrollToSection = (id: string) => {
    sections[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop - Left Vertical Navbar */}
      <motion.nav 
        className="hidden md:flex fixed left-4 top-1/2 z-40 bg-terminal-lightbg bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-3 shadow-lg border border-gray-700 flex-col"
        initial={{ x: -100, y: "-50%" }}
        animate={{ 
          x: visible ? 0 : -100,
          y: "-50%"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-terminal-bg transition-colors ${
                  activeSection === item.id ? "text-terminal-green" : ""
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <i className={`${item.icon} text-lg`}></i>
              </button>
              
              {/* Tooltip - Right side */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
                  >
                    <div className="bg-terminal-bg text-terminal-text text-sm px-3 py-2 rounded-md border border-gray-700 shadow-lg">
                      {item.label}
                    </div>
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-[-4px]">
                      <div className="border-4 border-transparent border-r-terminal-bg"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile - Top Horizontal Navbar */}
      <motion.nav 
        className="md:hidden fixed top-4 left-1/2 z-40 bg-terminal-lightbg bg-opacity-90 backdrop-blur-sm rounded-full px-1 py-1 shadow-lg border border-gray-700 max-w-[95vw]"
        initial={{ y: -100, x: "-50%" }}
        animate={{ 
          y: visible ? 0 : -100,
          x: "-50%"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="flex space-x-1">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center justify-center w-9 h-9 rounded-full hover:bg-terminal-bg transition-colors ${
                  activeSection === item.id ? "text-terminal-green" : ""
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <i className={`${item.icon} text-base`}></i>
              </button>
              
              {/* Tooltip - Bottom */}
              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-terminal-bg text-terminal-text text-xs px-3 py-1 rounded-md border border-gray-700 shadow-lg">
                      {item.label}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1">
                      <div className="border-4 border-transparent border-b-terminal-bg"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default NavigationBar;
