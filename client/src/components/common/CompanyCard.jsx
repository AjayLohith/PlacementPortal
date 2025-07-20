// Location: client/src/components/common/CompanyCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// A reusable card component to display a company.
// It takes a name, logo URL, and a 'to' link as props.
export default function CompanyCard({ name, logo, to }) {
  return (
    <Link 
      to={to} 
      className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="h-20 w-20 object-contain mb-4"
          // Fallback in case the image fails to load
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80/e2e8f0/334155?text=Logo'; }}
        />
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </Link>
  );
}
