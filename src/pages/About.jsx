import React from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Target, 
  Sparkles, 
  Compass, 
  Award, 
  Download, 
  Mail, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers 
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Button from "../components/common/Button";

export default function About() {
  const { profile } = usePortfolio();

  const values = [
    {
      title: "Scalable Architecture",
      desc: "Engineering systems with clean separation of concerns, modular components, and extensible cloud integration."
    },
    {
      title: "Data-Driven Research",
      desc: "Applying empirical methodologies and machine learning models to solve complex real-world computing challenges."
    },
    {
      title: "Performance & DX",
      desc: "Prioritizing sub-second rendering, modern web standards, Core Web Vitals, and intuitive developer workflows."
    },
    {
      title: "Continuous Growth",
      desc: "Constantly experimenting with emerging tools, cloud ecosystems, and contributing to open-source software."
    }
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <User className="w-3.5 h-3.5" />
          <span>Professional Profile</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          About & Background
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Discover the journey, engineering philosophy, and research interests shaping my work.
        </p>
      </div>

      {/* Main Grid: Bio & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-6 text-center">
            <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-500/20">
              <img
                src={profile?.profileImage || "/profile.jpg"}
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {profile?.name || "Ayatul Pathan"}
              </h3>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {profile?.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {profile?.location}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs text-left">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">Email:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{profile?.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">Focus:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-200">Full Stack & AI</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-emerald-500">Available</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link to="/resume">
                <Button variant="primary" size="md" className="w-full">
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md" className="w-full">
                  <Mail className="w-4 h-4" />
                  <span>Send a Message</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative & Objectives */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Detailed Biography */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>Who I Am</span>
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {profile?.bio || "I am a dedicated software developer and computer science researcher focused on architecting resilient, user-friendly digital experiences. I bring experience across the entire development lifecycle, from designing responsive frontends with React.js and Tailwind CSS to managing robust backend databases with Cloud Firestore and Node.js."}
              </p>
              <p>
                Throughout my academic and professional journey at Jashore University of Science and Technology and software research laboratories, I have conducted empirical research in machine learning, distributed systems, and modern cloud ecosystems.
              </p>
              <p>
                I thrive in environments where creativity meets analytical rigor—whether optimizing application load times, training machine learning models, or collaborating with teams to deliver impactful software products.
              </p>
            </div>
          </div>

          {/* Career Objectives */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              <span>Career Objectives & Vision</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              My goal is to contribute to pioneering engineering initiatives where modern web technologies and artificial intelligence intersect. I aim to build platforms that solve authentic user pain points while maintaining clean code standards, rigorous test coverage, and high security.
            </p>
          </div>

          {/* Core Values / Principles Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-500" />
              <span>Engineering Principles</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800 space-y-2">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>{v.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
