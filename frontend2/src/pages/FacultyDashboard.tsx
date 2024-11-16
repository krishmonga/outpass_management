import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [outpasses, setOutpasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching pending outpasses from the backend (mock API call)


  // Handle approving or rejecting an outpass
  const handleAction = async (outpassId, action) => {
    try {
      // Here, make an API request to approve/reject the outpass
      await axios.post(`http://localhost:5000/api/outpasses/${action}`, { outpassId });
      // Update the list by filtering out the approved/rejected outpass
      setOutpasses(outpasses.filter((outpass) => outpass.id !== outpassId));
    } catch (error) {
      setError('Action failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Faculty Dashboard</h2>

        {/* Pending Outpasses Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending Outpasses</h3>

          {/* Show loading spinner or error message */}
          {loading && <p className="text-center text-gray-600">Loading pending outpasses...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="space-y-4">
            {/* Map through the outpasses and display them */}
            {outpasses.map((outpass) => (
              <div key={outpass.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800">{outpass.name}</h4>
                <p className="text-gray-600">Roll No: {outpass.rollNumber}</p>
                <p className="text-gray-600">Reason: {outpass.reason}</p>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => handleAction(outpass.id, 'approve')}
                    className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(outpass.id, 'reject')}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
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

