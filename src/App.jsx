import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Toast from "./components/common/Toast";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Research from "./pages/Research";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Toast Notification Container */}
      <Toast />

      {/* Render Public Navbar unless in admin dashboard */}
      {!isAdminRoute && <Navbar />}

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/research" element={<Research />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin CMS Route */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Render Public Footer unless in admin dashboard */}
      {!isAdminRoute && <Footer />}

    </div>
  );
}
