import React from "react";

// pages/Unauthorized.jsx
const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access admin panel.
        </p>
        <div className="space-y-3">
          <a
            href="/login"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </a>
          <a
            href="/"
            className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-xl hover:bg-gray-200 transition"
          >
            Go to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
