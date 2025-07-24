// Location: client/src/components/layout/Navbar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { userInfo, logout } = auth;

  const linkClasses = "text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "text-indigo-600 bg-indigo-50";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              PlacementPedia
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
              <NavLink to="/companies" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Companies</NavLink>
              <NavLink to="/create-experience" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Post Experience</NavLink>
              
              {/* Admin link - replace with your admin email */}
              {userInfo && userInfo.email === 'ajaylohith855@gmail.com' && (
                <NavLink to="/admin" className={({ isActive }) => `${linkClasses} ${isActive ? 'font-bold text-red-600' : ''}`}>Admin</NavLink>
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

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
            <NavLink to="/companies" onClick={() => setIsOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Companies</NavLink>
            <NavLink to="/create-experience" onClick={() => setIsOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>Post Experience</NavLink>
            {userInfo && userInfo.email === 'ajaylohith855@gmail.com' && (
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? 'font-bold text-red-600' : ''}`}>Admin</NavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {userInfo ? (
              <div className="px-5">
                <p className="text-base font-medium text-gray-800">Welcome, {userInfo.name}</p>
                <button onClick={() => { logout(); setIsOpen(false); }} className="mt-3 w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center px-5 space-x-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Log In</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
