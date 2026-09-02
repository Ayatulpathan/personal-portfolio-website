import React from "react";

export default function Loader({ text = "Loading portfolio..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
        <div className="absolute w-8 h-8 rounded-full border-4 border-cyan-200 dark:border-cyan-900 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
