import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AdmissionForm from "./components/AdmissionForm";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard"; // Import your Admin Dashboard component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdmissionsList from "./components/AdmissionsList"; // Add this import
import TotalStudents from "./components/TotalStudents";


const App = () => {
  return (
    <Router>
      {/* Navbar is rendered outside Routes to ensure it stays visible */}
      <Navbar />
      
      {/* Main content area */}
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/apply" element={<AdmissionForm />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          
          {/* Admin Dashboard Route (No Protection) */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/users" element={<TotalStudents />} />
          <Route path="/AdmissionsList" element={<AdmissionsList />} />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
      
      {/* Footer is also rendered outside Routes */}
      <Footer />
    </Router>
  );
};

export default App;
