import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Heart, 
  Flame, 
  Code2, 
  ArrowUp,
  Shield
} from "lucide-react";
import { Github, Linkedin, Facebook, Twitter } from "./SocialIcons";
import { usePortfolio } from "../../context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800/80 bg-white/50 dark:bg-gray-950/60 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Bio & Branding */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
                &lt;/&gt;
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                {profile?.name || "Ayatul Pathan"}
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              {profile?.tagline || "Software Developer & Researcher. Building scalable web architectures and exploring intelligent distributed systems."}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
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
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.socialLinks?.facebook && (
                <a
                  href={profile.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {profile?.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Research & Papers
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Work Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/resume" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  View / Download Resume
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Academic History
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Get In Touch
                </Link>
              </li>
              <li>
                <Link to="/login" className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  <Shield className="w-3.5 h-3.5" />
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>&copy; {currentYear} {profile?.name || "Ayatul Pathan"}. Built with</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">React.js</span>
            <span>&</span>
            <span className="font-semibold text-amber-500 flex items-center gap-0.5">
              <Flame className="w-3 h-3" /> Firebase
            </span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
