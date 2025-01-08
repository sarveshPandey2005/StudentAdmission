import React, { useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 for alerts
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For redirection

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data before submission
  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) {
      formErrors.username = 'Username is required';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to the Admin Panel!',
        }).then(() => {
          // Redirect to homepage after successful login
          navigate('/Dashboard'); // Redirect to homepage
        });
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'There was an error logging in. Please try again.',
      });
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex flex-grow justify-center items-center pt-20 pb-12 bg-gray-50">
        <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8">
          <h2 className="text-2xl font-semibold text-center text-teal-600 mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.username ? 'border-red-500' : ''}`}
                placeholder="Enter your username"
                required
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
