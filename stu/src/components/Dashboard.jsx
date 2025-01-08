import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle loading state when clicking the Admissions List link
  const handleAdmissionsClick = () => {
    setIsLoading(true);  // Set loading to true when clicking the link
    setTimeout(() => {
      setIsLoading(false); // Reset loading after a timeout (for demonstration)
      // You can navigate to the admissions list page here
    }, 2000); // Simulate loading for 2 seconds (adjust as needed)
  };

  // Handle Total Students navigation
  const handleTotalStudentsClick = () => {
    setIsLoading(true); // Set loading to true while navigating
    setTimeout(() => {
      setIsLoading(false); // Reset loading after timeout
      navigate('/users'); // Navigate to the "Total Students" page
    }, 1500); // Simulate a short loading for 1.5 seconds
  };

  return (
    <div className="flex flex-col lg:flex-row pt-32">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white h-auto lg:h-screen w-full lg:w-64 p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            {/* Trigger loading when clicking Admissions List */}
            <Link to="/AdmissionsList" onClick={handleAdmissionsClick}>
              Admissions List
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            {/* Trigger Total Students page navigation */}
            <span onClick={handleTotalStudentsClick}>
              Total Students
            </span>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to="#">Settings</Link> {/* Link to Settings Page */}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-xl font-bold mb-4 sm:mb-0">Dashboard</h1>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Logout
          </button> */}
        </div>

        {/* Dashboard Content */}
        <div className="p-6 flex-1 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>

          {/* Conditionally render loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <p className="text-lg font-semibold">Please wait...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white shadow p-4 rounded">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">150</p>
              </div>
              <div className="bg-white shadow p-4 rounded">
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <p className="text-2xl font-bold">25</p>
              </div>
              <div className="bg-white shadow p-4 rounded">
                <h3 className="text-lg font-semibold">Support Tickets</h3>
                <p className="text-2xl font-bold">10</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
