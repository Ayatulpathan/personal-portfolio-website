import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Terminal 
} from "lucide-react";
import { Github, Linkedin } from "../common/SocialIcons";
import { usePortfolio } from "../../context/PortfolioContext";
import Button from "../common/Button";

export default function Hero() {
  const { profile, projects, research, experience } = usePortfolio();

  const name = profile?.name || "Ayatul Pathan";
  const title = profile?.title || "Software Developer | Researcher | Technology Enthusiast";
  const bio = profile?.bio || "Building modern, scalable web applications with React.js and Firebase, while researching intelligent distributed architectures.";
  const avatarUrl = profile?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 pb-16 lg:pb-24">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTAs (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Software Engineering & Research Roles
            </div>

            {/* Main Greeting */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-400">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                <span className="text-gradient">{name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-indigo-600 dark:text-indigo-400 pt-1">
                {title}
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/projects">
                <Button variant="primary" size="lg" className="shadow-indigo-500/30">
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/resume">
                <Button variant="secondary" size="lg">
                  <Download className="w-4 h-4 mr-1" />
                  <span>Download Resume</span>
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <span>Contact Me</span>
                </Button>
              </Link>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Connect:
              </span>
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Profile Visual & Metrics (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Avatar Frame with gradient ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-400 to-purple-600 animate-gradient blur-lg opacity-70"></div>
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 dark:border-gray-700/60 bg-gray-900 shadow-2xl">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel text-xs text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-medium">React + Firebase</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    ● Active
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Counters Banner */}
            <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {projects?.length || "10"}+
                </div>
                <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  Projects
                </div>
              </div>

              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {experience?.length || "2"}+
                </div>
                <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  Positions
                </div>
              </div>

              <div className="glass-panel p-3.5 rounded-2xl text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {research?.length || "3"}
                </div>
                <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  Papers
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
