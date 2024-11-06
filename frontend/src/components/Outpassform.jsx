import React, { useState } from 'react';

const OutpassForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    wardenName: '',
    hostelNumber: '',
    rollNumber: '',
    contactNumber: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Outpass Request Submitted:", formData);
    
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-blue-800 text-center">Outpass Request</h3>

      <label className="block mb-4">
        <span className="text-gray-700">Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Date</span>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Warden Name</span>
        <input
          type="text"
          name="wardenName"
          value={formData.wardenName}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter warden's name"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Hostel Number</span>
        <input
          type="text"
          name="hostelNumber"
          value={formData.hostelNumber}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter hostel number"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Roll Number</span>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter roll number"
          required
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700">Contact Number</span>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter contact number"
          required
        />
      </label>
      <label className="block mb-6">
        <span className="text-gray-700">Reason</span>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Reason for outpass request"
          rows="3"
          required
        ></textarea>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default OutpassForm;
