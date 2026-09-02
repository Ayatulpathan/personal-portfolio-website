import React, { useState } from "react";
import { BookOpen, ExternalLink, FileText, ChevronDown, ChevronUp, Cpu, Award } from "lucide-react";
import Button from "../common/Button";

export default function ResearchCard({ research }) {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    field,
    abstract,
    methodology,
    results,
    technologies = [],
    publicationInfo,
    paperUrl,
    year
  } = research;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 space-y-5 group">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              {field || "Computer Science Research"}
            </span>
            {year && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                • {year}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {title}
          </h3>

          {publicationInfo && (
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 shrink-0" />
              <span>{publicationInfo}</span>
            </p>
          )}

        </div>

        {/* Paper Link Button */}
        {paperUrl && paperUrl !== "#" && (
          <a
            href={paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="outline" size="sm" className="gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Read Paper</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </Button>
          </a>
        )}
      </div>

      {/* Abstract */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Abstract
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {abstract}
        </p>
      </div>

      {/* Expandable Methodology & Results */}
      {(methodology || results) && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
          >
            <span>{expanded ? "Hide Methodology & Findings" : "View Methodology & Findings"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <div className="space-y-3 mt-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800 animate-fadeIn">
              {methodology && (
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200 mb-1">
                    Methodology:
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {methodology}
                  </p>
                </div>
              )}
              {results && (
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200 mb-1">
                    Empirical Results & Outcome:
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {results}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Technologies Used in Research */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-gray-400 dark:text-gray-500 mr-1 font-medium">
            Tech & Tools:
          </span>
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
