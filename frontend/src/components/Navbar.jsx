import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-white">Hostel Management - Outpass</h1>
      <div>
        <Link to="/home" className="text-white mx-4 hover:underline">Home</Link>
        <Link to="/login" className="text-white mx-4 hover:underline">Login</Link>
        <Link to="/student" className="text-white mx-4 hover:underline">Student</Link>
        <Link to="/faculty" className="text-white mx-4 hover:underline">Faculty</Link>
      </div>
    </nav>
  );
};

export default Navbar;
