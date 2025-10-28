// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold cursor-pointer">
                TypeMaster
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer"
                >
                  Typing Test
                </Link>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-white text-sm">
            Improve your typing speed today!
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;