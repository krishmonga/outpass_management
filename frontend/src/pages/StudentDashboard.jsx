import React, { useState } from 'react';
import OutpassForm from '../components/Outpassform';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for managing form submission
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Function to handle form submission and simulate API call
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      // Simulate API call
      // Replace this with actual API request (e.g., axios.post)
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('Outpass request submitted successfully!');
        // Optionally reset the form or perform any other action
      }, 2000); // Simulate a delay for the submission
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Failed to submit the request. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Student Dashboard</h2>
        <p className="text-center text-gray-600 mb-4">Welcome! Here you can request and manage your outpasses.</p>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        {/* Outpass Form Component */}
        <OutpassForm onSubmit={handleFormSubmit} />

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
