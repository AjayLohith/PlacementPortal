// Location: client/src/components/common/CategoryCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// A reusable card for categories like Aptitude, Coding, etc.
export default function CategoryCard({ title, description, to, icon }) {
  return (
    <Link 
      to={to} 
      className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:border-indigo-500 border-2 border-transparent transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-indigo-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
