import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/80 border border-gray-800/80 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-md p-8 sm:p-10 text-center">
          {/* Warning Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Small Label */}
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 mb-3">
            D-Light Security
          </p>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Access Denied
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
            You don't have permission to access the admin panel. Please sign in
            with an authorized administrator account.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/login"
              className="
                block w-full
                rounded-xl
                bg-gradient-to-r
                from-yellow-400
                to-yellow-500
                py-3
                px-6
                text-sm
                font-semibold
                text-gray-900
                shadow-lg
                shadow-yellow-500/20
                hover:from-yellow-300
                hover:to-yellow-400
                transition-all
                duration-200
              "
            >
              Sign In
            </Link>

            <Link
              to="/"
              className="
                block w-full
                rounded-xl
                border
                border-gray-700
                bg-gray-800/60
                py-3
                px-6
                text-sm
                font-semibold
                text-gray-200
                hover:bg-gray-800
                hover:text-white
                transition-all
                duration-200
              "
            >
              Go to Store
            </Link>
          </div>

          {/* Brand */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm font-semibold text-yellow-400">D-Light</p>
            <p className="text-xs text-gray-500 mt-1">
              Electric & Electronic Store
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
