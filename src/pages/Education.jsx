import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import EducationCard from "../components/education/EducationCard";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

export default function Education() {
  const { education, loading } = usePortfolio();

  if (loading) {
    return <Loader text="Loading educational background..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Qualifications</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Education & Training
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Academic degrees, university coursework, core subjects, and academic performance metrics.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="space-y-6">
        {education.map((edu) => (
          <EducationCard key={edu.id} education={edu} />
        ))}
      </div>

      {/* Academic Highlights Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-indigo-900/10 via-indigo-600/5 to-cyan-500/10 border border-indigo-200/60 dark:border-indigo-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Interested in Research & Academic Papers?</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Check out published papers, methodology studies, and conference contributions.
          </p>
        </div>
        <Link to="/research" className="shrink-0">
          <Button variant="primary" size="md">
            <span>Explore Research</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
