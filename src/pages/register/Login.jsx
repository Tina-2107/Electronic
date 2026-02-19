import Logo from "../../assets/images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Login.jsx - FIXED useEffect
  // Login.jsx - CRITICAL FIX
  const { user, loading: authLoading } = useAuth(); // ✅ Get LOADING state

  useEffect(() => {
    console.log("🔍 Login useEffect:", {
      user,
      authLoading,
      isAdmin: user?.isAdmin,
    });

    // ✅ WAIT for AuthContext to finish loading
    if (authLoading || !user) {
      console.log("⏳ Waiting for full auth load...");
      return;
    }

    console.log("✅ FULLY LOADED - Role:", user.role, "isAdmin:", user.isAdmin);

    // ✅ ADMIN REDIRECT
    if (user.isAdmin || user.role === "admin") {
      console.log("🚀 → ADMIN DASHBOARD");
      navigate("/admin/dashboard", { replace: true });
    } else {
      console.log("👤 → USER HOME");
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]); // ✅ Include authLoading dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-3xl grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Left side content (hidden on small screens) */}
        <div className="hidden md:flex flex-col space-y-4 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back to{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              D‑Light
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Login to manage your orders, track deliveries, and access exclusive
            deals on electrical &amp; lighting products.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="rounded-2xl bg-gray-900/70 border border-gray-800 p-3">
              <p className="font-semibold text-yellow-300 mb-1">
                Secure payments
              </p>
              <p className="text-gray-400">
                Encrypted checkout and trusted Indian gateways.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-900/70 border border-gray-800 p-3">
              <p className="font-semibold text-yellow-300 mb-1">
                Genuine products
              </p>
              <p className="text-gray-400">
                Direct from authorized brands only.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: login card */}
        <div className="bg-gray-950/90 border border-gray-800/80 rounded-2xl shadow-2xl shadow-black/40 px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-10">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}
          {/* Logo + title */}
          <div className="flex items-center mb-6 sm:mb-8 space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Dlight Logo" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Sign in
              </p>
              <p className="text-lg font-semibold text-white">
                D‑Light Account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
                className="block w-full rounded-xl border border-gray-700 bg-gray-900/80 px-3 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-400/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                placeholder="you@example.com"
              />
            </div>

            {/* Password + Forgot link */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] sm:text-xs font-medium text-yellow-300 hover:text-yellow-200"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // 👁 Toggle here
                  value={form.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-gray-700 bg-gray-900/80 px-3 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 focus:border-yellow-400/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder="••••••••"
                />
                {/* Eye Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.987-7.111m2.32-1.657A9.951 9.951 0 0112 3c5.523 0 10 4.477 10 10a9.96 9.96 0 01-2.987 7.111M9.88 9.88a3 3 0 104.24 4.24"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-gray-600 bg-gray-900 text-yellow-400 focus:ring-yellow-400/50"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Primary button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/40 hover:from-yellow-300 hover:to-orange-400 transition-all"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Log In"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5 sm:mt-6 flex items-center text-xs text-gray-500">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="px-3">or continue with</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Social buttons (optional) */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-3 py-2 text-xs sm:text-sm text-gray-200 hover:bg-gray-800 transition"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-3 py-2 text-xs sm:text-sm text-gray-200 hover:bg-gray-800 transition"
            >
              Facebook
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-5 text-center text-xs sm:text-sm text-gray-400">
            New to D‑Light?{" "}
            <Link
              to="/signup"
              className="text-yellow-300 hover:text-yellow-200 font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
