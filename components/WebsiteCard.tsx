"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Website {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  category: string;
}

interface WebsiteCardProps {
  website: Website;
  delay: number;
}

const WebsiteCard = ({ website, delay }: WebsiteCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Function to truncate text to 4 lines
  const truncateText = (text: string, maxLines: number = 4) => {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
  };

  return (
    <motion.div
      className="website-card w-72 md:w-80 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
      whileHover={{ y: -5 }}
    >
      <div className="terminal-window bg-terminal-bg border border-gray-700 rounded-lg overflow-hidden shadow-lg h-full">
        <div className="terminal-header flex items-center p-3 bg-terminal-lightbg border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="ml-2 text-sm text-terminal-text">website-{website.id.toString().padStart(2, '0')}.html</div>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100%-3rem)]">
          <div className="aspect-video mb-3 bg-terminal-lightbg rounded-md overflow-hidden flex items-center justify-center">
            {!imageError ? (
              <img 
                src={website.image} 
                alt={website.title}
                className="w-full h-full object-cover object-center"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-terminal-lightbg">
                <i className="ri-global-line text-4xl text-terminal-accent opacity-70"></i>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-terminal-accent">{website.title}</h3>
            <span className="text-xs bg-terminal-accent text-terminal-bg px-2 py-1 rounded-md">
              {website.category}
            </span>
          </div>
          
          <p className="text-sm mb-4 line-clamp-4">{truncateText(website.description)}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {website.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index} 
                className="text-xs bg-terminal-lightbg px-2 py-1 rounded-md text-terminal-green"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4 mb-4 text-sm text-terminal-text">
            <div className="flex items-center">
              <i className="ri-eye-line mr-1"></i>
              <span>Live Site</span>
            </div>
            <div className="flex items-center">
              <i className="ri-shield-check-line mr-1"></i>
              <span>Production</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-auto">
            <a
              href={website.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-terminal-accent text-terminal-bg hover:bg-terminal-green transition-colors text-sm flex items-center justify-center py-2 px-4 rounded-md font-medium"
            >
              <i className="ri-external-link-line mr-2"></i> Visit Website
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WebsiteCard;