import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [userType, setUserType] = useState('student');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/register', { ...formData, userType });
            alert('Registration successful! Please log in.');
            
            // Reset form fields after successful registration
            setFormData({ username: '', email: '', password: '' });

            // Redirect user to login page
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data.message : error.message);
            setErrorMessage('Registration failed: ' + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200"
                aria-busy={loading} // Accessibility improvement
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Register</h2>
                <div className="flex justify-around mb-6">
                    <button
                        type="button"
                        onClick={() => setUserType('student')}
                        className={`w-1/2 py-2 rounded-l-lg ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserType('faculty')}
                        className={`w-1/2 py-2 rounded-r-lg ${userType === 'faculty' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                        Faculty
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ${loading ? 'bg-blue-300' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
