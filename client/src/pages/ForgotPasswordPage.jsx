// Location: client/src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(['', '']);
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/getquestions`, { email });
      setQuestions(data.questions);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/verifyanswers`, { email, answers });
      setResetToken(data.resetToken);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/resetpassword`, { resetToken, password });
      setMessage(data.message + ' Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <Container>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        {message && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{message}</p>}
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <p className="text-center text-sm text-gray-600">Enter your email to begin.</p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading ? 'Loading...' : 'Next'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleAnswerSubmit} className="space-y-6">
            <p className="text-center text-sm text-gray-600">Answer your security questions.</p>
            {questions.map((q, i) => (
              <div key={i}>
                <label htmlFor={`answer${i}`} className="block text-sm font-medium text-gray-700">{q}</label>
                <input type="text" id={`answer${i}`} value={answers[i]} onChange={(e) => handleAnswerChange(i, e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            ))}
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading ? 'Verifying...' : 'Verify Answers'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <p className="text-center text-sm text-gray-600">Enter your new password.</p>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading ? 'Resetting...' : 'Set New Password'}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
