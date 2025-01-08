import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    course: '',
    modeOfStudy: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Name should only contain letters (and spaces)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      Swal.fire({
        title: 'Invalid Name',
        text: 'Name can only contain letters and spaces.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    // Phone should only contain digits and should be of valid length (e.g., 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      Swal.fire({
        title: 'Invalid Phone Number',
        text: 'Phone number must contain exactly 10 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            address: '',
            course: '',
            modeOfStudy: '',
            message: '',
          });
        });
      } else {
        const errorMessages = result.errors
          ? result.errors.map((err) => err.msg).join('\n')
          : result.message || 'Something went wrong.';
        Swal.fire({
          title: 'Error!',
          text: errorMessages,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Submission failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 shadow-xl rounded-lg max-w-md w-full space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Admission Form
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Other
              </label>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Course */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">Select a course</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          {/* Mode of Study */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mode of Study</label>
            <select
              name="modeOfStudy"
              value={formData.modeOfStudy}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">Select Mode</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter a message (optional)"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Application
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionForm;
