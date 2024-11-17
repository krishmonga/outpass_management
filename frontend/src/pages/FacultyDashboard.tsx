import { GET_ALL_OUTPASSES } from '@/graphql/queries/outpass.query';
import { formatHostel } from '@/lib/formatHostelString';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

export const FacultyDashboard = () => {
  const navigate = useNavigate();

  const {hostel} =  useParams()
  const hostelName = formatHostel(hostel)
  
  const { data, loading, error } = useQuery(GET_ALL_OUTPASSES, {
    variables: { hostelName: hostelName },
  });

  console.log('data', data)
  console.log('this is error', error?.message)
  // Fetching pending outpasses from the backend (mock API call)

  // Handle approving or rejecting an outpass


  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-3xl mx-auto border  border-blue-400/20 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Faculty Dashboard</h2>

        {/* Pending Outpasses Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending  Outpasses</h3>



          <div className="space-y-4">
            {/* Map through the outpasses and display them */}
            {/* {outpasses.map((outpass) => (
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
            ))} */}
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

