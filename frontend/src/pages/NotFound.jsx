// NotFound.js or NotFound.jsx
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
                <p className="mt-4 text-sm text-gray-500">The page might have been removed or you might have mistyped the address.</p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;