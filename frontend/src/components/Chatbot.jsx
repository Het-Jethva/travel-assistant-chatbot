import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios
import InputForm from "./InputForm";
import { Send } from "lucide-react"; // Ensure lucide-react is installed

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to TravelBot! How can I assist you with your travel plans today?",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState({ departure: "", return: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Don't allow empty messages
    if (inputMessage.trim() === "") return;

    // Add user's message to the chat
    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear the input field
    setInputMessage("");
    setIsLoading(true); // Show loading animation

    // Prepare the payload for the backend
    const inputToProcess = inputMessage.toLowerCase().includes("plan")
      ? { destination, travelDates } // Handle planning message
      : { input: inputMessage }; // Handle general input message

    // Send the message to the backend via axios
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-input",
        inputToProcess
      );

      // Get the bot's response from the backend
      const botResponse = { text: response.data.response, isUser: false };

      // Add bot's response to the chat
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error processing request:", error);

      // Add an error message to the chat if something goes wrong
      const errorMessage = {
        text: "Sorry, there was an error processing your request.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  // Function to update the input field as the user types
  const handleInputChange = (e) => {
    setInputMessage(e.target.value); // Get the actual text value, not the event
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-[calc(100vh-100px)] flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4">
          {/* Display messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${message.isUser ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble ${
                  message.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Loading animation */}
          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-bubble bg-gray-700 text-gray-100">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={inputMessage} // Controlled input
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="input input-bordered flex-grow mr-2 bg-gray-700 text-gray-100"
          />
          <button
            type="submit"
            className="btn bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </button>
        </form>
      </div>

      {/* InputForm component to set travel-related data */}
      {/* <InputForm
        setDestination={setDestination}
        setTravelDates={setTravelDates}
      /> */}
    </div>
  );
}

export default Chatbot;
