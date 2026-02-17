"use client";

import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import TimelineItem from "@/components/TimelineItem";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities?: string[];
  projects?: string[];
  technologies?: string[];
  type: "responsibilities" | "projects" | "technologies";
}

interface ExperienceSectionProps {}

const ExperienceSection = forwardRef<HTMLElement, ExperienceSectionProps>((props, ref) => {
  const experiences: Experience[] = [
    {
      title: "Software Developer Intern",
      company: "National Informatics Centre (NIC), Govt. of India",
      period: "Dec 2025 – Jan 2026 | On-site",
      description: "Contributed to a production-grade employee management system under the Department of Social Justice & Empowerment.",
      responsibilities: [
        "Developed backend APIs with validation, pagination, and role-based access control",
        "Implemented secure authentication workflows and ensured data consistency across administrative systems",
        "Delivered features aligned with real government operational constraints and structured deployment environments"
      ],
      technologies: ["Node.js", "Next.js", "REST APIs", "Role-Based Access Control", "Authentication", "SQL", "Backend Development", "System Design"],
      type: "responsibilities"
    },
    {
      title: "Frontend Developer Intern",
      company: "Sintora Ventures",
      period: "Dec 2025 – Feb 2026 | Remote",
      description: "Built responsive frontend pages and integrated REST APIs for internal company systems.",
      responsibilities: [
        "Implemented robust loading states, error handling, and edge-case management for stable UI behaviour",
        "Collaborated with backend engineers to align frontend logic with evolving API contracts"
      ],
      technologies: ["React.js", "Next.js", "JavaScript", "API Integration", "Front-End Architecture", "UI State Management"],
      type: "responsibilities"
    },
    {
      title: "Software Development Engineer Intern",
      company: "DeskOS",
      period: "Aug 2025 – Sep 2025 | Remote",
      description: "Engineered and deployed a WhatsApp-based visitor and guest notification system using Django REST Framework.",
      responsibilities: [
        "Automated approval workflows, reducing manual coordination time from 4–6 minutes to under 30 seconds",
        "Built an event-driven notification pipeline handling ~2,000+ notifications per day with high delivery reliability"
      ],
      technologies: ["Python", "Django REST Framework", "Event-Driven Systems", "Backend APIs", "Workflow Automation", "System Optimisation"],
      type: "responsibilities"
    },
    {
      title: "Next.js Developer Intern",
      company: "LinksUs",
      period: "Jul 2025 – Sep 2025 | Remote",
      description: "Refactored frontend architecture and state management, improving onboarding and dashboard responsiveness.",
      responsibilities: [
        "Enhanced form and table interactions, improving UI performance and usability by 35–40%",
        "Implemented reusable component patterns to accelerate feature development"
      ],
      technologies: ["Next.js", "React.js", "Performance Optimisation", "Component Architecture", "Front-End Engineering"],
      type: "responsibilities"
    },
    {
      title: "Captain — AWS Cloud Club, SRMIST",
      company: "AWS Cloud Club",
      period: "Nov 2025 – Present",
      description: "Transitioned CloudX into the officially recognised AWS Cloud Club at SRMIST.",
      responsibilities: [
        "Leading hands-on labs, certification preparation sessions, and live deployment demonstrations",
        "Coordinating technical sessions with AWS community speakers"
      ],
      technologies: ["AWS Fundamentals", "Cloud Deployment", "Technical Mentorship", "Community Leadership", "DevOps Concepts"],
      type: "responsibilities"
    }
  ];

  return (
    <section ref={ref} id="experience" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
      <TerminalWindow title="experience.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">cat</span> ./experience/career.log
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Work Experience
          </h2>
          
          <div className="relative pl-8 space-y-10 mb-6">
            {/* Timeline line */}
            <div className="absolute left-3 top-0 h-full w-0.5 bg-terminal-lightbg"></div>
            
            {/* Experience Items */}
            {experiences.map((experience, index) => (
              <TimelineItem
                key={index}
                title={experience.title}
                subtitle={experience.company}
                period={experience.period}
                tags={experience.responsibilities}
                technologies={experience.technologies}
                delay={index * 0.2}
                tagTitle="Key Responsibilities:"
                listType="list"
              />
            ))}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
