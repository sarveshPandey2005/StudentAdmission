import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 to-lime-500 text-white py-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-4">
          <p className="text-lg sm:text-xl font-semibold">
            &copy; 2024 Student Admission System. All rights reserved.
          </p>
          <p className="text-sm sm:text-base">
            Contact us: 
            <a href="mailto:info@example.com" className="text-teal-100 hover:text-lime-100 transition duration-300">info@example.com</a> | 
            Phone: <span className="text-teal-100 hover:text-lime-100 transition duration-300">+123-456-7890</span>
          </p>
        </div>
        <div className="mt-4 text-sm">
          <p>
            Designed with ❤️ by{' '}
            <a href="https://example.com" className="text-teal-100 hover:text-lime-100 transition duration-300">
              Your Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
