import React, { useState, useMemo } from "react";
import { FolderGit2, Search, Filter, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import { PROJECT_CATEGORIES } from "../utils/constants";
import Loader from "../components/common/Loader";

export default function Projects() {
  const { projects, loading } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (proj.description && proj.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (proj.technologies && proj.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  if (loading) {
    return <Loader text="Loading projects catalogue..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Portfolio Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Featured & Open Source Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Explore real-world software applications, full-stack systems, machine learning prototypes, and interactive tools.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-6">
        
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, tech stack (e.g. Firebase, React)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "glass-panel text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No projects found matching your criteria.
          </p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
