import React from "react";
import { 
  FolderGit2, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Mail, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Button from "../common/Button";
import { formatDate } from "../../utils/helpers";

export default function DashboardOverview({ setActiveTab }) {
  const { 
    projects, 
    skills, 
    experience, 
    education, 
    research, 
    messages, 
    profile, 
    updateMessageStatus,
    deleteMessage
  } = usePortfolio();

  const unreadMessages = messages.filter(m => m.status === "unread");
  const recentMessages = messages.slice(0, 4);

  const stats = [
    { label: "Total Projects", count: projects?.length || 0, icon: FolderGit2, color: "text-indigo-600 dark:text-indigo-400", tab: "projects" },
    { label: "Skills Configured", count: skills?.length || 0, icon: Wrench, color: "text-cyan-600 dark:text-cyan-400", tab: "skills" },
    { label: "Work Experience", count: experience?.length || 0, icon: Briefcase, color: "text-emerald-600 dark:text-emerald-400", tab: "experience" },
    { label: "Academic Records", count: education?.length || 0, icon: GraduationCap, color: "text-amber-600 dark:text-amber-400", tab: "education" },
    { label: "Research Papers", count: research?.length || 0, icon: BookOpen, color: "text-purple-600 dark:text-purple-400", tab: "research" },
    { label: "Visitor Messages", count: messages?.length || 0, icon: MessageSquare, color: "text-rose-600 dark:text-rose-400", tab: "messages", badge: unreadMessages.length > 0 ? `${unreadMessages.length} New` : null },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {profile?.name || "Administrator"}! Manage your portfolio sections below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab("projects")}>
            <Plus className="w-4 h-4 mr-1" />
            <span>New Project</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setActiveTab("profile")}>
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(stat.tab)}
              className="glass-panel p-4 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl bg-gray-100 dark:bg-gray-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                {stat.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-bold">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
                {stat.count}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate mt-0.5">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Recent Visitor Inquiries
            </h3>
          </div>
          <button
            onClick={() => setActiveTab("messages")}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View All ({messages.length}) →
          </button>
        </div>

        {recentMessages.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 dark:text-gray-400">
            No visitor messages received yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 sm:p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      &lt;{msg.email}&gt;
                    </span>
                    {msg.status === "unread" && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold border border-rose-500/20">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-gray-400">
                    {formatDate(msg.createdAt)}
                  </span>
                  {msg.status === "unread" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(msg.id, "read")}
                    >
                      Mark Read
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateMessageStatus(msg.id, "unread")}
                    >
                      Mark Unread
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
