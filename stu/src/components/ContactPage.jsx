import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To enable redirection
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2'; // SweetAlert2 library

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const nameRegex = /^[A-Za-z ]+$/; // Name should only contain letters and spaces
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email regex

    // Validate Name
    if (!formData.name) {
      formErrors.name = 'Full Name is required';
    } else if (!nameRegex.test(formData.name)) {
      formErrors.name = 'Name should contain only letters';
    }

    // Validate Email
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    // Validate Message
    if (!formData.message) {
      formErrors.message = 'Message cannot be empty';
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been successfully sent!',
        }).then(() => {
          setFormData({ name: '', email: '', message: '' }); // Clear form data
          navigate('/'); // Redirect to home page after alert
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit the form');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'There was an error submitting your message. Please try again.',
      });
      console.error('Submission Error:', error);
    }
  };

  return (
    <div>
    
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-semibold mb-6 text-center text-teal-600">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Have any questions or need assistance? Reach out to us, and we will get back to you as soon as possible.
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 bg-white p-8 shadow-lg rounded-lg border border-gray-200"
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
                required
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full border p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Your message"
                required
              />
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
   
    </div>
  );
};

export default ContactPage;
