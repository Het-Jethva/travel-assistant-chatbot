import React from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow">
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}

export default App;