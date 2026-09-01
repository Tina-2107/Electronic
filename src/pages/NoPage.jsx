import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight text-yellow-400">
            404
          </h1>

          <div className="absolute inset-0 blur-3xl bg-yellow-400/10 -z-10" />
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center shadow-xl">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or may have been moved. Even
          websites occasionally lose things. Humanity survives.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-yellow-400
              to-yellow-500
              px-6
              py-3
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
            Go to Home
          </Link>

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-gray-700
              bg-gray-800/60
              px-6
              py-3
              text-sm
              font-semibold
              text-gray-200
              hover:bg-gray-800
              hover:text-white
              transition-all
              duration-200
            "
          >
            Browse Products
          </Link>
        </div>

        {/* Brand */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <p className="text-sm font-semibold text-yellow-400">D-Light</p>

          <p className="text-xs text-gray-500 mt-1">
            Electric & Electronic Store
          </p>
        </div>
      </div>
    </main>
  );
};

export default NoPage;
