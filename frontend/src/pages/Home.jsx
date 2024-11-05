// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const hostels = [
    { name: 'Azad Hostel', image: '/images/azad-hostel.jpg' },
    { name: 'Parmar Hostel', image: '/images/parmar-hostel.jpg' },
    { name: 'Shashtri Hostel', image: '/images/shashtri-hostel.jpg' },
    { name: 'Geeta Bhawan', image: '/images/tagore-hostel.jpg' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Choose Your Hostel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hostels.map((hostel) => (
          <Link
            to={`/${hostel.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={hostel.name}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
          >
            <img src={hostel.image} alt={hostel.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-gray-800 text-center">{hostel.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
