import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", form);
      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "CUSTOMER") navigate('/home');
      if (user.role === "PROVIDER") navigate("/provider");
      if (user.role === "ADMIN") navigate("/admin");

    } catch (err) {
      alert("Invalid username or password");
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
            Welcome Back
          </h2>
          <p className="text-white/80 text-center mb-8">
            Sign in to your Uplift Wash account
          </p>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] mb-4"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-white/80">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-300 font-semibold hover:text-blue-200 hover:underline transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Role Selection */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/80 text-sm text-center mb-4">
              Quick login for demo (optional):
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setForm({ username: "customer", password: "demo123" })}
                className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-300/30 text-blue-300 font-medium hover:bg-blue-500/30 transition-all duration-300"
              >
                Customer
              </button>
              <button
                onClick={() => setForm({ username: "provider", password: "demo123" })}
                className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-300/30 text-indigo-300 font-medium hover:bg-indigo-500/30 transition-all duration-300"
              >
                Provider
              </button>
              <button
                onClick={() => setForm({ username: "admin", password: "demo123" })}
                className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-300/30 text-purple-300 font-medium hover:bg-purple-500/30 transition-all duration-300"
              >
                Admin
              </button>
            </div>
            <p className="text-white/60 text-xs text-center mt-3">
              Note: These are demo credentials for testing
            </p>
          </div>

          {/* Role Info (Visual Guide) */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm text-center mb-3">
              After login, you'll be redirected based on your role:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <div className="text-xs font-semibold text-blue-300">CUSTOMER</div>
                <div className="text-xs text-white/60">→ Home</div>
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <div className="text-xs font-semibold text-indigo-300">PROVIDER</div>
                <div className="text-xs text-white/60">→ Provider Dashboard</div>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <div className="text-xs font-semibold text-purple-300">ADMIN</div>
                <div className="text-xs text-white/60">→ Admin Panel</div>
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