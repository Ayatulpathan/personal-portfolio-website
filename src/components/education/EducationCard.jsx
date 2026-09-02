import React from "react";
import { GraduationCap, Calendar, Award, MapPin, BookOpen } from "lucide-react";

export default function EducationCard({ education }) {
  const {
    institution,
    degree,
    subject,
    result,
    startYear,
    endYear,
    description,
    location
  } = education;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 space-y-4 group">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {degree} {subject ? `in ${subject}` : ""}
            </h3>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
              {institution}
            </p>
            {location && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Year and GPA Badges */}
        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Calendar className="w-3 h-3" />
            {startYear} — {endYear || "Present"}
          </span>
          {result && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Award className="w-3 h-3" />
              {result}
            </span>
          )}
        </div>
      </div>

      {/* Description / Coursework */}
      {description && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      )}

    </div>
  );
}
