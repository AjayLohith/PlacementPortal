// Location: client/src/pages/CompanyDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '../components/common/Container';
import CompanyInfo from '../components/CompanyInfo';
import ExperienceDisplay from '../components/ExperienceDisplay';

// --- Mock Data (for pre-defined company info) ---
const companyData = {
  infosys: { name: 'Infosys', about: 'Infosys Limited is an Indian multinational information technology company...', process: [/*...*/] },
  // Add other pre-defined companies here
};
// --- End Mock Data ---

const generateDefaultCompanyData = (name) => ({
    name: name,
    about: `Information about ${name} is not yet available.`,
    process: [{ name: 'Recruitment Process', description: `The specific recruitment process for ${name} has not been detailed yet.` }]
});

export default function CompanyDetailsPage({ companies }) {
  const { companySlug } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const currentCompany = companies.find(c => c.slug === companySlug);
  const companyName = currentCompany?.name || (companySlug.charAt(0).toUpperCase() + companySlug.slice(1));
  const currentCompanyInfo = companyData[companySlug] || generateDefaultCompanyData(companyName);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        // This API call only fetches APPROVED experiences from the backend
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/experiences/${companySlug}`);
        setExperiences(data);
      } catch (err) {
        setError("Could not fetch experiences for this company.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [companySlug]);

  return (
    <Container>
      <CompanyInfo company={currentCompanyInfo} />
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Interview Experiences for {companyName}
        </h2>
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading experiences...</p>
          ) : error ? (
            <p className="text-center text-red-500 bg-white p-8 rounded-lg shadow-md">{error}</p>
          ) : experiences.length > 0 ? (
            experiences.map((exp) => (
              <ExperienceDisplay key={exp._id} experience={exp} />
            ))
          ) : (
            <p className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
              No approved experiences have been shared for this company yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
