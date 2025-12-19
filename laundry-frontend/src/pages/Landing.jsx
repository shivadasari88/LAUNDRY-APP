import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-10 py-4 text-white">
        <div className="text-2xl font-bold tracking-tight">
          Uplift Wash
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Laundry Made Simple
        </h1>

        <p className="text-lg md:text-xl max-w-2xl text-white/90 mb-1">
          Connects customers with the best laundry services nearby.
        </p>
        <p className="text-lg md:text-xl max-w-2xl text-white/90 mb-10">
          Uplift Wash takes the weight off your shoulders.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-10 py-3 rounded-full bg-white text-blue-700 font-semibold text-lg shadow-md hover:bg-gray-200"
          >
            Join Now
          </Link>

          <Link
            to="/login"
            className="px-10 py-3 rounded-full bg-white border border-white text-blue-700 font-semibold text-lg hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}

