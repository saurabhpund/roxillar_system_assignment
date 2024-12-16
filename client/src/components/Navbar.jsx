import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">Dashboard</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
          <a href="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">About</a>
          <a href="/services" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Services</a>
          <a href="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Contact</a>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-blue-600 p-4`}>
        <a href="/" className="text-white block py-2">Home</a>
        <a href="/about" className="text-white block py-2">About</a>
        <a href="/services" className="text-white block py-2">Services</a>
        <a href="/contact" className="text-white block py-2">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
