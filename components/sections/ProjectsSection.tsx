"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "@/components/TerminalWindow";
import ProjectCard from "@/components/ProjectCard";
import WebsiteCard from "@/components/WebsiteCard";

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  socialPreview: string;
  type: 'fullstack' | 'ai' | 'python';
}

interface Website {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  category: string;
}

interface ProjectsSectionProps {}

const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'fullstack' | 'ai' | 'python' | 'professional'>('fullstack');
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Repository lists organized by category
  const repositoryLists = {
    fullstack: [
      "tanisheesh/Nexus-AI",
      "tanisheesh/SeatFinderSRM",
      "tanisheesh/BazaarOps",
      "tanisheesh/Prompt2App",
      "tanisheesh/VirtualShell",
      "tanisheesh/Moodify"
    ],
    ai: [
      "tanisheesh/PosturePro",
      "tanisheesh/Maternalyze",
      "tanisheesh/Crime-Risk-Prediction-System",
      "tanisheesh/GreenVision"
    ],
    python: [
      "tanisheesh/Python-Mini-Shell",
      "tanisheesh/aegis-shell"
    ]
  };

  // NIC Project - GitHub style
  const nicProject: GitHubProject = {
    id: 1001,
    name: "NIC-MoSJE-Employee-Management",
    description: "Comprehensive employee management system for National Informatics Centre, Ministry of Social Justice & Empowerment. Features attendance tracking, leave management, and employee records.",
    html_url: "https://github.com/tanisheesh/NIC-MoSJE-Employee-Management",
    homepage: null,
    language: "JavaScript",
    topics: ["react", "nodejs", "postgresql"],
    stargazers_count: 0,
    forks_count: 0,
    socialPreview: "https://opengraph.githubassets.com/1/tanisheesh/NIC-MoSJE-Employee-Management",
    type: 'fullstack'
  };

  // Professional Websites Data (static) - Website cards
  const websitesData: Website[] = [
    {
      id: 2,
      title: "Sintora Ventures",
      description: "Modern venture capital firm website with portfolio showcase, investment criteria, team profiles, and startup application portal.",
      image: "/images/websites/sintora-ventures.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://sintoraventures.com/",
      category: "Finance"
    },
    {
      id: 3,
      title: "LinksUs",
      description: "Professional networking platform connecting businesses and professionals. Features company profiles, job postings, and business matchmaking.",
      image: "/images/websites/linksus.png",
      technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
      demoUrl: "https://www.linksus.in/",
      category: "Networking"
    },
    {
      id: 4,
      title: "HerNetworkingHub",
      description: "Women-focused professional networking platform with mentorship programs, career resources, and community events.",
      image: "/images/websites/hernetworkinghub.png",
      technologies: ["React", "Firebase", "Material-UI"],
      demoUrl: "https://hernetworkinghub.online/",
      category: "Social"
    },
    {
      id: 5,
      title: "Concern Rehab",
      description: "Rehabilitation center website with treatment programs, facility information, admission process, and patient testimonials.",
      image: "/images/websites/concern-rehab.png",
      technologies: ["WordPress", "PHP", "MySQL"],
      demoUrl: "https://www.concernrehab.com/",
      category: "Healthcare"
    }
  ];

  const tabs = [
    { id: 'fullstack', label: 'Full Stack', icon: 'ri-code-s-slash-line' },
    { id: 'ai', label: 'AI/ML Labs', icon: 'ri-brain-line' },
    { id: 'python', label: 'Python Projects', icon: 'ri-file-code-line' },
    { id: 'professional', label: 'Client Work / Internships', icon: 'ri-briefcase-line' }
  ];

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all repositories for all categories
        const allRepos = [
          ...repositoryLists.fullstack.map(repo => ({ repo, type: 'fullstack' as const })),
          ...repositoryLists.ai.map(repo => ({ repo, type: 'ai' as const })),
          ...repositoryLists.python.map(repo => ({ repo, type: 'python' as const }))
        ];

        const projectsData = await Promise.all(
          allRepos.map(async ({ repo, type }) => {
            try {
              const [owner, repoName] = repo.split('/');
              
              // Try without token first (for public repos)
              let response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
                headers: {
                  'Accept': 'application/vnd.github.v3+json'
                },
                cache: 'force-cache' // Cache for better mobile performance
              });

              // If rate limited or needs auth, try with token
              if (!response.ok && process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
                response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
                  },
                  cache: 'force-cache'
                });
              }

              if (!response.ok) {
                console.warn(`Failed to fetch ${repo}: ${response.statusText}`);
                // Return fallback data instead of null
                const [owner, repoName] = repo.split('/');
                return {
                  id: `fallback-${owner}-${repoName}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0),
                  name: repoName,
                  description: `${repoName} - GitHub repository`,
                  html_url: `https://github.com/${repo}`,
                  homepage: null,
                  language: null,
                  topics: [],
                  stargazers_count: 0,
                  forks_count: 0,
                  socialPreview: `https://opengraph.githubassets.com/1/${owner}/${repoName}`,
                  type
                };
              }

              const data = await response.json();
              
              return {
                ...data,
                socialPreview: `https://opengraph.githubassets.com/1/${owner}/${repoName}`,
                type
              };
            } catch (err) {
              console.error(`Error fetching ${repo}:`, err);
              // Return fallback data on error
              const [owner, repoName] = repo.split('/');
              return {
                id: `fallback-${owner}-${repoName}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0),
                name: repoName,
                description: `${repoName} - GitHub repository`,
                html_url: `https://github.com/${repo}`,
                homepage: null,
                language: null,
                topics: [],
                stargazers_count: 0,
                forks_count: 0,
                socialPreview: `https://opengraph.githubassets.com/1/${owner}/${repoName}`,
                type
              };
            }
          })
        );
        
        // All projects should be valid now (with fallback data)
        const validProjects = projectsData.filter(Boolean) as GitHubProject[];
        setProjects(validProjects);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const filteredProjects = projects.filter(project => project.type === activeTab);

  // Handle horizontal scroll with mouse drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = containerRef.current;
    if (!slider) return;
    
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };
    
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section ref={ref} id="projects" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
      <TerminalWindow title="projects.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">ls</span> ./projects/*.js
        </div>
        <div className="ml-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Projects
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-terminal-accent text-terminal-bg'
                    : 'bg-terminal-lightbg text-terminal-text hover:bg-terminal-accent hover:text-terminal-bg'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          <p className="mb-4">
            Swipe or scroll to explore my {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} →
          </p>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-terminal-accent">Loading projects...</div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-8">{error}</div>
          ) : filteredProjects.length === 0 && activeTab !== 'professional' ? (
            <div className="text-gray-400 py-8">No projects found. Please check your internet connection.</div>
          ) : (
            <motion.div 
              className="overflow-x-auto overflow-y-hidden custom-scrollbar -mx-4"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                padding: '1rem 0'
              }}
              ref={containerRef}
              onMouseDown={handleMouseDown}
              whileTap={{ cursor: "grabbing" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              key={activeTab}
            >
              <div className="inline-flex gap-4 px-4">
                {activeTab === 'professional' ? (
                  <>
                    {/* NIC Project - GitHub Card */}
                    <ProjectCard 
                      key={nicProject.id}
                      project={{
                        id: nicProject.id,
                        title: nicProject.name,
                        description: nicProject.description || "No description available",
                        image: nicProject.socialPreview,
                        technologies: [
                          ...(nicProject.language ? [nicProject.language] : []),
                          ...(nicProject.topics ? nicProject.topics.slice(0, 2) : [])
                        ].filter(Boolean),
                        githubUrl: nicProject.html_url,
                        demoUrl: nicProject.homepage || "",
                        stars: nicProject.stargazers_count,
                        forks: nicProject.forks_count
                      }}
                      delay={0}
                    />
                    {/* Other Websites - Website Cards */}
                    {websitesData.map((website, index) => (
                      <WebsiteCard 
                        key={website.id}
                        website={website}
                        delay={(index + 1) * 0.1}
                      />
                    ))}
                  </>
                ) : (
                  // Full Stack, AI & Python - Project Cards from GitHub API
                  filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={{
                        id: project.id,
                        title: project.name,
                        description: project.description || "No description available",
                        image: project.socialPreview,
                        technologies: [
                          ...(project.language ? [project.language] : []),
                          ...(project.topics ? project.topics.slice(0, 2) : [])
                        ].filter(Boolean),
                        githubUrl: project.html_url,
                        demoUrl: project.homepage || "",
                        stars: project.stargazers_count,
                        forks: project.forks_count
                      }}
                      delay={index * 0.1}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
