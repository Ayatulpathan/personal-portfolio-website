import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Download, Sparkles, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ExperienceCard from "../components/experience/ExperienceCard";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

export default function Experience() {
  const { experience, loading } = usePortfolio();

  if (loading) {
    return <Loader text="Loading work history..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work History</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Professional Experience
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Chronological track record of software engineering roles, key responsibilities, and technical achievements.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative pt-6">
        {experience.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            isLast={idx === experience.length - 1}
          />
        ))}
      </div>

      {/* Call to action */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Looking for a Comprehensive Resume?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Download the latest PDF copy with complete academic scores, publications, and contact info.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/resume">
            <Button variant="primary" size="md">
              <Download className="w-4 h-4" />
              <span>View & Download Resume</span>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
