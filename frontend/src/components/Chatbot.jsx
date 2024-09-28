import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState({ departure: '', return: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sending data to the Flask backend
    try {
      const response = await axios.post('http://127.0.0.1:5000/process-input', {
        destination,
        travelDates,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4">
      <input 
        type="text" 
        placeholder="Destination" 
        value={destination} 
        onChange={(e) => setDestination(e.target.value)} 
        className="p-2 border border-gray-300 rounded"
      />
      <input 
        type="date" 
        value={travelDates.departure} 
        onChange={(e) => setTravelDates({ ...travelDates, departure: e.target.value })} 
        className="p-2 border border-gray-300 rounded"
      />
      <input 
        type="date" 
        value={travelDates.return} 
        onChange={(e) => setTravelDates({ ...travelDates, return: e.target.value })} 
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default Chatbot;
