// Location: client/src/pages/ThankYouPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';

export default function ThankYouPage() {
  return (
    <Container>
      <div className="bg-white p-10 rounded-lg shadow-md text-center my-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your submission has been received and is now under review by our admin.
        </p>
        <Link 
          to="/companies"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back to Companies
        </Link>
      </div>
    </Container>
  );
}
