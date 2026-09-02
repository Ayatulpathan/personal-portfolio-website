import React, { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardOverview from "../components/admin/DashboardOverview";
import ProfileManager from "../components/admin/ProfileManager";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import EducationManager from "../components/admin/EducationManager";
import ResearchManager from "../components/admin/ResearchManager";
import MessageManager from "../components/admin/MessageManager";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "overview" && <DashboardOverview setActiveTab={setActiveTab} />}
      {activeTab === "profile" && <ProfileManager />}
      {activeTab === "projects" && <ProjectManager />}
      {activeTab === "skills" && <SkillManager />}
      {activeTab === "experience" && <ExperienceManager />}
      {activeTab === "education" && <EducationManager />}
      {activeTab === "research" && <ResearchManager />}
      {activeTab === "messages" && <MessageManager />}
    </AdminLayout>
  );
}
