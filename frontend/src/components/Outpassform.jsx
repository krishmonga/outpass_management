import React, { useState } from 'react';

const OutpassForm = () => {
  const [formData, setFormData] = useState({ name: '', date: '', reason: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Outpass Request Submitted:", formData);
    // Add submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-800">Outpass Request</h3>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block mb-2">
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block mb-4">
        Reason:
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mt-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default OutpassForm;
