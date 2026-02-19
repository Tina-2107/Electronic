// components/admin/AdminSidebar.jsx
//import { useState } from "react";
import Logo from "../../assets/images/LOGO.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Bars3Icon,
  ChartBarIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  UsersIcon,
  PlusIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const adminMenu = [
    {
      name: "Dashboard",
      icon: ChartBarIcon,
      path: "/admin/dashboard",
      exact: true,
    },
    { name: "Manage Products", icon: ShoppingBagIcon, path: "/admin/products" },
    {
      name: "Products",
      icon: PlusIcon,
      path: "/admin/add-product",
      sub: true,
    },
    { name: "Manage Stock", icon: ShoppingBagIcon, path: "/admin/stock" },
    { name: "Orders", icon: CreditCardIcon, path: "/admin/orders" },
    { name: "Customers", icon: UsersIcon, path: "/admin/customers" },
    { name: "Settings", icon: Cog8ToothIcon, path: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static z-50 top-0 left-0 h-full w-64 lg:w-20 xl:w-64 bg-gradient-to-b from-gray-900 to-gray-800 
        shadow-2xl transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        ${isOpen ? "w-64" : "w-20"} xl:w-64
      `}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <img src={Logo} alt="Dlight Logo" />
          </div>
          <div className="flex-1 min-w-0 xl:block hidden">
            <h2 className="text-xl font-bold text-white truncate">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400">D-Light Store</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 mt-6">
          {adminMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group hover:bg-black/60
                ${
                  isActive
                    ? "bg-yellow-400/20 text-blue-500 border-2 border-yellow-400/40 shadow-lg shadow-yellow-400/20"
                    : "text-black hover:text-white hover:bg-gray-800/60"
                }
              `}
              onClick={() => isOpen && onClose()}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold min-w-0 truncate xl:block hidden">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section - Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.displayName?.[0] || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0 xl:block hidden">
              <p className="font-semibold text-white text-sm truncate">
                {user?.displayName || user?.email?.split("@")[0] || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition font-semibold"
          >
            <span className="xl:block hidden">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
