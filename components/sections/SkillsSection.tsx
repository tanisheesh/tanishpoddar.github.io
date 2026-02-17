"use client";

import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";

interface SkillSectionProps {}

const SkillsSection = forwardRef<HTMLElement, SkillSectionProps>((props, ref) => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "JavaScript / TypeScript", "HTML & CSS", "Redux"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Django REST Framework", "SQL (PostgreSQL / MySQL)", "MongoDB"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Git & GitHub", "Docker", "AWS (EC2, Deployment)", "Linux"]
    },
    {
      title: "AI / Systems",
      skills: ["OpenCV", "MediaPipe", "LLM Integration", "NLP", "Data Processing"]
    }
  ];

  return (
    <section ref={ref} id="skills" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
      <TerminalWindow title="skills.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">ls -la</span> ./skills/
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.title}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-terminal-green">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 bg-terminal-lightbg text-terminal-accent border border-gray-700 rounded-md text-sm hover:bg-terminal-accent hover:text-terminal-bg transition-colors cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
