// Location: client/src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            &copy; {currentYear} PlacementPortal. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
              About
            </Link>
            
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
