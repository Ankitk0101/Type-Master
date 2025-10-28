import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white text-xl font-bold">TypeMaster</h1>
            </div>

            {/* Home & Dashboard Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/dashboard"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Dashboard
                </a>
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