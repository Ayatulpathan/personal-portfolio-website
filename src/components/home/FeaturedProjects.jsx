import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2, Star } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import ProjectCard from "../projects/ProjectCard";
import Button from "../common/Button";

export default function FeaturedProjects({ onSelectProject }) {
  const { projects } = usePortfolio();

  // Filter featured projects or take top 3
  const featured = projects?.filter(p => p.featured) || [];
  const displayProjects = featured.length > 0 ? featured.slice(0, 3) : projects?.slice(0, 3) || [];

  return (
    <section className="py-16 sm:py-24 border-t border-gray-200/70 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Star className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" className="group">
              <span>Explore All Projects ({projects?.length || 0})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
