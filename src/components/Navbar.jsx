import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">🚀</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">MyLaunch</span>
              <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-md">
                BETA
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">
              Testimonials
            </a>
            <a href="#faq" className="text-gray-600 hover:text-indigo-500 px-3 py-2 text-sm font-medium">
              FAQ
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center">
            <button
              onClick={goToLogin}
              className="hidden md:block bg-gradient hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all mr-3 shadow-sm border border-gray-200"
            >
              Login
            </button>
            <button
              onClick={goToRegister}
              className="bg-gradient text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button onClick={handleToggle} className="text-gray-600 hover:text-indigo-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">
              Features
            </a>
            <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">
              How It Works
            </a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">
              Pricing
            </a>
            <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">
              Testimonials
            </a>
            <a href="#faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50">
              FAQ
            </a>
            <button
              onClick={goToLogin}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gradient"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
