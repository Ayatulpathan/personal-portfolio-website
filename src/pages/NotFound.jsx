import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4 max-w-md">
        <div className="text-7xl font-extrabold text-gradient">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The requested page could not be located. It may have been moved or removed.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
