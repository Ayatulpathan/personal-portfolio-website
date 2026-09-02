import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Github, Linkedin, Facebook, Twitter } from "../components/common/SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";
import ContactForm from "../components/contact/ContactForm";
import Loader from "../components/common/Loader";

export default function Contact() {
  const { profile, loading } = usePortfolio();

  if (loading) {
    return <Loader text="Loading contact details..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Let's Start a Conversation
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Whether you have a software development project, research collaboration, or career opportunity, feel free to connect!
        </p>
      </div>

      {/* Grid: Contact Information & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Info (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h3>
            
            <div className="space-y-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {profile.email}
                    </span>
                  </div>
                </a>
              )}

              {profile?.phone && (
                <div className="flex items-start gap-3.5 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                      Phone Number
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {profile.phone}
                    </span>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-start gap-3.5 p-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {profile.location}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 p-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">
                    Response Time
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Typically within 24 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-3">
                Social & Professional Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
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
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
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
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
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
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

    </div>
  );
}
