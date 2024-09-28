import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center">
      <p className="text-sm">Powered by TravelBot &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;