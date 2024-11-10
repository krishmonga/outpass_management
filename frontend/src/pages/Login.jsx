import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const userType = localStorage.getItem('userType');
      navigate(`/${userType}`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { ...formData, userType },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.token) {
        console.log('Login successful:', response.data);
        alert('Login successful!');

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('username', response.data.username);

        // Redirect based on userType
        navigate(`/${response.data.userType}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(
        'Login failed: ' + (error.response ? error.response.data.message : error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96"
        aria-busy={loading} // Accessibility improvement
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login</h2>
        <div className="flex justify-around mb-4">
          <button
            type="button"
            onClick={() => setUserType('student')}
            className={`w-1/2 py-2 ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('faculty')}
            className={`w-1/2 py-2 ${userType === 'faculty' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Faculty
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4" aria-live="assertive">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full ${loading ? 'bg-blue-300' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
