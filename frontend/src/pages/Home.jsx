import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import geetaImage from '../assets/geeta.jpg';
import azadImage from '../assets/azad.jpg'; 
import shastriImage from '../assets/shastri.png'; 

const Home = () => {
  const hostels = [
    { name: 'Azad Hostel', image: azadImage }, // Imported image
    { name: 'Parmar Hostel', image: shastriImage },
    { name: 'Shashtri Hostel', image: shastriImage },
    { name: 'Geeta Bhawan', image: geetaImage },
  ];

  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
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
