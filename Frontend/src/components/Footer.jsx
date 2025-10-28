import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         
          <div>
            <h3 className="text-lg font-semibold mb-4">TypeMaster</h3>
            <p className="text-gray-400">
              Improve your typing speed and accuracy with our interactive typing test application.
            </p>
          </div>

          {/* Dashboard Link + Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Go to Dashboard
                </a>
              </li>
            </ul>
            <p className="text-gray-400 mt-4">Email: support@typemaster.com</p>
            <p className="text-gray-400">Follow us on social media</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 TypeMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;