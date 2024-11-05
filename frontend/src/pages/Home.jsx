import React from 'react';
import HostelCard from '../components/Hostelcard';

const azadImage = '/images/azad-hostel.jpg'; 
const parmarImage = '/images/parmar-hostel.jpg';
const shashtriImage = '/images/shashtri-hostel.jpg';

const Home = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Select a Hostel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <HostelCard name="Azad Hostel" image={azadImage} />
        <HostelCard name="Parmar Hostel" image={parmarImage} />
        <HostelCard name="Shashtri Hostel" image={shashtriImage} />
      </div>
    </div>
  );
};

export default Home;
