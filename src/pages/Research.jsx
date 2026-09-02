import React from "react";
import { BookOpen, Award, FileText, Cpu, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ResearchCard from "../components/research/ResearchCard";
import Loader from "../components/common/Loader";

export default function Research() {
  const { research, loading } = usePortfolio();

  if (loading) {
    return <Loader text="Loading research publications..." />;
  }

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic & Applied Research</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Research Papers & Publications
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Exploring deep learning architectures, time-series anomaly detection algorithms, and cloud serverless performance benchmarks.
        </p>
      </div>

      {/* Research Papers List */}
      <div className="space-y-8">
        {research.map((res) => (
          <ResearchCard key={res.id} research={res} />
        ))}
      </div>

      {/* Research Interests Footer */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 text-center max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>Active Research Domains</span>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Self-supervised representation learning, distributed edge AI telemetry, microservices orchestration benchmarking, and real-time medical image analysis.
        </p>
      </div>

    </div>
  );
}
