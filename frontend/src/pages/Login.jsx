import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('student'); // Default to student
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message
        try {
            const response = await axios.post('http://localhost:5000/api/login', { ...formData, userType });
            alert('Login successful!');
            // Redirect based on user type from response
            if (response.data.userType === 'student') {
                navigate('/student');
            } else if (response.data.userType === 'faculty') {
                navigate('/faculty');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.message : error.message);
            setErrorMessage('Login failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Login</h2>
                <div className="flex justify-around mb-4">
                    <button type="button" onClick={() => setUserType('student')} className={`w-1/2 py-2 ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        Student
                    </button>
                    <button type="button" onClick={() => setUserType('faculty')} className={`w-1/2 py-2 ${userType === 'faculty' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
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
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link> {/* Changed to Link */}
                </p>
            </form>
        </div>
    );
};

export default Login;
