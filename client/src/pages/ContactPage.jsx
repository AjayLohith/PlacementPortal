// Location: client/src/pages/ContactPage.jsx

import React from 'react';
import Container from '../components/common/Container';

export default function ContactPage() {
  return (
    <Container>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Have questions, suggestions, or want to report an issue? We'd love to hear from you.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Project Maintainer</h2>
            <p className="text-gray-600">Ajay - Electrical Department</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Email</h2>
            <a href="mailto:contact@yourcollege.edu" className="text-indigo-600 hover:underline">
              contact@yourcollege.edu (Placeholder)
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">GitHub Repository</h2>
            <a href="#" className="text-indigo-600 hover:underline">
              Link to your project repository
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
