import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, User, Tag, MessageSquare } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { validateContactForm } from "../../utils/validators";
import Button from "../common/Button";

export default function ContactForm() {
  const { sendMessage } = usePortfolio();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      await sendMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border-emerald-500/30 dark:border-emerald-500/30">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Message Sent Successfully!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Your inquiry has been stored securely, and I will get back to you as soon as possible.
        </p>
        <div className="pt-4">
          <Button variant="outline" size="md" onClick={() => setSubmitted(false)}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Send a Direct Message
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Fill in the fields below and click submit to send your message.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-500" />
            <span>Your Full Name *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.name 
                ? "border-rose-500 focus:ring-rose-500/20" 
                : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-500" />
            <span>Your Email Address *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email 
                ? "border-rose-500 focus:ring-rose-500/20" 
                : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-500" />
            <span>Subject *</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Project Collaboration / Job Inquiry"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.subject 
                ? "border-rose-500 focus:ring-rose-500/20" 
                : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span>Your Message *</span>
          </label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message details here..."
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
              errors.message 
                ? "border-rose-500 focus:ring-rose-500/20" 
                : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </p>
          )}
        </div>

      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        <Send className="w-4 h-4 mr-2" />
        <span>Send Message</span>
      </Button>
    </form>
  );
}
