import React, { useState } from "react";

const InputForm = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/process-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
        placeholder="Enter your input"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">
        Submit
      </button>
    </form>
  );
};

export default InputForm;
