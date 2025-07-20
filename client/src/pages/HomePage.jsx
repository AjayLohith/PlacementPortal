// Location: client/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import CompanyCard from '../components/common/CompanyCard';

// This data would ideally come from your backend, perhaps as "featured" companies
const featuredCompanies = [
  { name: 'Infosys', slug: 'infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
  { name: 'TCS', slug: 'tcs', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
  { name: 'Wipro', slug: 'wipro', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
  { name: 'Accenture', slug: 'accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg' },
];

export default function HomePage() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Your Gateway to Placement Success
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Access a crowd-sourced library of interview experiences, aptitude questions, and coding problems from seniors at your college.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/companies"
            className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Browse Companies
          </Link>
          <Link
            to="/create-experience"
            className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105"
          >
            Share Your Experience
          </Link>
        </div>
      </div>

      {/* Featured Companies Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredCompanies.map((company) => (
            <CompanyCard
              key={company.slug}
              name={company.name}
              logo={company.logo}
              to={`/${company.slug}`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
