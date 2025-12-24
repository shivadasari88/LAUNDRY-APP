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
    <div className="flex flex-col w-full min-h-screen bg-linear-to-r from-blue-500 to-indigo-700">
      {/* Navbar - Same as Landing */}
      <header className="w-full flex items-center justify-between px-4 md:px-10 py-4 text-white">
        <div className="text-2xl font-bold tracking-tight">
          Uplift Wash
        </div>
        <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <Link
            to="/"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Sign in to your Uplift Wash account
          </p>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Enter your username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg mb-4"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Role Selection (Optional) */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center mb-3">
              Quick login for demo (optional):
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setForm({ username: "customer", password: "demo123" })}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200"
              >
                Customer
              </button>
              <button
                onClick={() => setForm({ username: "provider", password: "demo123" })}
                className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200"
              >
                Provider
              </button>
              <button
                onClick={() => setForm({ username: "admin", password: "demo123" })}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}