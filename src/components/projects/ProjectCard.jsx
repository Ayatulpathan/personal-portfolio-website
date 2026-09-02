import React from "react";
import { ExternalLink, Eye, Sparkles, Layers } from "lucide-react";
import { Github } from "../common/SocialIcons";
import Button from "../common/Button";

export default function ProjectCard({ project, onSelect }) {
  const {
    title,
    shortDescription,
    description,
    imageUrl,
    technologies = [],
    category,
    githubUrl,
    liveUrl,
    featured
  } = project;

  const defaultImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="glass-panel rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      
      {/* Image Thumbnail Frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-950/20">
        <img
          src={imageUrl || defaultImage}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

        {/* Featured & Category Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {featured ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[11px] font-bold shadow-md backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          ) : <div />}
          
          {category && (
            <span className="px-2.5 py-1 rounded-full bg-black/60 text-cyan-300 text-[11px] font-medium border border-cyan-500/30 backdrop-blur-md">
              {category}
            </span>
          )}
        </div>

        {/* Quick Modal Preview Trigger on Image */}
        <button
          onClick={() => onSelect && onSelect(project)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-200 text-white font-medium text-xs gap-1.5"
        >
          <Eye className="w-4 h-4" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-2.5">
          <h3 
            onClick={() => onSelect && onSelect(project)}
            className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1"
          >
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {shortDescription || description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions Bar */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect && onSelect(project)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            Details
          </button>

          <div className="flex items-center gap-1.5">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="View Source Code"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                title="Live Demo"
              >
                <span>Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
