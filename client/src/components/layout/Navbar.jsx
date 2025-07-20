// Location: client/src/components/layout/NavBar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth(); // Get the whole context object first

  // FIX: Add a check to ensure the auth context exists before destructuring.
  // This prevents the app from crashing if the Navbar renders before the context is available.
  if (!auth) {
    // You can return a loading state or a simplified navbar if you want.
    // Returning null for a brief moment during initialization is also fine.
    return null; 
  }

  const { userInfo, logout } = auth; // Now we can safely destructure

  const linkClasses = "text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "text-indigo-600 bg-indigo-50";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-indigo-600">PlacementPortal</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
              <NavLink to="/companies" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Companies</NavLink>
              {userInfo && ( // Only show if user is logged in
                <NavLink to="/create-experience" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Post Experience</NavLink>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {userInfo ? (
                <>
                  <span className="text-gray-700 font-medium">Welcome, {userInfo.name}</span>
                  <button onClick={logout} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors">Log In</Link>
                  <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Register</Link>
                </>
              )}
            </div>
          </div>
          {/* Mobile menu button... */}
        </div>
      </div>
      {/* Mobile menu content... */}
    </nav>
  );
}
