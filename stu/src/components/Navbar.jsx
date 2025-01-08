import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect: Detect when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Hide navbar when scrolling down
      } else {
        setScrolled(false); // Show navbar when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gradient-to-r from-teal-500 to-lime-500 p-4 shadow-lg fixed top-0 left-0 w-full z-10 transition-transform ease-in-out duration-500 ${
        scrolled ? '-translate-y-20' : 'translate-y-0'
      } rounded-b-2xl`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        {/* Logo and Title Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/src/assets/mahadev.jpg" // Replace with your logo image path
            alt="Logo"
            className="w-20 h-20 rounded-full" // Adjust size and border radius as needed
          />
          <div className="text-3xl font-bold animate__animated animate__fadeIn">
            Mahadev P.G. College
          </div>
        </div>

        {/* Navbar Links */}
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="text-lg font-medium hover:text-gray-200 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-1s py-2 px-4 bg-white text-teal-600 rounded-2xl border-2 border-teal-600 hover:bg-teal-600 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-lg font-medium hover:text-gray-200 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s py-2 px-4 bg-white text-teal-600 rounded-2xl border-2 border-teal-600 hover:bg-teal-600 hover:text-white"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-lg font-medium hover:text-gray-200 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s py-2 px-4 bg-white text-teal-600 rounded-2xl border-2 border-teal-600 hover:bg-teal-600 hover:text-white"
            >
              Contact
            </Link>
          </li>
          {/* Admin Link */}
          <li>
            <Link
              to="/AdminLogin" // The route to Admin Login page
              className="text-lg font-medium hover:text-gray-200 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-4s py-2 px-4 bg-white text-teal-600 rounded-2xl border-2 border-teal-600 hover:bg-teal-600 hover:text-white"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
