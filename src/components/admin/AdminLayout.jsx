import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCircle, 
  FolderGit2, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  LogOut, 
  Flame, 
  Database, 
  RefreshCw, 
  ArrowLeft,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import Button from "../common/Button";

export default function AdminLayout({ activeTab, setActiveTab, children }) {
  const { logout, currentUser, isFirebaseConfigured } = useAuth();
  const { messages, seedToFirestore, resetToDefaults } = usePortfolio();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  const unreadMessagesCount = messages?.filter(m => m.status === "unread").length || 0;

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile & Social", icon: UserCircle },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "research", label: "Research", icon: BookOpen },
    { 
      id: "messages", 
      label: "Messages", 
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null 
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSeed = async () => {
    if (!window.confirm("Seed all initial sample data into your connected Cloud Firestore database?")) return;
    try {
      setSeeding(true);
      await seedToFirestore();
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset all local portfolio data to standard default demo records?")) return;
    resetToDefaults();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#080C14] text-gray-900 dark:text-gray-100 flex flex-col lg:flex-row transition-colors duration-300">
      
      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm">Admin Dashboard</span>
        </div>
        <Link to="/" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        <div className="space-y-6">
          {/* Brand & User Info */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                &lt;/&gt;
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">Admin CMS</h2>
                <p className="text-[10px] text-gray-500">React + Firebase</p>
              </div>
            </Link>
          </div>

          {/* Connection Status Pill */}
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{isFirebaseConfigured ? "Live Firebase" : "Local Mode"}</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          
          {isFirebaseConfigured ? (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{seeding ? "Seeding..." : "Seed to Firestore"}</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Records</span>
            </button>
          )}

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Portfolio</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
