import React from 'react';
import OutpassForm from '../components/Outpassform';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Student Dashboard</h2>
        <p className="text-center text-gray-600 mb-4">Welcome! Here you can request and manage your outpasses.</p>
        
        {/* Outpass Form */}
        <OutpassForm />

        {/* Back to Home Button */}
        <button 
          onClick={() => navigate('/home')} 
          className="mt-6 bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
