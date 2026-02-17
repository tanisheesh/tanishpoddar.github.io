"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  delayStart?: number;
}

const TypingAnimation = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 25,
  delayBetweenTexts = 1000,
  delayStart = 0,
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delayStart);
      return () => clearTimeout(startTimeout);
    }

    const currentText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      // Typing text
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts, delayStart, hasStarted]);

  return (
    <div className="inline-flex items-center min-h-[2rem]">
      <motion.p className="text-xl md:text-2xl text-terminal-green">
        {displayText}
        <motion.span
          className="inline-block h-full"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          |
        </motion.span>
      </motion.p>
    </div>
  );
};

export default TypingAnimation;
