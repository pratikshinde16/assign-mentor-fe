import React, { useState } from 'react';
import axios from 'axios';

const ViewStudentDetails = () => {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId.trim() !== '') {
      axios
        // .get(`http://localhost:3000/api/student-mentor/${studentId}`)
        .get(`https://assign-mentor-k96m.onrender.com/api/student-mentor/${studentId}`)
        .then((response) => {
          setStudentDetails(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch student details:', error);
          setStudentDetails(null);
        });
    } else {
      alert('Please enter a valid student ID');
    }
  };

  return (
    <div>
      <h2>View Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <button type="submit">View Student Details</button>
      </form>

      {studentDetails && (
        <div>
          <h3>Student ID: {studentId}</h3>
          {studentDetails.previousMentor ? (
            <p>Previously Assigned Mentor: {studentDetails.previousMentor}</p>
          ) : (
            <p>No previously assigned mentor</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewStudentDetails;
