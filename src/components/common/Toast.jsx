import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function Toast() {
  const { toast } = usePortfolio();

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-bounce transition-all duration-300 max-w-md bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800">
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
      {isError && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
      {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-500 shrink-0" />}
      <p className="text-sm font-medium">{toast.message}</p>
    </div>
  );
}
