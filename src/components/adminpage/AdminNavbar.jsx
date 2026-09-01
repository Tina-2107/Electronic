// components/admin/AdminNavbar.jsx
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/images/LOGO.png";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const AdminNavbar = ({ sidebarOpen, toggleSidebar }) => {
  const [notifications, setNotifications] = useState([]);
  const hasUnread = notifications.some((n) => !n.read);
  const [showNotifications, setShowNotifications] = useState(false); // controls popup

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // Listen to products and orders
  useEffect(() => {
    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const newNotifications = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const stock = Number(data.stock) || 0;

          if (stock < 5) {
            newNotifications.push({
              id: `low-stock-${doc.id}`,
              type: "LOW_STOCK",
              message: `${data.name} has low stock (${stock}).`,
              createdAt: new Date(),
              read: false,
            });
          }
        });

        setNotifications((prev) => {
          const merged = [...prev, ...newNotifications];
          return merged.filter(
            (n, i) => merged.findIndex((m) => m.id === n.id) === i,
          );
        });
      },
    );

    const unsubscribeOrders = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const newNotifications = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const status = data.status;
          const id = `order-${doc.id}`;

          if (status === "placed") {
            newNotifications.push({
              id,
              type: "NEW_ORDER",
              message: `New order placed (#${doc.id}).`,
              createdAt: new Date(),
              read: false,
            });
          } else if (status === "cancelled") {
            newNotifications.push({
              id,
              type: "ORDER_CANCELLED",
              message: `Order #${doc.id} was cancelled.`,
              createdAt: new Date(),
              read: false,
            });
          }
        });

        setNotifications((prev) => {
          const merged = [...prev, ...newNotifications];
          return merged.filter(
            (n, i) => merged.findIndex((m) => m.id === n.id) === i,
          );
        });
      },
    );

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  const clearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`
        bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40
        ${sidebarOpen ? "pr-64" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left: Logo + Sidebar Toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg ">
                <img
                  src={Logo}
                  alt="D-Light Admin"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  D-Light Store
                </p>
              </div>
            </div>
          </div>

          {/* Center: Search (Tablet+) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              title="Notifications"
            >
              <BellIcon className="h-6 w-6" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 border-2 border-white rounded-full" />
              )}
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifications
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 border-l-4 ${
                          n.read
                            ? "border-transparent"
                            : "border-blue-500 bg-blue-50"
                        } hover:bg-gray-50`}
                      >
                        <p
                          className={`text-sm ${
                            n.read
                              ? "text-gray-700"
                              : "text-gray-900 font-medium"
                          }`}
                        >
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {n.createdAt.toLocaleTimeString("en-IN")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {/* User Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/50">
                  <span className="text-white font-bold text-sm drop-shadow-sm">
                    {user?.displayName?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      "A"}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                    {user?.displayName || user?.email?.split("@")[0] || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    Administrator
                  </p>
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-white/95 backdrop-blur-md divide-y divide-gray-100 rounded-2xl shadow-2xl ring-1 ring-black/10 z-50 border border-gray-100">
                  <div className="py-2 px-3">
                    <div className="flex items-center space-x-3 p-2 -m-2 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user?.displayName?.[0]?.toUpperCase() || "A"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.displayName || user?.email || "Admin User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/admin/profile"
                          className={`flex items-center px-4 py-3 text-sm w-full rounded-xl transition-colors duration-150 ${
                            active
                              ? "bg-gray-100 text-gray-900 shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <UsersIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          My Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/admin/settings"
                          className={`flex items-center px-4 py-3 text-sm w-full rounded-xl transition-colors duration-150 ${
                            active
                              ? "bg-gray-100 text-gray-900 shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <CogIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center rounded-xl transition-colors duration-150 ${
                            active
                              ? "bg-red-50 text-red-700 border-t border-red-100"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
