// Location: client/src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import ExperienceDisplay from '../components/ExperienceDisplay';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedExperience, setSelectedExperience] = useState(null);
  const { userInfo } = useAuth();

  const fetchAllExperiences = async () => {
    if (!userInfo) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      // Fetch both pending and approved experiences
      const pendingRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/experiences/admin/pending`, config);
      const approvedRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/experiences/admin/approved`, config);
      setPending(pendingRes.data);
      setApproved(approvedRes.data);
    } catch (err) {
      setError('Could not fetch experiences. You may not have admin rights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllExperiences();
  }, [userInfo]);

  const handleApprove = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`${import.meta.env.VITE_API_URL}/api/experiences/admin/${id}/approve`, {}, config);
      setSelectedExperience(null);
      fetchAllExperiences(); // Refresh both lists
    } catch (err) {
      alert('Failed to approve experience.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this submission?')) {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/experiences/admin/${id}`, config);
            setSelectedExperience(null);
            fetchAllExperiences(); // Refresh both lists
        } catch (err) {
            alert('Failed to delete experience.');
        }
    }
  };

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="text-red-500 text-center">{error}</p></Container>;

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 my-6">Admin Dashboard</h1>
      
      {/* Pending Submissions Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Submissions ({pending.length})</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md h-fit">
            <h3 className="font-bold mb-2">Click to Review:</h3>
            <ul className="space-y-2">
              {pending.length > 0 ? pending.map(exp => (
                <li key={exp._id} onClick={() => setSelectedExperience(exp)} className="cursor-pointer p-2 rounded hover:bg-gray-100">
                  {exp.postTitle} - <span className="text-sm text-gray-500">{exp.company.name}</span>
                </li>
              )) : <p>No pending submissions.</p>}
            </ul>
          </div>
          <div className="md:col-span-2">
            {selectedExperience ? (
              <div>
                <ExperienceDisplay experience={selectedExperience} />
                <div className="mt-4 flex space-x-4">
                  <button onClick={() => handleApprove(selectedExperience._id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Approve</button>
                  <button onClick={() => handleDelete(selectedExperience._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Select a submission from the list to review it.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Manage Approved Experiences Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Approved Experiences ({approved.length})</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
                {approved.length > 0 ? approved.map(exp => (
                    <li key={exp._id} className="flex justify-between items-center p-2 rounded hover:bg-gray-100">
                        <span>{exp.postTitle} - <span className="text-sm text-gray-500">{exp.company.name}</span></span>
                        <button onClick={() => handleDelete(exp._id)} className="bg-red-100 text-red-700 hover:bg-red-200 font-bold py-1 px-3 rounded text-sm">Delete</button>
                    </li>
                )) : <p>No approved experiences to manage.</p>}
            </ul>
        </div>
      </div>
    </Container>
  );
}
