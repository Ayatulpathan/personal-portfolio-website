import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Database, Sparkles, GraduationCap, Cpu, CheckCircle } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Button from "../common/Button";

export default function AboutPreview() {
  const { profile, education } = usePortfolio();

  const highlights = [
    {
      icon: Code,
      title: "Frontend & Web Engineering",
      desc: "Architecting interactive Single Page Applications using React.js, Tailwind CSS, and state management."
    },
    {
      icon: Database,
      title: "Firebase & Cloud Backend",
      desc: "Implementing real-time Cloud Firestore, Firebase Authentication, cloud functions, and secure storage."
    },
    {
      icon: Cpu,
      title: "Applied AI & Research",
      desc: "Investigating deep learning architectures, time-series anomaly detection, and empirical software studies."
    }
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-gray-200/70 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Background & Passion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About & Core Competencies
            </h2>
          </div>
          <Link to="/about">
            <Button variant="ghost" size="sm" className="group text-indigo-600 dark:text-indigo-400">
              <span>Read Full Biography</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Academic Footnote */}
        {education && education.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-indigo-600/5 to-cyan-500/10 border border-indigo-200/60 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {education[0].degree} in {education[0].subject}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {education[0].institution} • {education[0].result}
                </p>
              </div>
            </div>
            <Link to="/education">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                View Education Timeline →
              </span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
