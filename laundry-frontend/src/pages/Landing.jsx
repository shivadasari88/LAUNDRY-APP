import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navbar */}
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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 text-white">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
          Laundry Made
          <span className="block bg-linear-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Simple
          </span>
        </h1>

        <div className="max-w-3xl mb-12 space-y-4">
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Connects customers with the best laundry services nearby.
          </p>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Uplift Wash takes the weight off your shoulders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <Link
            to="/register"
            className="px-12 py-4 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Join Now
          </Link>

          <Link
            to="/login"
            className="px-12 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Fast Service</h3>
            <p className="text-white/80">Quick pickup and delivery in your area</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
            <p className="text-white/80">Professional cleaning with care</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-3">Easy Payment</h3>
            <p className="text-white/80">Secure and convenient payment options</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 text-center text-white/70 border-t border-white/10">
        <p className="mb-2">© 2024 Uplift Wash. All rights reserved.</p>
        <p className="text-sm">Simplifying laundry services worldwide</p>
      </footer>
    </div>
  );
}