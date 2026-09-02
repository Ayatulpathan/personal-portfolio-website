import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  icon: Icon,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-500 active:scale-[0.98]",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 focus:ring-gray-500 active:scale-[0.98]",
    outline: "border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-transparent focus:ring-indigo-500",
    gradient: "bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-500 active:scale-[0.98]",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/25 focus:ring-rose-500 active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}
