import axios from 'axios';

// Define the API base URL
const API_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Generic error handler function
const handleError = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : 'An error occurred. Please try again.';
  throw new Error(errorMessage);
};

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Registration failed. Please try again.');
  } catch (error) {
    handleError(error);
  }
};

// User Login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Login failed. Please check your credentials.');
  } catch (error) {
    handleError(error);
  }
};

// Outpass Request
export const submitOutpassRequest = async (outpassData, token) => {
  try {
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.post('/submit-outpass', outpassData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Failed to submit outpass request. Please try again.');
  } catch (error) {
    handleError(error);
  }
};
