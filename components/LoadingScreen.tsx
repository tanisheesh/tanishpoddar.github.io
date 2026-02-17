"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);

  const steps = [
    "Starting Dev Server...",
    "Bundling Components...",
    "Compiling TypeScript...",
    "Initializing React...",
    "Loading Data...",
    "Portfolio Ready!"
  ];

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Step progression with smooth text display
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length) {
          const newStep = prev;
          if (newStep < steps.length) {
            setDisplayedSteps(prevSteps => [...prevSteps, steps[newStep]]);
          }
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Progress bar
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev < 100) {
          return prev + 2.8; // Slightly faster to complete with steps
        }
        return prev;
      });
    }, 70);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-terminal-bg font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="terminal-window w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 max-w-2xl h-80 bg-terminal-bg border border-gray-700 rounded-lg overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="terminal-header flex items-center p-3 bg-terminal-lightbg border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="ml-2 text-sm text-terminal-text font-mono">portfolio-init.sh</div>
        </div>
        
        <div className="p-4 h-full flex flex-col">
          {/* Command line */}
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">./init-portfolio.sh</span>
          </div>
          
          {/* Loading messages - fixed height area */}
          <div className="flex-1 overflow-hidden">
            <div className="space-y-1">
              {displayedSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs text-terminal-text"
                >
                  <span className="text-terminal-accent">[INFO]</span>
                  <span className="ml-2">{step}</span>
                  {index < displayedSteps.length - 1 && (
                    <span className="ml-2 text-terminal-green">✓</span>
                  )}
                </motion.div>
              ))}
              
              {currentStep < steps.length && (
                <motion.div 
                  className="flex items-center text-xs"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span className="text-terminal-accent">[LOADING]</span>
                  <span className="ml-2 text-terminal-text">Processing...</span>
                  <span className="ml-1 text-terminal-accent">
                    {showCursor ? '|' : ' '}
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Progress bar - always at bottom */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-terminal-text">Progress</span>
              <span className="text-xs text-terminal-accent">{Math.min(Math.round(loadingProgress), 100)}%</span>
            </div>
            <div className="w-full bg-terminal-lightbg rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-terminal-accent to-terminal-green rounded-full h-2"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            
            {currentStep >= steps.length && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-3"
              >
                <div className="text-terminal-green text-xs">
                  <span className="text-terminal-green">$</span>{" "}
                  <span className="text-terminal-command">portfolio</span> --ready
                </div>
                <div className="mt-1 text-terminal-accent text-xs">
                  ✨ All systems go! ✨
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
