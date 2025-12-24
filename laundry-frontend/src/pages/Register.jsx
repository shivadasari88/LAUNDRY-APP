import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", form);
      alert(res.data);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
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
            Create Account
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Join Uplift Wash today
          </p>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Choose a username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Create a password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <p className="text-gray-500 text-xs mt-1 ml-1">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              I want to join as
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 appearance-none bg-white cursor-pointer"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="CUSTOMER">Customer - Looking for laundry services</option>
                <option value="PROVIDER">Provider - Offering laundry services</option>
                <option value="ADMIN">Admin - System administrator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg mb-4"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Role Info Cards */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-700 font-medium text-center mb-4">
              Choose your role:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className={`p-3 rounded-xl border ${form.role === "CUSTOMER" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${form.role === "CUSTOMER" ? "bg-blue-500" : "bg-gray-400"}`}></div>
                  <span className={`font-medium ${form.role === "CUSTOMER" ? "text-blue-700" : "text-gray-600"}`}>
                    Customer
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-6">Find laundry services near you</p>
              </div>
              
              <div className={`p-3 rounded-xl border ${form.role === "PROVIDER" ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${form.role === "PROVIDER" ? "bg-indigo-500" : "bg-gray-400"}`}></div>
                  <span className={`font-medium ${form.role === "PROVIDER" ? "text-indigo-700" : "text-gray-600"}`}>
                    Provider
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 ml-6">Offer laundry services to customers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}