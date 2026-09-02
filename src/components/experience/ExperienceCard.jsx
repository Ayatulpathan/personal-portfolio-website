import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { formatDate } from "../../utils/helpers";

export default function ExperienceCard({ experience, isLast = false }) {
  const {
    position,
    organization,
    employmentType,
    startDate,
    endDate,
    location,
    description,
    responsibilities = [],
    technologies = []
  } = experience;

  return (
    <div className="relative pl-8 sm:pl-10 group">
      
      {/* Timeline Node Line */}
      {!isLast && (
        <div className="absolute left-[15px] sm:left-[19px] top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 group-hover:bg-indigo-500/50 transition-colors" />
      )}

      {/* Timeline Node Icon Indicator */}
      <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
        <Briefcase className="w-4 h-4" />
      </div>

      {/* Experience Content Box */}
      <div className="glass-panel p-6 sm:p-7 rounded-2xl hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 space-y-4 mb-8">
        
        {/* Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800/80 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {position}
            </h3>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">
              <span>{organization}</span>
              {employmentType && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {employmentType}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formatDate(startDate)} — {formatDate(endDate) || "Present"}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Short Summary */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        )}

        {/* Responsibilities list */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Key Contributions & Responsibilities
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Chip Row */}
        {technologies && technologies.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/40 dark:border-gray-700/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
