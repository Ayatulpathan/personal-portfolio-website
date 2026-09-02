import React, { useState } from "react";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import FeaturedProjects from "../components/home/FeaturedProjects";
import ProjectModal from "../components/projects/ProjectModal";
import { usePortfolio } from "../context/PortfolioContext";
import Loader from "../components/common/Loader";

export default function Home() {
  const { loading } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return <Loader text="Loading portfolio content..." />;
  }

  return (
    <div className="space-y-6">
      <Hero />
      <AboutPreview />
      <FeaturedProjects onSelectProject={(p) => setSelectedProject(p)} />
      
      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
