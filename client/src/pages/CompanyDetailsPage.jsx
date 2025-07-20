// Location: client/src/pages/CompanyDetailsPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import CategoryCard from '../components/common/CategoryCard';
import CompanyInfo from '../components/CompanyInfo'; // Import the new component

// --- Mock Data ---
// In a real application, you would fetch this data from your backend API
// based on the companySlug.
const companyData = {
  infosys: {
    name: 'Infosys',
    lastUpdated: '15 July, 2025',
    about: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services. Headquartered in Bangalore, Karnataka, it is one of the largest IT companies in India.',
    process: [
      { name: 'Online Test', description: 'Consists of sections on Mathematical Ability, Reasoning, Verbal Ability, and Pseudo Code.' },
      { name: 'Technical Interview', description: 'Focuses on your resume, projects, and core computer science subjects like Data Structures, Algorithms, and DBMS.' },
      { name: 'HR Interview', description: 'Behavioral questions to assess your personality, strengths, weaknesses, and cultural fit.' },
    ]
  },
  tcs: {
    name: 'TCS',
    lastUpdated: '12 July, 2025',
    about: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is a part of the Tata Group and operates in 149 locations across 46 countries.',
    process: [
        { name: 'TCS NQT (National Qualifier Test)', description: 'A multi-level assessment to assess competence on core cognitive processes, industry-specific knowledge, and programming skills.' },
        { name: 'Technical Interview', description: 'Questions on programming languages (C++, Java), DBMS, and at least one project from your resume.' },
        { name: 'Managerial + HR Interview', description: 'A combined round to test your problem-solving abilities, leadership qualities, and behavioral skills.' },
    ]
  },
  // ADDED: New detailed entry for MakeMyTrip
  makemytrip: {
    name: 'MakeMyTrip',
    lastUpdated: '19 Feb, 2024',
    about: 'Makemytrip Inc. is an Indian online travel company founded in 2000. Headquartered in Gurugram, Haryana, the company provides online travel services including flight tickets, domestic and international holiday packages, hotel reservations, rail and bus tickets, etc. The company has been recognized as one of India’s best travel portals.',
    process: [
        { name: 'Academic Criteria', description: '70 percent or above in B.Tech, Class X and XII. No backlogs at the time of the interview.' },
        { name: 'Written Round', description: 'Consists of three major sections: General Aptitude Test, Verbal Ability Test, and a Coding test where pseudo-code is also accepted.' },
        { name: 'Coding Round', description: 'Candidates who clear the written round can expect a simple logical problem, a problem from a string or array, and a difficult-level problem.' },
        { name: 'Technical Interview Round 1', description: 'Focuses on programming languages, OOPs concepts, basic data structures, algorithms, and projects. CS students may be asked to write code. Questions from your resume are common.' },
        { name: 'Technical Interview Round 2', description: 'Questions on advanced data structures and algorithms. You may be asked to improve code from previous rounds. The focus is on the problem-solving approach. Design patterns and REST API questions can also be asked.' },
        { name: 'HR Round', description: 'Focuses on behavioral questions like "Tell me about yourself," "What are your strengths and weaknesses?", and other questions based on your resume.' },
    ]
  }
};
// --- End Mock Data ---


// A simple SVG icon component for demonstration
const Icon = ({ d }) => (
  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
  </svg>
);

export default function CompanyDetailsPage() {
  const { companySlug } = useParams();
  
  // Get the specific company's data from our mock data object
  const currentCompany = companyData[companySlug];
  const companyName = currentCompany?.name || (companySlug.charAt(0).toUpperCase() + companySlug.slice(1));

  const categories = [
    { title: 'Aptitude', description: 'Practice quantitative and logical reasoning questions.', to: `/${companySlug}/aptitude`, icon: <Icon d="M13 10V3L4 14h7v7l9-11h-7z" /> },
    { title: 'Coding', description: 'Browse coding problems and solutions.', to: `/${companySlug}/coding`, icon: <Icon d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> },
    { title: 'Interview Questions', description: 'Prepare with core subject and HR questions.', to: `/${companySlug}/interview`, icon: <Icon d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
    { title: 'Add Experience', description: 'Share your interview experience with others.', to: `/create-experience?company=${companySlug}`, icon: <Icon d="M12 4v16m8-8H4" /> },
  ];

  return (
    <Container>
      {/* Render the new CompanyInfo component */}
      <CompanyInfo company={currentCompany} />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Resources for {companyName}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Choose a category to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            to={category.to}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
}
