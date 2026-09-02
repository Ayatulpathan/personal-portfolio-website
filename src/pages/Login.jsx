import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, currentUser, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Back link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-3xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/25">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Administrator Portal
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign in to manage projects, skills, research, and messages.
            </p>
          </div>

          {/* Mode Badge */}
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {isFirebaseConfigured ? "Firebase Auth Connected" : "Interactive Demo Mode"}
            </span>
            {!isFirebaseConfigured && (
              <button
                type="button"
                onClick={autofillDemo}
                className="underline font-bold hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                Autofill Demo
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              <span>Sign In to Dashboard</span>
            </Button>

          </form>

        </div>

      </div>
    </div>
  );
}
