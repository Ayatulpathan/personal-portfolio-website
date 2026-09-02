import React, { useState, useMemo } from "react";
import { Wrench, Search, Sparkles, Filter } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import SkillCard from "../components/skills/SkillCard";
import { SKILL_CATEGORIES } from "../utils/constants";
import Loader from "../components/common/Loader";

export default function Skills() {
  const { skills, loading } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchTerm]);

  if (loading) {
    return <Loader text="Loading technical skills..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>Technical Competencies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Skills & Technologies
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Comprehensive overview of programming languages, frontend frameworks, cloud databases, and development tooling.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-6">
        
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills by name (e.g. React, Python)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SKILL_CATEGORIES.map((cat) => {
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

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No skills found matching your search filter.
          </p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}

      {/* Summary Footer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-6">
        Showing {filteredSkills.length} of {skills.length} configured technical competencies.
      </div>

    </div>
  );
}
