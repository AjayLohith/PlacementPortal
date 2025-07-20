// Location: client/src/pages/CompaniesPage.jsx

import React from 'react';
import CompanyCard from '../components/common/CompanyCard';
import Container from '../components/common/Container';

// This component now receives the list of companies as a prop
export default function CompaniesPage({ companies }) {
  return (
    <Container>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Browse Companies</h1>
        <p className="text-lg text-gray-600 mt-2">Select a company to view interview experiences and questions.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {companies.map((company) => (
          <CompanyCard
            key={company.slug}
            name={company.name}
            logo={company.logo}
            to={`/${company.slug}`}
          />
        ))}
      </div>
    </Container>
  );
}
