// components/admin/AdminSidebar.jsx
import Logo from "../../assets/images/LOGO.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ShoppingBagIcon,
  ArchiveBoxIcon,
  Bars3Icon,
  ChartBarIcon,
  CreditCardIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const adminMenu = [
    {
      name: "Dashboard",
      icon: ChartBarIcon,
      path: "/admin/dashboard",
    },
    {
      name: "Manage Products",
      icon: ShoppingBagIcon,
      path: "/admin/products",
    },
    {
      name: "Add Product",
      icon: PlusIcon,
      path: "/admin/add-product",
    },
    {
      name: "Manage Stock",
      icon: ArchiveBoxIcon,
      path: "/admin/stock",
    },
    {
      name: "Orders",
      icon: CreditCardIcon,
      path: "/admin/orders",
    },
  ];
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
                    fixed lg:sticky
                    top-0 left-0
                    z-50
                    w-64
                    h-screen
                    flex flex-col flex-shrink-0
                    bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800
                    border-r border-gray-800
                    shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                        `}
      >
        {/* Logo/Header */}
        <div className="h-20 px-5 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <img
              src={Logo}
              alt="Dlight Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white truncate">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400">D-Light Store</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-6 space-y-2">
          {adminMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200
                      group
                      ${
                        isActive
                          ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }
                    `}
              onClick={() => isOpen && onClose()}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section - Profile & Logout */}
        <div className="mt-auto p-4 border-t border-gray-800 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.displayName?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0 ">
              <p className="font-semibold text-white text-sm truncate">
                {user?.displayName || user?.email?.split("@")[0] || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition font-semibold"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="xl:block hidden">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
