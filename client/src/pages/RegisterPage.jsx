// Location: client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import { useAuth } from '../context/AuthContext';

const securityQuestionsList = [
  "What was the name of your first pet?",
  "What is your nickname?",
  "What city were you born in?",
  "What is the name of your favorite childhood friend?",
];

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [question1, setQuestion1] = useState(securityQuestionsList[0]);
  const [answer1, setAnswer1] = useState('');
  const [question2, setQuestion2] = useState(securityQuestionsList[1]);
  const [answer2, setAnswer2] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question1 === question2) {
      return setError('Please select two different security questions.');
    }
    setError('');
    setIsLoading(true);
    try {
      const securityQuestions = [
        { question: question1, answer: answer1 },
        { question: question2, answer: answer2 },
      ];
      await register(name, email, password, securityQuestions);
      navigate('/');
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Standard fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">College Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@vignaniit.edu.in" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          
          {/* Security Questions */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900">Security Questions</h3>
            <p className="text-sm text-gray-500 mb-4">These will be used to recover your account.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="question1" className="block text-sm font-medium text-gray-700">Question 1</label>
                <select id="question1" value={question1} onChange={(e) => setQuestion1(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  {securityQuestionsList.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <input type="text" placeholder="Answer 1" id="answer1" value={answer1} onChange={(e) => setAnswer1(e.target.value)} required className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="question2" className="block text-sm font-medium text-gray-700">Question 2</label>
                <select id="question2" value={question2} onChange={(e) => setQuestion2(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  {securityQuestionsList.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <input type="text" placeholder="Answer 2" id="answer2" value={answer2} onChange={(e) => setAnswer2(e.target.value)} required className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
        </p>
      </div>
    </Container>
  );
}
