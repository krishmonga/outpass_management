// src/pages/StudentDashboard.jsx

import React from 'react';
import OutpassForm from '../components/Outpassform';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      <OutpassForm />
      <button 
        onClick={() => navigate('/home')} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default StudentDashboard;
