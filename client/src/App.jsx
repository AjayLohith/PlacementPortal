// Location: client/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Layouts and Pages
import Navbar from './components/layout/NavBar'; 
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import CreateExperiencePage from './pages/CreateExperiencePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const initialCompanies = [
  { name: 'Infosys', slug: 'infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
  { name: 'TCS', slug: 'tcs', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
  { name: 'Wipro', slug: 'wipro', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
  { name: 'Accenture', slug: 'accenture', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg' },
  { name: 'TechCorp Inc.', slug: 'techcorp', logo: 'https://placehold.co/80x80/e2e8f0/334155?text=Logo' },
  { name: 'MakeMyTrip', slug: 'makemytrip', logo: 'https://img.icons8.com/color/96/makemytrip.png' }
];

function App() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [experiences, setExperiences] = useState([]); // Add state for experiences

  const handleNewCompany = (newCompanyName) => {
    const companyExists = companies.some(c => c.name.toLowerCase() === newCompanyName.toLowerCase());
    if (!companyExists && newCompanyName) {
      const newCompany = {
        name: newCompanyName,
        slug: newCompanyName.toLowerCase().replace(/\s+/g, '-'),
        logo: `https://placehold.co/80x80/e2e8f0/334155?text=${newCompanyName.charAt(0)}`
      };
      setCompanies(prev => [...prev, newCompany]);
    }
  };

  // Function to add a new experience
  const handleNewExperience = (experienceData) => {
    setExperiences(prev => [...prev, experienceData]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/companies" element={<CompaniesPage companies={companies} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/create-experience" 
                element={<CreateExperiencePage onNewCompany={handleNewCompany} companies={companies} onNewExperience={handleNewExperience} />} 
              />
              <Route 
                path="/:companySlug" 
                element={<CompanyDetailsPage experiences={experiences} companies={companies} />} 
              />
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
