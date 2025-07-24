// Location: client/src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Import Layouts and Pages
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import CreateExperiencePage from './pages/CreateExperiencePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ThankYouPage from './pages/ThankYouPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  const [companies, setCompanies] = useState([]);

  // This useEffect hook is the single source of truth for the company list.
  // It runs when the app loads and fetches the official list from the database.
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Use the environment variable for the API URL
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/companies`);
        setCompanies(data);
      } catch (error) {
        console.error("Could not fetch companies", error);
      }
    };
    fetchCompanies();
  }, []); // The empty dependency array means this runs once on mount.

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Specific routes must come before the dynamic companySlug route */}
              <Route path="/" element={<HomePage />} />
              <Route path="/companies" element={<CompaniesPage companies={companies} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/resetpassword/:resettoken" element={<ResetPasswordPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/admin" 
                element={<PrivateRoute><AdminPage /></PrivateRoute>} 
              />
              <Route 
                path="/create-experience" 
                element={<PrivateRoute><CreateExperiencePage companies={companies} /></PrivateRoute>} 
              />
              
              {/* Dynamic route must be last to avoid catching other routes */}
              <Route 
                path="/:companySlug" 
                element={<CompanyDetailsPage companies={companies} />} 
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
