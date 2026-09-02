import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Code2, 
  Sparkles 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { NAV_LINKS } from "../../utils/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const { profile } = usePortfolio();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "glass-nav shadow-lg shadow-black/5" 
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-sm">&lt;/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {profile?.name ? profile.name.split(" ")[0] : "Ayatul"}
                <span className="text-indigo-500 font-mono">.dev</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400">
                Portfolio & Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions (Theme Toggle & Admin / Login) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Admin Badge / Login Button */}
            {currentUser ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Panel
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-medium hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              {currentUser ? (
                <Link
                  to="/admin"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
