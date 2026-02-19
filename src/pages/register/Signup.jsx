import Logo from "../../assets/images/LOGO.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
    role: "customer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [passwordError, setPasswordError] = useState(""); // ✅ Password match error state

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Final validation check
    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      // Additional user profile updates and navigation
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in instead.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    console.log("Signup data:", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
        {/* LEFT SIDE – Brand / Info */}
        <div className="hidden md:flex flex-col h-full justify-center">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Dlight Logo" />
            </div>
            <div>
              <p className="text-xs text-yellow-300 uppercase tracking-[0.2em]">
                D‑Light
              </p>
              <p className="text-base text-gray-300">
                Electric &amp; Electronic Store
              </p>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Create your D‑Light account
          </h1>
          <p className="text-sm lg:text-base text-gray-300 mb-6 max-w-md">
            Sign up to track your orders, save addresses, and get the best deals
            on electrical and lighting products.
          </p>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-xs font-bold">
                ✓
              </span>
              <span>Fast checkout with saved delivery details.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-xs font-bold">
                ✓
              </span>
              <span>Exclusive member‑only offers and coupons.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-xs font-bold">
                ✓
              </span>
              <span>Order history and warranty support in one place.</span>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE – Signup Card */}
        <div className="bg-gray-900/80 border border-gray-800/80 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-md px-5 py-6 sm:px-7 sm:py-8 md:px-8 lg:px-10">
          {/* Mobile heading */}
          <div className="md:hidden mb-6">
            <h1 className="text-2xl font-semibold text-white">
              Create account
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Join D‑Light to get best prices and fast delivery.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                {error}
              </div>
            )}
            {/* Full Name + Phone (stack on mobile, 2‑col on tablet+) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-gray-300 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/80 border border-gray-700/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-300 mb-1.5"
                >
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-700/80 bg-gray-800/80 px-3 text-xs text-gray-300">
                    +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-r-xl bg-gray-800/80 border border-gray-700/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                    placeholder="10‑digit number"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-gray-800/80 border border-gray-700/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            {/* Passwords – stack on mobile, 2‑col on tablet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-300 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/80 border border-gray-700/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                  placeholder="Min 8 characters"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-300 mb-1.5"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/80 border border-gray-700/80 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                  placeholder="Re‑enter password"
                />
                {/* ✅ INLINE ALERT */}
                {passwordError && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            {/* Newsletter + T&C */}
            <div className="space-y-3 pt-1">
              <label className="inline-flex items-center space-x-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={form.newsletter}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400/70"
                />
                <span>Send me offers and updates on email / SMS.</span>
              </label>

              <p className="text-[11px] text-gray-500">
                By creating an account you agree to D‑Light&apos;s{" "}
                <a
                  href="/terms"
                  className="text-yellow-300 hover:text-yellow-200"
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-yellow-300 hover:text-yellow-200"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-2.5 text-sm md:text-base font-semibold text-gray-900 shadow-lg shadow-yellow-500/30 hover:from-yellow-300 hover:to-yellow-400 transition-colors"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login link */}
            <p className="text-xs sm:text-sm text-gray-400 text-center pt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-300 hover:text-yellow-200 font-medium"
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
