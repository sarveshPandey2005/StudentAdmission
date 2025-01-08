import React, { useState, useEffect } from 'react';

const TotalStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch student data from the backend
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 pt-20">
      <h2 className="text-2xl font-bold mb-6">Total Students</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500 hover:bg-gray-50 transition ease-in-out duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-600">Course: {student.course}</p>
              <div className="mt-4">
                <div className="flex items-center space-x-4">
                  <p className="text-gray-700">Email: {student.email}</p>
                  <p className="text-gray-700">Phone: {student.phone}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-gray-700">Gender: {student.gender}</p>
                  <p className="text-gray-700">Mode of Study: {student.modeOfStudy}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">Address: {student.address}</p>
              <p className="text-gray-600">Message: {student.message}</p>
              <p className="text-sm text-gray-500 mt-4">
                Date of Birth: {new Date(student.dob).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Enrollment Date: {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalStudents;
