// Location: client/src/components/CompanyInfo.jsx

import React from 'react';

// This component displays detailed information about a company's recruitment process.
// It takes a 'company' object as a prop, which contains all the details.
export default function CompanyInfo({ company }) {
  // A fallback for when data isn't available yet.
  if (!company) {
    return <div className="bg-white p-8 rounded-lg shadow-md mb-12">Loading company info...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{company.name} Recruitment Process</h2>
      <p className="text-sm text-gray-500 mb-6">Last Updated: {company.lastUpdated}</p>
      
      <p className="text-gray-700 leading-relaxed mb-6">
        This article will give you information about {company.name}, its recruitment process, sample questions that have been asked previously, and experiences shared by other aspirants.
      </p>

      {/* About Company Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-3">About Company</h3>
        <p className="text-gray-700 leading-relaxed">{company.about}</p>
      </div>

      {/* Recruitment Process Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-3">Recruitment Process</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          {company.process.map((round, index) => (
            <li key={index}>
              <strong className="font-semibold">{round.name}:</strong> {round.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
