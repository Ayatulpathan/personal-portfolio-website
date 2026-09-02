import React from "react";
import { Download, Printer, FileText, ExternalLink, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Button from "../components/common/Button";
import { formatDate } from "../utils/helpers";
import Loader from "../components/common/Loader";

export default function Resume() {
  const { profile, skills, experience, education, research, loading } = usePortfolio();

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loader text="Preparing resume document..." />;
  }

  const resumeDownloadUrl = profile?.resumeUrl && profile.resumeUrl !== "#" ? profile.resumeUrl : "#";

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel no-print">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Curriculum Vitae & Resume</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span>Print Resume</span>
          </Button>
          {resumeDownloadUrl !== "#" ? (
            <a href={resumeDownloadUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>
            </a>
          ) : (
            <Button variant="primary" size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4" />
              <span>Save as PDF (Print)</span>
            </Button>
          )}
        </div>
      </div>

      {/* Styled Printable Resume Document */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8 sm:p-14 space-y-10 text-gray-900 dark:text-gray-100 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {profile?.name || "Ayatul Pathan"}
              </h1>
              <p className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                {profile?.title || "Software Developer | Researcher"}
              </p>
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 pt-2">
            {profile?.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile?.socialLinks?.github && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>github.com</span>
              </div>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {profile?.bio}
          </p>
        </div>

        {/* Technical Skills Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {["Programming Languages", "Frontend Technologies", "Backend Technologies", "Database", "Tools & DevOps"].map(cat => {
              const catSkills = skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className="space-y-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-200">{cat}:</span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {catSkills.map(s => s.name).join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Work Experience</span>
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-2 border-l-2 border-indigo-500/40 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {exp.position} <span className="font-normal text-gray-500">at {exp.organization}</span>
                  </h3>
                  <span className="text-gray-500 font-medium mt-0.5 sm:mt-0">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate) || "Present"}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-300">{exp.description}</p>
                )}
                {exp.responsibilities && (
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between text-xs gap-1 border-l-2 border-cyan-500/40 pl-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {edu.degree} {edu.subject ? `in ${edu.subject}` : ""}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {edu.institution} {edu.result ? `• ${edu.result}` : ""}
                  </p>
                </div>
                <span className="text-gray-500 font-medium shrink-0">
                  {edu.startYear} — {edu.endYear || "Present"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Research Papers */}
        {research && research.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Research Publications</span>
            </h2>
            <div className="space-y-3">
              {research.map((res) => (
                <div key={res.id} className="text-xs space-y-1 border-l-2 border-purple-500/40 pl-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {res.title}
                  </h3>
                  {res.publicationInfo && (
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {res.publicationInfo} ({res.year})
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
