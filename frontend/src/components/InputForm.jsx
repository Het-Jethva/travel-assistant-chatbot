import { useState } from "react";

function InputForm({ setDestination, setTravelDates }) {
  const [destination, setLocalDestination] = useState(""); // Local state for destination
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update destination and travel dates in the parent component
    // setDestination(destination); // Use local state for destination
    setDestination(encodeURIComponent(destination)); // Encode destination to handle multiple words
    setTravelDates({ departure: startDate, return: endDate });
    console.log("Travel details submitted:", {
      destination,
      startDate,
      endDate,
    });
  };

  return (
    <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">
        Travel Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-300"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination} // Bind local state to input
            onChange={(e) => setLocalDestination(e.target.value)} // Update local state
            className="input input-bordered w-full bg-gray-700 text-gray-100"
            placeholder="Enter your destination"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full bg-gray-700 text-gray-100"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-300"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full bg-gray-700 text-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 text-white w-full hover:bg-blue-600"
        >
          Submit Travel Details
        </button>
      </form>
    </div>
  );
};

export default InputForm;
