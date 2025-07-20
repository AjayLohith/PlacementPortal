// Location: client/src/components/ExperienceDisplay.jsx

import React from 'react';

// This component displays a single submitted interview experience.
export default function ExperienceDisplay({ experience }) {
  // Format the date for better readability
  const formattedDate = new Date(experience.interviewDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{experience.postTitle}</h3>
      <p className="text-sm text-gray-500 mb-4">Interview Date: {formattedDate}</p>

      {/* Interview Rounds */}
      <div className="space-y-4 mb-4">
        <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Interview Process</h4>
        {experience.interviewRounds.map((round, index) => (
          <div key={index} className="pl-4">
            <p className="font-semibold text-gray-800">{index + 1}. {round.roundName}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-1">
              {round.duration && <li><strong>Duration:</strong> {round.duration}</li>}
              {round.method && <li><strong>Method:</strong> {round.method}</li>}
              {round.focus && <li><strong>Focus:</strong> {round.focus}</li>}
              {round.keyQuestions && <li><strong>Key Questions:</strong> {round.keyQuestions}</li>}
              {round.obstacles && <li><strong>Obstacles:</strong> {round.obstacles}</li>}
            </ul>
          </div>
        ))}
      </div>

      {/* Final Thoughts */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Suggestions & Final Thoughts</h4>
        {experience.suggestions && (
          <div>
            <p className="font-semibold text-gray-800">Suggestions for Improvement</p>
            <p className="text-gray-600 italic">"{experience.suggestions}"</p>
          </div>
        )}
        {experience.additionalInfo && (
          <div>
            <p className="font-semibold text-gray-800">Additional Information</p>
            <p className="text-gray-600">{experience.additionalInfo}</p>
          </div>
        )}
        {experience.closingNote && (
          <div>
            <p className="font-semibold text-gray-800">Closing Note</p>
            <p className="text-gray-600">{experience.closingNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
