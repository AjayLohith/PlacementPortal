// Location: client/src/components/common/Container.jsx

import React from 'react';

// This component wraps its children in a centered, max-width container
// with consistent horizontal padding. It ensures your content looks
// good on all screen sizes.
export default function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
