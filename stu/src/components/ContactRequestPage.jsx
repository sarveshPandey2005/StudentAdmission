import React, { useState, useEffect } from 'react';

const ContactRequestPage = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact requests data
  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact-requests');
        if (!response.ok) {
          throw new Error('Failed to fetch contact requests');
        }
        const data = await response.json();
        // Log data to check the structure if necessary
        console.log(data);
        setContactRequests(data);
      } catch (error) {
        console.error('Error fetching contact requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequests();
  }, []);

  // Format the date from MongoDB's $date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can modify this format as needed
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl text-teal-600">Loading...</div>;
  }

  if (contactRequests.length === 0) {
    return <div className="text-center mt-20 text-xl text-teal-600">No contact requests found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-teal-600 text-center mb-6">
          Contact Requests
        </h1>

        {/* Contact Requests List */}
        <div className="space-y-4">
          {contactRequests.map((request) => (
            <div
              key={request._id} // MongoDB automatically generates an ObjectId and returns it as '_id'
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{request.name}</h2>
                <p className="text-gray-600 text-sm mb-1"><strong>Email:</strong> {request.email}</p>
                <p className="text-teal-500 text-sm mt-1"><strong>Message:</strong> {request.message}</p>
                {/* Format and display the date */}
                <p className="text-gray-600 text-sm"><strong>Date:</strong> {formatDate(request.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactRequestPage;
