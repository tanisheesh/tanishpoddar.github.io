"use client";

import { useRef } from "react";
import NavigationBar from "@/components/NavigationBar";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    resume: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Custom smooth scroll function
  const smoothScrollToTop = () => {
    const duration = 1000; // 1 second
    const start = window.pageYOffset;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, start * (1 - easeInOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <div className="bg-terminal-bg text-terminal-text font-mono">
      {/* Home Section */}
      <section ref={sectionRefs.home} id="home" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
        <TerminalWindow title="home.js">
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">whoami</span>
          </div>
          <div className="mb-10 ml-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-terminal-accent">
              Tanish Poddar
            </h1>
            <div className="mt-2">
              <TypingAnimation 
                texts={[
                  "Full Stack Software Engineer",
                  "Backend & Real-Time Systems Developer",
                  "Applied AI Developer"
                ]}
                typingSpeed={70}
                deletingSpeed={20}
                delayBetweenTexts={1500}
                delayStart={300}
              />
            </div>
          </div>
          <div className="mb-4">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">socials</span> --list
          </div>
          <div className="flex flex-wrap ml-4 mb-8 gap-3 sm:gap-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText('tanishpoddar.18@gmail.com');
                toast({
                  title: "Email copied!",
                  description: "tanishpoddar.18@gmail.com copied to clipboard",
                });
              }}
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-mail-line mr-2 text-xl"></i>
              <span className="text-sm sm:text-base">Email</span>
            </button>
            <a
              href="https://www.linkedin.com/in/tanisheesh/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-linkedin-box-line mr-2 text-xl"></i>
              <span className="text-sm sm:text-base">LinkedIn</span>
            </a>
            <a
              href="https://github.com/tanisheesh"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-terminal-accent hover:text-terminal-green transition-colors"
            >
              <i className="ri-github-line mr-2 text-xl"></i>
              <span className="text-sm sm:text-base">GitHub</span>
            </a>
          </div>
          <div className="mt-6">
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">scroll</span> --direction=down
          </div>
        </TerminalWindow>
      </section>

      {/* Other Sections */}
      <AboutSection ref={sectionRefs.about} />
      <SkillsSection ref={sectionRefs.skills} />
      <ProjectsSection ref={sectionRefs.projects} />
      <EducationSection ref={sectionRefs.education} />
      <ExperienceSection ref={sectionRefs.experience} />
      <ResumeSection ref={sectionRefs.resume} />
      <ContactSection ref={sectionRefs.contact} />

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-800">
        <p className="text-sm text-terminal-text mb-3">
          © {new Date().getFullYear()} | Made with <span className="text-terminal-accent">❤</span> by Tanish Poddar
        </p>
        <div className="flex items-center justify-center opacity-60">
          <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse mr-2"></div>
          <p className="text-xs text-terminal-green">All Systems Functional</p>
        </div>
      </footer>

      {/* Go Up Button - Triangle Shape */}
      <button
        onClick={smoothScrollToTop}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-terminal-accent hover:border-b-terminal-green transition-colors cursor-pointer"
        aria-label="Scroll to top"
      />

      {/* Navigation */}
      <NavigationBar sections={sectionRefs} />
    </div>
  );
}
