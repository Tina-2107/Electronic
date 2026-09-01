// components/admin/AdminLayout.jsx
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  console.log("AdminLayout - isAdmin:", isAdmin); // Should be true

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Navbar */}
      <AdminNavbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main
          className="
                flex-1
                min-w-0
                p-4 sm:p-6 lg:p-8
                overflow-y-auto
              "
        >
          {/* Content Container */}
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
