import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700/50 bg-gray-900/95 border border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-md z-50">
          {/* Authenticated User */}
          {user ? (
            <>
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-white truncate">
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleProfile}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 rounded-lg ${
                        active ? "bg-gray-800/60 text-white" : "text-gray-200"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 rounded-lg ${
                        active ? "bg-gray-800/60 text-white" : "text-gray-200"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Orders
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 rounded-lg ${
                        active
                          ? "bg-red-500/20 text-red-300 border-t border-gray-700/50"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </>
          ) : (
            /* Unauthenticated User */
            <div className="py-2 space-y-1 px-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogin}
                    className={`w-full text-center py-2.5 text-sm rounded-xl font-semibold ${
                      active
                        ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                        : "text-gray-200 hover:bg-gray-800/50"
                    }`}
                  >
                    Sign In
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSignup}
                    className={`w-full text-center py-2.5 text-sm rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 ${
                      active
                        ? "from-yellow-300 shadow-lg shadow-yellow-500/30"
                        : "shadow-md shadow-yellow-500/20"
                    }`}
                  >
                    Sign Up
                  </button>
                )}
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
