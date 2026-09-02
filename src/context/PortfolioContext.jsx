import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioService } from "../services/portfolioService";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [research, setResearch] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        profData,
        skillsData,
        projectsData,
        expData,
        eduData,
        resData,
        msgData
      ] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getSkills(),
        portfolioService.getProjects(),
        portfolioService.getExperience(),
        portfolioService.getEducation(),
        portfolioService.getResearch(),
        portfolioService.getMessages()
      ]);

      setProfile(profData);
      setSkills(skillsData);
      setProjects(projectsData);
      setExperience(expData);
      setEducation(eduData);
      setResearch(resData);
      setMessages(msgData);
    } catch (err) {
      console.error("Error loading portfolio data:", err);
      showToast("Error loading portfolio data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- Profile Actions ----------------
  const updateProfile = async (data) => {
    try {
      const updated = await portfolioService.updateProfile(data);
      setProfile(updated);
      showToast("Profile successfully updated!");
      return updated;
    } catch (err) {
      showToast(err.message || "Failed to update profile", "error");
      throw err;
    }
  };

  // ---------------- Skills Actions ----------------
  const addSkill = async (data) => {
    try {
      const newSkill = await portfolioService.addSkill(data);
      setSkills(prev => [...prev, newSkill]);
      showToast("Skill added successfully!");
      return newSkill;
    } catch (err) {
      showToast("Failed to add skill", "error");
      throw err;
    }
  };

  const updateSkill = async (id, data) => {
    try {
      const updated = await portfolioService.updateSkill(id, data);
      setSkills(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
      showToast("Skill updated successfully!");
      return updated;
    } catch (err) {
      showToast("Failed to update skill", "error");
      throw err;
    }
  };

  const deleteSkill = async (id) => {
    try {
      await portfolioService.deleteSkill(id);
      setSkills(prev => prev.filter(s => s.id !== id));
      showToast("Skill removed!");
    } catch (err) {
      showToast("Failed to delete skill", "error");
      throw err;
    }
  };

  // ---------------- Projects Actions ----------------
  const addProject = async (data) => {
    try {
      const newProj = await portfolioService.addProject(data);
      setProjects(prev => [newProj, ...prev]);
      showToast("Project added successfully!");
      return newProj;
    } catch (err) {
      showToast("Failed to add project", "error");
      throw err;
    }
  };

  const updateProject = async (id, data) => {
    try {
      const updated = await portfolioService.updateProject(id, data);
      setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      showToast("Project updated successfully!");
      return updated;
    } catch (err) {
      showToast("Failed to update project", "error");
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await portfolioService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      showToast("Project deleted!");
    } catch (err) {
      showToast("Failed to delete project", "error");
      throw err;
    }
  };

  // ---------------- Experience Actions ----------------
  const addExperience = async (data) => {
    try {
      const newExp = await portfolioService.addExperience(data);
      setExperience(prev => [newExp, ...prev]);
      showToast("Experience record added!");
      return newExp;
    } catch (err) {
      showToast("Failed to add experience", "error");
      throw err;
    }
  };

  const updateExperience = async (id, data) => {
    try {
      const updated = await portfolioService.updateExperience(id, data);
      setExperience(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
      showToast("Experience record updated!");
      return updated;
    } catch (err) {
      showToast("Failed to update experience", "error");
      throw err;
    }
  };

  const deleteExperience = async (id) => {
    try {
      await portfolioService.deleteExperience(id);
      setExperience(prev => prev.filter(e => e.id !== id));
      showToast("Experience record deleted!");
    } catch (err) {
      showToast("Failed to delete experience", "error");
      throw err;
    }
  };

  // ---------------- Education Actions ----------------
  const addEducation = async (data) => {
    try {
      const newEdu = await portfolioService.addEducation(data);
      setEducation(prev => [newEdu, ...prev]);
      showToast("Education record added!");
      return newEdu;
    } catch (err) {
      showToast("Failed to add education", "error");
      throw err;
    }
  };

  const updateEducation = async (id, data) => {
    try {
      const updated = await portfolioService.updateEducation(id, data);
      setEducation(prev => prev.map(ed => ed.id === id ? { ...ed, ...data } : ed));
      showToast("Education record updated!");
      return updated;
    } catch (err) {
      showToast("Failed to update education", "error");
      throw err;
    }
  };

  const deleteEducation = async (id) => {
    try {
      await portfolioService.deleteEducation(id);
      setEducation(prev => prev.filter(ed => ed.id !== id));
      showToast("Education record deleted!");
    } catch (err) {
      showToast("Failed to delete education", "error");
      throw err;
    }
  };

  // ---------------- Research Actions ----------------
  const addResearch = async (data) => {
    try {
      const newRes = await portfolioService.addResearch(data);
      setResearch(prev => [newRes, ...prev]);
      showToast("Research publication added!");
      return newRes;
    } catch (err) {
      showToast("Failed to add research", "error");
      throw err;
    }
  };

  const updateResearch = async (id, data) => {
    try {
      const updated = await portfolioService.updateResearch(id, data);
      setResearch(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
      showToast("Research publication updated!");
      return updated;
    } catch (err) {
      showToast("Failed to update research", "error");
      throw err;
    }
  };

  const deleteResearch = async (id) => {
    try {
      await portfolioService.deleteResearch(id);
      setResearch(prev => prev.filter(r => r.id !== id));
      showToast("Research publication deleted!");
    } catch (err) {
      showToast("Failed to delete research", "error");
      throw err;
    }
  };

  // ---------------- Messages Actions ----------------
  const sendMessage = async (data) => {
    try {
      const newMsg = await portfolioService.sendMessage(data);
      setMessages(prev => [newMsg, ...prev]);
      showToast("Message sent successfully! Thank you for reaching out.");
      return newMsg;
    } catch (err) {
      showToast("Failed to send message. Please try again.", "error");
      throw err;
    }
  };

  const updateMessageStatus = async (id, status) => {
    try {
      await portfolioService.updateMessageStatus(id, status);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    } catch (err) {
      showToast("Failed to update message status", "error");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await portfolioService.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast("Message deleted!");
    } catch (err) {
      showToast("Failed to delete message", "error");
    }
  };

  // ---------------- Seed / Reset ----------------
  const seedToFirestore = async () => {
    try {
      await portfolioService.seedInitialDataToFirestore();
      showToast("Initial sample data seeded into Cloud Firestore!");
      await loadData();
    } catch (err) {
      showToast(err.message || "Failed to seed data to Firestore", "error");
      throw err;
    }
  };

  const resetToDefaults = () => {
    const defaultData = portfolioService.resetLocalState();
    setProfile(defaultData.profile);
    setSkills(defaultData.skills);
    setEducation(defaultData.education);
    setExperience(defaultData.experience);
    setProjects(defaultData.projects);
    setResearch(defaultData.research);
    setMessages(defaultData.messages);
    showToast("Portfolio data reset to default demo records.");
  };

  const value = {
    profile,
    skills,
    projects,
    experience,
    education,
    research,
    messages,
    loading,
    toast,
    showToast,
    refreshData: loadData,
    updateProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addResearch,
    updateResearch,
    deleteResearch,
    sendMessage,
    updateMessageStatus,
    deleteMessage,
    seedToFirestore,
    resetToDefaults
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
