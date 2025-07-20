// Location: client/src/pages/CreateExperiencePage.jsx

import React from 'react';
import Container from '../components/common/Container';
import ExperienceForm from '../components/experience/ExperienceForm';

// It receives the onNewExperience function and passes it down
export default function CreateExperiencePage({ onNewCompany, companies, onNewExperience }) {
  return (
    <Container>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 text-center mb-6">
          Share Your Interview Experience
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Your contribution helps others prepare for their interviews. Thank you!
        </p>
        {/* Pass all props down */}
        <ExperienceForm onNewCompany={onNewCompany} companies={companies} onNewExperience={onNewExperience} />
      </div>
    </Container>
  );
}
