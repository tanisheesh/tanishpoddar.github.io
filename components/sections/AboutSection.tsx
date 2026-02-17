"use client";

import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";

interface AboutSectionProps {}

// ============================================
// AVAILABILITY CONFIG - CHANGE THIS EASILY
// ============================================

// Option 1: Available (Green dot)
const AVAILABILITY_STATUS = {
  text: "Open for Internships & Freelance Work",
  color: "bg-terminal-green",
  showDot: true,
};

// Option 2: Not Available (Red dot)
// const AVAILABILITY_STATUS = {
//   text: "Not Available",
//   color: "bg-red-500",
//   showDot: true,
// };

// Option 3: Limited Availability (Yellow dot)
// const AVAILABILITY_STATUS = {
//   text: "Limited Availability",
//   color: "bg-yellow-500",
//   showDot: true,
// };

// ============================================

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((props, ref) => {
  return (
    <section ref={ref} id="about" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
      <TerminalWindow title="about.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./about_me.md
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            About Me
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.p 
                className="leading-relaxed mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Full Stack Software Engineer with experience building production-grade backend systems, real-time applications, and AI-powered platforms.
              </motion.p>
              <motion.p 
                className="leading-relaxed mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                I focus on clean API design, scalable architectures, and shipping features end-to-end under real constraints. My work spans backend-heavy development, frontend integration, data systems, and applied AI use cases.
              </motion.p>
              <motion.p 
                className="leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Outside of engineering, I'm a competitive martial artist. I hold a Blue-II belt in Shotokan Karate and won a Bronze Medal at the 2019 South Asian Championship — an experience that shaped my discipline and resilience.
              </motion.p>
            </motion.div>
            <motion.div 
              className="md:w-1/3 mt-6 md:mt-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-terminal-accent flex items-center justify-center bg-terminal-lightbg">
                <img 
                  src="/images/profile.jpg"
                  alt="Tanish Poddar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/profile.jpg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">grep</span> "interests" about_me.md
        </div>
        <motion.div 
          className="ml-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-2 text-terminal-green">Interests:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>System Design & Architecture</li>
            <li>Backend & Data Systems</li>
            <li>Applied AI / ML</li>
            <li>Cloud Infrastructure & DevOps</li>
            <li>High-Performance Web Applications</li>
          </ul>
        </motion.div>
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./availability.txt
        </div>
        <motion.div 
          className="ml-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-2 text-terminal-green">Current Availability:</p>
          <div className="ml-4 flex items-center space-x-2">
            {AVAILABILITY_STATUS.showDot && (
              <div className={`w-2 h-2 rounded-full ${AVAILABILITY_STATUS.color} animate-pulse`}></div>
            )}
            <span className="text-terminal-accent">{AVAILABILITY_STATUS.text}</span>
          </div>
        </motion.div>
      </TerminalWindow>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
