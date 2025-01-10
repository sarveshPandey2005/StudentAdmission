import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer'; // Import Footer

// Import images from 'src/assets'
import cambridgeImg from '../assets/cambridge.jpg';
import vaibhavSirImg from '../assets/vaibhavSir.jpg';
import shivSirImg from '../assets/shivSir.jpg';
import deepakSirImg from '../assets/deepakSir.jpg';
import dineshSirImg from '../assets/dineshSir.jpg';

const HomePage = () => {
  return (
    <div>
     

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-screen text-white overflow-hidden"
        style={{ backgroundImage: `url(${cambridgeImg})` }} // Use imported image here
      >
        {/* Dark overlay to improve text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="flex items-center justify-center h-full px-6 z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold opacity-90 mb-6 animate__animated animate__fadeIn animate__delay-1s">
              Welcome to Our Admission Portal
            </h1>
            <p className="text-xl sm:text-2xl mb-6 opacity-90 animate__animated animate__fadeIn animate__delay-2s">
              Unlock your future with our easy and fast admission process.
            </p>
            <Link to="/apply">
              <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-lg px-8 py-5 text-center me-2 mb-2 opacity-90">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Faculty Section */}
      <section className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-teal-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Meet Our Faculty
          </h2>
          <p className="text-lg sm:text-xl mb-12 opacity-80 animate__animated animate__fadeIn animate__delay-2s">
            Our dedicated faculty members are committed to providing the best education and guidance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Faculty Member 1 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
              <img
                src={vaibhavSirImg} // Imported image here
                alt="Faculty 1"
                className="w-50 h-50 rounded-3xl mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Vaibhav Mishra</h3>
              <p className="text-gray-700">Professor of Computer Science</p>
            </div>
            {/* Faculty Member 2 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-4s">
              <img
                src={shivSirImg} // Imported image here
                alt="Faculty 2"
                className="w-50 h-50 rounded-3xl mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Shiv Yadav</h3>
              <p className="text-gray-700">Professor of Computer Science</p>
            </div>
            {/* Faculty Member 3 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-5s">
              <img
                src={deepakSirImg} // Imported image here
                alt="Faculty 3"
                className="w-50 h-50 rounded-3xl mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Deepak Singh</h3>
              <p className="text-gray-700">Head of Department</p>
            </div>
            {/* Faculty Member 4 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-6s">
              <img
                src={dineshSirImg} // Imported image here
                alt="Faculty 4"
                className="w-50 h-50 rounded-3xl mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dinesh Maurya</h3>
              <p className="text-gray-700">Professor of Computer Science</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Why Choose Our Admission System?
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-80 animate__animated animate__fadeIn animate__delay-2s">
            A seamless experience with personalized courses and 24/7 support for your admission process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Easy Process</h3>
              <p>Apply online in just a few steps. It's quick and hassle-free.</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-4s">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Variety of Courses</h3>
              <p>Explore a wide range of courses that align with your career aspirations.</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-5s">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">24/7 Support</h3>
              <p>Our dedicated team is available to assist you at any time during the application process.</p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;
