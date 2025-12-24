import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navbar - Updated to match Landing */}
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-6 text-white">
        <div className="text-2xl md:text-3xl font-bold tracking-tight bg-linear-to-br from-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Uplift Wash
        </div>
        <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20">
          <h2 className="text-4xl font-extrabold text-white mb-2 text-center">
            Create Account
          </h2>
          <p className="text-white/80 text-center mb-8">
            Join Uplift Wash today
          </p>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Choose a username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Create a password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <p className="text-white/60 text-xs mt-1 ml-2">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-2">
              I want to join as
            </label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                value={form.role}
              >
                <option value="CUSTOMER" className="bg-gray-900 text-white">
                  Customer - Looking for laundry services
                </option>
                <option value="PROVIDER" className="bg-gray-900 text-white">
                  Provider - Offering laundry services
                </option>
                <option value="ADMIN" className="bg-gray-900 text-white">
                  Admin - System administrator
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-white">
                <svg
                  className="fill-current h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500 text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] mb-4"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-white/80">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-300 font-semibold hover:text-blue-200 hover:underline transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Role Info Cards */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white font-medium text-center mb-4">
              Choose your role:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  form.role === "CUSTOMER"
                    ? "bg-blue-500/20 border-blue-300/50 shadow-lg"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
                onClick={() => setForm({ ...form, role: "CUSTOMER" })}
              >
                <div className="flex items-center cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 transition-all duration-300 ${
                      form.role === "CUSTOMER"
                        ? "bg-blue-400 ring-2 ring-blue-300"
                        : "bg-white/30"
                    }`}
                  ></div>
                  <span
                    className={`font-bold ${
                      form.role === "CUSTOMER"
                        ? "text-blue-300"
                        : "text-white/90"
                    }`}
                  >
                    Customer
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-1 ml-7">
                  Find laundry services near you
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  form.role === "PROVIDER"
                    ? "bg-indigo-500/20 border-indigo-300/50 shadow-lg"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
                onClick={() => setForm({ ...form, role: "PROVIDER" })}
              >
                <div className="flex items-center cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 transition-all duration-300 ${
                      form.role === "PROVIDER"
                        ? "bg-indigo-400 ring-2 ring-indigo-300"
                        : "bg-white/30"
                    }`}
                  ></div>
                  <span
                    className={`font-bold ${
                      form.role === "PROVIDER"
                        ? "text-indigo-300"
                        : "text-white/90"
                    }`}
                  >
                    Provider
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-1 ml-7">
                  Offer laundry services to customers
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  form.role === "ADMIN"
                    ? "bg-purple-500/20 border-purple-300/50 shadow-lg"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
                onClick={() => setForm({ ...form, role: "ADMIN" })}
              >
                <div className="flex items-center cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 transition-all duration-300 ${
                      form.role === "ADMIN"
                        ? "bg-purple-400 ring-2 ring-purple-300"
                        : "bg-white/30"
                    }`}
                  ></div>
                  <span
                    className={`font-bold ${
                      form.role === "ADMIN"
                        ? "text-purple-300"
                        : "text-white/90"
                    }`}
                  >
                    Admin
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-1 ml-7">
                  System administrator access
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Matching Landing Page */}
      <footer className="w-full py-8 px-4 text-center text-white/70 border-t border-white/10">
        <p className="mb-2">© 2024 Uplift Wash. All rights reserved.</p>
        <p className="text-sm">Simplifying laundry services worldwide</p>
      </footer>
    </div>
  );
}