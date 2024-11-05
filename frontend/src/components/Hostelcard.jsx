import React from 'react';
import { Link } from 'react-router-dom';

const HostelCard = ({ name, image }) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/${formattedName}`} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={image} alt={`${name}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-800">{name}</h3>
      </div>
    </Link>
  );
};

export default HostelCard;
