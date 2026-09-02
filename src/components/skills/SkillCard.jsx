import React from "react";
import * as Icons from "lucide-react";
import { Code, Layers, Sparkles } from "lucide-react";

export default function SkillCard({ skill }) {
  // Dynamically map icon name to Lucide component
  let IconComponent = Code;
  if (skill.icon && Icons[skill.icon]) {
    IconComponent = Icons[skill.icon];
  }

  const level = skill.level || 80;

  // Determine skill level badge text
  let levelText = "Intermediate";
  let badgeColor = "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300";
  if (level >= 90) {
    levelText = "Expert";
    badgeColor = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  } else if (level >= 80) {
    levelText = "Advanced";
    badgeColor = "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300";
  }

  return (
    <div className="glass-panel p-5 rounded-2xl hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3 mb-4">
        
        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {skill.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Level Tag */}
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
          {levelText}
        </span>

      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>Proficiency</span>
          <span className="font-mono">{level}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500 group-hover:brightness-110"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

    </div>
  );
}
