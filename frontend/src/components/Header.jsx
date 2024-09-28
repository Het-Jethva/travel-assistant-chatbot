import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="TravelBot Logo" className="h-8 w-8 mr-2" /> */}
          <h1 className="text-xl font-semibold">TravelBot</h1>
        </div>
        {/* <button className="btn btn-outline btn-sm text-white">Login</button> */}
      </div>
    </header>
  );
}

export default Header;