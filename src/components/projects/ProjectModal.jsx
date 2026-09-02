import React from "react";
import { ExternalLink, Calendar, Layers, Sparkles } from "lucide-react";
import { Github } from "../common/SocialIcons";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { formatDate } from "../../utils/helpers";

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  const {
    title,
    description,
    shortDescription,
    imageUrl,
    technologies = [],
    category,
    githubUrl,
    liveUrl,
    startDate,
    completionDate,
    featured
  } = project;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-3xl">
      <div className="space-y-6">
        
        {/* Project Cover Image */}
        {imageUrl && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900 border border-gray-200 dark:border-gray-800">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              {featured && (
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Project
                </span>
              )}
              {category && (
                <span className="px-2.5 py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-cyan-300 text-xs font-medium border border-cyan-500/30">
                  {category}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Timeline Metadata */}
        {(startDate || completionDate) && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>
              Timeline: {formatDate(startDate)} — {formatDate(completionDate) || "Present"}
            </span>
          </div>
        )}

        {/* Full Detailed Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-200">
            Project Overview
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {description || shortDescription}
          </p>
        </div>

        {/* Technologies List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-200 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Technologies & Tools</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-end gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                <Github className="w-4 h-4 mr-1.5" />
                <span>Source Code</span>
              </Button>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                <span>Open Live Project</span>
              </Button>
            </a>
          )}
        </div>

      </div>
    </Modal>
  );
}
