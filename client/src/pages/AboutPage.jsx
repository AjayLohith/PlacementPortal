// Location: client/src/pages/AboutPage.jsx

import React from 'react';
import Container from '../components/common/Container';

export default function AboutPage() {
  return (
    <Container>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About PlacementPortal</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          This platform was created as a college project with a simple mission: to help students prepare for their placements by providing a centralized, crowd-sourced database of real interview questions and experiences.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Seniors and alumni can share their knowledge by posting aptitude questions, coding problems, and detailed interview round experiences for various companies. This collective effort allows junior students to gain valuable insights, practice relevant material, and approach their own placement drives with more confidence.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We believe in the power of community and shared knowledge. By contributing, you're not just helping others; you're building a valuable resource that will benefit students for years to come.
        </p>
      </div>
    </Container>
  );
}
