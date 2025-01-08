import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div>
     

      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-semibold mb-6 text-center text-teal-600">
          About Us
        </h2>
        <p className="text-lg mb-6 text-center text-gray-700">
          Our Student Admission System is designed to simplify the entire admission process. We provide an intuitive platform for students to apply for their desired courses with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-600 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700">
              Our mission is to bridge the gap between students and their desired academic future by providing them with a platform that simplifies the application process. We aim to make higher education accessible to all.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-600 mb-4">Our Values</h3>
            <ul className="list-inside list-disc text-lg text-gray-700">
              <li>Integrity: We uphold the highest standards of ethics and transparency.</li>
              <li>Innovation: Continuously improving our system to meet the needs of our students.</li>
              <li>Empathy: Understanding and addressing the challenges students face in the admission process.</li>
              <li>Excellence: Striving for excellence in every aspect of our operations.</li>
            </ul>
          </div>
        </div>

        <div className="my-16">
          <h3 className="text-3xl font-semibold text-teal-600 mb-4">About the College</h3>
          <p className="text-lg text-gray-700 mb-4">
            Founded in 2000, Our College has been a leader in providing quality education across a wide range of disciplines. Our goal is to foster an environment of learning, innovation, and critical thinking, preparing students to excel in their careers and contribute meaningfully to society.
          </p>
          <div className="relative">
            <img
              src="https://via.placeholder.com/1200x500" // Replace with actual image URL
              alt="College Campus"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
            <p className="absolute inset-0 text-center text-white font-semibold text-2xl flex items-center justify-center">
              Our Beautiful Campus
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-semibold text-teal-600 mb-4">Our Faculty</h3>
          <p className="text-lg text-gray-700 mb-4">
            Our highly qualified faculty members come from diverse backgrounds and are dedicated to providing an engaging and supportive learning environment. They are experts in their fields and bring a wealth of knowledge and experience to the classroom.
          </p>

          <h3 className="text-3xl font-semibold text-teal-600 mb-4">State-of-the-Art Facilities</h3>
          <p className="text-lg text-gray-700">
            Our college is equipped with modern classrooms, research labs, a well-stocked library, and recreational facilities that provide a conducive environment for both academic and personal growth. We believe in offering the best resources to our students to help them succeed.
          </p>
        </div>
      </section>

     
    </div>
  );
};

export default AboutPage;


