import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AdmissionsList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admissions data
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admissions');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);  // Log the data to check its structure
        setAdmissions(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  // Handle Accept button with SweetAlert confirmation
  const handleAccept = async (admissionId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to accept this admission?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/admissions/accept/${admissionId}`, {
          method: 'POST', // Assuming you're using POST to move the data
        });
        if (response.ok) {
          const updatedAdmissions = admissions.filter((admission) => admission._id.$oid !== admissionId);
          setAdmissions(updatedAdmissions);
          Swal.fire('Accepted!', 'The admission has been accepted and moved to students.', 'success');
        } else {
          throw new Error('Failed to accept admission');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'There was an issue accepting the admission.', 'error');
      }
    }
  };

  // Handle Reject button with SweetAlert confirmation
  const handleReject = async (admissionId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to reject and delete this admission?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
      cancelButtonText: 'No, Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/admissions/accept/${admissionId}`, {
          method: 'POST', // Assuming you're using POST to move the admission to 'students'
        });
    
        if (response.ok) {
          // Update the state by filtering out the accepted admission
          const updatedAdmissions = admissions.filter((admission) => admission._id.$oid !== admissionId);
    
          setAdmissions(updatedAdmissions); // Update the state to reflect changes
    
          // Show success alert
          Swal.fire('Accepted!', 'The admission has been accepted and moved to students.', 'success');
        } else {
          // Handle non-200 responses
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to accept admission');
        }
      } catch (error) {
        console.error('Error accepting admission:', error);
    
        // Show error alert
        Swal.fire('Error!', error.message || 'There was an issue accepting the admission.', 'error');
      }
    }
    
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl text-teal-600">Loading...</div>;
  }

  if (admissions.length === 0) {
    return <div className="text-center mt-20 text-xl text-teal-600">No admissions found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-teal-600 text-center mb-6">
          Admissions List
        </h1>

        {/* Admissions List */}
        <div className="space-y-4">
          {admissions.map((admission) => (
            <div
              key={admission._id.$oid} // Use $oid to access the ObjectId
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{admission.name}</h2>
                <p className="text-gray-600 text-sm mb-1"><strong>Email:</strong> {admission.email}</p>
                <p className="text-teal-500 text-sm mt-1"><strong>Phone:</strong> {admission.phone}</p>
                <p className="text-gray-600"><strong>Course:</strong> {admission.course}</p>
                
                {/* Safely accessing dob with optional chaining */}
                <p className="text-gray-600"><strong>Date of Birth:</strong> {admission.dob?.$date ? new Date(admission.dob.$date).toLocaleDateString() : 'N/A'}</p>

                <p className="text-gray-600"><strong>Gender:</strong> {admission.gender}</p>
                <p className="text-gray-600"><strong>Address:</strong> {admission.address}</p>
                <p className="text-gray-600"><strong>Mode of Study:</strong> {admission.modeOfStudy}</p>
                <p className="text-gray-600"><strong>Message:</strong> {admission.message}</p>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleAccept(admission._id)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(admission._id)}  // Directly pass _id
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsList;
