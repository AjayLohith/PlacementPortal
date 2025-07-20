// Location: client/src/pages/PrivacyPolicyPage.jsx

import React from 'react';
import Container from '../components/common/Container';

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use PlacementPortal.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Personal Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          When you register on the site, we collect your college email address and name to verify your status as a student and to attribute content you post. All posted content, such as interview experiences, is publicly visible.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We use the information we collect to operate and maintain the features of the site, to authenticate users, and to prevent abuse. We do not sell or share your personal information with third parties for marketing purposes.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Data Retention</h2>
        <p className="text-gray-700 leading-relaxed">
          We retain your personal information and posted content for as long as your account is active or as needed to provide you services and maintain the integrity of the platform's historical data.
        </p>
      </div>
    </Container>
  );
}
