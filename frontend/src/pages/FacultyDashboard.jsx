import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Faculty Dashboard</h2>

        {/* Section to Display Submitted Outpasses for Approval */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending Outpasses</h3>
          <div className="space-y-4">
            {/* Each outpass card (dummy data for layout) */}
             
            {/* Add more outpass entries here */}
          </div>
        </div>

        {/* Back to Home Button */}
        <button 
          onClick={() => navigate('/home')} 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
